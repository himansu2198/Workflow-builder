import React from 'react';
import { Undo, Redo, Save } from 'lucide-react';

function Toolbar({ onUndo, onRedo, onSave, canUndo, canRedo }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '28px', color: '#2c3e50' }}>Workflow Builder</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onUndo}
          disabled={!canUndo}
          style={{
            padding: '8px 16px',
            background: !canUndo ? '#e0e0e0' : '#3498db',
            color: !canUndo ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !canUndo ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <Undo size={16} /> Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          style={{
            padding: '8px 16px',
            background: !canRedo ? '#e0e0e0' : '#3498db',
            color: !canRedo ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !canRedo ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <Redo size={16} /> Redo
        </button>
        <button
          onClick={onSave}
          style={{
            padding: '8px 16px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );
}

export default Toolbar;