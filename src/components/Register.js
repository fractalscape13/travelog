import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setUser } from "../reducers/reducer";
import './Register.css'

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('')
  const [registerFail, setRegisterFail] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  function registerSubmit() {
    let body = {
      name,
      email,
      password
    };
    axios
      .post("/auth/register", body)
      .then(res => {
        dispatch(setUser(res.data));
        history.push("/log");
      })
      .catch(err => {
        setRegisterFail(true);
        console.log(err);
      });
  }

  return (
    <div className="registerContainer">
      <h2>Register</h2>
      <form className="registerForm">
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        ></input>
        <input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        {registerFail ? (
          <p>
            That email already exists. Please register with an alternate email
          </p>
        ) : null}
      </form>
        <button onClick={registerSubmit}>Register</button>
      <p className="clickable" onClick={props.toggleLogin}>Return to Login</p>
    </div>
  );
}

export default Register;