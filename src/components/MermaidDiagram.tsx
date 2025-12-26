import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with theme-aware config
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#d97706',
    primaryTextColor: '#1c1917',
    primaryBorderColor: '#d97706',
    lineColor: '#a8a29e',
    secondaryColor: '#fef3c7',
    tertiaryColor: '#f5f5f4',
    background: '#fafaf9',
    mainBkg: '#fafaf9',
    nodeBorder: '#d97706',
    clusterBkg: '#fef3c7',
    clusterBorder: '#d97706',
    titleColor: '#1c1917',
    edgeLabelBackground: '#fafaf9',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 15,
  },
  securityLevel: 'loose',
});

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart || !containerRef.current) return;

      try {
        setError(null);
        const { svg } = await mermaid.render(idRef.current, chart);
        setSvg(svg);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className={`p-4 bg-muted rounded-lg text-muted-foreground text-sm ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`mermaid-container overflow-x-auto p-4 bg-card rounded-lg border border-border ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
