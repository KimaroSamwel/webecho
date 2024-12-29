import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Modal from '../Modal';
import { useProfile } from '../../hooks/useProfile';
import { useDepartments } from '../../hooks/useDepartments';
import { useProjects } from '../../hooks/useProjects';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const { profile } = useProfile();
  const { departments } = useDepartments();
  const { projects } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    department_id: '',
    project_id: '',
    assigned_to: '',
    due_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('tasks').insert({
        ...formData,
        assigned_by: profile?.id,
      });
      if (error) throw error;
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        {/* Add other form fields for description, status, priority, etc. */}
        
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
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
}