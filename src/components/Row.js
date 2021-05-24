import React, { useState, useRef, useContext } from "react";

import "./Row.css";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Scroll from "./Scroll";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../store/authContext";

toast.configure();

function Row({ title, fetchUrl, isLargeRow }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const ctx = useContext(AuthContext);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const clickHandler = (movie) => {
    if (ctx.isLoggedIn) {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((error) => {
            toast.info("Trailer Not Available", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            console.log(error);
          });
      }
    } else {
      toast.info("SignIn to Watch the Trailer", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  // for arrow
  const myRef = useRef(null);

  function slide(direction) {
    let scrollCompleted = 0;
    var slideVar = setInterval(function () {
      if (direction === "left") {
        myRef.current.scrollLeft -= window.innerWidth - 100;
      } else {
        myRef.current.scrollLeft += window.innerWidth - 100;
      }
      scrollCompleted += 10;
      if (scrollCompleted >= 100) {
        window.clearInterval(slideVar);
      }
    }, 10);
  }

  return (
    <div className="row">
      <div className="hs__arrow">
        <div className="hs__header">
          <h2 className="hs__headline">{title}</h2>
          <div className="hs__arrows">
            <span
              className="arrow arrow-prev"
              onClick={() => slide("left")}
            ></span>
            <span
              className="arrow arrow-next"
              onClick={() => slide("right")}
            ></span>
          </div>
        </div>
      </div>

      <div className="row__posters" ref={myRef}>
        <Scroll
          // ref={myRef}
          title={title}
          fetchUrl={fetchUrl}
          isLargeRow={isLargeRow}
          clickHandler={clickHandler}
        />
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
