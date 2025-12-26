import { useState } from 'react';
import { ChevronDown, Link as LinkIcon, Check, Minus, Plus, ArrowUpRight } from 'lucide-react';
import { Pattern, getComplexityTextColor } from '@/data/patterns';
import { MermaidDiagram } from './MermaidDiagram';
import { toast } from 'sonner';

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard = ({ pattern }: PatternCardProps) => {
  const [showPros, setShowPros] = useState(false);
  const [showCons, setShowCons] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
    } catch {
      return `https://www.google.com/s2/favicons?domain=example.com&sz=16`;
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}#${pattern.slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied');
  };

  const getComplexityLabel = (complexity: string) => {
    return `[${complexity.toLowerCase()}]`;
  };

  return (
    <section
      id={pattern.slug}
      className="scroll-mt-24 border border-border bg-card"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-muted-foreground text-xs">
              {pattern.id.toString().padStart(2, '0')}
            </span>
            <h2 className="text-sm font-medium text-foreground truncate">
              {pattern.title}
            </h2>
          </div>
          <span className={`text-xs ${getComplexityTextColor(pattern.complexity)}`}>
            {getComplexityLabel(pattern.complexity)}
          </span>
        </div>
        <button
          onClick={handleCopyLink}
          className="p-1 hover:bg-muted transition-colors shrink-0"
          aria-label="Copy link"
        >
          <LinkIcon size={14} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Summary */}
        <div>
          <h3 className="text-xs text-muted-foreground mb-1">Summary</h3>
          <p className="text-xs text-foreground leading-relaxed">
            {pattern.summary}
          </p>
        </div>

        {/* Analogy */}
        {pattern.analogy && (
          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Analogy</h3>
            <p className="text-xs text-doc-text leading-relaxed italic">
              "{pattern.analogy}"
            </p>
          </div>
        )}

        {/* Process Flow */}
        {pattern.mermaidDiagram && (
          <div>
            <h3 className="text-xs text-muted-foreground mb-2">Process Flow</h3>
            <div className="border border-border bg-background p-2 overflow-x-auto">
              <MermaidDiagram chart={pattern.mermaidDiagram} />
            </div>
          </div>
        )}

        {/* When to Use & Applications */}
        <div className="grid sm:grid-cols-2 gap-4">
          {pattern.whenToUse && pattern.whenToUse.length > 0 && (
            <div>
              <h3 className="text-xs text-muted-foreground mb-2">When to Use</h3>
              <ul className="space-y-1">
                {pattern.whenToUse.map((item, i) => (
                  <li key={i} className="text-xs text-foreground flex items-start gap-2">
                    <span className="text-muted-foreground">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pattern.applications && pattern.applications.length > 0 && (
            <div>
              <h3 className="text-xs text-muted-foreground mb-2">Applications</h3>
              <ul className="space-y-1">
                {pattern.applications.map((item, i) => (
                  <li key={i} className="text-xs text-foreground flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Pros & Cons */}
        <div className="space-y-2">
          {/* Pros */}
          {pattern.pros && pattern.pros.length > 0 && (
            <div className="border border-border">
              <button
                onClick={() => setShowPros(!showPros)}
                className="w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Check size={12} className="text-badge-beginner" />
                  <span>Pros ({pattern.pros.length})</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    showPros ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showPros && (
                <div className="px-3 py-2 border-t border-border space-y-1">
                  {pattern.pros.map((pro, i) => (
                    <div key={i} className="text-xs text-foreground flex items-start gap-2">
                      <Plus size={10} className="text-badge-beginner mt-0.5 shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cons */}
          {pattern.cons && pattern.cons.length > 0 && (
            <div className="border border-border">
              <button
                onClick={() => setShowCons(!showCons)}
                className="w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Minus size={12} className="text-destructive" />
                  <span>Cons ({pattern.cons.length})</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    showCons ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showCons && (
                <div className="px-3 py-2 border-t border-border space-y-1">
                  {pattern.cons.map((con, i) => (
                    <div key={i} className="text-xs text-foreground flex items-start gap-2">
                      <Minus size={10} className="text-destructive mt-0.5 shrink-0" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Resources */}
        {pattern.resources && pattern.resources.length > 0 && (
          <div className="border border-border">
            <button
              onClick={() => setShowResources(!showResources)}
              className="w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-muted transition-colors"
            >
              <span className="flex items-center gap-2">
                <LinkIcon size={12} className="text-muted-foreground" />
                <span>Resources ({pattern.resources.length})</span>
              </span>
              <ChevronDown
                size={14}
                className={`text-muted-foreground transition-transform ${
                  showResources ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showResources && (
              <div className="px-3 py-2 border-t border-border space-y-2">
                {pattern.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-foreground hover:text-primary transition-colors group"
                  >
                    <img
                      src={getFaviconUrl(resource.url)}
                      alt=""
                      className="w-4 h-4 shrink-0 rounded-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="flex-1 truncate">{resource.name}</span>
                    <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-primary shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Key Consideration */}
        {pattern.keyConsideration && (
          <div className="pt-2 border-t border-border">
            <h3 className="text-xs text-muted-foreground mb-1">Key Consideration</h3>
            <p className="text-xs text-foreground">{pattern.keyConsideration}</p>
          </div>
        )}
      </div>
    </section>
  );
};
