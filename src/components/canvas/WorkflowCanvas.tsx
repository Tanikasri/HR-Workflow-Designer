import { useCallback, useRef } from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { useWorkflowStore } from '../../store/workflowStore';
import { nodeTypes } from '../nodes/CustomNodes';
import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '../../types/workflow.types';

export default function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNode } = useWorkflowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowWrapper.current) return;
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Calculate drop position
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { title: 'New ' + type.replace('Node', ''), type },
      };

      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        className="bg-[#0f1117]"
      >
        <Background color="#2a3245" gap={24} size={2} />
        <Controls className="fill-white bg-dark-surface border border-dark-border [&>button]:border-dark-border [&>button]:bg-dark-surface [&>button]:text-white [&>button:hover]:bg-dark-border [&>button>path]:fill-white" />
        <MiniMap 
          nodeColor={(n) => {
            switch(n.type) {
              case 'startNode': return '#22c55e';
              case 'taskNode': return '#3b82f6';
              case 'approvalNode': return '#a855f7';
              case 'automatedNode': return '#f97316';
              case 'endNode': return '#6b7280';
              default: return '#eee';
            }
          }}
          maskColor="rgb(15, 17, 23, 0.7)"
          className="bg-dark-surface border border-dark-border rounded-lg"
        />
      </ReactFlow>
    </div>
  );
}
