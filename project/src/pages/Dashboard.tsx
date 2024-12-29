import React from 'react';
import { useProfile } from '../hooks/useProfile';
import TaskProgress from '../components/dashboard/TaskProgress';
import ProjectOverview from '../components/dashboard/ProjectOverview';
import TeamPerformance from '../components/dashboard/TeamPerformance';

export default function Dashboard() {
  const { profile } = useProfile();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskProgress />
        <ProjectOverview />
        {profile?.role !== 'employee' && <TeamPerformance />}
      </div>
    </div>
  );
}