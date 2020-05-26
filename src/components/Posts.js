import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Posts.css';
import PostDetail from './PostDetail';
import { RiCompassDiscoverLine } from 'react-icons/ri';

function Posts() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [detailSelected, setDetailSelected] = useState(false)
  
  useEffect(() => {
    axios.get('/api/getPosts')
    .then(res => {
      let array = res.data.reverse()
        setPosts(array)
    }).catch(e => console.log(e))
  }, [])

  function handleDetail(post){
    setSelectedPost(post)
    setDetailSelected(true)
  }
  function backToPost(){
    axios.get('/api/getPosts')
    .then(res => {
      let array = res.data.reverse()
        setPosts(array)
        setDetailSelected(false)
    }).catch(e => console.log(e))
  }

  let mappedPosts = posts.map((post, i) => {
    return <div className="postContainer" key={i}>
      <h3 className="clickable" onClick={() => handleDetail(post)}><RiCompassDiscoverLine/> {post.location}</h3>
    </div>
  })

  return (
    <div className="postDisplayParent">
      {mappedPosts && !detailSelected ? 
      mappedPosts 
      : mappedPosts && detailSelected ? 
      <PostDetail post={selectedPost} backToPost={backToPost} />
      : 
      null}
    </div>
  );
}

export default Posts;