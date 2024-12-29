import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectList from '../components/projects/ProjectList';
import ProjectFilters from '../components/projects/ProjectFilters';
import CreateProjectModal from '../components/projects/CreateProjectModal';
import { useProfile } from '../hooks/useProfile';

export default function Projects() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    department: '',
  });
  const { profile } = useProfile();

  const canCreateProject = profile?.role !== 'employee';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        {canCreateProject && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Create Project
          </button>
        )}
      </div>

      <ProjectFilters filters={filters} onChange={setFilters} />
      <ProjectList filters={filters} />
      
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}