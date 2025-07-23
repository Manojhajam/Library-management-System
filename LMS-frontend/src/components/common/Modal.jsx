import React from "react";
import Card from "./Card";
import { FiX } from "react-icons/fi";

const Modal = ({ children, open, onClose, title = "" }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 w-full h-screen bg-gray-500/30 backdrop-blur-[1px] flex justify-center  overflow-y-auto p-4">
          <Card customClass="m-auto w-[600px] !p-0 bg-white shadow animate-bounce-short">
            {/* Tille */}
            <div className="flex justify-between items-center mx-4 py-4 border-b border-gray-300">
              <h4 className="text-lg font-bold">{title || "Modal"}</h4>
              <button
                onClick={onClose}
                className="hover:text-red-400 p-1 hover:bg-red-100 rounded-lg cursor-pointer transition-all duration-300"
              >
                <FiX size={20} />
              </button>
            </div>
            {/* content */}
            <div className="px-4 py-4">{children}</div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;