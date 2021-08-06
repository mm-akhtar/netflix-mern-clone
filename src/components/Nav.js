import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../store/authContext";

import "./Nav.css";

function Nav(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        console.log("hello");
      });
    };
  }, []);

  const profileHandler = () => {
    props.onShow();
  };

  const ctx = useContext(AuthContext);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo item"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix logo"
        onClick={props.hidefav}
      ></img>
      {ctx.isLoggedIn && (
        <span className="item hide" onClick={props.showfav}>
          Testing CI/CD
        </span>
      )}
      {ctx.isLoggedIn && (
        <img
          style={{ float: "right" }}
          className="nav__avatar item"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Netflix Avatar"
          onClick={props.onPrf}
        ></img>
      )}
      {!ctx.isLoggedIn && (
        <span
          className="item"
          style={{ float: "right" }}
          onClick={profileHandler}
        >
          LogIn
        </span>
      )}
    </div>
  );
}

export default Nav;
