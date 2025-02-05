import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalDistance: 0,
    bestPace: 0,
    totalRuns: 0
  });
  const [recentRuns, setRecentRuns] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [statsRes, runsRes] = await Promise.all([
          api.get('/users/stats'),
          api.get('/runs/recent')
        ]);
        setStats(statsRes.data);
        setRecentRuns(runsRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6">
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <h3 className="font-semibold">Total Distance</h3>
          <p className="text-2xl">{stats.totalDistance} km</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Best Pace</h3>
          <p className="text-2xl">{stats.bestPace} min/km</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Total Runs</h3>
          <p className="text-2xl">{stats.totalRuns}</p>
        </Card>
      </div>

      <h3 className="text-xl font-bold mb-4">Recent Runs</h3>
      <div className="space-y-4">
        {recentRuns.map((run) => (
          <Card key={run.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{new Date(run.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{run.distance} km</p>
              </div>
              <p>{run.duration} min</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;