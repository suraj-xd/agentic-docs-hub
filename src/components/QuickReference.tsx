import { patterns, patternSelectionMatrix, getComplexityTextColor, ComplexityLevel } from '@/data/patterns';

interface QuickReferenceProps {
  onPatternClick: (slug: string) => void;
}

export const QuickReference = ({ onPatternClick }: QuickReferenceProps) => {
  const beginnerPatterns = patterns.filter(p => p.complexity === 'beginner');
  const intermediatePatterns = patterns.filter(p => p.complexity === 'intermediate');
  const advancedPatterns = patterns.filter(p => p.complexity === 'advanced');
  const experimentalPatterns = patterns.filter(p => p.complexity === 'experimental');

  const complexityGroups = [
    { label: 'beginner', patterns: beginnerPatterns },
    { label: 'intermediate', patterns: intermediatePatterns },
    { label: 'advanced', patterns: advancedPatterns },
    { label: 'experimental', patterns: experimentalPatterns },
  ].filter(g => g.patterns.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-1">Quick Reference</h2>
        <p className="text-xs text-muted-foreground">Find the right pattern for your use case.</p>
      </div>

      {/* Pattern Selection Matrix */}
      <div className="border border-border">
        <div className="px-4 py-2 border-b border-border bg-muted/50">
          <h3 className="text-xs font-medium">Selection Matrix</h3>
        </div>
        <div className="divide-y divide-border">
          {patternSelectionMatrix.map((row, i) => (
            <div key={i} className="px-4 py-3 grid sm:grid-cols-3 gap-2">
              <div className="text-xs text-muted-foreground">{row.useCase}</div>
              <div className="sm:col-span-2 text-xs text-foreground">{row.patterns}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Patterns by Complexity */}
      <div className="border border-border">
        <div className="px-4 py-2 border-b border-border bg-muted/50">
          <h3 className="text-xs font-medium">By Complexity</h3>
        </div>
        <div className="p-4 space-y-4">
          {complexityGroups.map(group => (
            <div key={group.label}>
              <span className={`text-xs mb-2 block ${getComplexityTextColor(group.label as ComplexityLevel)}`}>[{group.label}]</span>
              <div className="flex flex-wrap gap-1">
                {group.patterns.map(p => (
                  <button
                    key={p.id}
                    onClick={() => onPatternClick(p.slug)}
                    className="px-2 py-1 text-xs border border-border hover:bg-muted transition-colors"
                  >
                    {p.id.toString().padStart(2, '0')} {p.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
