import React from "react";

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const FilterButton = ({ children, isActive, onClick }: Props) => {
  return (
    <button
      className={`flex items-center gap-2 px-2 py-1 rounded-full shadow transition-all duration-200 !text-sm ${
        isActive
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
};

export default FilterButton;
