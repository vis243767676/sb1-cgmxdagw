import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export function useAuth() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
      
      // Navigate to dashboard if profile exists, otherwise to onboarding
      if (user?.profile) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
      
      return mockUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [setUser, navigate, user?.profile]);

  const logout = useCallback(() => {
    setUser(null);
    navigate('/');
  }, [setUser, navigate]);

  return {
    login,
    logout,
  };
}