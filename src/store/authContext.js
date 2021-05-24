import React, { useState, useEffect } from "react";
import axios from "../Connection/nexios";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onSignup: (data) => {},
  onLogin: (validData) => {},
  onLogout: () => {},
  onAddFav: (movId) => {},
  onRmFav: (movId) => {},
});

export const AuthContextProvide = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("isLoggedIn");

    if (storedToken) {
      axios
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          setIsLoggedIn(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const signupHandler = async (data) => {
    try {
      const response = await axios.post("/users", data);
      const Btoken = response.data.token;
      localStorage.setItem("isLoggedIn", Btoken);
      setIsLoggedIn(true);
    } catch (e) {
      throw new Error(e.message);
    }
  };
  const loginHandler = async (validData) => {
    try {
      const response = await axios.post("/users/login", validData);
      const Btoken = response.data.token;
      localStorage.setItem("isLoggedIn", Btoken);
      setIsLoggedIn(true);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const logoutHandler = async () => {
    const storedToken = localStorage.getItem("isLoggedIn");
    try {
      await axios.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addfavHandler = async (movie) => {
    const storedToken = localStorage.getItem("isLoggedIn");
    try {
      await axios.post(
        "/favs",
        {
          img: movie.poster_path,
          name: movie?.title || movie?.name || movie?.original_name || "",
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onSignup: signupHandler,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onAddFav: addfavHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
