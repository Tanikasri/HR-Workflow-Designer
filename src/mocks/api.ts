import { SimulationResult } from '../types/workflow.types';
import { getTopologicalSort } from '../utils/graphUtils';

export const mockGetAutomations = async () => {
  return [
    { id: 'act_1', name: 'Send Email' },
    { id: 'act_2', name: 'Create Jira Ticket' },
    { id: 'act_3', name: 'Update HRIS' },
    { id: 'act_4', name: 'Notify Slack Channel' },
  ];
};

export const mockSimulateWorkflow = async (nodes: any[], edges: any[]): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedIds = getTopologicalSort(nodes, edges);
      const steps = sortedIds.map(id => {
        const node = nodes.find(n => n.id === id);
        return {
          nodeId: id,
          action: node?.data.title || 'Unknown',
          status: 'success' as const,
          details: `Executed ${node?.type} successfully`,
        };
      });
      resolve({ steps });
    }, 1500); // simulate network delay
  });
};
