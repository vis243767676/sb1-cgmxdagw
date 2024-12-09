import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HeroSection } from './components/hero-section';
import { AuthForm } from './components/auth/auth-form';
import { OnboardingForm } from './components/onboarding/onboarding-form';
import { DashboardLayout } from './components/dashboard/dashboard-layout';
import { WorkoutLibrary } from './components/workouts/workout-library';
import { ProgressDashboard } from './components/progress/progress-dashboard';
import { Overview } from './components/dashboard/overview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="workouts" element={<WorkoutLibrary />} />
          <Route path="progress" element={<ProgressDashboard />} />
          {/* Redirect /dashboard to /dashboard/overview */}
          <Route path="" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;