import { motion } from 'framer-motion';
import { StatsGrid } from '../progress/stats-grid';
import { WeeklyGoals } from '../progress/weekly-goals';
import { WorkoutLibrary } from '../workouts/workout-library';
import { useProgress } from '@/lib/hooks/use-progress';
import { LoadingSpinner } from '../ui/loading-spinner';

export function Overview() {
  const { progressData, isLoading, currentProgress } = useProgress();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Dashboard Overview</h2>
      </div>

      <StatsGrid data={currentProgress} />
      <WeeklyGoals />
      
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Recent Workouts</h3>
        <WorkoutLibrary limit={3} />
      </div>
    </motion.div>
  );
}