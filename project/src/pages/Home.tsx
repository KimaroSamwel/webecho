import React from 'react';
import { Building2, Users, FolderKanban, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useStats } from '../hooks/useStats';

export default function Home() {
  const { stats, loading } = useStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Echo Heights 3D</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Departments"
          value={loading ? '...' : stats.departments}
          icon={<Building2 className="w-6 h-6" />}
          to="/departments"
        />
        <StatCard
          title="Team Members"
          value={loading ? '...' : stats.employees}
          icon={<Users className="w-6 h-6" />}
          to="/departments"
        />
        <StatCard
          title="Active Projects"
          value={loading ? '...' : stats.activeProjects}
          icon={<FolderKanban className="w-6 h-6" />}
          to="/projects"
        />
        <StatCard
          title="Tasks"
          value={loading ? '...' : stats.tasks}
          icon={<CheckSquare className="w-6 h-6" />}
          to="/tasks"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          {/* ProjectList component will be implemented separately */}
          <ProjectList limit={5} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          {/* TaskList component will be implemented separately */}
          <TaskList limit={5} />
        </div>
      </div>
    </div>
  );
}