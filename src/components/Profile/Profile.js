import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../store/authContext";
import Card from "./Card";
import styled from "./Profile.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Profile(props) {
  const [login, setLogin] = useState(true);

  const usernameRef = useRef("");
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const lemailRef = useRef("");
  const lpasswordRef = useRef("");

  const onsubmit = () => {
    if (login) {
      return <span>Don't have an Account ? </span>;
    }

    return <span>Already have an Account ?</span>;
  };
  const clickHandler = () => {
    setLogin((prev) => !prev);
  };

  const ctx = useContext(AuthContext);
  const upSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
      username: usernameRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await ctx.onSignup(data);
      props.onClose();
      toast.success("SignUp Success", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (e) {
      toast.info("Check Every Input", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      console.log(e);
    }
  };

  const inSubmitHandler = (event) => {
    event.preventDefault();
    const validData = {
      email: lemailRef.current.value,
      password: lpasswordRef.current.value,
    };
    ctx
      .onLogin(validData)
      .then((res) => {
        props.onClose();
        toast.success("LogIn Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((e) => {
        toast.error("Email or Password Invalid", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(e);
      });
  };

  return (
    <Card onClose={props.onClose}>
      <div className={styled.Wrapper}>
        {login && (
          <form onSubmit={inSubmitHandler} className={styled.App}>
            <div className={styled["input-container"]}>
              <input type="email" placeholder="Email" ref={lemailRef} />
            </div>
            <div className={styled["input-container"]}>
              <input
                type="password"
                placeholder="Password"
                ref={lpasswordRef}
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        )}
        {!login && (
          <form onSubmit={upSubmitHandler} className={styled.App}>
            <div className={styled["input-container"]}>
              <input type="text" placeholder="Username" ref={usernameRef} />
            </div>
            <div className={styled["input-container"]}>
              <input type="text" placeholder="Full Name" ref={nameRef} />
            </div>
            <div className={styled["input-container"]}>
              <input type="email" placeholder="Email" ref={emailRef} />
            </div>
            <div className={styled["input-container"]}>
              <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        )}
        <h5 onClick={clickHandler}>{onsubmit()}</h5>;
      </div>
    </Card>
  );
}

export default Profile;
