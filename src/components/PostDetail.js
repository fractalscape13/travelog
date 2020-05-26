import React, { useState } from 'react';
import axios from 'axios';
import NewPost from './NewPost';

function PostDetail(props) {
    const [editView, setEditView] = useState(false)
    const [changes, setChanges] = useState(null)
    
    function deletePost(){
        let body = {location: props.post.location}
        axios.put('/api/deletePost', body)
        .then(res => {
            props.backToPost()
        }).catch(e => console.log(e))
    }

    return (
        <div className="postDetailParent">
           { editView ?
            <NewPost backToPost={() => setEditView(false)} edit={true} post={props.post} setChanges={setChanges} /> 
            :
            <div>
                <h1>{changes ? changes.location : props.post.location}</h1>
                <p>{changes ? changes.description : props.post.description}</p>
                <button onClick={deletePost}>Delete Post</button>
                <button onClick={() => setEditView(true)}>Edit Post</button>
            </div>
            }
            <button onClick={props.backToPost}>Return to previous screen</button>

        </div>
    );
}

export default PostDetail;