import { addDays, format, subDays } from 'date-fns';

export interface ProgressData {
  date: string;
  weight: number;
  calories: number;
  workouts: number;
  duration: number;
}

// Generate mock data for the last 30 days starting from initial weight
export const generateProgressData = (initialWeight: number): ProgressData[] => {
  const data: ProgressData[] = [];
  const today = new Date();

  // Calculate a small weight change per day (loss or gain)
  const weightChangePerDay = -0.05; // Assuming a weight loss goal

  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    const daysSinceStart = 29 - i;
    
    // Calculate weight with a slight variation
    const weightChange = weightChangePerDay * daysSinceStart;
    const dailyVariation = (Math.random() - 0.5) * 0.2; // ±0.1kg variation
    const weight = initialWeight + weightChange + dailyVariation;

    data.push({
      date: format(date, 'MMM dd'),
      weight: Number(weight.toFixed(1)),
      calories: Math.round(300 + Math.random() * 400),
      workouts: Math.round(Math.random() * 2),
      duration: Math.round(30 + Math.random() * 30),
    });
  }

  return data;
};

export interface WeeklyGoal {
  name: string;
  target: number;
  current: number;
  unit: string;
}

export const getWeeklyGoals = (workoutDuration: number = 30): WeeklyGoal[] => [
  {
    name: 'Workouts',
    target: 5,
    current: 3,
    unit: 'sessions',
  },
  {
    name: 'Active Minutes',
    target: workoutDuration * 5, // Based on user's preferred workout duration
    current: Math.round(workoutDuration * 3), // Assuming 3 workouts completed
    unit: 'minutes',
  },
  {
    name: 'Calories Burned',
    target: 2000,
    current: 1200,
    unit: 'kcal',
  },
];