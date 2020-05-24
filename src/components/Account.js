import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../reducers/reducer';

function Account(props) {
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [nameChange, setChangeName] = useState('')

    const history = useHistory();
    const dispatch = useDispatch();

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
          axios.post('auth/editUser', body)
          .then(res => {
              setName(res.data.name)
          }).catch(e => console.log(e))
      }
      
      function deleteAccount(){
          let id = userId
          axios.delete(`/auth/deleteUser/${id}`)
          .then(res => {
              //probably should dispatch all the redux account closure stuff here
              dispatch(logOut())
              history.push('/')
          }).catch(e => console.log(e))
      }

  return (
    <div>
        <h3>Welcome, {name}</h3>
        <input placeholder="Change your display name" onChange={e => setChangeName(e.target.value)} /><br/>
        <button onClick={submitChanges}>Submit Changes</button>
        <button onClick={deleteAccount}>Delete Account</button>
        <p className="clickable" onClick={props.backToAccount}>Back to Account</p>
    </div>
  );
}

export default Account;