export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  image: string;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  exercises: ExerciseProgress[];
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  sets: SetProgress[];
}

export interface SetProgress {
  setNumber: number;
  completed: boolean;
  reps: number;
}

export interface PoseDetectionResult {
  score: number;
  keypoints: Keypoint[];
}

export interface Keypoint {
  x: number;
  y: number;
  score: number;
  name: string;
}