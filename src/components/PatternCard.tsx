import { Link2, Lightbulb, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Pattern, getComplexityColor } from '@/data/patterns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CollapsibleSection } from '@/components/CollapsibleSection';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PatternCardProps {
  pattern: Pattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${pattern.slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };

  return (
    <Card id={pattern.slug} className="scroll-mt-24 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              {pattern.id}
            </span>
            <div>
              <h2 className="text-2xl font-bold doc-heading">{pattern.title}</h2>
              <Badge className={cn("mt-1", getComplexityColor(pattern.complexity))}>
                {pattern.complexity.charAt(0).toUpperCase() + pattern.complexity.slice(1)}
              </Badge>
            </div>
          </div>
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Copy link to this pattern"
          >
            <Link2 className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            📋 Summary
          </h3>
          <p className="doc-prose text-base leading-relaxed">{pattern.summary}</p>
        </div>

        {/* Analogy */}
        <div className="p-4 bg-accent/50 rounded-lg border border-accent">
          <h3 className="text-sm font-semibold text-accent-foreground uppercase tracking-wider mb-2">
            🎯 Analogy
          </h3>
          <p className="text-accent-foreground italic">{pattern.analogy}</p>
        </div>

        {/* Mermaid Diagram */}
        {pattern.mermaidDiagram && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              🔄 Process Flow
            </h3>
            <MermaidDiagram chart={pattern.mermaidDiagram} />
          </div>
        )}

        {/* When to Use & Applications - Tabs style */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              When to Use
            </h3>
            <ul className="space-y-2">
              {pattern.whenToUse.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm doc-prose">
                  <span className="text-primary mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Applications
            </h3>
            <ul className="space-y-2">
              {pattern.applications.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm doc-prose">
                  <span className="text-badge-beginner mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pros & Cons - Collapsible */}
        <CollapsibleSection 
          title="Pros & Cons" 
          defaultOpen={false}
          icon={<span className="text-lg">⚖️</span>}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-badge-beginner mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Pros
              </h4>
              <ul className="space-y-1.5">
                {pattern.pros.map((pro, i) => (
                  <li key={i} className="text-sm doc-prose flex items-start gap-2">
                    <span className="text-badge-beginner">+</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-badge-experimental mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4" /> Cons
              </h4>
              <ul className="space-y-1.5">
                {pattern.cons.map((con, i) => (
                  <li key={i} className="text-sm doc-prose flex items-start gap-2">
                    <span className="text-badge-experimental">−</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Key Consideration */}
        {pattern.keyConsideration && (
          <div className="p-4 bg-badge-intermediate/10 border border-badge-intermediate/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-badge-intermediate flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Key Consideration</h4>
                <p className="text-sm doc-prose">{pattern.keyConsideration}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
