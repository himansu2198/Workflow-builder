import React, { useState } from "react";
import { useWorkflowState } from "../../hooks/useWorkflowState";
import BaseNode from "../Node/BaseNode";
import EditModal from "../Controls/EditModal";
import Toolbar from "../Controls/Toolbar";
import "./WorkflowCanvas.css";

function WorkflowCanvas() {
  const {
    workflow,
    addNode,
    deleteNode,
    editNode,
    undo,
    redo,
    saveWorkflow,
    canUndo,
    canRedo,
  } = useWorkflowState();

  const [editingNode, setEditingNode] = useState(null);

  const handleEditNode = (node) => {
    setEditingNode(node);
  };

  const handleSaveEdit = (newLabel) => {
    if (editingNode) {
      editNode(editingNode.id, newLabel);
      setEditingNode(null);
    }
  };

  return (
    <div className="workflow-canvas">
      <Toolbar
        onUndo={undo}
        onRedo={redo}
        onSave={saveWorkflow}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <div className="workflow-canvas-inner">
        <BaseNode
          node={workflow}
          onAddNode={addNode}
          onDeleteNode={deleteNode}
          onEditNode={handleEditNode}
          isRoot={true}
        />
      </div>

      {editingNode && (
        <EditModal
          node={editingNode}
          onSave={handleSaveEdit}
          onClose={() => setEditingNode(null)}
        />
      )}
    </div>
  );
}

export default WorkflowCanvas;

