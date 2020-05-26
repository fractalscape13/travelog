import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Colors from './Colors';
import DeleteConfirm from './DeleteConfirm';
import './Account.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { keyframes } from 'styled-components';
import { fadeIn, fadeOut } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeOutAnimation = keyframes`${fadeOut}`;

const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation}
`;
const FadeOutDiv = styled.div`
  animation: 2s ${fadeOutAnimation}
`;



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
    const [nameChange, setChangeName] = useState('')
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [showPalette, setShowPalette] = useState(false)

    const notify = () => toast('Saving Color Profile!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


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
              name: nameChange,
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
              console.log('saved styles')
              notify()
              props.backToAccount()
          }).catch(e => console.log(e))
      }

      const arrow = '<< ';

    if (deleteAccount) {
        return (
            <DeleteConfirm userId={userId} returnToAccount={() => setDeleteAccount(false)}/>
        )
    } else {
        return (
        <div className="account" style={{backgroundColor: background, visibility: visibility}}>
            <ToastContainer />
            <div className="changeNameContainer">
                <div className="spacer"></div>
                <div className="changeNameParent">
                    <h1 style={{color: headerColors}}>Welcome, {name}</h1>
                    <input className="displayNameInput" style={{color: text}} placeholder="Change your display name" onChange={e => setChangeName(e.target.value)} />
                    <button style={{color: headerColors}} onClick={submitChanges}>Change Name</button>
                </div>
                <div className="buttonOrganizer">
                    <p style={{color: headerColors}} className="clickable" onClick={props.backToAccount}>{arrow}Back to Account</p>  
                    <button id="deleteButton" style={{color: text}} onClick={() => setDeleteAccount(true)}>Delete Account</button>
                </div>
            </div>
                {showPalette ? 
                <FadeInDiv>
                    <div className="colorsParent">
                        <Colors styleType={"Background"} pickedStyle={headerColors} setColor={setBackgroundColor} />
                        <Colors styleType={"Headers"} pickedStyle={headerColors}  setColor={setHeaderColors} />
                        <Colors styleType={"Text"} pickedStyle={text}  setColor={setTextColor} />
                    </div>
                    <button style={{color: headerColors}} onClick={resetStyles}>Reset styles</button>
                    <button style={{color: headerColors}} onClick={saveStyleProfile}>Save Style Profile</button>                    
                    <p className="clickable" style={{color: headerColors}} onClick={() => setShowPalette(false)}>Close palette</p> 
                    <p style={{color: text}}>Sample text sample text sample text sample text</p>  
                </FadeInDiv> 
                :
                <div className="colorsParent">
                    <p style={{color: headerColors}} className="clickable" onClick={() => setShowPalette(true)}>Edit color palette</p>
                </div>
                }
        </div>
        );
    }
}

export default Account;