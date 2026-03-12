import { useState, type FormEvent } from 'react';
import { useTreeStore, TREE_TYPES } from '../store';
import {
  insertValue,
  insertWord,
  deleteValue,
  deleteWord,
  searchValue,
  searchWord,
  resetTree,
  generateDemoTree,
} from '../wasm/wasmAPI';

// ============================================================
// ControlPanel — Insert / Delete / Search / Reset Controls
// ============================================================

export default function ControlPanel() {
  const { treeType, isWasmLoaded, searchResult, statusMessage } = useTreeStore();
  const [inputValue, setInputValue] = useState('');

  const typeInfo = TREE_TYPES.find((t) => t.id === treeType);
  const usesStrings = typeInfo?.usesStrings ?? false;

  const handleInsert = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (usesStrings) {
      insertWord(inputValue.trim().toLowerCase());
    } else {
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num)) return;
      insertValue(num);
    }
    setInputValue('');
  };

  const handleDelete = () => {
    if (!inputValue.trim()) return;

    if (usesStrings) {
      deleteWord(inputValue.trim().toLowerCase());
    } else {
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num)) return;
      deleteValue(num);
    }
    setInputValue('');
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;

    if (usesStrings) {
      searchWord(inputValue.trim().toLowerCase());
    } else {
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num)) return;
      searchValue(num);
    }
  };

  const handleReset = () => {
    resetTree();
    setInputValue('');
  };

  const handleLoadDemo = () => {
    generateDemoTree();
  };

  return (
    <div className="card p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
          Controls
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-input)] text-[var(--color-text-muted)] font-mono">
          {typeInfo?.label ?? 'BST'}
        </span>
      </div>

      {/* Input + Insert */}
      <form onSubmit={handleInsert} className="space-y-2">
        <input
          type={usesStrings ? 'text' : 'number'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={usesStrings ? 'Enter word…' : 'Enter number…'}
          className="input"
        />
        <div className="grid grid-cols-2 gap-2">
          <button type="submit" className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Insert
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Delete
          </button>
        </div>
      </form>

      {/* Search + Reset */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={handleSearch} className="btn btn-success">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
        <button onClick={handleReset} className="btn btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Reset
        </button>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className={`rounded-lg px-3 py-2 text-sm font-medium animate-fade-in-up ${
          searchResult.found
            ? 'bg-[rgba(16,185,129,0.1)] text-[var(--color-success)] border border-[rgba(16,185,129,0.2)]'
            : 'bg-[rgba(239,68,68,0.1)] text-[var(--color-danger)] border border-[rgba(239,68,68,0.2)]'
        }`}>
          {searchResult.found ? `✓ "${searchResult.value}" found` : `✗ "${searchResult.value}" not found`}
        </div>
      )}

      {/* Info Message */}
      {!isWasmLoaded && (
        <div className="p-3 rounded-lg bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] text-[11px] text-[var(--color-warning)] leading-relaxed">
          <strong>Note:</strong> WebAssembly is not loaded. Please compile the C++ algorithms to enable visualization.
        </div>
      )}


      {/* Status */}
      <div className="pt-2 border-t border-[var(--color-border-primary)]">
        <p className="text-[11px] text-[var(--color-text-muted)] font-mono truncate">
          {statusMessage}
        </p>
      </div>
    </div>
  );
}
