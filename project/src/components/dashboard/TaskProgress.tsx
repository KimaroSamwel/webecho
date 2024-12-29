import { useState, useEffect } from 'react';

// Define the type of data the hook will manage
interface TaskProgressData {
  taskId: string;
  taskName: string;
  status: string;
  progress: number; // percentage
}

// Custom Hook: useTaskProgress
const useTaskProgress = (taskId: string) => {
  const [taskData, setTaskData] = useState<TaskProgressData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching data
    const fetchTaskProgress = async () => {
      try {
        setLoading(true);
        // Simulate an API call
        const data: TaskProgressData = {
          taskId,
          taskName: 'Design Homepage',
          status: 'In Progress',
          progress: 45,
        };
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTaskData(data);
      } catch (err) {
        setError('Failed to fetch task progress data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaskProgress();
  }, [taskId]);

  return { taskData, loading, error };
};

export default useTaskProgress;