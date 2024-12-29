import React, { useState } from 'react';

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (departmentName: string) => void;
}

const CreateDepartmentModal: React.FC<CreateDepartmentModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [departmentName, setDepartmentName] = useState('');

  const handleCreate = () => {
    if (departmentName.trim()) {
      onCreate(departmentName);
      setDepartmentName(''); // Clear input field
      onClose(); // Close modal
    } else {
      alert('Please enter a valid department name.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Department</h2>
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Enter department name"
          className="input-field"
        />
        <div className="modal-actions">
          <button onClick={handleCreate} className="btn btn-primary">
            Create
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartmentModal;
