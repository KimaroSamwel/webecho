import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Modal from '../Modal';
import { useProfile } from '../../hooks/useProfile';
import { useDepartments } from '../../hooks/useDepartments';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { profile } = useProfile();
  const { departments } = useDepartments();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    department_id: '',
    start_date: '',
    end_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('projects').insert(formData);
      if (error) throw error;
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        {/* Add other form fields for description, status, department, dates */}
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  );
}