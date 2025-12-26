import { patterns, patternSelectionMatrix, getComplexityColor } from '@/data/patterns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface QuickReferenceProps {
  onPatternClick: (slug: string) => void;
}

export function QuickReference({ onPatternClick }: QuickReferenceProps) {
  const beginnerPatterns = patterns.filter(p => p.complexity === 'beginner');
  const intermediatePatterns = patterns.filter(p => p.complexity === 'intermediate');
  const advancedPatterns = patterns.filter(p => p.complexity === 'advanced');
  const experimentalPatterns = patterns.filter(p => p.complexity === 'experimental');

  return (
    <div id="quick-reference" className="scroll-mt-24 space-y-8">
      <div>
        <h2 className="text-3xl font-bold doc-heading mb-2">Quick Reference Guide</h2>
        <p className="doc-prose">Find the right pattern for your use case.</p>
      </div>

      {/* Pattern Selection Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Pattern Selection Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Use Case</TableHead>
                <TableHead>Recommended Patterns</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patternSelectionMatrix.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.useCase}</TableCell>
                  <TableCell className="doc-prose">{row.patterns}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Complexity Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Patterns by Complexity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Beginner */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Badge className={getComplexityColor('beginner')}>Beginner-Friendly</Badge>
            </h4>
            <div className="flex flex-wrap gap-2">
              {beginnerPatterns.map(p => (
                <button
                  key={p.id}
                  onClick={() => onPatternClick(p.slug)}
                  className="px-3 py-1.5 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                >
                  #{p.id} {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Intermediate */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Badge className={getComplexityColor('intermediate')}>Intermediate</Badge>
            </h4>
            <div className="flex flex-wrap gap-2">
              {intermediatePatterns.map(p => (
                <button
                  key={p.id}
                  onClick={() => onPatternClick(p.slug)}
                  className="px-3 py-1.5 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                >
                  #{p.id} {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Badge className={getComplexityColor('advanced')}>Advanced</Badge>
            </h4>
            <div className="flex flex-wrap gap-2">
              {advancedPatterns.map(p => (
                <button
                  key={p.id}
                  onClick={() => onPatternClick(p.slug)}
                  className="px-3 py-1.5 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                >
                  #{p.id} {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Experimental */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Badge className={getComplexityColor('experimental')}>Experimental (Use with Caution)</Badge>
            </h4>
            <div className="flex flex-wrap gap-2">
              {experimentalPatterns.map(p => (
                <button
                  key={p.id}
                  onClick={() => onPatternClick(p.slug)}
                  className="px-3 py-1.5 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                >
                  #{p.id} {p.title}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
