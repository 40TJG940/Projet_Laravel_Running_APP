import { useState, useRef } from 'react';
import api from '../utils/api';
import { useLocation } from './useLocation';

export const useRunTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [route, setRoute] = useState([]);
  const runIdRef = useRef(null);
  const { location } = useLocation();

  const startRun = async () => {
    try {
      const response = await api.post('/runs/start', {
        startLocation: location
      });
      runIdRef.current = response.data.id;
      setIsTracking(true);
      setRoute([location]);
    } catch (error) {
      console.error('Failed to start run:', error);
      throw error;
    }
  };

  const updateLocation = async () => {
    if (!isTracking || !location) return;
    
    try {
      await api.patch(`/runs/${runIdRef.current}/location`, {
        location
      });
      setRoute(prev => [...prev, location]);
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  };

  const stopRun = async () => {
    if (!runIdRef.current) return;

    try {
      await api.post(`/runs/${runIdRef.current}/end`, {
        endLocation: location
      });
      setIsTracking(false);
      setRoute([]);
      runIdRef.current = null;
    } catch (error) {
      console.error('Failed to stop run:', error);
      throw error;
    }
  };

  return {
    isTracking,
    route,
    startRun,
    stopRun,
    updateLocation
  };
};