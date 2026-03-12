// ============================================================
// TreeCraft — D3.js Tree Renderer
// Converts JSON tree data into interactive SVG
// ============================================================

import * as d3 from 'd3';
import type { TreeNode } from '../store';

interface RenderOptions {
  container: SVGSVGElement;
  data: TreeNode;
  width: number;
  height: number;
  nodeRadius?: number;
  highlightValue?: number | null;
  treeType?: string;
}

interface D3TreeNode {
  value: number;
  label?: string;
  color?: number;
  height?: number;
  range?: [number, number];
  children?: D3TreeNode[];
}

// Convert our tree JSON format to D3's hierarchy format
function convertToD3Hierarchy(node: TreeNode | null | undefined): D3TreeNode | null {
  if (!node) return null;

  const d3Node: D3TreeNode = {
    value: node.value,
    label: node.label,
    color: node.color,
    height: node.height,
    range: node.range,
    children: [],
  };

  // Handle binary tree (left/right)
  if (node.left !== undefined || node.right !== undefined) {
    if (node.left) d3Node.children!.push(convertToD3Hierarchy(node.left)!);
    if (node.right) d3Node.children!.push(convertToD3Hierarchy(node.right)!);
  }

  // Handle trie (children array)
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      const converted = convertToD3Hierarchy(child);
      if (converted) d3Node.children!.push(converted);
    }
  }

  // Remove empty children array
  if (d3Node.children!.length === 0) {
    delete d3Node.children;
  }

  return d3Node;
}

// Get node fill color based on tree type and node properties
function getNodeColor(d: d3.HierarchyNode<D3TreeNode>, treeType?: string): string {
  if (treeType === 'red-black' && d.data.color !== undefined) {
    return d.data.color === 1 ? '#ef4444' : '#1e293b';
  }
  // Depth-based gradient for visual appeal
  const depth = d.depth;
  const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];
  return colors[Math.min(depth, colors.length - 1)];
}

// Get node stroke color
function getNodeStroke(d: d3.HierarchyNode<D3TreeNode>, treeType?: string): string {
  if (treeType === 'red-black' && d.data.color !== undefined) {
    return d.data.color === 1 ? '#fca5a5' : '#64748b';
  }
  return '#818cf8';
}

// Main render function
export function renderTree(options: RenderOptions): void {
  const {
    container,
    data,
    width,
    height,
    nodeRadius = 22,
    highlightValue = null,
    treeType = 'bst',
  } = options;

  // Clear previous
  const svg = d3.select(container);
  svg.selectAll('*').remove();

  // Convert to D3 hierarchy
  const d3Data = convertToD3Hierarchy(data);
  if (!d3Data) return;

  const root = d3.hierarchy(d3Data);

  // Create tree layout
  const margin = { top: 50, right: 40, bottom: 50, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const treeLayout = d3.tree<D3TreeNode>()
    .size([innerWidth, Math.min(innerHeight, root.height * 80 + 80)])
    .separation((a, b) => (a.parent === b.parent ? 1.5 : 2));

  treeLayout(root);

  // Create main group with margin
  const g = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ---- Draw Edges ----
  const links = g.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.linkVertical<d3.HierarchyLink<D3TreeNode>, d3.HierarchyPointNode<D3TreeNode>>()
      .x((d) => (d as d3.HierarchyPointNode<D3TreeNode>).x)
      .y((d) => (d as d3.HierarchyPointNode<D3TreeNode>).y) as unknown as string
    )
    .attr('fill', 'none')
    .attr('stroke', '#475569')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0)
    .transition()
    .duration(500)
    .attr('stroke-opacity', 0.6);

  // ---- Draw Nodes ----
  const nodes = g.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  // Node circles with animation
  nodes.append('circle')
    .attr('r', 0)
    .attr('fill', (d) => getNodeColor(d, treeType))
    .attr('stroke', (d) => getNodeStroke(d, treeType))
    .attr('stroke-width', 2.5)
    .style('filter', (d) =>
      highlightValue !== null && d.data.value === highlightValue
        ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.7))'
        : 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.3))'
    )
    .style('cursor', 'pointer')
    .transition()
    .duration(400)
    .delay((_, i) => i * 60)
    .attr('r', nodeRadius);

  // Highlight ring for searched nodes
  nodes
    .filter((d) => highlightValue !== null && d.data.value === highlightValue)
    .append('circle')
    .attr('r', nodeRadius + 6)
    .attr('fill', 'none')
    .attr('stroke', '#fbbf24')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', '4 2')
    .attr('opacity', 0)
    .transition()
    .duration(600)
    .attr('opacity', 1);

  // Node value labels
  nodes.append('text')
    .text((d) => d.data.label || String(d.data.value))
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('fill', '#ffffff')
    .attr('font-size', '12px')
    .attr('font-weight', '600')
    .attr('font-family', "'Inter', sans-serif")
    .style('pointer-events', 'none')
    .attr('opacity', 0)
    .transition()
    .duration(400)
    .delay((_, i) => i * 60 + 200)
    .attr('opacity', 1);

  // Height labels for AVL trees
  if (treeType === 'avl') {
    nodes
      .filter((d) => d.data.height !== undefined)
      .append('text')
      .text((d) => `h:${d.data.height}`)
      .attr('text-anchor', 'middle')
      .attr('dy', nodeRadius + 16)
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('opacity', 0)
      .transition()
      .duration(400)
      .delay((_, i) => i * 60 + 300)
      .attr('opacity', 1);
  }

  // Range labels for segment trees
  if (treeType === 'segment-tree') {
    nodes
      .filter((d) => d.data.range !== undefined)
      .append('text')
      .text((d) => `[${d.data.range![0]},${d.data.range![1]}]`)
      .attr('text-anchor', 'middle')
      .attr('dy', nodeRadius + 16)
      .attr('fill', '#94a3b8')
      .attr('font-size', '9px')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('opacity', 0)
      .transition()
      .duration(400)
      .delay((_, i) => i * 60 + 300)
      .attr('opacity', 1);
  }
}

// Render empty state
export function renderEmptyState(container: SVGSVGElement, width: number, height: number): void {
  const svg = d3.select(container);
  svg.selectAll('*').remove();

  svg
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // Empty state icon
  g.append('circle')
    .attr('r', 40)
    .attr('fill', 'rgba(99, 102, 241, 0.1)')
    .attr('stroke', 'rgba(99, 102, 241, 0.2)')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', '6 4');

  g.append('text')
    .text('🌳')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', '28px');

  g.append('text')
    .text('Insert values to build your tree')
    .attr('text-anchor', 'middle')
    .attr('dy', 70)
    .attr('fill', '#64748b')
    .attr('font-size', '14px')
    .attr('font-family', "'Inter', sans-serif");

  g.append('text')
    .text('Use the control panel on the right →')
    .attr('text-anchor', 'middle')
    .attr('dy', 95)
    .attr('fill', '#475569')
    .attr('font-size', '12px')
    .attr('font-family', "'Inter', sans-serif");
}
