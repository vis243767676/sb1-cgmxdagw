import { WorkoutSession } from '@/lib/types';

export interface WorkoutSessionProps {
  workout: WorkoutSession;
  onComplete: () => void;
}