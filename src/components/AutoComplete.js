import React, { useState } from "react";
import { addToSearchHistory, setPlaces } from "../redux/actions/actions";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { TextField, Box } from "@mui/material";
import SearchHistory from "../components/SearchHistory";

const containerStyle = {
  width: "100%",
  height: "400vh",
};

const center = {
  lat: 3.4108,
  lng: 101.6932,
};

const AutocompleteComponent = (props) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selected, setSelected] = useState(null);

  const onLoad = (map) => {
    setMap(map);
    setMarker(marker);
  };
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const onPlaceChanged = () => {
    let place = autocomplete.getPlace();

    if (place.geometry) {
      setMarker({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      map.panTo({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      map.setZoom(10);
      dispatch(addToSearchHistory(place.name));
      dispatch(setPlaces([place]));
    } else {
      alert("No results found");
    }
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onLoadAutocomplete = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  return (
    <>
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter a location"
            variant="outlined"
          />
        </Box>
      </Autocomplete>

      <SearchHistory />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <div style={{ zIndex: 1, color: "red", position: "fixed" }}>
          <Marker
            position={{ marker }}
            onClick={() => setSelected(selected)}
            zIndex={1}
          />
        </div>
      </GoogleMap>
    </>
  );
};

export default AutocompleteComponent;
