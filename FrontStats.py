import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calendar, Clock, MapPin, Activity, Award } from 'lucide-react';

const RunningTrackerApp = () => {
  const [activities, setActivities] = useState([
    {
      date: '2024-01-01',
      distance: 5.2,
      duration: 28,
      pace: 5.38,
      elevation: 45,
      calories: 450
    },
    {
      date: '2024-01-03',
      distance: 7.1,
      duration: 40,
      pace: 5.63,
      elevation: 85,
      calories: 620
    },
    {
      date: '2024-01-05',
      distance: 10.0,
      duration: 55,
      pace: 5.5,
      elevation: 120,
      calories: 850
    }
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [stats, setStats] = useState({
    totalDistance: 0,
    averagePace: 0,
    totalCalories: 0
  });

  useEffect(() => {
    // Calculer les statistiques globales
    const totalDistance = activities.reduce((sum, act) => sum + act.distance, 0);
    const averagePace = activities.reduce((sum, act) => sum + act.pace, 0) / activities.length;
    const totalCalories = activities.reduce((sum, act) => sum + act.calories, 0);

    setStats({
      totalDistance: totalDistance.toFixed(1),
      averagePace: averagePace.toFixed(2),
      totalCalories: Math.round(totalCalories)
    });
  }, [activities]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard Course à Pied</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" />
                <h3 className="font-semibold">Distance Totale</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalDistance} km</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="text-green-500" />
                <h3 className="font-semibold">Allure Moyenne</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.averagePace} min/km</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Activity className="text-purple-500" />
                <h3 className="font-semibold">Calories Brûlées</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalCalories} kcal</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Progression des Distances</h3>
            <LineChart width={800} height={300} data={activities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="distance" stroke="#2563eb" />
            </LineChart>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Activités Récentes</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedActivity(activity)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-500" />
                      <span className="font-medium">{activity.date}</span>
                    </div>
                    <div className="flex gap-4">
                      <span>{activity.distance} km</span>
                      <span>{activity.duration} min</span>
                      <span>{activity.pace} min/km</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunningTrackerApp;