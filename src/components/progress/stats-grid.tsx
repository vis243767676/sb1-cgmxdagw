import { Activity, Dumbbell, Flame, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProgressData } from '@/lib/progress-data';
import { useStore } from '@/lib/store';

interface StatsGridProps {
  data: ProgressData;
}

export function StatsGrid({ data }: StatsGridProps) {
  const { user, workoutHistory } = useStore();
  const currentWeight = user?.profile?.weight;
  
  const stats = [
    { 
      name: 'Current Weight', 
      icon: Scale, 
      value: currentWeight ? `${currentWeight.toFixed(1)} kg` : 'Not set',
      change: undefined
    },
    { 
      name: 'Total Workouts', 
      icon: Dumbbell, 
      value: `${workoutHistory.length} sessions` 
    },
    { 
      name: 'Today\'s Calories', 
      icon: Flame, 
      value: `${data.calories} kcal` 
    },
    { 
      name: 'Today\'s Active Time', 
      icon: Activity, 
      value: `${data.duration} mins` 
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg bg-white p-4 shadow sm:p-6"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-50 p-3">
              <stat.icon className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">
                {stat.value}
                {stat.change && (
                  <span className={`ml-2 text-sm ${stat.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                    {stat.change}
                  </span>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}