import React from 'react';
import { GoogleMap, Polyline, useLoadScript } from '@react-google-maps/api';

const Map = ({ route = [], center, zoom = 15 }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={zoom}
    >
      {route.length > 0 && (
        <Polyline
          path={route}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;