import React, { useEffect, useState } from 'react';
import './Log.css'
import tulum from '../assets/tulum.png'
import sunset from '../assets/sunset.png'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser, logOut } from '../reducers/reducer';
import axios from 'axios';
import Splash from './Splash';
import Account from './Account';
import Posts from './Posts';
import NewPost from './NewPost';
import { FaGlobe } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

function Log() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);
  const [settings, setSettings] = useState(false);
  const [visibility, setVisibility] = useState("hidden")
  const [currentUser, setCurrentUser] = useState('');
  const [displayCheck, setDisplayCheck] = useState(false);
  const [background, setBackgroundColor] = useState('')
  const [headerColors, setHeaderColors] = useState('')
  const [text, setTextColor] = useState('')
  const [newPost, setNewPost] = useState(false)

  useEffect(() => {
    setDisplayCheck(false)
    axios.get('/auth/getSession')
      .then(res => {
        if(res.data.loggedIn){
          console.log('this is res.data from the log component use effect', res.data)
            const action = {
              loggedIn: res.data.loggedIn,
              currentId: res.data.id,
              currentUser: res.data.name
            }
            setCurrentUser(res.data.name)
            dispatch(setUser(action));
            setDisplayCheck(true)
            setBackgroundColor(res.data.colorProfile.background)
            setHeaderColors(res.data.colorProfile.headerColors)
            setTextColor(res.data.colorProfile.text)
            setVisibility("visible")
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

  function backToAccount(){
    setVisibility("hidden")
    setSettings(false)
    axios.get('/auth/getSession')
      .then(res => {
        if(res.data.loggedIn){
          console.log('this is res.data from BACKTOACCOUNT', res.data)
            const action = {
              loggedIn: res.data.loggedIn,
              currentId: res.data.id,
              currentUser: res.data.name
            }
            setCurrentUser(res.data.name)
            dispatch(setUser(action));
            setDisplayCheck(true)
            setBackgroundColor(res.data.colorProfile.background)
            setHeaderColors(res.data.colorProfile.headerColors)
            setTextColor(res.data.colorProfile.text)
            setVisibility("visible")
        } else {
            history.push('/')
        }
      })
  }

  return (
    <div className="logParent" style={{backgroundColor: background}}>
      <img src={sunset} alt="tulum" />
    { loggedIn && !settings ? 
            <div style={{visibility: visibility}}>
              <div className="logHeader">
                <div className="titleBox">
                  <h1 style={{color: headerColors}} className={displayCheck ? "visible" : "hidden"} >{currentUser}'s Travelog</h1> 
                </div>
                <div className="navBar">
                  <MdAddCircle  title="Add a post" className="navicon" size="30px" style={{color: headerColors}} onClick={() => setNewPost(true)}/>
                  <FaGlobe title="Blog" style={{color: headerColors}} size="25px" className="navicon" onClick={pushToSplash} />
                  <IoMdSettings title="Account Settings" className="navicon" style={{color: headerColors}} size="30px" onClick={() => setSettings(true)} />
                  <button style={{color: headerColors}} onClick={signOut}>Sign out</button>
                </div>
               </div>
               {newPost ? 
               <NewPost cancel={() => setNewPost(false)} />
               :
               <Posts />
               }
            </div>
            : 
            loggedIn && settings ?
            <div className="accountContainer" >
              <Account updateName={updateName} backToAccount={backToAccount} />
            </div>
            :
            <Splash />
        }
        </div>
        )
}

export default Log;