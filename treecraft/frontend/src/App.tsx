import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ControlPanel from './components/ControlPanel';
import TreeCanvas from './components/TreeCanvas';
import NodeView from './components/NodeView';
import { initializeWasm } from './wasm/wasmAPI';

// ============================================================
// App — Main Layout
// ============================================================

export default function App() {
  // Initialize WASM on mount
  useEffect(() => {
    initializeWasm();
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 min-w-0">
        {/* Visualization Area */}
        <TreeCanvas />

        {/* Right Panel */}
        <div className="w-72 min-w-[288px] h-full flex flex-col gap-3 p-3 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border-primary)] overflow-y-auto">
          <ControlPanel />
          <NodeView />
        </div>
      </div>
    </div>
  );
}
