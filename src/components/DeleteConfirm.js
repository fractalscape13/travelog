import React, {useState, useEffect} from 'react';
import { logOut } from '../reducers/reducer';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { GrStatusWarning } from 'react-icons/gr';


function DeleteConfirm(props) {
  
  const [text, setTextColor] = useState('')
  const [name, setName] = useState('')
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/auth/getSession')
        .then(res => {
            if(res.data.loggedIn){
                console.log('this is res.data', res.data)
                setName(res.data.name)
                setTextColor(res.data.colorProfile.text)
            }
        }).catch(e => console.log(e))
  }, [])


  function deleteAccount(){
    let id = props.userId
    axios.delete(`/auth/deleteUser/${id}`)
    .then(res => {
        dispatch(logOut())
        history.push('/')
    }).catch(e => console.log(e))
  }

  return (
    <div>
      <h3 style={{color: text}}>Are you sure you want to delete your account? This will delete all your info.  If you click confirm, there is no turning back!</h3>
      <GrStatusWarning size="50px"/><br/>
      <button style={{color: text}} onClick={deleteAccount}>Confirm: Delete Account Permanently</button>
      <p className="clickable" style={{color: text}} onClick={props.returnToAccount}>Cancel, return to account settings</p>
    </div>
  );
}

export default DeleteConfirm;