import { useTreeStore, TREE_TYPES, type TreeType } from '../store';
import { initTree } from '../wasm/wasmAPI';

// ============================================================
// Sidebar — Tree Type Selector
// ============================================================

export default function Sidebar() {
  const { treeType, isWasmLoaded } = useTreeStore();

  const handleSelect = (type: TreeType) => {
    initTree(type);
  };

  return (
    <aside className="w-64 min-w-[256px] h-full flex flex-col bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)]">
      {/* Logo / Title */}
      <div className="p-5 border-b border-[var(--color-border-primary)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-lg shadow-[0_0_16px_var(--color-accent-glow)]">
            🌳
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
              TreeCraft
            </h1>
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-medium">
              Data Structure Visualizer
            </p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="px-5 py-3 border-b border-[var(--color-border-primary)]">
        <div className={`flex items-center gap-2 text-xs font-medium ${isWasmLoaded ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}>
          <span className={`w-2 h-2 rounded-full ${isWasmLoaded ? 'bg-[var(--color-success)]' : 'bg-[var(--color-warning)]'}`} />
          {isWasmLoaded ? 'WASM Engine Active' : 'Demo Mode'}
        </div>
      </div>

      {/* Tree Type List */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-2">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-semibold">
            Tree Types
          </p>
        </div>
        <nav className="space-y-0.5 px-2">
          {TREE_TYPES.map((tree) => {
            const isActive = treeType === tree.id;
            return (
              <button
                key={tree.id}
                onClick={() => handleSelect(tree.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-accent)] bg-opacity-15 text-[var(--color-text-primary)] shadow-[inset_0_0_0_1px_var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <span className="text-lg w-7 text-center flex-shrink-0">{tree.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{tree.label}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)] truncate">{tree.description}</p>
                </div>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border-primary)]">
        <p className="text-[11px] text-[var(--color-text-muted)] text-center">
          C++ → WebAssembly → React
        </p>
      </div>
    </aside>
  );
}
