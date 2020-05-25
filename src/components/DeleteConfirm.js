import React from 'react';
import { logOut } from '../reducers/reducer';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';


function DeleteConfirm(props) {

  const history = useHistory();
  const dispatch = useDispatch();


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
      <h3>Are you sure you want to delete your account? This will delete all your info.  If you click confirm, there is no turning back!</h3>
      <button onClick={deleteAccount}>Delete Account Permanently</button>
      <p className="clickable" onClick={props.returnToAccount}>Cancel, return to account settings</p>
    </div>
  );
}

export default DeleteConfirm;