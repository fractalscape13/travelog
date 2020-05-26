import React, {useRef} from 'react';
import axios from 'axios';
import './Photos.css';

function Photos() {

  function confirmPhotos() {
    //save photos to db / project directory
  }

  function coverPhotoHandler(target) {
    console.log('target', target)
    const data = new FormData() 
    data.append('file', target)
    axios.post("/uploadCover", data)
    .then(res => { 
      console.log(res.data)
    }).catch(e => console.log(e))
  }

  function profilePhotoHandler(target) {
    console.log('target', target)
    const data = new FormData() 
    data.append('file', target)
    axios.post("/uploadProfile", data)
    .then(res => { 
      console.log(res.data)
    }).catch(e => console.log(e))
  }


  return (
    <div className="photoForm">
      <input className="photoinput" type="file" name="file" onChange={e => coverPhotoHandler(e.target.files[0])}/>
      <input className="photoinput" type="file" name="file" onChange={e => profilePhotoHandler(e.target.files[0])}/>
      <button onClick={confirmPhotos}>Confirm photos</button>
    </div>
  );
}

export default Photos;