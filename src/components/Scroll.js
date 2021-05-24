import React, { useState, useEffect } from "react";

import axios from "../Connection/axios";
import Overlay from "./Overlay";
import "./Scroll.css";

const base_url = "https://image.tmdb.org/t/p/w500";

function Scroll({ title, fetchUrl, isLargeRow, clickHandler }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className="container">
          <img
            onClick={() => clickHandler(movie)}
            className={`image ${isLargeRow && "row__posterLarge"} `}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
          <Overlay
            // className="overlay"
            movie={movie}
          ></Overlay>
        </div>
      ))}
    </>
  );
}

export default Scroll;
