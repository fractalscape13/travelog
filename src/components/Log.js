import React, { useEffect, useState } from 'react';
import tulum from '../assets/tulum.png'
import sunset from '../assets/sunset.png'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser, logOut } from '../reducers/reducer';
import axios from 'axios';
import Splash from './Splash';
import Account from './Account';
import { FaListAlt } from 'react-icons/fa';

function Log() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);
  const [settings, setSettings] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [displayCheck, setDisplayCheck] = useState(false);

  useEffect(() => {
    setDisplayCheck(false)
    axios.get('/auth/getSession')
      .then(res => {
        if(res.data.loggedIn){
            const action = {
              loggedIn: res.data.loggedIn,
              currentId: res.data.id,
              currentUser: res.data.name
            }
            setCurrentUser(res.data.name)
            dispatch(setUser(action));
            setDisplayCheck(true)
        } else {
            history.push('/')
        }
      })
  }, [])

  function signOut() {
    dispatch(logOut());
    axios.get('/auth/logout')
      .then(() => history.push('/'))
      .catch(e => console.log(e));
  }

  function pushToSplash(){
    history.push('/')
  }

  function updateName(name){
    setCurrentUser(name)
  }

  return (
    <div>
      <img src={tulum} alt="tulum" />
    { loggedIn && !settings ? 
            <div>
               <h1 className={displayCheck ? "visible" : "hidden"} >{currentUser}'s Travelog</h1> 
              <button onClick={signOut}>Sign out</button>
              <button onClick={() => setSettings(true)}>Account settings</button><br/>
              <FaListAlt size="40px" className="clickable" onClick={pushToSplash} />
              <h3>Log Listings go here</h3>
            </div>
            : 
            loggedIn && settings ?
            <div>
              <Account updateName={updateName} backToAccount={() => setSettings(false)} />
            </div>
            :
            <Splash />
        }
        </div>
        )
}

export default Log;