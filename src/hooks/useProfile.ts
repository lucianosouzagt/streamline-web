'use client';

import { useState, useEffect } from 'react';
import { profileService, UserProfile, UserStats, Activity } from '@/lib/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch {
      setError('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await profileService.getStats();
      setStats(statsData);
    } catch {
      setError('Erro ao carregar estatísticas');
    }
  };

  const fetchActivities = async () => {
    try {
      const activitiesData = await profileService.getActivities();
      setActivities(activitiesData);
    } catch {
      setError('Erro ao carregar atividades');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchStats();
    fetchActivities();
  }, []);

  return {
    profile,
    stats,
    activities,
    loading,
    error,
    refetch: fetchProfile,
  };
}