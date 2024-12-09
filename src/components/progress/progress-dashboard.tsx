import { motion } from 'framer-motion';
import { ProgressChart } from './progress-chart';
import { WeeklyGoals } from './weekly-goals';
import { StatsGrid } from './stats-grid';
import { useProgress } from '@/lib/hooks/use-progress';
import { LoadingSpinner } from '../ui/loading-spinner';

export function ProgressDashboard() {
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
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Progress Overview</h2>
      </div>

      <StatsGrid data={currentProgress} />
      <WeeklyGoals />
      <div className="h-[400px] min-w-0">
        <ProgressChart data={progressData} />
      </div>
    </motion.div>
  );
}