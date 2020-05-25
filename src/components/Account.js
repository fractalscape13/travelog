import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { setUser } from "../reducers/reducer";
import Colors from './Colors';
import DeleteConfirm from './DeleteConfirm';
import './Account.css';


function Account(props) {
    const [name, setName] = useState('')
    const [background, setBackgroundColor] = useState('')
    const [headers, setHeadersColor] = useState('')
    const [text, setTextColor] = useState('')
    const [userId, setUserId] = useState('')
    const [nameChange, setChangeName] = useState('')
    const [deleteAccount, setDeleteAccount] = useState(false)


    useEffect(() => {
        axios.get('/auth/getSession')
          .then(res => {
            if(res.data.loggedIn){
                setName(res.data.name)
                setUserId(res.data.id)
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
      

    if (deleteAccount) {
        return (
            <DeleteConfirm userId={userId} returnToAccount={() => setDeleteAccount(false)}/>
        )
    } else {
        return (
        <div className="account" style={{backgroundColor: background}}>
            <h1 style={{color: headers}}>Welcome, {name}</h1>
            <input className="displayNameInput" style={{color: text}} placeholder="Change your display name" onChange={e => setChangeName(e.target.value)} /><br/>
            <button style={{color: text}} onClick={submitChanges}>Change Name</button>
            <div className="colorsParent">
                <Colors styleType={"Background"} setColor={setBackgroundColor} />
                <Colors styleType={"Headers"} setColor={setHeadersColor} />
                <Colors styleType={"Text"} setColor={setTextColor} />
            </div>
            <p style={{color: text}}>just for displaying the color text changes, {text}, {background}, {headers}</p>
            <button style={{color: text}} onClick={() => setDeleteAccount(true)}>! Delete Account !</button>
            <p style={{color: text}} className="clickable" onClick={props.backToAccount}>Back to Account</p>  
        </div>
        );
    }
}

export default Account;