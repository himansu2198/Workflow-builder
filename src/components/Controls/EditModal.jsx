import React, { useState } from 'react';

function EditModal({ node, onSave, onClose }) {
  const [label, setLabel] = useState(node.label);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        minWidth: '400px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Edit Node Label</h3>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
          autoFocus
        />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: '#ecf0f1',
              color: '#2c3e50',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(label)}
            style={{
              padding: '8px 16px',
              background: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;