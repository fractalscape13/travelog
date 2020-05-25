import React, { useState } from "react";
import Login from './Login'
import Register from './Register'

function Signin() {
    const [registerView, setRegisterView] = useState(false)
  return (
    <div>
       { registerView ? <Register toggleLogin={() => setRegisterView(false)} /> : <Login setRegisterView={() => setRegisterView(true)} /> }
    </div>
  );
}

export default Signin;