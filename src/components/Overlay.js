import React, { useContext } from "react";
import AuthContext from "../store/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Overlay.css";

toast.configure();

function Overlay({ movie }) {
  const ctx = useContext(AuthContext);
  const favHandler = async () => {
    try {
      await ctx.onAddFav(movie);
      toast.success("Movie Addad To List", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (e) {
      console.log(e);
      if (!ctx.isLoggedIn) {
        console.log(e.message);
        toast.info("LogIn to Add ", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        console.log(e.message);
        toast.error("sory: Already Added", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="overlay">
      <p>{movie?.title || movie?.name || movie?.original_name || ""}</p>
      <span>
        <img
          src={`https://img.icons8.com/android/20/ff0000/filled-like.png`}
          alt="love"
          onClick={favHandler}
          title="Add to Favorite"
        />
      </span>
    </div>
  );
}

export default Overlay;
