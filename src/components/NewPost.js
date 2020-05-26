import React, {useState} from 'react';
import axios from 'axios';
import './NewPost.css';
import { useSelector } from 'react-redux';

function NewPost(props) {
    const [location, setLocation] = useState(props.post.location)
    const [description, setDescription] = useState(props.post.descriptionrs)
    const currentId = useSelector(state => state.currentId)

    function submitPost(){
        let body = { location, description, id: currentId} 
        axios.post('/api/post', body)
        .then(res => {
            props.backToLog()
        }).catch(e => console.log(e))
    }
    function editPost(){
        let body = { location, description, id: currentId, originalLocation: props.post.location, originalDescription: props.post.description} 
        if(!body.location){
            body.location = body.originalLocation
        }
        if(!body.description){
            body.description = body.originalDescription
        }
        axios.post('/api/editPost', body)
        .then(res => {
            props.setChanges({location: body.location, description: body.description})
            props.backToPost()
        }).catch(e => console.log(e))
    }

  return (
    <div className="newpost">
      {props.edit ? <p>Edit post</p> : <p>Create new post</p>}
      <input placeholder="Enter Location" defaultValue={props.post.location} onChange={(e) => setLocation(e.target.value)} /><br/>
      <textarea
        defaultValue={props.post.description}
        id="descriptionInputField"
        onChange={e => setDescription(e.target.value)}
        type="text"
      /><br/>
        {props.edit ?  <button onClick={editPost} >Save Changes</button> : <button onClick={submitPost} >Submit Post</button>}
        {props.edit ? null: <p className="clickable" onClick={props.backToLog}>Back to log</p>}
    </div>
  );
}

export default NewPost;