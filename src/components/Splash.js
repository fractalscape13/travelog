import React, { useEffect } from 'react';
import Signin from './Signin'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../reducers/reducer';
import { FaScroll } from "react-icons/fa";
import './Splash.css'

function Splash() {
  const loggedIn = useSelector(state => state.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  function pushToAccount(){
    history.push('/log')
  }

  useEffect(() => {
    axios.get('/auth/getSession')
      .then(res => {
        if(res.data.loggedIn){
            const action = {
              loggedIn: res.data.loggedIn,
              currentId: res.data.id,
              currentUser: res.data.name
            }
            dispatch(setUser(action));
        }
      }).catch(e => console.log(e))
  }, [])

  return (
    <div>
      <img src='uploads/tulum.png' alt="tulum" />
      {loggedIn ? null :  <Signin /> }
      <div className="blogHeader" >
        <div className="blogTitle">
          <h1>Microblog</h1> 
        </div>
        <div className="blogIcons">
          {loggedIn ? <FaScroll size="40px" className="clickable" onClick={pushToAccount} /> :  null }
        </div>
        </div>
      <Blog />
    </div>
  );
}

export default Splash;