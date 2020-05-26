import React, { useState } from "react";
import axios from "axios";
import { setUser } from "../reducers/reducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './Login.css'

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [loggedInFailed, setLoggedInFailed] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  function loginSubmit(email, password) {
    let body = { email, password };
    axios
      .post("/auth/login", body)
      .then(res => {
        dispatch(setUser(res.data));
        history.push("/log");
      })
      .catch(err => {
        setLoggedInFailed(true);
        setTimeout(() => {
          setLoggedInFailed(false)
        }, 3000);
      });
      document.getElementById("loginForm").reset();
  }

  return (
    <div className="accountContainer">
      <h2 id="Title">Login</h2>
      <form id="loginForm" className="loginForm"
        onSubmit={e => {
          e.preventDefault();
          loginSubmit(email, password);
        }}
      >
        <input
          onChange={e => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Email"
        ></input>
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
        ></input>
        {loggedInFailed ? <p>Incorrect Email and/or Password</p> : null}
        <button type="submit" placeholder="Login" value="Login">Sign in</button>
      </form>
      <p className="clickable" onClick={props.setRegisterView}>
        New User? Register here
      </p>
      </div>
    
  );
}

export default Login;