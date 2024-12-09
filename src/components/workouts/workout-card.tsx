import { Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Workout } from '@/lib/workout-data';
import { useState } from 'react';
import { WorkoutSession } from './workout-session';

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  if (isStarted) {
    return (
      <WorkoutSession
        workout={{
          id: `session-${workout.id}`,
          workoutId: workout.id,
          startTime: new Date(),
          completed: false,
          exercises: workout.exercises.map(exercise => ({
            exerciseId: exercise.id,
            completed: false,
            sets: Array.from({ length: exercise.sets }, (_, i) => ({
              setNumber: i + 1,
              completed: false,
              reps: exercise.reps,
            })),
          })),
        }}
        onComplete={() => setIsStarted(false)}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md">
      <div className="relative h-48">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
            {workout.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{workout.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span>{workout.duration} mins</span>
            <span className="mx-2">•</span>
            <span>{workout.difficulty}</span>
          </div>
          
          <Button size="sm" onClick={handleStart}>
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}