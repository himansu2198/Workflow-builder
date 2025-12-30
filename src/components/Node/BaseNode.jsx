import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import NodeMenu from '../Controls/NodeMenu';
import './Node.css';

function BaseNode({ node, onAddNode, onDeleteNode, onEditNode, isRoot }) {
  const [showMenu, setShowMenu] = useState(false);

  const getNodeColor = (type) => {
    switch (type) {
      case 'action': return '#3498db';
      case 'branch': return '#e67e22';
      case 'end': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const renderChildren = () => {
    if (node.type === 'branch' && node.children) {
      return (
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '120px',
          marginTop: '60px',
          position: 'relative'
        }}>
          {/* Simple connector lines container */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '0',
            right: '0',
            height: '60px',
            pointerEvents: 'none'
          }}>
            {/* Center line down from parent */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              width: '3px',
              height: '30px',
              background: '#95a5a6',
              marginLeft: '-1.5px'
            }}></div>
            
            {/* Horizontal connector line */}
            <div style={{
              position: 'absolute',
              left: '25%',
              right: '25%',
              top: '30px',
              height: '3px',
              background: '#95a5a6'
            }}></div>
            
            {/* Left line down to TRUE */}
            <div style={{
              position: 'absolute',
              left: '25%',
              top: '30px',
              width: '3px',
              height: '30px',
              background: '#95a5a6',
              marginLeft: '-1.5px'
            }}></div>
            
            {/* Right line down to FALSE */}
            <div style={{
              position: 'absolute',
              right: '25%',
              top: '30px',
              width: '3px',
              height: '30px',
              background: '#95a5a6',
              marginRight: '-1.5px'
            }}></div>
          </div>

          {/* TRUE and FALSE columns */}
          {node.children.map((branch, idx) => (
           <div 
           key={`${node.id}-branch-${idx}`}
           style={{ 
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           minWidth: '280px',
           flex: 1
         }}
    >

              {/* Branch Label */}
              <div style={{
                background: '#34495e',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 'bold',
                marginBottom: '40px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {idx === 0 ? 'TRUE' : 'FALSE'}
              </div>

              {/* Branch content */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px',
                width: '100%'
              }}>
                {branch.length === 0 ? (
                  <>
                    {/* Connector line to Add Step */}
                    <div style={{
                      width: '3px',
                      height: '20px',
                      background: '#95a5a6',
                      marginTop: '-40px',
                      marginBottom: '-20px'
                    }}></div>
                    
                    <button
                      onClick={() => setShowMenu(`${node.id}-${idx}`)}
                      style={{
                        padding: '12px 24px',
                        background: '#ecf0f1',
                        border: '2px dashed #95a5a6',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#7f8c8d',
                        fontWeight: '500'
                      }}
                    >
                      + Add Step
                    </button>
                  </>
                ) : (
                  <>
                    {/* Line from label to first child */}
                    <div style={{
                      width: '3px',
                      height: '20px',
                      background: '#95a5a6',
                      marginTop: '-40px',
                      marginBottom: '-20px'
                    }}></div>
                    
                    {branch.map((child, childIdx) => (
                      <div key={child.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Line between children */}
                        {childIdx > 0 && (
                          <div style={{
                            width: '3px',
                            height: '40px',
                            background: '#95a5a6',
                            marginTop: '-40px',
                            marginBottom: '0'
                          }}></div>
                        )}
                        <BaseNode
                          node={child}
                          onAddNode={onAddNode}
                          onDeleteNode={onDeleteNode}
                          onEditNode={onEditNode}
                          isRoot={false}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Adding Node Menu here */}
              {showMenu === `${node.id}-${idx}` && (
                <NodeMenu
                  onSelect={(type) => {
                    onAddNode(node.id, type, idx);
                    setShowMenu(false);
                  }}
                  onClose={() => setShowMenu(false)}
                />
              )}
            </div>
          ))}
        </div>
      );
    } else if (node.children && node.children.length > 0) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '40px',
          marginTop: '40px'
        }}>
          {node.children.map((child, index) => (
            <div key={child.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Simple connector line */}
              <div style={{
                width: '3px',
                height: '40px',
                background: '#95a5a6',
                marginBottom: '0'
              }}></div>
              <BaseNode
                node={child}
                onAddNode={onAddNode}
                onDeleteNode={onDeleteNode}
                onEditNode={onEditNode}
                isRoot={false}
              />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="workflow-node" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center'
    }}>
      {/* Node Card */}
      <div style={{
        background: 'white',
        border: `3px solid ${getNodeColor(node.type)}`,
        borderRadius: '12px',
        padding: '20px 30px',
        minWidth: '200px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        {/* Node Type Badge */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: getNodeColor(node.type),
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {node.type}
        </div>

        {/* Node Label */}
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#2c3e50',
          textAlign: 'center',
          marginBottom: '12px',
          marginTop: '8px'
        }}>
          {node.label}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {node.type === 'action' && (
            <>
              <button
                onClick={() => onAddNode(node.id, 'action')}
                style={{
                  padding: '6px 12px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                + Action
              </button>
              <button
                onClick={() => onAddNode(node.id, 'branch')}
                style={{
                  padding: '6px 12px',
                  background: '#e67e22',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                + Branch
              </button>
              <button
                onClick={() => onAddNode(node.id, 'end')}
                style={{
                  padding: '6px 12px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                + End
              </button>
            </>
          )}

          <button
            onClick={() => onEditNode(node)}
            style={{
              padding: '6px 12px',
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Edit2 size={12} /> Edit
          </button>

          {!isRoot && (
            <button
              onClick={() => onDeleteNode(node.id)}
              style={{
                padding: '6px 12px',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Trash2 size={12} /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      {renderChildren()}
    </div>
  );
}

export default BaseNode;