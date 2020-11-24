import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";
import "./login.css";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="login">
      <div className="container">
        <img src={loginImg} alt="github user" />
        <h1>Todo App</h1>
        <button className="btn" onClick={loginWithRedirect}>
          login / sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
