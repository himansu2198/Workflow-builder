export const NODE_TYPES = {
  ACTION: "ACTION",
  BRANCH: "BRANCH",
  END: "END",
};

export const initialWorkflow = {
  rootId: "start",
  nodes: {
    start: {
      id: "start",
      type: NODE_TYPES.ACTION,
      label: "Start",
      children: [],
    },
  },
};
