"use client";

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  nodeType: string;
  onNodeClick: (node: NodeProps<CustomNodeData>) => void;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data, ...nodeProps }) => {
  const handleClick = () => {
    data.onNodeClick({ data, ...nodeProps });
  };

  const getNodeStyles = () => {
    switch (data.nodeType) {
      case 'main':
        return {
          background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
          border: '2px solid #1E40AF',
          color: 'white',
          minWidth: '220px',
          minHeight: '90px',
          fontSize: '14px',
        };
      case 'board':
        return {
          background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
          border: '2px solid #047857',
          color: 'white',
          minWidth: '180px',
          minHeight: '80px',
          fontSize: '13px',
        };
      default: // club or committee
        return {
          background: data.type === 'committee'
            ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
            : 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
          border: data.type === 'committee' ? '2px solid #D97706' : '2px solid #6D28D9',
          color: 'white',
          minWidth: '160px',
          minHeight: '70px',
          fontSize: '12px',
        };
    }
  };

  const styles = getNodeStyles();

  return (
    <div
      className="px-4 py-3 shadow-lg rounded-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105"
      style={styles}
      onClick={handleClick}
    >
      {/* Input handle for connections from above */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-white !border-2 !border-gray-300 opacity-0 hover:opacity-100 transition-opacity"
      />

      <div className="text-center">
        <h3 className="font-bold mb-1 leading-tight" style={{ fontSize: styles.fontSize }}>
          {data.name}
        </h3>
        <p className="opacity-90 leading-tight" style={{ fontSize: `calc(${styles.fontSize} - 2px)` }}>
          {data.holder}
        </p>
      </div>

      {/* Output handle for connections to below */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-white !border-2 !border-gray-300 opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default CustomNode;