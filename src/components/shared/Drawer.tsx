import React from "react";
import { BiX } from "react-icons/bi";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } bg-white shadow-lg overflow-auto`}
      aria-hidden={!isOpen}
    >
      {/* Close Icon */}
      <button
        onClick={onClose}
        aria-label="Close drawer"
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
      >
        <BiX />
      </button>

      {/* Drawer Content */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Drawer;
