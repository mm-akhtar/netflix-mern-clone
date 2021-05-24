import React, { useState, useContext, useEffect } from "react";
import axios from "../../Connection/nexios";
import AuthContext from "../../store/authContext";
import Card from "./Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Uprofile.css";

toast.configure();

function Uprofile(props) {
  const ctx = useContext(AuthContext);
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const Btoken = localStorage.getItem("isLoggedIn");
    async function fetchMovie() {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${Btoken}`,
          },
        });

        setProfile(response.data);
        // console.log(response.data);
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchMovie();
  }, []);

  const logoutHandler = async () => {
    try {
      await ctx.onLogout();
      props.onClose();
      toast.warn("Sad(: To see you Leave", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card onClose={props.onClose}>
      <div className="profile-card">
        <div className="profile-card-header"></div>
        <div className="profile-card-avatar">
          <img
            src="https://i.pinimg.com/originals/fb/8e/8a/fb8e8a96fca2f049334f312086a6e2f6.png"
            alt="cat"
          />
          <p>{profile.name}</p>
        </div>
        <div className="profile-card-info">
          <p>Nice to Have you Buddy</p>
          <p>
            “A wise man can learn more from his enemies than a fool from his
            friends.”
          </p>
          <button className="logoutButton" onClick={logoutHandler}>
            Log Out
          </button>
        </div>
      </div>
    </Card>
  );
}

export default Uprofile;
