"use client";

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import TreeControls from './TreeControls';
import { treeData, getEdges } from '@/data/treeData';

const nodeTypes = {
  custom: CustomNode,
};

const SenateTree: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Convert our data to ReactFlow format
  const initialNodes: Node[] = [
    ...treeData.mainBodies.map(node => ({
      id: node.id,
      type: 'custom',
      position: node.position,
      data: { 
        ...node,
        onNodeClick: setSelectedNode,
        nodeType: node.type
      },
    })),
    ...treeData.boards.map(node => ({
      id: node.id,
      type: 'custom',
      position: node.position,
      data: { 
        ...node,
        onNodeClick: setSelectedNode,
        nodeType: node.type
      },
    })),
    ...treeData.clubs.map(node => ({
      id: node.id,
      type: 'custom',
      position: node.position,
      data: { 
        ...node,
        onNodeClick: setSelectedNode,
        nodeType: node.type
      },
    })),
  ];

  const initialEdges: Edge[] = getEdges();

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[800px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.4 }}
        minZoom={0.1}
        maxZoom={1.5}
        attributionPosition="top-right"
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
          minZoom: 0.3,
          maxZoom: 0.8,
        }}
      >
        <TreeControls />
        <Controls showInteractive={false} />
        <MiniMap 
          nodeStrokeColor="#374151"
          nodeColor="#9CA3AF"
          nodeBorderRadius={8}
          position="bottom-left"
        />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#E5E7EB" />
      </ReactFlow>

      {/* Node Details Modal */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-6 max-w-sm z-10 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedNode.data.name}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Full Name:</p>
              <p className="text-sm text-gray-800">{selectedNode.data.fullName}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Current Holder:</p>
              <p className="text-sm text-gray-800">{selectedNode.data.holder}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Type:</p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                selectedNode.data.nodeType === 'main' 
                  ? 'bg-blue-100 text-blue-800'
                  : selectedNode.data.nodeType === 'board'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {selectedNode.data.nodeType === 'main' ? 'Main Council' :
                 selectedNode.data.nodeType === 'board' ? 'Board' :
                 selectedNode.data.type === 'committee' ? 'Committee' : 'Club'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SenateTree;
