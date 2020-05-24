import React, { useState } from "react";
import axios from "axios";
import Login from './Login'
import Register from './Register'
import tulum from '../assets/tulum.png'

function Signin() {
    const [registerView, setRegisterView] = useState(false)
  return (
    <div>
      <h1>Sign in / Register</h1>
       { registerView ? <Register toggleLogin={() => setRegisterView(false)} /> : <Login setRegisterView={() => setRegisterView(true)} /> }
    </div>
  );
}

export default Signin;