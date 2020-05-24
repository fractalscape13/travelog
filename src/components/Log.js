import React, { useEffect, useState } from 'react';
import tulum from '../assets/tulum.png'
import sunset from '../assets/sunset.png'
import { Palette } from 'color-thief-react';
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

  return (
    <div>
    { loggedIn && !settings ? 
            <div>
              <img src={sunset} alt="tulum" />
              <h1>Travelog</h1>
              <button onClick={signOut}>Sign out</button>
              <button onClick={() => setSettings(true)}>Account settings</button>
              <Palette src={sunset} colorCount={10}>
                {({ data, loading, error }) => (
                  <React.Fragment>
                    <div style={{ color: data[0] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[1] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[2] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[3] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[4] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[5] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[6] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[7] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[8] }}>
                      Text with a color
                    </div>
                    <div style={{ color: data[9] }}>
                      Text with a color
                    </div>
                  </React.Fragment>
                )}
              </Palette>
              <FaListAlt size="40px" className="clickable" onClick={pushToSplash} />
            </div>
            : 
            loggedIn && settings ?
            <div>
              <Account backToAccount={() => setSettings(false)} />
            </div>
            :
            <Splash />
        }
        </div>
        )
  
    
}

export default Log;