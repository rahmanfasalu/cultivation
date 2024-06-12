import React from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Add Team Member</h2>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AddUserModal;
