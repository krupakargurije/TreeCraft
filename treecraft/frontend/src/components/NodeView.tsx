import { useState } from 'react';
import { useTreeStore } from '../store';

// ============================================================
// NodeView — Traversal Output Display
// ============================================================

type Tab = 'preorder' | 'inorder' | 'postorder';

export default function NodeView() {
  const { traversals, treeData } = useTreeStore();
  const [activeTab, setActiveTab] = useState<Tab>('inorder');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'preorder', label: 'Pre-order' },
    { key: 'inorder', label: 'In-order' },
    { key: 'postorder', label: 'Post-order' },
  ];

  const currentTraversal = traversals[activeTab];
  const isEmpty = !treeData;

  return (
    <div className="card animate-fade-in-up">
      {/* Tab Header */}
      <div className="flex border-b border-[var(--color-border-primary)]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] bg-[rgba(99,102,241,0.05)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {isEmpty ? (
          <p className="text-xs text-[var(--color-text-muted)] italic text-center py-4">
            No tree data to display
          </p>
        ) : currentTraversal.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)] italic text-center py-4">
            Build WASM to see traversals
          </p>
        ) : (
          <div className="space-y-2">
            {/* Values display */}
            <div className="flex flex-wrap gap-1.5">
              {currentTraversal.map((val, i) => (
                <span
                  key={`${activeTab}-${i}`}
                  className="inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-md bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] text-xs font-mono text-[var(--color-text-primary)] animate-fade-in-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {val}
                </span>
              ))}
            </div>

            {/* Array notation */}
            <p className="text-[11px] font-mono text-[var(--color-text-muted)] mt-2 break-all">
              [{currentTraversal.join(', ')}]
            </p>

            {/* Count */}
            <p className="text-[11px] text-[var(--color-text-muted)]">
              {currentTraversal.length} node{currentTraversal.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Future features placeholder */}
      <div className="px-4 py-2 border-t border-[var(--color-border-primary)]">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
          {/* TODO: Step-by-step animation controls */}
          {/* TODO: Traversal animation playback */}
          Traversals
        </p>
      </div>
    </div>
  );
}
