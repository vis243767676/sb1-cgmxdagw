import { WorkoutCard } from './workout-card';
import { Button } from '../ui/button';
import { useWorkouts } from '@/lib/hooks/use-workouts';

interface WorkoutLibraryProps {
  limit?: number;
}

export function WorkoutLibrary({ limit }: WorkoutLibraryProps) {
  const { workouts, selectedCategory, setSelectedCategory } = useWorkouts();

  const displayedWorkouts = limit ? workouts.slice(0, limit) : workouts;

  return (
    <div className="space-y-6">
      {!limit && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">Workout Library</h2>
          <div className="flex flex-wrap gap-2">
            {['All', 'Strength', 'Cardio', 'Flexibility', 'HIIT'].map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedWorkouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}