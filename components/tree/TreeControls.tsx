"use client";

import React from 'react';
import { useReactFlow } from 'reactflow';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

const TreeControls: React.FC = () => {
  const { fitView, zoomIn, zoomOut, setViewport } = useReactFlow();

  const resetView = () => {
    setViewport({ x: 0, y: 0, zoom: 0.4 }, { duration: 800 });
  };

  const fitToScreen = () => {
    fitView({ 
      padding: 0.2, 
      duration: 800,
      minZoom: 0.3,
      maxZoom: 0.8,
    });
  };

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
      <button
        onClick={fitToScreen}
        className="p-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition-colors"
        title="Fit to screen"
      >
        <RotateCcw className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={() => zoomIn({ duration: 200 })}
        className="p-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition-colors"
        title="Zoom in"
      >
        <ZoomIn className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={() => zoomOut({ duration: 200 })}
        className="p-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition-colors"
        title="Zoom out"
      >
        <ZoomOut className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={resetView}
        className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors text-xs font-medium"
        title="Reset to default view"
      >
        Reset
      </button>
    </div>
  );
};

export default TreeControls;
