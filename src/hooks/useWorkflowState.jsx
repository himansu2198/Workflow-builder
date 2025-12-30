import { useState, useCallback } from 'react';
import { addNodeToWorkflow, deleteNodeFromWorkflow, editNodeLabel } from '../utils/workflowHelpers';

const initialWorkflow = {
  id: 'start-1',
  type: 'action',
  label: 'Start',
  children: []
};

export const useWorkflowState = () => {
  const [workflow, setWorkflow] = useState(initialWorkflow);
  const [history, setHistory] = useState([initialWorkflow]);
  const [historyIndex, setHistoryIndex] = useState(0);

  
  const saveToHistory = useCallback((newWorkflow) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newWorkflow);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setWorkflow(newWorkflow);
  }, [history, historyIndex]);

  
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setWorkflow(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setWorkflow(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  
  const addNode = useCallback((parentId, nodeType, branchIndex = null) => {
    const newWorkflow = addNodeToWorkflow(workflow, parentId, nodeType, branchIndex);
    saveToHistory(newWorkflow);
  }, [workflow, saveToHistory]);

  
  const deleteNode = useCallback((nodeId) => {
    const newWorkflow = deleteNodeFromWorkflow(workflow, nodeId);
    saveToHistory(newWorkflow);
  }, [workflow, saveToHistory]);

  
  const editNode = useCallback((nodeId, newLabel) => {
    const newWorkflow = editNodeLabel(workflow, nodeId, newLabel);
    saveToHistory(newWorkflow);
  }, [workflow, saveToHistory]);

  
  const saveWorkflow = useCallback(() => {
    console.log('Workflow Structure:', JSON.stringify(workflow, null, 2));
    alert('Workflow saved to console! (Check browser console)');
  }, [workflow]);

  return {
    workflow,
    addNode,
    deleteNode,
    editNode,
    undo,
    redo,
    saveWorkflow,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};