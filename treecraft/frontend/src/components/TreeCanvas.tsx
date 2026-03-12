import { useRef, useEffect, useState } from 'react';
import { useTreeStore } from '../store';
import { renderTree, renderEmptyState } from '../visualization/treeRenderer';

// ============================================================
// TreeCanvas — SVG Visualization Area
// ============================================================

export default function TreeCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { treeData, treeType, searchResult, isTreeImplemented } = useTreeStore();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  // Track container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: Math.max(width, 400), height: Math.max(height, 300) });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Render tree whenever data or dimensions change
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (!treeData) {
      renderEmptyState(svg, dimensions.width, dimensions.height);
      return;
    }

    const highlightValue = searchResult?.found
      ? (isNaN(Number(searchResult.value)) ? null : Number(searchResult.value))
      : null;

    renderTree({
      container: svg,
      data: treeData,
      width: dimensions.width,
      height: dimensions.height,
      highlightValue,
      treeType,
    });
  }, [treeData, dimensions, searchResult, treeType]);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className={`w-full h-full relative z-10 transition-opacity duration-500 ${!isTreeImplemented ? 'opacity-20 blur-sm grayscale' : 'opacity-100'}`}
        style={{ minHeight: '300px' }}
      />

      {/* Coming Soon Overlay */}
      {isTreeImplemented === false && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center animate-fade-in">
          <div className="card p-8 bg-[rgba(15,23,42,0.8)] backdrop-blur-md border-[rgba(99,102,241,0.3)] shadow-2xl flex flex-col items-center text-center space-y-4">
            <div className="text-5xl animate-bounce-slow">🚀</div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Coming Soon</h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-[240px]">
              This tree algorithm is currently being crafted in C++. Stay tuned!
            </p>
            <div className="px-3 py-1 bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] rounded-full text-[10px] uppercase tracking-widest text-[#818cf8] font-bold">
              In Development
            </div>
          </div>
        </div>
      )}

      {/* Complexity info placeholder */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--color-text-muted)]">
          {/* TODO: Display time/space complexity */}
          <span className="px-2 py-1 rounded bg-[var(--color-bg-card)] border border-[var(--color-border-primary)]">
            Zoom: 100%
          </span>
        </div>
      </div>
    </div>
  );
}
