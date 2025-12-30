export const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


export const addNodeToWorkflow = (workflow, parentId, nodeType, branchIndex = null) => {
  const newNode = {
    id: generateId(),
    type: nodeType,
    label: nodeType === 'action' ? 'New Action' : nodeType === 'branch' ? 'Condition' : 'End',
    children: nodeType === 'branch' ? [[], []] : nodeType === 'end' ? null : []
  };

  const addNodeRecursive = (node) => {
    if (node.id === parentId) {
      if (node.type === 'branch' && branchIndex !== null) {
        return {
          ...node,
          children: node.children.map((branch, idx) =>
            idx === branchIndex ? [...branch, newNode] : branch
          )
        };
      } else if (node.type === 'action') {
        return { ...node, children: [...(node.children || []), newNode] };
      }
    }

    if (node.children) {
      if (node.type === 'branch') {
        return {
          ...node,
          children: node.children.map(branch =>
            branch.map(child => addNodeRecursive(child))
          )
        };
      } else {
        return {
          ...node,
          children: node.children.map(child => addNodeRecursive(child))
        };
      }
    }

    return node;
  };

  return addNodeRecursive(workflow);
};


export const deleteNodeFromWorkflow = (workflow, nodeId) => {
  const deleteNodeRecursive = (node) => {
    if (node.id === nodeId) {
      return node.children || [];
    }

    if (node.children) {
      if (node.type === 'branch') {
        const newChildren = node.children.map(branch =>
          branch.flatMap(child => deleteNodeRecursive(child))
        );
        return { ...node, children: newChildren };
      } else {
        const newChildren = node.children.flatMap(child =>
          deleteNodeRecursive(child)
        );
        return { ...node, children: newChildren };
      }
    }

    return node;
  };

  if (nodeId === workflow.id) return workflow; 
  return deleteNodeRecursive(workflow);
};


export const editNodeLabel = (workflow, nodeId, newLabel) => {
  const editNodeRecursive = (node) => {
    if (node.id === nodeId) {
      return { ...node, label: newLabel };
    }

    if (node.children) {
      if (node.type === 'branch') {
        return {
          ...node,
          children: node.children.map(branch =>
            branch.map(child => editNodeRecursive(child))
          )
        };
      } else {
        return {
          ...node,
          children: node.children.map(child => editNodeRecursive(child))
        };
      }
    }

    return node;
  };

  return editNodeRecursive(workflow);
};