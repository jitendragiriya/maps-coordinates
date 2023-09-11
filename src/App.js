import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Header from "./components/Header";
import LocationComponent from "./components/LocationComponent";
import News from "./components/News";
import OfflinePage from "./components/OfflinePage";
import axios from "axios";

function App() {
  const [location, setLocation] = useState({
    latitude: parseFloat(process.env.REACT_APP_DEFAULT_LATITUDE),
    longitude: parseFloat(process.env.REACT_APP_DEFAULT_LONGITUDE),
  });
  const [isOnline, setIsOnline] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  //get default coordinates
  const getCoordinates = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_POINT}/api/locations/get/default`)
      .then((res) => {
        setLocation(res?.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };
  useEffect(() => {
    getCoordinates()
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      document.querySelector("body").style.backgroundColor = "#4f4f4f";
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      document.querySelector("body").style.backgroundColor = "#ffffff";
    }
  }, []);

  useEffect(() => {
    if (window.navigator.onLine) setIsOnline(true);
    else setIsOnline(false);

    window.addEventListener("online", function (e) {
      setIsOnline(true);
    });

    window.addEventListener("offline", function (e) {
      setIsOnline(false);
    });
  }, []);



  return (
    <>
      {isOnline ? (
        <div className="dark:bg-[#4f4f4f] bg-white">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          {location ? (
            <Map
              longitude={location?.longitude}
              latitude={location?.latitude}
            />
          ) : null}
          <LocationComponent location={location} setLocation={setLocation} />
          <News />
        </div>
      ) : (
        <OfflinePage />
      )}
    </>
  );
}

export default App;
