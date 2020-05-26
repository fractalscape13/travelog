import React, {useState, useEffect} from 'react';
import axios from 'axios';

function NewPost(props) {
  
  return (
    <div>
      <p>Add a new post here yo</p>
      <button onClick={props.cancel}>Cancel, back to log</button>
    </div>
  );
}

export default NewPost;