import React, { useEffect, useState } from "react";
import Hero from "./Components/Hero/Hero";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { StyledEngineProvider } from "@mui/material/styles";

import { Outlet } from "react-router-dom";
import {
  fetchFilters,
  fetchNewAlbums,
  fetchSongs,
  fetchTopAlbums,
} from "./Api/api";

function App() {
  const [data, setData] = useState({});

  // const r = {
  //   topAlbums: [{}, {}, {}, {}],
  //    newAlbums: [{}, {}, {}, {}],
  //    genres: ['rock', 'pop', 'jazz'],
  //    songs: []
  // };

  const generateData = (key, source) => {
    source().then((data) => {
      setData((prevState) => {
        // Object.assign would also work
        return { ...prevState, [key]: data };
      });
    });
  };

  useEffect(() => {
    generateData("topAlbums", fetchTopAlbums);
    generateData("newAlbums", fetchNewAlbums);
    generateData("songs", fetchSongs);
    generateData("genres", fetchFilters);
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [], genres = [] } = data;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar searchData={[...topAlbums, ...newAlbums]} />
        <Outlet context={{ data: { topAlbums, newAlbums, songs, genres } }} />
      </StyledEngineProvider>
    </>
  );
}

// {data: {
//   topAlbums: [],
//   newAlbums: [],
//   genres: [],
//   songs: []
// }}

export default App;
