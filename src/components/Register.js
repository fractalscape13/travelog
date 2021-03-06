import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setUser } from "../reducers/reducer";
import './Register.css'

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState('')
  const [registerFail, setRegisterFail] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false)

  const history = useHistory();
  const dispatch = useDispatch();

  function registerSubmit() {
   
    if (email.length<1 || password.length<1 || name.length<1 || confirmPassword.length<1) {
      setEmptyInput(true);
      setTimeout(() => {
        setEmptyInput(false)
        }, 2500);
    } else if (password !== confirmPassword) {
      setPasswordFail(true);
      setTimeout(() => {
        setPasswordFail(false)
        }, 2500);
    } else {
      let body = {
      name,
      email,
      password
      };
      axios
        .post("/auth/register", body)
        .then(res => {
          let action = {
            loggedIn: res.data.loggedIn,
            currentUser: res.data.name,
            currentId: res.data.id,
            fileNamePathCover: res.data.fileNamePathCover,
            fileNamePathProfile: res.data.fileNamePathProfile
          }
          dispatch(setUser(action));
          history.push("/log");
        })
        .catch(err => {
          setRegisterFail(true);
          setTimeout(() => {
            setRegisterFail(false)
          }, 3000);
          console.log(err);
        });
        document.getElementById("registerForm").reset();
    }
  }

  return (
    <div className="registerContainer">
      <h2>Register</h2>
      <form id="registerForm" className="registerForm">
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
        <input
          type="password"
          name="password"
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        ></input>
        {registerFail ? (
          <p>
            That email already exists. Please register with an alternate email
          </p>
        ) : 
          emptyInput ? 
          <p>Please fill out all required fields</p>
          :
          passwordFail ?
          <p>Passwords do not match</p>
          :
          null}
      </form>
        <button onClick={registerSubmit}>Register</button>
      <p className="clickable" onClick={props.toggleLogin}>Return to Login</p>
    </div>
  );
}

export default Register;