import { useState, useEffect } from 'react';

// Define the type of data the hook will manage
interface ProjectOverviewData {
  projectId: string;
  projectName: string;
  status: string;
  deadline: string;
  progress: number; // percentage
}

// Custom Hook: useProjectOverview
const useProjectOverview = (projectId: string) => {
  const [overviewData, setOverviewData] = useState<ProjectOverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching data
    const fetchProjectOverview = async () => {
      try {
        setLoading(true);
        // Simulate an API call
        const data: ProjectOverviewData = {
          projectId,
          projectName: 'New Website Redesign',
          status: 'In Progress',
          deadline: '2024-01-31',
          progress: 65,
        };
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOverviewData(data);
      } catch (err) {
        setError('Failed to fetch project overview data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectOverview();
  }, [projectId]);

  return { overviewData, loading, error };
};

export default useProjectOverview;