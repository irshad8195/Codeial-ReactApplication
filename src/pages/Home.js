import React from 'react'

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Comment , Loader} from '../components'
import { getPosts } from '../api'
import styles from '../styles/home.module.css'
import { Link } from 'react-router-dom'


const Home = () => {
   const [posts, setPosts]=useState([])
   const [loading, setLoading]=useState([])
  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
     //console.log('response', response);

      if(response.success){
      setPosts(response.data.posts)
      } 
    
      setLoading(false)
    };
 fetchPosts();
  }, []);

if(loading){
  return <Loader/>
}
  console.log(posts)
  return (
   <div className={styles.postsList}>
    {posts.map((post) => (
     
      <div className={styles.postWrapper} 
      key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
           alt='user-pic'/>
          <div>
    {/* <Link 
    to={{
      pathname:`/user/${post.user._id}`,
     state:{
      user: post.user,
     },
    }} */}


<Link 
to={`/user/${post.user._id}`}
  state={{ user: post.user}} className={styles.postAuthor}>
    {post.user.name}
   </Link>

  
     <span className={styles.postTime}>A minute ago</span>     
       </div>
        </div>
        
        <div className={styles.postContent}>{post.content}</div>
       
        <div className={styles.postActions}>
          <div className={styles.postLike}>
          <img
        src="https://cdn-icons-png.flaticon.com/512/1077/1077086.png"
          alt="likes-icon"
                />
            <span>5</span>
          </div>
  <div className={styles.postCommentsIcon}>
  <img
        src="https://cdn-icons-png.flaticon.com/512/1370/1370907.png"
          alt="comments-icon"
      />
     <span>2</span>
   </div>
</div>
<div className={styles.postCommentBox}>
  <input placeholder='start typing a comment' />
</div>
    <div className={styles.postCommnetsList}>
   {post.comments.map((comment) => (
    <Comment  comment={comment} />
   ))}
    </div>
      </div>

    </div>
    )
      )}
   
   </div>
   
  )
}


export default Home

