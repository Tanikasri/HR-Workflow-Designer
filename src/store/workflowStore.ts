import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { WorkflowNode, WorkflowNodeData } from '../types/workflow.types';
import { v4 as uuidv4 } from 'uuid';

interface HistoryState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

interface WorkflowState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  history: HistoryState[];
  historyIndex: number;
  
  onNodesChange: OnNodesChange<Node<WorkflowNodeData>>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  
  setNodes: (nodes: Node<WorkflowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  history: [{ nodes: [], edges: [] }],
  historyIndex: 0,

  onNodesChange: (changes: NodeChange<Node<WorkflowNodeData>>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, id: uuidv4() }, get().edges),
    });
    get().pushHistory();
  },
  
  setNodes: (nodes) => {
    set({ nodes });
    get().pushHistory();
  },
  
  setEdges: (edges) => {
    set({ edges });
    get().pushHistory();
  },
  
  addNode: (node) => {
    set({ nodes: [...get().nodes, node as Node<WorkflowNodeData>] });
    get().pushHistory();
  },
  
  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
    get().pushHistory();
  },
  
  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
    get().pushHistory();
  },
  
  setSelectedNode: (id) => set({ selectedNodeId: id }),

  pushHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes, edges });
    
    // Keep max 50 states
    if (newHistory.length > 50) newHistory.shift();
    
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },
  
  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const { nodes, edges } = history[historyIndex - 1];
      set({ nodes, edges, historyIndex: historyIndex - 1 });
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const { nodes, edges } = history[historyIndex + 1];
      set({ nodes, edges, historyIndex: historyIndex + 1 });
    }
  },
}));
