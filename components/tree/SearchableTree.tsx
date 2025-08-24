"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface TreeNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  parent?: string;
}

interface SearchableTreeProps {
  data: {
    mainBodies: TreeNodeData[];
    boards: TreeNodeData[];
    clubs: TreeNodeData[];
  };
  onNodeSelect: (node: TreeNodeData) => void;
}

const SearchableTree: React.FC<SearchableTreeProps> = ({ data, onNodeSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const allNodes = useMemo(() => {
    return [...data.mainBodies, ...data.boards, ...data.clubs];
  }, [data]);

  const filteredNodes = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    return allNodes.filter(node =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.holder.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8); // Limit to 8 results
  }, [searchTerm, allNodes]);

  const getNodeTypeLabel = (node: TreeNodeData) => {
    if (node.type === 'main') return 'Main Council';
    if (node.type === 'board') return 'Board';
    if (node.type === 'committee') return 'Committee';
    return 'Club';
  };

  const getNodeTypeColor = (node: TreeNodeData) => {
    if (node.type === 'main') return 'bg-blue-100 text-blue-800';
    if (node.type === 'board') return 'bg-green-100 text-green-800';
    if (node.type === 'committee') return 'bg-orange-100 text-orange-800';
    return 'bg-purple-100 text-purple-800';
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search councils, boards, clubs, or holders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isSearchFocused && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {filteredNodes.length > 0 ? (
              <div className="py-2">
                {filteredNodes.map((node) => (
                  <motion.button
                    key={node.id}
                    onClick={() => {
                      onNodeSelect(node);
                      clearSearch();
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{node.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{node.fullName}</p>
                        <p className="text-xs text-gray-500 mt-1">Held by: {node.holder}</p>
                      </div>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getNodeTypeColor(node)}`}>
                        {getNodeTypeLabel(node)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No results found for &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close search when clicking outside */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSearchFocused(false)}
        />
      )}
    </div>
  );
};

export default SearchableTree;
