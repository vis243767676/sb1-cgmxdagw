import { Exercise } from './types';

export interface Workout {
  id: string;
  name: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'HIIT';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  image: string;
  exercises: Exercise[];
}

export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    description: 'A comprehensive strength training workout targeting all major muscle groups',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 45,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80',
    exercises: [
      {
        id: 'e1',
        name: 'Squats',
        sets: 3,
        reps: 12,
        restTime: 60,
        image: 'https://images.unsplash.com/photo-1566241142559-40a9552c8a76?auto=format&fit=crop&q=80'
      },
      {
        id: 'e2',
        name: 'Push-ups',
        sets: 3,
        reps: 15,
        restTime: 45,
        image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: '2',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to boost cardiovascular fitness',
    category: 'Cardio',
    difficulty: 'Advanced',
    duration: 30,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80',
    exercises: [
      {
        id: 'e3',
        name: 'Burpees',
        sets: 4,
        reps: 15,
        restTime: 30,
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80'
      },
      {
        id: 'e4',
        name: 'Mountain Climbers',
        sets: 3,
        reps: 20,
        restTime: 30,
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: '3',
    name: 'Flexibility Flow',
    description: 'Improve flexibility and mobility with this dynamic stretching routine',
    category: 'Flexibility',
    difficulty: 'Beginner',
    duration: 20,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    exercises: [
      {
        id: 'e5',
        name: 'Dynamic Stretches',
        sets: 3,
        reps: 10,
        restTime: 30,
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80'
      },
      {
        id: 'e6',
        name: 'Yoga Flow',
        sets: 2,
        reps: 8,
        restTime: 20,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'
      }
    ]
  }
];