import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import config from './config';

function MapContainer({ lat, lon }) {
  const mapRef = useRef(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    // Fetch survey data from the backend
    async function fetchSurveyData() {
      try {
        const response = await fetch(`${config.backendUrl}/api/surveyData`);
        const data = await response.json();
        setSurveyData(data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    }

    fetchSurveyData();
  }, []);

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

    // Create a marker and add it to the map
    const markerIcon = L.icon({
        iconUrl: process.env.PUBLIC_URL + '/map-marker-icon-600x-map-marker-11562939743ayfahlvygl-removebg-preview.png', // Replace with the URL of your marker image
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
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

  // Callback function when survey is completed
  const onCompleteSurvey = (survey) => {
    // print the survey results to the console
    console.log(survey.data);
    // Send survey data to backend for persistence
    fetch(`${config.backendUrl}/api/submitSurvey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey.data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Survey data submitted successfully');
        } else {
          console.error('Failed to submit survey data');
        }
      })
      .catch((error) => {
        console.error('Error submitting survey data:', error);
      });
  };

  return (
    <div className="map-container">
      <div id="map" className="map" style={{ height: '400px' }} />

      {showSurvey && surveyData && (
        <div className="survey-container">
          <h2>Survey Form</h2>
          <Survey.Survey json={surveyData} onComplete={onCompleteSurvey} />
        </div>
      )}
    </div>
  );
}

export default MapContainer;
