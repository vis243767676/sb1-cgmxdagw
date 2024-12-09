import { Dumbbell, Activity, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Dumbbell,
    title: '3D Posture Detection',
    description: 'Real-time form correction and guidance for perfect technique',
  },
  {
    icon: Activity,
    title: 'Personalized Plans',
    description: 'AI-driven workout plans tailored to your goals and progress',
  },
  {
    icon: Trophy,
    title: 'Progress Tracking',
    description: 'Comprehensive analytics and milestone achievements',
  },
];

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80"
          alt="Fitness background"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your AI-Powered
            <span className="text-blue-400"> Fitness Coach</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            Transform your fitness journey with personalized workouts, real-time form correction,
            and AI-driven progress tracking.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-400"
              onClick={() => navigate('/auth')}
            >
              Start Your Fitness Journey
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm"
            >
              <feature.icon className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}