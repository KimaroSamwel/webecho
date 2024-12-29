import { useState, useEffect } from 'react';

// Define the type of data the hook will manage
interface TeamPerformanceData {
  teamName: string;
  performanceScore: number;
  members: Array<{
    name: string;
    score: number;
  }>;
}

// Custom Hook: useTeamPerformance
const useTeamPerformance = () => {
  const [performanceData, setPerformanceData] = useState<TeamPerformanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching data
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        // Simulate an API call
        const data: TeamPerformanceData = {
          teamName: 'Development Team',
          performanceScore: 85,
          members: [
            { name: 'Alice', score: 90 },
            { name: 'Bob', score: 80 },
            { name: 'Charlie', score: 85 },
          ],
        };
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPerformanceData(data);
      } catch (err) {
        setError('Failed to fetch team performance data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  return { performanceData, loading, error };
};

export default useTeamPerformance;
