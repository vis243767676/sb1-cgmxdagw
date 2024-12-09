import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export function WeeklyGoals() {
  const { user, workoutHistory } = useStore();
  const workoutDuration = user?.profile?.workoutDuration ?? 30;
  
  // Calculate this week's workouts
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);
  
  const thisWeeksWorkouts = workoutHistory.filter(session => {
    const sessionDate = new Date(session.startTime);
    return isWithinInterval(sessionDate, { start: weekStart, end: weekEnd });
  });

  const weeklyGoals = [
    {
      name: 'Weekly Workouts',
      target: 5,
      current: thisWeeksWorkouts.length,
      unit: 'sessions',
    },
    {
      name: 'Weekly Active Minutes',
      target: workoutDuration * 5,
      current: thisWeeksWorkouts.reduce((total, session) => {
        if (session.endTime) {
          const duration = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000 / 60;
          return total + duration;
        }
        return total;
      }, 0),
      unit: 'minutes',
    },
  ];

  if (workoutHistory.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Weekly Goals</h3>
        <p className="text-gray-500">Complete your first workout to start tracking your progress!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Weekly Goals</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {weeklyGoals.map((goal, index) => (
          <motion.div
            key={goal.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-gray-200 p-4"
          >
            <h4 className="text-sm font-medium text-gray-500">{goal.name}</h4>
            <div className="mt-2">
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(goal.current)}
                </p>
                <p className="ml-2 text-sm text-gray-500">
                  / {goal.target} {goal.unit}
                </p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{
                    width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}