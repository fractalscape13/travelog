import React, { useEffect } from 'react';
import Signin from './Signin'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../reducers/reducer';
import { FaScroll } from "react-icons/fa";
import tulum from '../assets/tulum.png'

function Splash() {
  const loggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

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
      <img src={tulum} alt="tulum" />
      {loggedIn ? null :  <Signin /> }
      {loggedIn ? <FaScroll size="40px" className="clickable" onClick={pushToAccount} /> :  null }
      <Blog />
    </div>
  );
}

export default Splash;