import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Task, TaskFilters } from '../types';

export function useTasks(filters: TaskFilters, limit?: number) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        let query = supabase
          .from('tasks')
          .select('*, assigned_to:profiles(full_name), department:departments(name)')
          .order('created_at', { ascending: false });

        if (filters.status) query = query.eq('status', filters.status);
        if (filters.priority) query = query.eq('priority', filters.priority);
        if (filters.department) query = query.eq('department_id', filters.department);
        if (filters.assignee) query = query.eq('assigned_to', filters.assignee);
        if (limit) query = query.limit(limit);

        const { data, error } = await query;

        if (error) throw error;
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [filters, limit]);

  return { tasks, loading };
}