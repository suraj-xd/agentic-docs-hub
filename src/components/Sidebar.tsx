import { useMemo } from 'react';
import { patterns, getComplexityColor } from '@/data/patterns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeId: string;
  scrollProgress: number;
  onPatternClick: (slug: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeId, scrollProgress, onPatternClick, isOpen = true, onClose }: SidebarProps) {
  const handleClick = (slug: string) => {
    onPatternClick(slug);
    onClose?.();
  };

  const sidebarContent = useMemo(() => (
    <>
      {/* Progress bar */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Reading progress</span>
          <span>{Math.round(scrollProgress)}%</span>
        </div>
        <div className="h-1 bg-progress-bg rounded-full overflow-hidden">
          <div 
            className="h-full bg-progress-fill transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="space-y-1">
          {/* Introduction */}
          <button
            onClick={() => handleClick('introduction')}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              activeId === 'introduction'
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            Introduction
          </button>

          {/* Patterns list */}
          <div className="pt-2">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Patterns
            </div>
            {patterns.map(pattern => (
              <button
                key={pattern.id}
                onClick={() => handleClick(pattern.slug)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-150 group flex items-start gap-2",
                  activeId === pattern.slug
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <span className={cn(
                  "flex-shrink-0 w-6 h-6 rounded text-xs font-medium flex items-center justify-center transition-colors",
                  activeId === pattern.slug
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-sidebar-accent"
                )}>
                  {pattern.id}
                </span>
                <span className={cn(
                  "flex-1 leading-tight",
                  activeId === pattern.slug && "font-medium"
                )}>
                  {pattern.title}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Reference */}
          <div className="pt-4">
            <button
              onClick={() => handleClick('quick-reference')}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                activeId === 'quick-reference'
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              Quick Reference
            </button>
          </div>
        </nav>
      </ScrollArea>

      {/* Complexity Legend */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Complexity
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge className={cn("text-xs", getComplexityColor('beginner'))}>
            Beginner
          </Badge>
          <Badge className={cn("text-xs", getComplexityColor('intermediate'))}>
            Intermediate
          </Badge>
          <Badge className={cn("text-xs", getComplexityColor('advanced'))}>
            Advanced
          </Badge>
          <Badge className={cn("text-xs", getComplexityColor('experimental'))}>
            Experimental
          </Badge>
        </div>
      </div>
    </>
  ), [activeId, scrollProgress, handleClick]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-72 lg:border-r lg:border-sidebar-border lg:bg-sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "lg:hidden fixed left-0 top-16 bottom-0 w-72 border-r border-sidebar-border bg-sidebar z-50 flex flex-col transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
}
