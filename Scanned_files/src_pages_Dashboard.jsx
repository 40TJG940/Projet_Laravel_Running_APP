import React, { useEffect, useState } from 'react';
import Stats from '../components/tracking/Stats';
import { Card } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDistance: 0,
    totalRuns: 0,
    avgPace: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold">Total Distance</h3>
          <p className="text-xl">{stats.totalDistance} km</p>
        </Card>
        
        <Card>
          <h3 className="font-semibold">Total Runs</h3>
          <p className="text-xl">{stats.totalRuns}</p>
        </Card>
        
        <Card>
          <h3 className="font-semibold">Average Pace</h3>
          <p className="text-xl">{stats.avgPace} min/km</p>
        </Card>
      </div>
      
      <Stats />
    </div>
  );
};

export default Dashboard;