import { useWorkflowStore } from '../../store/workflowStore';
import { NodeType } from '../../types/workflow.types';
import { TEMPLATES } from '../../constants/defaultWorkflows';
import { Play, CheckSquare, ShieldCheck, Cpu, SquareTerminal, Download, Upload, Trash2, Undo, Redo } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function Sidebar() {
  const { setNodes, setEdges, nodes, edges, undo, redo, historyIndex, history } = useWorkflowStore();

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const applyTemplate = (templateKey: string) => {
    const template = TEMPLATES[templateKey];
    if (template) {
      setNodes(template.nodes);
      setEdges(template.edges);
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "workflow.json");
    dlAnchorElem.click();
  };

  const clearCanvas = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      setNodes([]);
      setEdges([]);
    }
  };

  const PaletteItem = ({ type, icon, label, color }: { type: NodeType, icon: any, label: string, color: string }) => (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      className={`p-3 mb-3 border border-dark-border rounded-lg bg-dark-bg cursor-grab hover:border-${color} hover:bg-${color}/10 transition-colors flex items-center gap-3`}
    >
      <div className={`text-${color}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <aside className="w-64 border-r border-dark-border bg-dark-surface p-4 flex flex-col h-full z-10 shadow-xl overflow-y-auto">
      <div className="mb-6 flex justify-between items-center gap-2 border-b border-dark-border pb-4">
         <button onClick={undo} disabled={historyIndex === 0} className="p-1.5 hover:bg-dark-border rounded text-gray-400 disabled:opacity-30" title="Undo"><Undo size={16}/></button>
         <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1.5 hover:bg-dark-border rounded text-gray-400 disabled:opacity-30" title="Redo"><Redo size={16}/></button>
         <button onClick={exportJSON} className="p-1.5 hover:bg-dark-border rounded text-gray-400" title="Export JSON"><Download size={16}/></button>
         <button onClick={clearCanvas} className="p-1.5 hover:bg-red-500/20 text-red-400 rounded" title="Clear All"><Trash2 size={16}/></button>
      </div>

      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Node Palette</h2>
      <div className="mb-8">
        <PaletteItem type="startNode" icon={<Play size={18} />} label="Start Event" color="node-start" />
        <PaletteItem type="taskNode" icon={<CheckSquare size={18} />} label="Manual Task" color="node-task" />
        <PaletteItem type="approvalNode" icon={<ShieldCheck size={18} />} label="Approval Gate" color="node-approval" />
        <PaletteItem type="automatedNode" icon={<Cpu size={18} />} label="Automated Action" color="node-auto" />
        <PaletteItem type="endNode" icon={<SquareTerminal size={18} />} label="End Event" color="node-end" />
      </div>

      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Templates</h2>
      <div className="flex flex-col gap-2 mb-8">
        <button onClick={() => applyTemplate('onboarding')} className="text-left px-3 py-2 text-sm bg-dark-bg border border-dark-border rounded hover:border-accent hover:text-accent transition-colors">🚀 Employee Onboarding</button>
        <button onClick={() => applyTemplate('leaveApproval')} className="text-left px-3 py-2 text-sm bg-dark-bg border border-dark-border rounded hover:border-accent hover:text-accent transition-colors">✈️ Leave Approval</button>
        <button onClick={() => applyTemplate('docVerification')} className="text-left px-3 py-2 text-sm bg-dark-bg border border-dark-border rounded hover:border-accent hover:text-accent transition-colors">📄 Document Verification</button>
      </div>

      <div className="mt-auto pt-4 border-t border-dark-border">
        <div className="flex justify-between items-center text-xs text-gray-500">
           <span>Total Nodes: <strong className="text-gray-300">{nodes.length}</strong></span>
           <span>Edges: <strong className="text-gray-300">{edges.length}</strong></span>
        </div>
      </div>
    </aside>
  );
}
