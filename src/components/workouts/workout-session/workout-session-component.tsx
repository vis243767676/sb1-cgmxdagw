import { useState, useRef, useEffect } from 'react';
import { Camera } from '../../camera/camera';
import { PoseDetectionResult, WorkoutSession } from '@/lib/types';
import { Button } from '../../ui/button';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, CheckCircle, AlertCircle } from 'lucide-react';
import type { WorkoutSessionProps } from './types';
import { workouts } from '@/lib/workout-data';
import { useStore } from '@/lib/store';

export function WorkoutSessionComponent({ workout, onComplete }: WorkoutSessionProps) {
  const { addWorkoutSession } = useStore();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [formFeedback, setFormFeedback] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout>();

  const currentExerciseProgress = workout.exercises[currentExerciseIndex];
  const currentWorkout = workouts.find(w => w.id === workout.workoutId);
  const currentExercise = currentWorkout?.exercises.find(
    e => e.id === currentExerciseProgress.exerciseId
  );

  useEffect(() => {
    // Start the first exercise
    if (currentExercise && !timeLeft) {
      setTimeLeft(currentExercise.restTime);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentExercise]);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((time) => Math.max(0, time - 1));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, timeLeft]);

  const handlePoseDetected = (pose: PoseDetectionResult) => {
    // Provide real-time feedback based on pose detection
    if (pose.score > 0.7) {
      setFormFeedback('Good form! Keep going!');
    } else {
      setFormFeedback('Check your form - make sure your movements are controlled');
    }
  };

  const handleSetComplete = () => {
    if (!currentExercise) return;
    
    // Update set progress
    const updatedSets = [...currentExerciseProgress.sets];
    updatedSets[currentSet - 1].completed = true;
    currentExerciseProgress.sets = updatedSets;
    
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      setTimeLeft(currentExercise.restTime);
    } else {
      currentExerciseProgress.completed = true;
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      const nextExercise = currentWorkout?.exercises[currentExerciseIndex + 1];
      if (nextExercise) {
        setTimeLeft(nextExercise.restTime);
      }
    } else {
      // Complete the workout
      const completedWorkout: WorkoutSession = {
        ...workout,
        completed: true,
        endTime: new Date(),
      };
      addWorkoutSession(completedWorkout);
      onComplete();
    }
  };

  if (!currentExercise || !currentWorkout) {
    return <div>Exercise not found</div>;
  }

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-white p-4 shadow sm:p-6">
          <h3 className="text-lg font-semibold">Camera Feed</h3>
          <Camera onPoseDetected={handlePoseDetected} />
          {formFeedback && (
            <div className={`mt-2 flex items-center rounded-md p-2 ${
              formFeedback.includes('Good') ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
            }`}>
              {formFeedback.includes('Good') ? (
                <CheckCircle className="mr-2 h-5 w-5" />
              ) : (
                <AlertCircle className="mr-2 h-5 w-5" />
              )}
              {formFeedback}
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{currentExercise.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Complete {currentExercise.reps} reps for each set
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Set</p>
                  <p className="text-lg font-semibold">{currentSet} of {currentExercise.sets}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Reps</p>
                  <p className="text-lg font-semibold">{currentExercise.reps}</p>
                </div>
                {timeLeft > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rest</p>
                    <p className="text-lg font-semibold">{timeLeft}s</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setIsPaused(!isPaused)}
                variant="outline"
                size="icon"
                className="h-12 w-12"
              >
                {isPaused ? (
                  <Play className="h-6 w-6" />
                ) : (
                  <Pause className="h-6 w-6" />
                )}
              </Button>
              
              <Button 
                onClick={handleSetComplete}
                variant="default"
                className="flex-grow text-base font-semibold"
                disabled={timeLeft > 0}
              >
                Complete Set {currentSet}
              </Button>
              
              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="h-12 w-12"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-white p-4 shadow sm:p-6"
      >
        <h4 className="text-lg font-semibold">Workout Progress</h4>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
          {workout.exercises.map((exercise, index) => (
            <div
              key={exercise.exerciseId}
              className={`flex items-center justify-between rounded-lg border p-3 ${
                index === currentExerciseIndex
                  ? 'border-blue-500 bg-blue-50'
                  : exercise.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <span className="text-sm font-medium">Exercise {index + 1}</span>
              {exercise.completed && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}