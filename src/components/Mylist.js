import React, { useState, useEffect } from "react";
import axios from "../Connection/nexios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "./Mylist.module.css";
toast.configure();

function Mylist() {
  const [fav, setfav] = useState([]);
  useEffect(() => {
    const Btoken = localStorage.getItem("isLoggedIn");
    async function fetchMovie() {
      try {
        const response = await axios.get("/favs", {
          headers: {
            Authorization: `Bearer ${Btoken}`,
          },
        });

        setfav(response.data.reverse());
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchMovie();
  }, []);

  const removeFavHandler = async (val) => {
    const Btoken = localStorage.getItem("isLoggedIn");

    try {
      const response = await axios.delete(`/favs/${val}`, {
        headers: {
          Authorization: `Bearer ${Btoken}`,
        },
      });
      const filtered = fav.filter((e) => e._id !== response.data._id);
      setfav(filtered);
      toast.success("Movie Removed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (e) {
      console.log(e.message);
      toast.error("sory: Something went Wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className={styled.list__posters}>
      {fav.slice(0, 40).map((movie) => (
        <div key={movie.name} className={styled["list__container"]}>
          <img
            className={styled["list__posterLarge"]}
            src={`https://image.tmdb.org/t/p/w500${movie.img}`}
            alt={movie.name}
          />
          <p onClick={() => removeFavHandler(movie._id)}>Remove this Movie</p>;
        </div>
      ))}
    </div>
  );
}

export default Mylist;
