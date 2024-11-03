import React, { useState } from 'react';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BiExpand } from "react-icons/bi";
import './App.css'

const EnhancedScreenshotViewer = ({ screenshots }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const previousImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="relative w-full">
      {/* Main Screenshot Container */}
      <div className={`relative overflow-hidden rounded-lg ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full'}`}>
        <div className="relative group">
          <img 
            src={screenshots[currentIndex].path}
            alt={screenshots[currentIndex].alt}
            className={`w-full h-auto object-contain ${isFullscreen ? 'max-h-screen' : 'max-h-96'}`}
            draggable={false}
          />
          
          {/* Navigation Controls */}
          <div className={`absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity ${isFullscreen ? 'bg-black/20' : ''}`}>
            {screenshots.length > 1 && (
              <>
                <button 
                  onClick={previousImage}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <BiLeftArrow size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <BiRightArrow size={24} />
                </button>
              </>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
          >
            <BiExpand size={24} />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        {screenshots.length > 1 && (
          <div className="flex justify-center gap-2 mt-2 p-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-blue-500 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedScreenshotViewer;