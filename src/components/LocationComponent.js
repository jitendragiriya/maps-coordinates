import axios from "axios";
import React, { useState } from "react";
import { validationLatitudeLongitude } from "validation-latitude-longitude";

function LocationComponent({ location, setLocation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [latitudeInput, setLatitudeInput] = useState(location?.latitude);
  const [longitudeInput, setLongitudeInput] = useState(location?.longitude);

  // useEffect(() => {
  //   // Check if geolocation is available in the browser
  //   if ("geolocation" in navigator) {
  //     // Get the user's location
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude });
  //         setLatitudeInput(latitude.toFixed(6)); // Initialize input fields
  //         setLongitudeInput(longitude.toFixed(6));
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not available in this browser.");
  //   }
  // }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Validate and save the edited values
    let newLatitude = parseFloat(latitudeInput);
    newLatitude.toFixed(6);
    let newLongitude = parseFloat(longitudeInput);
    newLongitude.toFixed(6);

    if (!validationLatitudeLongitude.latitude("" + newLatitude))
      alert("Please enter a valid latitude");
    else if (!validationLatitudeLongitude.latitude("" + newLongitude))
      alert("Please enter a valid latitude");

    if (!isNaN(newLatitude) && !isNaN(newLongitude)) {
      const payload = { latitude: newLatitude, longitude: newLongitude };

      setIsEditing(false);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_POINT}/api/locations/add`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setLocation(res?.data);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Invalid latitude or longitude input. Please enter valid numbers.");
    }
  };

  return (
    <div className="p-4">
      <div className="shadow-md rounded-md text-center max-w-xs mx-auto py-4 dark:text-white dark:bg-[#3f3f3f]">
        <h2>Location</h2>
        {location ? (
          <div>
            <p className="dark:text-[#8f8f8f]">
              Latitude:{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={latitudeInput}
                  onChange={(e) => setLatitudeInput(e.target.value)}
                />
              ) : (
                parseFloat(location.latitude).toFixed(6)
              )}
            </p>
            <p className="dark:text-[#8f8f8f]">
              Longitude:{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={longitudeInput}
                  onChange={(e) => setLongitudeInput(e.target.value)}
                />
              ) : (
                parseFloat(location.longitude).toFixed(6)
              )}
            </p>
            {isEditing ? (
              <button
                className="py-1 px-4 rounded shadow-sm bg-[#eee] text-black dark:text-[#eee] dark:bg-black mt-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="py-1 px-4 rounded shadow-sm bg-[#eee] text-black dark:text-[#eee] dark:bg-black mt-2"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
    </div>
  );
}

export default LocationComponent;
