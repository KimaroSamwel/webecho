import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Project, ProjectFilters } from '../types';

export function useProjects(filters: ProjectFilters, limit?: number) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = supabase
          .from('projects')
          .select(`
            *,
            department:departments(name),
            members:project_members(count)
          `)
          .order('created_at', { ascending: false });

        if (filters.status) query = query.eq('status', filters.status);
        if (filters.department) query = query.eq('department_id', filters.department);
        if (limit) query = query.limit(limit);

        const { data, error } = await query;

        if (error) throw error;
        setProjects(data.map(project => ({
          ...project,
          member_count: project.members.count,
          progress: calculateProgress(project)
        })));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [filters, limit]);

  return { projects, loading };
}

function calculateProgress(project: any): number {
  // Calculate progress based on completed tasks vs total tasks
  const totalTasks = project.total_tasks || 0;
  const completedTasks = project.completed_tasks || 0;
  return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
}