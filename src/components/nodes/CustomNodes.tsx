import { Handle, Position } from '@xyflow/react';
import { Play, CheckSquare, ShieldCheck, Cpu, SquareTerminal } from 'lucide-react';

// Common wrapper for nodes
const NodeWrapper = ({ title, icon, colorClass, selected, children }: any) => (
  <div className={`p-4 min-w-[200px] bg-dark-surface border-2 rounded-xl shadow-xl transition-all duration-200 ${selected ? 'border-accent shadow-accent/20' : 'border-dark-border'}`}>
    <div className="flex items-center gap-3 mb-2 pb-2 border-b border-dark-border/50">
      <div className={`p-1.5 rounded-lg ${colorClass}`}>
        {icon}
      </div>
      <div className="font-semibold text-sm text-gray-100">{title}</div>
    </div>
    <div className="text-xs text-gray-400">
      {children}
    </div>
  </div>
);

export const StartNode = ({ data, selected }: any) => {
  return (
    <>
      <NodeWrapper title={data.title || 'Start Node'} icon={<Play size={16} />} colorClass="bg-node-start/20 text-node-start" selected={selected}>
        Initial trigger
      </NodeWrapper>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export const TaskNode = ({ data, selected }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeWrapper title={data.title || 'Task Node'} icon={<CheckSquare size={16} />} colorClass="bg-node-task/20 text-node-task" selected={selected}>
        <div>Assignee: <span className="text-gray-200">{data.assignee || 'Unassigned'}</span></div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export const ApprovalNode = ({ data, selected }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeWrapper title={data.title || 'Approval Node'} icon={<ShieldCheck size={16} />} colorClass="bg-node-approval/20 text-node-approval" selected={selected}>
        <div>Approver: <span className="text-gray-200">{data.approverRole || 'Unassigned'}</span></div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export const AutomatedNode = ({ data, selected }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeWrapper title={data.title || 'Automated Node'} icon={<Cpu size={16} />} colorClass="bg-node-auto/20 text-node-auto" selected={selected}>
        <div>Action: <span className="text-gray-200">{data.actionId ? `act_${data.actionId}` : 'None'}</span></div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export const EndNode = ({ data, selected }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeWrapper title={data.title || 'End Node'} icon={<SquareTerminal size={16} />} colorClass="bg-node-end/20 text-node-end" selected={selected}>
        <div>Message: <span className="text-gray-200">{data.endMessage || 'End'}</span></div>
      </NodeWrapper>
    </>
  );
};

export const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};
