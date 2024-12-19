import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-2 animate-pulse">
      <div className="bg-gray-300 h-40 w-full rounded mb-2"></div>
      <div className="bg-gray-300 h-4 w-3/4 rounded mb-1"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
