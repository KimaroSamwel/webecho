import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import { useProfile } from '../hooks/useProfile';

export default function Tasks() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    project: '',
    assignee: '',
  });
  const { profile } = useProfile();

  const canCreateTask = profile?.role !== 'employee';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        {canCreateTask && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Create Task
          </button>
        )}
      </div>

      <TaskFilters filters={filters} onChange={setFilters} />
      <TaskList filters={filters} />
      
      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}