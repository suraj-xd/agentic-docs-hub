import { useState, useEffect, useMemo } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { PatternCard } from '@/components/PatternCard';
import { QuickReference } from '@/components/QuickReference';
import { BackToTop } from '@/components/BackToTop';
import { patterns } from '@/data/patterns';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sectionIds = useMemo(() => [
    'introduction',
    ...patterns.map(p => p.slug),
    'quick-reference'
  ], []);

  const { activeId, scrollProgress, scrollToSection } = useScrollSpy({
    sectionIds,
    offset: 100,
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handlePatternClick = (slug: string) => {
    scrollToSection(slug);
    setIsMobileOpen(false);
  };

  const filteredPatterns = useMemo(() => {
    if (!searchQuery) return patterns;
    return patterns.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        isMobileOpen={isMobileOpen}
        onSearch={setSearchQuery}
        onPatternSelect={handlePatternClick}
      />

      <Sidebar
        activeId={activeId}
        scrollProgress={scrollProgress}
        onPatternClick={handlePatternClick}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <main className="pt-14 lg:pl-64">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-20 mb-12">
            <h1 className="text-lg font-medium mb-2">
              Agentic Design Patterns
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              A comprehensive guide to {patterns.length} advanced AI agent architectures. 
              Each pattern includes process flows, use cases, and implementation considerations.
            </p>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span>{patterns.length} patterns</span>
                <span>•</span>
                <span>beginner → advanced</span>
                <span>•</span>
                <span>with diagrams</span>
              </div>
            </div>
          </section>

          {/* Pattern Cards */}
          <div className="space-y-6">
            {filteredPatterns.map(pattern => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>

          {/* Quick Reference */}
          <div id="quick-reference" className="scroll-mt-20 mt-12">
            <QuickReference onPatternClick={handlePatternClick} />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              agentic-patterns — {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </main>

      <BackToTop />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Index;
