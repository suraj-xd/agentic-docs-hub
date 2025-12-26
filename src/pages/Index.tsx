import { useState, useEffect, useMemo } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { PatternCard } from '@/components/PatternCard';
import { QuickReference } from '@/components/QuickReference';
import { BackToTop } from '@/components/BackToTop';
import { patterns } from '@/data/patterns';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { BookOpen, Layers, Zap } from 'lucide-react';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
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
    <div className="min-h-screen bg-background">
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

      <main className="pt-16 lg:pl-72">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold doc-heading mb-4">
              Agentic Design Patterns
            </h1>
            <p className="text-xl doc-prose mb-8">
              A comprehensive guide to 20 advanced AI agent architectures that separate professionals from beginners.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-card border border-border">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">20 Patterns</h3>
                <p className="text-sm text-muted-foreground">From beginner to advanced</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <Layers className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Visual Diagrams</h3>
                <p className="text-sm text-muted-foreground">Process flows for each pattern</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Real Examples</h3>
                <p className="text-sm text-muted-foreground">Practical applications</p>
              </div>
            </div>
          </section>

          {/* Pattern Cards */}
          <div className="space-y-8">
            {filteredPatterns.map(pattern => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>

          {/* Quick Reference */}
          <div className="mt-16">
            <QuickReference onPatternClick={handlePatternClick} />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Agentic Design Patterns Guide</p>
          </footer>
        </div>
      </main>

      <BackToTop />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Index;
