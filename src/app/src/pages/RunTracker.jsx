import React, { useState } from 'react';
import Map from '../components/tracking/Map';
import Timer from '../components/tracking/Timer';
import { Button } from '../components/ui/Button';
import { useLocation } from '../hooks/useLocation';
import { useRunTracking } from '../hooks/useRunTracking';

const RunTracker = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { location } = useLocation();
  const { startRun, stopRun, updateLocation } = useRunTracking();

  const handleStart = async () => {
    await startRun();
    setIsRunning(true);
  };

  const handleStop = async () => {
    await stopRun();
    setIsRunning(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <Map location={location} />
      </div>
      
      <div className="p-4 bg-white shadow-lg">
        <Timer isRunning={isRunning} />
        
        <div className="flex justify-center gap-4 mt-4">
          {!isRunning ? (
            <Button onClick={handleStart}>Start Run</Button>
          ) : (
            <Button onClick={handleStop} variant="danger">Stop Run</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunTracker;