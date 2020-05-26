import React, { useEffect, useState } from 'react';
import './Log.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser, logOut, filePathCover } from '../reducers/reducer';
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
  const [fileNamePathCover, setFileNamePathCover] = useState('')
  const [coverFileStore, setCoverFileStore] = useState('');
  const [settings, setSettings] = useState(false);
  const [visibility, setVisibility] = useState("hidden")
  const [currentUser, setCurrentUser] = useState('');
  const [displayCheck, setDisplayCheck] = useState(false);
  const [background, setBackgroundColor] = useState('')
  const [headerColors, setHeaderColors] = useState('')
  const [newPost, setNewPost] = useState(false)
  

  useEffect(() => {
    setDisplayCheck(false)
    setVisibility("hidden")
    axios.get('/auth/getSession')
      .then(res => {
        if(res.data.loggedIn){
            const action = {
              loggedIn: res.data.loggedIn,
              currentId: res.data.id,
              currentUser: res.data.name,
              fileNamePathCover: res.data.fileNamePathCover,
              fileNamePathProfile: res.data.fileNamePathProfile
            }
            dispatch(setUser(action));
            setCurrentUser(res.data.name)
            setDisplayCheck(true)
            setFileNamePathCover(res.data.fileNamePathCover)
            setBackgroundColor(res.data.colorProfile.background)
            setHeaderColors(res.data.colorProfile.headerColors)
            setCoverFileStore(fileNamePathCover)
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
    dispatch(filePathCover(coverFileStore))
    axios.get('/auth/getSession')
      .then(res => {
        if(res.data.loggedIn){
            const action = {
              loggedIn: res.data.loggedIn,
              currentId: res.data.id,
              currentUser: res.data.name,
              fileNamePathCover: res.data.fileNamePathCover,
              fileNamePathProfile: res.data.fileNamePathProfile
            }
            setCurrentUser(res.data.name)
            setFileNamePathCover(res.data.fileNamePathCover)
            dispatch(setUser(action));
            setDisplayCheck(true)
            setBackgroundColor(res.data.colorProfile.background)
            setHeaderColors(res.data.colorProfile.headerColors)
            setVisibility("visible")
        } else {
            history.push('/')
        }
      })
  }

  
  let imagePath = 'uploads/' + fileNamePathCover.toString()
  return (
    <div className="logParent" style={{backgroundColor: background}}>
      <img src={imagePath} alt="tulum" style={visibility ? {visibility: "visible"} : {visibility: "hidden"}}/>
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
               <NewPost backToLog={() => setNewPost(false)} edit={false} post={{location: '', description: ''}} />
               :
               <Posts />
               }
            </div>
            : 
            loggedIn && settings ?
            <div className="accountContainer" >
              <Account updateName={updateName} backToAccount={backToAccount} setFileNamePathCover={setFileNamePathCover} />
            </div>
            :
            <Splash />
        }
        </div>
        )
}

export default Log;