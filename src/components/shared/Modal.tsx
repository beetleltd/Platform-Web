import React from "react";
import Portal from "../Portal";
import { BiX } from "react-icons/bi";

type TModal = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: TModal) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="backdrop-blur-sm fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl border border-gray-300 py-6 px-10 max-w-2xl w-full relative max-h-[700px] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <BiX size={35} color="black" />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
