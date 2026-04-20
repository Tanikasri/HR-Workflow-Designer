export const validateGraph = (nodes: any[], edges: any[]) => {
  const errors: string[] = [];
  
  // 1. Must have exactly one start node
  const startNodes = nodes.filter(n => n.type === 'startNode');
  if (startNodes.length === 0) {
    errors.push('Workflow must have a Start Node.');
  } else if (startNodes.length > 1) {
    errors.push('Workflow can only have one Start Node.');
  }
  
  // 2. Check for isolated nodes (no incoming and no outgoing edges, except single start node)
  nodes.forEach(node => {
    const hasIncoming = edges.some(e => e.target === node.id);
    const hasOutgoing = edges.some(e => e.source === node.id);
    
    if (!hasIncoming && !hasOutgoing) {
      errors.push(`Node '${node.data.title}' is isolated.`);
    } else if (node.type !== 'startNode' && !hasIncoming) {
      errors.push(`Node '${node.data.title}' has no incoming connections.`);
    }
  });

  return errors;
};

export const getTopologicalSort = (nodes: any[], edges: any[]) => {
  // Simple topological sort for tree-like simulation
  const graph = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  
  nodes.forEach(n => {
    graph.set(n.id, []);
    inDegree.set(n.id, 0);
  });
  
  edges.forEach(e => {
    graph.get(e.source)?.push(e.target);
    inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
  });
  
  const queue: string[] = [];
  const result: string[] = [];
  
  inDegree.forEach((degree, id) => {
    if (degree === 0) queue.push(id);
  });
  
  while (queue.length) {
    const currentId = queue.shift()!;
    result.push(currentId);
    
    graph.get(currentId)?.forEach(targetId => {
      inDegree.set(targetId, (inDegree.get(targetId)! - 1));
      if (inDegree.get(targetId) === 0) {
        queue.push(targetId);
      }
    });
  }
  
  return result;
};
