import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

function MapContainer({ lat, lon }) {
  const mapRef = useRef(null);
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    // Create the map instance
    mapRef.current = L.map('map', {
      center: [lat, lon],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    });

    // Define a custom marker icon
    const markerIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + '/map-marker-icon-600x-map-marker-11562939743ayfahlvygl-removebg-preview.png', // Replace with the URL of your marker image
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Create a marker with the custom icon and add it to the map
    const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(mapRef.current);

    // Handle marker click event
    marker.on('click', () => {
      setShowSurvey(true);
    });

    // Clean up on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, [lat, lon]);

  return (
    <div className="map-container">
      <div id="map" className="map" style={{ height: '400px' }} />

      {showSurvey && (
        <div className="survey-container">
          <h2>Survey Form</h2>
          <Survey.Survey
            json={{
              title: 'Feedback Survey',
              pages: [
                {
                  name: 'page1',
                  elements: [
                    {
                      type: 'radiogroup',
                      name: 'rating',
                      title: 'Rate your experience:',
                      choices: ['Excellent', 'Good', 'Average', 'Poor'],
                      isRequired: true,
                    },
                    {
                      type: 'comment',
                      name: 'comments',
                      title: 'Additional Comments:',
                    },
                  ],
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MapContainer;