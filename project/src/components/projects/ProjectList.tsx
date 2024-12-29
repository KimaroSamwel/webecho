import React from 'react';
import { Calendar, Users, BarChart } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import type { ProjectFilters } from '../../types';

interface ProjectListProps {
  filters: ProjectFilters;
  limit?: number;
}

export default function ProjectList({ filters, limit }: ProjectListProps) {
  const { projects, loading } = useProjects(filters, limit);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">{project.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              project.status === 'active' ? 'bg-green-100 text-green-800' :
              project.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800' :
              project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {project.status}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.end_date || '').toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{project.member_count} members</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              <span>{project.progress}% complete</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}