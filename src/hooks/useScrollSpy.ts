import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
}

export function useScrollSpy({ sectionIds, offset = 100, rootMargin = '-20% 0px -70% 0px' }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const calculateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    calculateProgress();
    window.addEventListener('scroll', calculateProgress, { passive: true });
    return () => window.removeEventListener('scroll', calculateProgress);
  }, [calculateProgress]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Get the entry closest to the top of the viewport
        const sortedByTop = visibleEntries.sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        
        const closestToTop = sortedByTop.find(entry => entry.boundingClientRect.top >= -offset);
        if (closestToTop) {
          setActiveId(closestToTop.target.id);
        } else if (sortedByTop.length > 0) {
          setActiveId(sortedByTop[0].target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin,
      threshold: [0, 0.1, 0.5, 1],
    });

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, offset, rootMargin]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [offset]);

  return { activeId, scrollProgress, scrollToSection };
}
