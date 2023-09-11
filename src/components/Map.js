import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ longitude, latitude }) => {
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({});

  useEffect(() => { 
    setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    setLoading(false);
  }, [longitude, latitude]);

  return (
    <>
      {loading ? null : (
        <div className="p-4">
          <div
            className="rounded-md overflow-hidden"
            style={{ height: "500px", width: "100%" }}
          >
            <GoogleMapReact 
              defaultZoom={14}
              draggable={true}
              center={center}
            >
              {/* <div
            lat={latitude}
            lng={longitude}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "blue",
              borderRadius: "50%",
            }}
          ></div> */}
            </GoogleMapReact>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
