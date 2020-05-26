import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Colors from './Colors';
import DeleteConfirm from './DeleteConfirm';
import './Account.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { FaPalette } from 'react-icons/fa';
import Photos from './Photos';

const fadeAnimation = keyframes`${fadeIn}`;

const FadedDiv = styled.div`
  animation: 2s ${fadeAnimation}
`;

function Account(props) {
    const [name, setName] = useState('')
    const [visibility, setVisibility] = useState("hidden")
    const [background, setBackgroundColor] = useState('')
    const [headerColors, setHeaderColors] = useState('')
    const [text, setTextColor] = useState('')
    const [defaultStyles, setDefaultStyles] = useState({})
    const [userId, setUserId] = useState('')
    const [nameToChange, setNameToChange] = useState('')
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [showPalette, setShowPalette] = useState(false)
    const [changeName, setChangeName] = useState(false)
    const [changePhotos, setChangePhotos] = useState(false)

    useEffect(() => {
        axios.get('/auth/getSession')
            .then(res => {
                if(res.data.loggedIn){
                    console.log('this is res.data', res.data)
                    setName(res.data.name)
                    setUserId(res.data.id)
                    setBackgroundColor(res.data.colorProfile.background)
                    setHeaderColors(res.data.colorProfile.headerColors)
                    setTextColor(res.data.colorProfile.text)
                    setDefaultStyles(res.data.colorProfile)
                    setVisibility("visible")
                }
            }).catch(e => console.log(e))
      }, [])

      function submitChanges (){
          let body = {
              name: nameToChange,
              id: userId
          }
          axios.put('/auth/editUser', body)
          .then(res => {
              console.log('response', res.data)
              setName(res.data[0].name)
              props.updateName(res.data[0].name)
            }).catch(e => console.log(e))
            props.backToAccount()
      }
      
      function resetStyles(){
          setBackgroundColor(defaultStyles.background)
          setHeaderColors(defaultStyles.headerColors)
          setTextColor(defaultStyles.text)
      }

      function saveStyleProfile(){
          let body = {background, headerColors: headerColors, text, userId}
          axios.post('/auth/saveColors', body)
          .then(res => {
              props.backToAccount()
          }).catch(e => console.log(e))
      }

      function toggleChangeName(){
          setChangeName(true)
          setShowPalette(false)
          setDeleteAccount(false)
          setChangePhotos(false)
      }
      function toggleShowPalette(){
          setChangeName(false)
          setShowPalette(true)
          setDeleteAccount(false)
          setChangePhotos(false)
      }
      function toggleDeleteAccount(){
          setChangeName(false)
          setShowPalette(false)
          setDeleteAccount(true)
          setChangePhotos(false)
      }
      function toggleChangePhotos(){
          setChangeName(false)
          setShowPalette(false)
          setDeleteAccount(false)
          setChangePhotos(true)
      }

      const arrow = '<< ';

        return (
        <div className="account" style={{backgroundColor: background, visibility: visibility}}>
            <div className="accountSettingsHeader" >
                <div className="accountSettingsTitle">
                    <h1 style={{color: headerColors}}>Welcome, {name}</h1>
                </div>
                <div className="accountSettingsIcons">
                    <p style={{color: headerColors}} className="clickable" onClick={props.backToAccount}>{arrow}Back to travelog</p>  
                </div>
            </div>
            <div className="accountNav">
                <div className="navElement" onClick={toggleShowPalette} style={showPalette ? {backgroundColor: headerColors} : {backgroundColor: null}} >
                    <p style={showPalette ? {color: background} : {color: headerColors}}>Edit color palette  <FaPalette /></p>
                </div>
                <div className="navElement" onClick={toggleChangeName} style={changeName ? {backgroundColor: headerColors} : {backgroundColor: null}} >
                    <p style={changeName ? {color: background} : {color: headerColors}}>Change Name</p>
                </div>
                <div className="navElement" onClick={toggleChangePhotos} style={changePhotos ? {backgroundColor: headerColors} : {backgroundColor: null}} >
                    <p style={changePhotos ? {color: background} : {color: headerColors}}>Change Photos</p>
                </div>
                <div className="navElement" onClick={toggleDeleteAccount} style={deleteAccount ? {backgroundColor: headerColors} : {backgroundColor: null}} >
                    <p style={deleteAccount ? {color: background} : {color: headerColors}}>Delete Account</p>
                </div>
            </div>
            <div className="accountBody">
                {showPalette ? 
                <FadedDiv >
                    <button className="paletteButton" style={{color: headerColors}} onClick={saveStyleProfile}>Save styles</button>   <button className="paletteButton" style={{color: headerColors}} onClick={resetStyles}>Reset styles</button>
                    <div className="colorsParent">
                        <div className="colorsChild">
                            <Colors styleType={"Background"} pickedStyle={headerColors} setColor={setBackgroundColor} />
                        </div>
                        <div className="colorsChild">
                            <Colors styleType={"Headers"} pickedStyle={headerColors}  setColor={setHeaderColors} />
                        </div>
                        <div className="colorsChild">
                            <Colors styleType={"Text"} pickedStyle={text}  setColor={setTextColor} />
                        </div>
                    </div>
                    <p className="clickable" style={{color: headerColors}} onClick={() => setShowPalette(false)}>Close palette</p> 
                    <p style={{color: text}}>sample text sample text sample text sample text</p>  
                </FadedDiv> 
                :
                changeName ? 
                <div className="changeNameContainer">
                    <div className="changeNameParent">
                        <input className="displayNameInput" style={{color: text}} placeholder="Change your display name" onChange={e => setNameToChange(e.target.value)} />
                        <button style={{color: headerColors}} onClick={submitChanges}>Change Name</button>
                    </div>
                </div>
                :
                deleteAccount ? 
                <DeleteConfirm userId={userId} returnToAccount={() => setDeleteAccount(false)}/>
                :
                changePhotos ?
                <Photos />
                :
                <div className="colorsParent">
                </div>
                }
            </div>
        </div>
        );

}

export default Account;