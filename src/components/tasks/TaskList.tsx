import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import type { TaskFilters } from '../../types';

interface TaskListProps {
  filters: TaskFilters;
  limit?: number;
}

export default function TaskList({ filters, limit }: TaskListProps) {
  const { tasks, loading } = useTasks(filters, limit);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{task.title}</h3>
            <span className={`px-2 py-1 rounded text-xs ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</span>
            </div>
            <span className={`flex items-center gap-1 ${
              task.status === 'completed' ? 'text-green-600' :
              task.status === 'in_progress' ? 'text-blue-600' :
              'text-gray-600'
            }`}>
              <AlertCircle className="w-4 h-4" />
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}