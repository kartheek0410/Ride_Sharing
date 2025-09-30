import React, { useEffect, useRef } from "react";
import { OlaMaps } from "olamaps-web-sdk";

function LiveTracking() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: import.meta.env.VITE_OLAMAPS_API_KEY,
    });

    // ✅ Initialize map
    mapInstance.current = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard-mr/style.json",
      container: mapRef.current,
      center: [77.61648476788898, 12.932223492103944], // fallback
      zoom: 15,
    });

    if ("geolocation" in navigator) {
      // 🔄 Run every 10 seconds
      intervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const coords = [longitude, latitude];

            // console.log(coords);

            // Center map on new location
            mapInstance.current.setCenter(coords);

            // Add/update marker
            if (!markerRef.current) {
              markerRef.current = olaMaps
                .addMarker({ color: "red" })
                .setLngLat(coords)
                .addTo(mapInstance.current);
            } else {
              markerRef.current.setLngLat(coords);
            }
          },
          (err) => console.error("Geolocation error:", err),
          { enableHighAccuracy: true }
        );
      }, 3000); // 10 sec
    }

    // 🧹 Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div ref={mapRef} id="map" className='h-full w-full object-cover' />
  );
}

export default LiveTracking;
