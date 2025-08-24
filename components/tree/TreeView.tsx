"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  parent?: string;
}

interface TreeViewProps {
  data: {
    mainBodies: TreeNodeData[];
    boards: TreeNodeData[];
    clubs: TreeNodeData[];
  };
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['acac', 'ss', 'sac'])
  );

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getChildNodes = (parentId: string) => {
    const boards = data.boards.filter(board => board.parent === parentId);
    const clubs = data.clubs.filter(club => club.parent === parentId);
    return [...boards, ...clubs];
  };

  const getNodeColor = (type: string, nodeType?: string) => {
    if (type === 'main') return 'from-blue-500 to-blue-700';
    if (type === 'board') return 'from-green-500 to-green-700';
    if (nodeType === 'committee') return 'from-orange-500 to-orange-700';
    return 'from-purple-500 to-purple-700';
  };

  const NodeComponent: React.FC<{ 
    node: TreeNodeData; 
    level: number;
  }> = ({ node, level }) => {
    const hasChildren = getChildNodes(node.id).length > 0;
    const children = getChildNodes(node.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: level * 0.1 }}
        className="relative"
      >
        <div className="flex items-center mb-4">
          {/* Connection Line */}
          {level > 0 && (
            <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-b-2 border-gray-300 rounded-bl-lg -translate-x-6 -translate-y-6"></div>
          )}
          
          {/* Node */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative cursor-pointer px-6 py-4 rounded-xl shadow-lg
              bg-gradient-to-r ${getNodeColor(node.type, node.type)}
              text-white min-w-[200px] max-w-[280px]
              ${selectedNode?.id === node.id ? 'ring-4 ring-yellow-400 ring-opacity-60' : ''}
            `}
            onClick={() => setSelectedNode(node)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{node.name}</h3>
                <p className="text-sm opacity-90 leading-tight">{node.holder}</p>
              </div>
              
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNode(node.id);
                  }}
                  className="ml-3 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <motion.svg
                    animate={{ rotate: expandedNodes.has(node.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && expandedNodes.has(node.id) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-8 pl-8 border-l-2 border-gray-200"
            >
              {children.map((child) => (
                <NodeComponent
                  key={child.id}
                  node={child}
                  level={level + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      {/* Tree View */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-8">
          {data.mainBodies.map((mainBody) => (
            <NodeComponent
              key={mainBody.id}
              node={mainBody}
              level={0}
            />
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="lg:w-80">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedNode.name}
                </h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Full Name:</p>
                  <p className="text-gray-800">{selectedNode.fullName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Current Holder:</p>
                  <p className="text-gray-800 font-medium">{selectedNode.holder}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Type:</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedNode.type === 'main' 
                      ? 'bg-blue-100 text-blue-800'
                      : selectedNode.type === 'board'
                      ? 'bg-green-100 text-green-800'
                      : selectedNode.type === 'committee'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedNode.type === 'main' ? 'Main Council' :
                     selectedNode.type === 'board' ? 'Board' :
                     selectedNode.type === 'committee' ? 'Committee' : 'Club'}
                  </span>
                </div>

                {selectedNode.parent && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Reports To:</p>
                    <p className="text-gray-800">
                      {data.mainBodies.find(m => m.id === selectedNode.parent)?.name ||
                       data.boards.find(b => b.id === selectedNode.parent)?.name ||
                       'N/A'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-xl p-6 text-center text-gray-500"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Click on any node to view details</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TreeView;
