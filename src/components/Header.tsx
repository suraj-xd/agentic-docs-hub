import { useState, useMemo } from 'react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { patterns } from '@/data/patterns';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleMobile: () => void;
  isMobileOpen: boolean;
  onSearch: (query: string) => void;
  onPatternSelect: (slug: string) => void;
}

export const Header = ({
  isDark,
  onToggleTheme,
  onToggleMobile,
  isMobileOpen,
  onSearch,
  onPatternSelect,
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return patterns
      .filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
    setShowResults(true);
  };

  const handlePatternClick = (slug: string) => {
    setSearchQuery('');
    setShowResults(false);
    onPatternSelect(slug);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background border-b border-border">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleMobile}
            className="lg:hidden p-1.5 hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">◇</span>
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              agentic-patterns
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block relative">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patterns..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full h-8 pl-9 pr-4 text-xs bg-muted border border-border focus:border-foreground focus:outline-none placeholder:text-muted-foreground transition-colors"
            />
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-lg">
              {searchResults.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => handlePatternClick(pattern.slug)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  <span className="text-muted-foreground mr-2">{pattern.id}.</span>
                  <span className="text-foreground">{pattern.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right section */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};
