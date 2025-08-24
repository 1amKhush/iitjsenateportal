"use client";

import React, { useState } from 'react';
import SenateTree from '@/components/tree/SenateTree';
import TreeView from '@/components/tree/TreeView';
import SearchableTree from '@/components/tree/SearchableTree';
import SenateStats from '@/components/tree/SenateStats';
import { treeData } from '@/data/treeData';

interface TreeNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  parent?: string;
}

export default function TreePage() {
  const [viewMode, setViewMode] = useState<'flow' | 'hierarchical'>('hierarchical');
  const [selectedSearchNode, setSelectedSearchNode] = useState<TreeNodeData | null>(null);

  const handleSearchNodeSelect = (node: TreeNodeData) => {
    setSelectedSearchNode(node);
    // Auto-scroll to show the selected node info
    const element = document.getElementById('selected-node-info');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Student Senate Structure
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Explore the organizational hierarchy of IIT Jodhpur&apos;s Student Senate, 
          including the main councils, boards, clubs, and committees that govern student life.
        </p>
        
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <SearchableTree 
            data={treeData} 
            onNodeSelect={handleSearchNodeSelect}
          />
        </div>
        
        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('hierarchical')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'hierarchical'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tree View
            </button>
            <button
              onClick={() => setViewMode('flow')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'flow'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Flow Diagram
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <SenateStats data={treeData} />

      {/* Selected Search Node Info */}
      {selectedSearchNode && (
        <div id="selected-node-info" className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                Search Result: {selectedSearchNode.name}
              </h3>
              <p className="text-yellow-700">{selectedSearchNode.fullName}</p>
              <p className="text-sm text-yellow-600 mt-1">
                Current Holder: <span className="font-medium">{selectedSearchNode.holder}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedSearchNode(null)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {viewMode === 'hierarchical' ? (
          <TreeView data={treeData} />
        ) : (
          <SenateTree />
        )}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legend</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Main Councils (ACAC, SS, SAC)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-700">Boards</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-700">Committees</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-700">Clubs</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">How to Navigate:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Search:</strong> Type to find specific councils, boards, clubs, or position holders</li>
            <li>• <strong>Tree View:</strong> Click the arrows to expand/collapse branches, click nodes for details</li>
            <li>• <strong>Flow Diagram:</strong> Use mouse to pan and zoom, click nodes for information</li>
            <li>• Both views show the complete organizational structure with real-time interaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
