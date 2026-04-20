export type NodeType = 'startNode' | 'taskNode' | 'approvalNode' | 'automatedNode' | 'endNode';

export interface WorkflowNodeData {
  title: string;
  type: NodeType;
  isValid?: boolean;
  // Common
  description?: string;
  // Start Node
  keyValues?: Record<string, string>;
  // Task Node
  assignee?: string;
  dueDate?: string;
  // Approval Node
  approverRole?: string;
  autoApproveDays?: number;
  // Automated Node
  actionId?: string;
  dynamicParams?: Record<string, string>;
  // End Node
  endMessage?: string;
  summaryToggle?: boolean;
  [key: string]: unknown;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}

export interface SimulationResult {
  steps: {
    nodeId: string;
    action: string;
    status: 'success' | 'error' | 'pending';
    details: string;
  }[];
}
