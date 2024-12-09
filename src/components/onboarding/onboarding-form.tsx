import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const onboardingSchema = z.object({
  age: z.number().min(16).max(100),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  gender: z.enum(['male', 'female', 'other']),
  fitnessGoal: z.enum(['weight-loss', 'muscle-gain', 'endurance', 'flexibility']),
  activityLevel: z.enum(['sedentary', 'moderate', 'active']),
  medicalConditions: z.array(z.string()).default([]),
  preferredWorkoutTime: z.enum(['morning', 'afternoon', 'evening']),
  workoutDuration: z.enum(['15', '30', '45', '60']).transform(Number),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export function OnboardingForm() {
  const navigate = useNavigate();
  const { user, updateProfile } = useStore();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      age: user?.profile?.age ?? 25,
      weight: user?.profile?.weight ?? 70,
      height: user?.profile?.height ?? 170,
      gender: user?.profile?.gender ?? 'male',
      fitnessGoal: user?.profile?.fitnessGoal ?? 'weight-loss',
      activityLevel: user?.profile?.activityLevel ?? 'moderate',
      medicalConditions: user?.profile?.medicalConditions ?? [],
      preferredWorkoutTime: user?.profile?.preferredWorkoutTime ?? 'morning',
      workoutDuration: String(user?.profile?.workoutDuration ?? '30') as '15' | '30' | '45' | '60',
    },
  });

  // Load existing profile data if available
  useEffect(() => {
    if (user?.profile) {
      reset(user.profile);
    }
  }, [user?.profile, reset]);

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      updateProfile(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8 rounded-xl bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Let's get to know you</h2>
          <p className="mt-2 text-gray-600">
            Help us create your personalized fitness journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                {...register('gender')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                {...register('weight', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                {...register('height', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.height && (
                <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
            <select
              {...register('fitnessGoal')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="endurance">Endurance</option>
              <option value="flexibility">Flexibility</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select
              {...register('activityLevel')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="sedentary">Sedentary</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Workout Time
            </label>
            <select
              {...register('preferredWorkoutTime')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Workout Duration (minutes)
            </label>
            <select
              {...register('workoutDuration')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 py-3 text-white hover:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : user?.profile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}