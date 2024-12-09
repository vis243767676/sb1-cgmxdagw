import { useState, useMemo } from 'react';
import { Workout, workouts } from '../workout-data';

export function useWorkouts() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWorkouts = useMemo(() => 
    selectedCategory === 'All'
      ? workouts
      : workouts.filter(workout => workout.category === selectedCategory),
    [selectedCategory]
  );

  return {
    workouts: filteredWorkouts,
    selectedCategory,
    setSelectedCategory,
  };
}