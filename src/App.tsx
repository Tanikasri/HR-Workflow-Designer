import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import Sidebar from './components/sidebar/Sidebar';
import SandboxPanel from './components/sandbox/SandboxPanel';
import NodeFormPanel from './components/forms/NodeFormPanel';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-dark-bg text-gray-200 font-sans">
      <Sidebar />
      <div className="flex-1 relative flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-dark-border flex items-center px-6 justify-between bg-dark-surface shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center font-bold text-white shadow-lg">
              HR
            </div>
            <h1 className="font-semibold text-lg tracking-wide">Workflow Designer</h1>
          </div>
          <div className="text-sm text-gray-400">
            Drag nodes to build • Select to edit
          </div>
        </header>

        {/* Main Canvas Area */}
        <main className="flex-1 relative w-full h-full">
          <WorkflowCanvas />
        </main>
      </div>

      {/* Right Panels */}
      <div className="w-80 flex flex-col border-l border-dark-border bg-dark-surface z-10 shadow-xl">
        <NodeFormPanel />
        <SandboxPanel />
      </div>
    </div>
  );
}

export default App;
