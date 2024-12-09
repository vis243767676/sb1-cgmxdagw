import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WorkoutSession } from './types';

interface UserState {
  user: User | null;
  workoutHistory: WorkoutSession[];
  setUser: (user: User | null) => void;
  updateProfile: (profile: UserProfile) => void;
  addWorkoutSession: (session: WorkoutSession) => void;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile?: UserProfile;
}

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  fitnessGoal: 'weight-loss' | 'muscle-gain' | 'endurance' | 'flexibility';
  activityLevel: 'sedentary' | 'moderate' | 'active';
  medicalConditions: string[];
  preferredWorkoutTime: 'morning' | 'afternoon' | 'evening';
  workoutDuration: 15 | 30 | 45 | 60;
  lastUpdated: string;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      workoutHistory: [],
      setUser: (user) => set({ user }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                profile: {
                  ...profile,
                  lastUpdated: new Date().toISOString(),
                },
              }
            : null,
        })),
      addWorkoutSession: (session) =>
        set((state) => ({
          workoutHistory: [...state.workoutHistory, session],
        })),
    }),
    {
      name: 'fitness-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);