import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Photos.css';
import { filePathCover, filePathProfile } from '../reducers/reducer';

function Photos(props) {
  const [fileNamePathCover, setFileNamePathCover] = useState('')
  const [fileNamePathProfile, setFileNamePathProfile] = useState('')
  const dispatch = useDispatch();

  function confirmPhotos() {
    let body = { fileNamePathCover: fileNamePathCover, fileNamePathProfile: fileNamePathProfile }
    axios.post('/api/saveFilePaths', body)
    .then(res => {
      console.log(res.data)
      dispatch(filePathCover(res.data.fileNamePathCover))
      dispatch(filePathProfile(res.data.fileNamePathProfile))
    }).catch(e => console.log(e))
  }

   function coverPhotoHandler(event){
     //this component is still a mess. basically it's just super inconsistent with its behavior
     //sometimes it'll refresh, re-render the grandparent component "log", and redirect from this page
     //sometimes it'll do what we want, upload the file, and stay on this page
     //it always uploads the file, but doesn't always keep this component mounted
     //it's storing in the database correctly as far as I can tell
     //just some state management/re-rendering shenanigans that need to be sorted out
     //but you can upload a file, save it to your account, and have it remember on the next sign in and it works
      //so if you end up demo-ing this feature, give it a good work through for bugs first
    event.preventDefault()
    setFileNamePathCover(event.target.files[0].name)
    const data = new FormData() 
    data.append('file', event.target.files[0])
    axios.post("/upload", data)
    .then(res => { 
      console.log(res.data)
     dispatch(filePathCover(res.data.originalname))
    }).catch(e => console.log(e))
    let body = { fileNamePathCover: event.target.files[0].name }
    axios.post('/api/saveFilePaths', body)
    .then(res => {
      props.setFileNamePathCover(res.data)
      console.log(res.data)
    }).catch(e => console.log(e))
  }

  //  function profilePhotoHandler(event){
  //   event.preventDefault()
  //   setFileNamePathProfile(event.target.files[0].name)
  //   const data = new FormData() 
  //   data.append('file', event.target.files[0])
  //   axios.post("/upload", data)
  //   .then(res => { 
  //     console.log(res.data)
  //   }).catch(e => console.log(e))
  // }


  return (
    <div className="photoForm">
      <input className="photoinput" type="file" name="fileCover" onChange={coverPhotoHandler}/>
      {/* <input className="photoinput" type="file" name="fileProfile" onChange={profilePhotoHandler}/> */}
      <button onClick={confirmPhotos}>Confirm photos</button>
    </div>
  );
}

export default Photos;