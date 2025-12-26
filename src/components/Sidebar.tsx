import { useMemo } from 'react';
import { Github, Twitter } from 'lucide-react';
import { patterns } from '@/data/patterns';

interface SidebarProps {
  activeId: string;
  scrollProgress: number;
  onPatternClick: (slug: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({
  activeId,
  scrollProgress,
  onPatternClick,
  isOpen = false,
  onClose,
}: SidebarProps) => {
  const handleClick = (slug: string) => {
    onPatternClick(slug);
    onClose?.();
  };

  const sidebarContent = useMemo(
    () => (
      <div className="h-full flex flex-col">
        {/* Progress bar */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(scrollProgress)}%</span>
          </div>
          <div className="h-0.5 bg-progress-bg">
            <div
              className="h-full bg-progress-fill transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {/* Introduction */}
          <div className="px-2 mb-1">
            <button
              onClick={() => handleClick('introduction')}
              className={`w-full px-3 py-1.5 text-left text-xs transition-colors ${
                activeId === 'introduction'
                  ? 'bg-foreground text-background'
                  : 'text-sidebar-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              introduction
            </button>
          </div>

          {/* Patterns section */}
          <div className="px-4 py-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Patterns
            </span>
          </div>

          <div className="px-2 space-y-0.5">
            {patterns.map(pattern => (
              <button
                key={pattern.id}
                onClick={() => handleClick(pattern.slug)}
                className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-start gap-2 ${
                  activeId === pattern.slug
                    ? 'bg-foreground text-background'
                    : 'text-sidebar-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span className="text-muted-foreground shrink-0 w-4">
                  {pattern.id.toString().padStart(2, '0')}
                </span>
                <span className="truncate">{pattern.title}</span>
              </button>
            ))}
          </div>

          {/* Quick Reference */}
          <div className="px-2 mt-4">
            <button
              onClick={() => handleClick('quick-reference')}
              className={`w-full px-3 py-1.5 text-left text-xs transition-colors ${
                activeId === 'quick-reference'
                  ? 'bg-foreground text-background'
                  : 'text-sidebar-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              reference
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-muted-foreground">
              {patterns.length} patterns
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/suraj-xd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href="https://x.com/notsurajgaud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <svg fill="currentColor" viewBox="0 0 1200 1227" className="w-3 h-3">
                  <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
    [activeId, scrollProgress]
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-14 bottom-0 w-64 bg-sidebar border-r border-sidebar-border overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-background/80"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-14 bottom-0 w-64 bg-sidebar border-r border-sidebar-border overflow-hidden">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
