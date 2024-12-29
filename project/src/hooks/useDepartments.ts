import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Department } from '../types';

interface DepartmentWithCounts extends Department {
  member_count: number;
  project_count: number;
}

export function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentWithCounts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const { data, error } = await supabase
          .from('departments')
          .select(`
            *,
            profiles:profiles(count),
            projects:projects(count)
          `);

        if (error) throw error;

        setDepartments(
          data.map((dept) => ({
            ...dept,
            member_count: dept.profiles.count,
            project_count: dept.projects.count,
          }))
        );
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartments();
  }, []);

  return { departments, loading };
}