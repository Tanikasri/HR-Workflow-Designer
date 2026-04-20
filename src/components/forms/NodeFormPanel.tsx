import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflowStore } from '../../store/workflowStore';
import { mockGetAutomations } from '../../mocks/api';

export default function NodeFormPanel() {
  const { nodes, selectedNodeId, updateNodeData, deleteNode } = useWorkflowStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const [actions, setActions] = useState<{id: string, name: string}[]>([]);

  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    if (selectedNode) {
      reset(selectedNode.data);
    }
  }, [selectedNode, reset]);

  useEffect(() => {
    mockGetAutomations().then(setActions);
  }, []);

  if (!selectedNode) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-gray-500 text-sm border-b border-dark-border text-center">
        Select a node on the canvas to view and edit its properties.
      </div>
    );
  }

  const onSubmit = (data: any) => {
    updateNodeData(selectedNode.id, data);
  };

  return (
    <div className="flex-1 overflow-y-auto border-b border-dark-border flex flex-col">
      <div className="p-4 border-b border-dark-border bg-dark-bg flex justify-between items-center sticky top-0 z-10">
        <h3 className="font-semibold text-accent">Edit {selectedNode.type}</h3>
        <button 
          onClick={() => deleteNode(selectedNode.id)}
          className="text-xs px-2 py-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
        >
          Delete Node
        </button>
      </div>

      <div className="p-4 flex-1">
        <form onChange={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
            <input 
              {...register('title')} 
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white" 
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <textarea 
              {...register('description')} 
              className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white h-20 resize-none" 
            />
          </div>

          {selectedNode.type === 'taskNode' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Assignee</label>
                <input 
                  {...register('assignee')} 
                  className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Due Date</label>
                <input 
                  type="date"
                  {...register('dueDate')} 
                  className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white style-color-scheme-dark" 
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </>
          )}

          {selectedNode.type === 'approvalNode' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Approver Role</label>
                <select 
                  {...register('approverRole')} 
                  className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white"
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="HR Admin">HR Admin</option>
                  <option value="Finance">Finance</option>
                  <option value="Director">Director</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Auto-Approve (Days)</label>
                <input 
                  type="number"
                  {...register('autoApproveDays')} 
                  className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white" 
                />
              </div>
            </>
          )}

          {selectedNode.type === 'automatedNode' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Action</label>
              <select 
                {...register('actionId')} 
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white"
              >
                <option value="">Select Action</option>
                {actions.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          )}

          {selectedNode.type === 'endNode' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">End Message</label>
              <input 
                {...register('endMessage')} 
                className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-sm focus:outline-none focus:border-accent text-white" 
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
