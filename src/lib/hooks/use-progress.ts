import { useState, useEffect, useMemo } from 'react';
import { ProgressData } from '../progress-data';
import { useStore } from '../store';
import { format, startOfToday, subDays } from 'date-fns';

export function useProgress() {
  const { user, workoutHistory } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Calculate actual progress data based on workout history
  const progressData = useMemo(() => {
    const data: ProgressData[] = [];
    const today = startOfToday();
    const currentWeight = user?.profile?.weight ?? 0;
    
    // Create entries for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'MMM dd');
      
      // Find workouts for this day
      const dayWorkouts = workoutHistory.filter(session => {
        const sessionDate = new Date(session.startTime);
        return format(sessionDate, 'MMM dd') === dateStr;
      });
      
      // Calculate total duration and calories for the day
      const duration = dayWorkouts.reduce((total, session) => {
        if (session.endTime) {
          const duration = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000 / 60;
          return total + duration;
        }
        return total;
      }, 0);
      
      // Estimate calories (roughly 8 calories per minute of exercise)
      const calories = Math.round(duration * 8);
      
      data.push({
        date: dateStr,
        weight: currentWeight,
        calories,
        workouts: dayWorkouts.length,
        duration: Math.round(duration),
      });
    }
    
    return data;
  }, [workoutHistory, user?.profile?.weight]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return {
    progressData,
    isLoading,
    currentProgress: progressData[progressData.length - 1],
    hasWorkouts: workoutHistory.length > 0,
  };
}