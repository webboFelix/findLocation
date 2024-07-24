import React, { useState, useEffect } from "react";

function Location() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await navigator.geolocation.getCurrentPosition();
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const userAgent = navigator.userAgent;

          const emailBody = `
            <h2>Happy Birthday!</h2>
            <p>Here's your current location:</p>
            <ul>
              <li>Latitude: ${latitude}</li>
              <li>Longitude: ${longitude}</li>
            </ul>
            <p>Your user agent string is: ${userAgent}</p>
          `;

          // Replace with your actual Node.js server-side endpoint URL
          const url = import.meta.VITE_URL;

          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ emailBody }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            setLocationInfo(
              "Your location information has been emailed successfully!"
            );
          } else {
            setError(
              "There was an error sending the email. Please try again later."
            );
          }
        } catch (error) {
          console.error("Error getting location:", error);
          setError(
            "There was an error getting your location. Please try again later."
          );
        } finally {
          setIsLoading(false); // Update loading state regardless of success or error
        }
      } else {
        setError("Geolocation is not supported by this browser.");
        setIsLoading(false); // Update loading state for unsupported browser
      }
    };

    getLocation();
  }, []); // Empty dependency array for one-time execution

  return (
    <div>
      <p>
        <a href="https://giphy.com/gifs/theoffice-happy-birthday-the-office-happybirthday-g5R9dok94mrIvplmZd">
          via GIPHY
        </a>
      </p>
      {isLoading && <p>Loading...</p>}
      {locationInfo && <p>{locationInfo}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Location;
