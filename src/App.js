import './App.css';
import Baner from './components/Baner/Baner';
import Search from './components/Search/Search';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CheapFlights from './components/CheapFlights/CheapFlights';
import Faq from './components/Faq/Faq';
import PopularDestinations from './components/PopularDestinations/PopularDestinations';
import { useDispatch, useSelector } from 'react-redux';
import useApi from './Api/useApi';
import { useEffect, useState } from 'react';
import ErrorBoundary from './utils/ErrorBoundary';
import DisplayApiError from './utils/DisplayApiError';
import FlightsEverywhere from './components/FlightsEverywhere/FlightsEverywhere';
import { updateNearByAirports } from './store/nearByAirportsSlice';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",// Removes the outline
          ':focus': {
            border: '2px solid blue'
          }
        },
      },
    },
  },
});


function App() {
  const isBanerDisplay = useSelector((state) => state.display.isBanerDisplay); // Access Redux state
  const NearByAirportsData = useSelector((state) => state.nearByAirports.nearByAirportsData)

  const { callApi, error, loading } = useApi()
  const dispatch = useDispatch(); // Hook to dispatch actions


  const getNearByAirports = async (latitude, longitude) => {
    try {
      const response = await callApi('/getNearByAirports', 'GET', null, { lat: latitude, lng: longitude, locale: 'en-US' });
      dispatch(updateNearByAirports(response.data))
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Call the API with latitude and longitude
            const updatedLat = latitude.toString();
            const updatedLang = longitude.toString();
            // getNearByAirports(updatedLat, updatedLang);
          },
          (err) => {
            console.log("Unable to retrieve location");
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <DisplayApiError errorMessage={error} />; // Show the error message if there's an API failure

  return (
    <ThemeProvider theme={theme}>
      {NearByAirportsData && <>
        <Navbar />
        {isBanerDisplay && <Baner />}
        <Search />
        {/* {isFlightsDisplay && <DisplayFlights />} */}
        <FlightsEverywhere />
        <PopularDestinations />
        <Faq />
        <CheapFlights />
        <Footer />
      </>}
    </ThemeProvider>
  );
}

const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;
