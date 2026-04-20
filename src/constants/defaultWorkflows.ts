import { Edge } from '@xyflow/react';

export const TEMPLATES: Record<string, { nodes: any[], edges: Edge[] }> = {
  onboarding: {
    nodes: [
      { id: '1', type: 'startNode', position: { x: 100, y: 100 }, data: { title: 'Employee Onboarding', type: 'startNode' } },
      { id: '2', type: 'taskNode', position: { x: 350, y: 100 }, data: { title: 'IT Setup', assignee: 'IT Dept', type: 'taskNode' } },
      { id: '3', type: 'endNode', position: { x: 600, y: 100 }, data: { title: 'Completion', endMessage: 'Onboarding Complete', type: 'endNode' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ]
  },
  leaveApproval: {
    nodes: [
      { id: '1', type: 'startNode', position: { x: 100, y: 100 }, data: { title: 'Leave Request', type: 'startNode' } },
      { id: '2', type: 'approvalNode', position: { x: 350, y: 100 }, data: { title: 'Manager Approval', approverRole: 'Manager', type: 'approvalNode' } },
      { id: '3', type: 'automatedNode', position: { x: 600, y: 100 }, data: { title: 'Update HRIS', actionId: 'act_3', type: 'automatedNode' } },
      { id: '4', type: 'endNode', position: { x: 850, y: 100 }, data: { title: 'Done', type: 'endNode' } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' }
    ]
  },
  docVerification: {
    nodes: [
      { id: '1', type: 'startNode', position: { x: 100, y: 100 }, data: { title: 'Submit Documents', type: 'startNode' } },
      { id: '2', type: 'automatedNode', position: { x: 350, y: 100 }, data: { title: 'Auto OCR Check', actionId: 'act_1', type: 'automatedNode' } },
      { id: '3', type: 'approvalNode', position: { x: 600, y: 100 }, data: { title: 'HR Review', approverRole: 'HR Admin', type: 'approvalNode' } },
      { id: '4', type: 'endNode', position: { x: 850, y: 100 }, data: { title: 'Verified', type: 'endNode' } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' }
    ]
  }
};
