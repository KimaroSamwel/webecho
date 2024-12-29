import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Stats {
  departments: number;
  employees: number;
  activeProjects: number;
  tasks: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    departments: 0,
    employees: 0,
    activeProjects: 0,
    tasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: departments },
          { count: employees },
          { count: activeProjects },
          { count: tasks },
        ] = await Promise.all([
          supabase.from('departments').select('*', { count: 'exact' }),
          supabase.from('profiles').select('*', { count: 'exact' }),
          supabase
            .from('projects')
            .select('*', { count: 'exact' })
            .eq('status', 'active'),
          supabase.from('tasks').select('*', { count: 'exact' }),
        ]);

        setStats({
          departments: departments || 0,
          employees: employees || 0,
          activeProjects: activeProjects || 0,
          tasks: tasks || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}