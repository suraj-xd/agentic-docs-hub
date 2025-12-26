import { useState } from 'react';
import { Search, Sun, Moon, Menu, X, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { patterns } from '@/data/patterns';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleMobile: () => void;
  isMobileOpen: boolean;
  onSearch: (query: string) => void;
  onPatternSelect: (slug: string) => void;
}

export function Header({ isDark, onToggleTheme, onToggleMobile, isMobileOpen, onSearch, onPatternSelect }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredPatterns = patterns.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.length > 0);
    onSearch(value);
  };

  const handlePatternClick = (slug: string) => {
    setSearchQuery('');
    setShowResults(false);
    onPatternSelect(slug);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleMobile}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Agentic Design Patterns
            </span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search patterns..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="pl-9 pr-12 bg-muted/50 border-border focus:bg-background"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-xs text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showResults && filteredPatterns.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto">
              {filteredPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => handlePatternClick(pattern.slug)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      #{pattern.id}
                    </span>
                    <span className="font-medium text-foreground">{pattern.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {pattern.summary}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
