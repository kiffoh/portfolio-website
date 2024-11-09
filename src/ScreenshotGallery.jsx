import React, { useState } from 'react';

const ScreenshotGallery = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project?.screenshotPaths?.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main screenshot display */}
      <div className="relative w-full aspect-video">
        <img
          src={project.screenshotPaths[currentIndex].path}
          alt={project.screenshotPaths[currentIndex].alt}
          className="w-full h-full object-contain rounded-lg"
          draggable={false}
        />
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 items-center justify-center">
        {project.screenshotPaths.map((_, index) => (
          <button
            key={index}
            onClick={(event) => {
                event.stopPropagation()
                setCurrentIndex(index)
            }
        }
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`View screenshot ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={(event) => {
            event.stopPropagation();
            setCurrentIndex(prev => (prev - 1 + project.screenshotPaths.length) % project.screenshotPaths.length)
        }}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Previous screenshot"
        >
          Previous
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setCurrentIndex(prev => (prev + 1) % project.screenshotPaths.length)
          }}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Next screenshot"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScreenshotGallery;