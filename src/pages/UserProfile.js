import React, { useState } from 'react'
import { useAuth } from '../hooks'
import { useLocation } from 'react-router-dom'
//import { useParams } from 'react-router-dom'
import {Loader} from '../components'
import styles from '../styles/setting.module.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchUserProfile } from '../api'

const UserProfile = () => {
  //const location=useLocation();
  const [user, setUser]=useState({})
  const [loading, setLoading]=useState(true);
  const {userId}=useParams()
  const auth=useAuth()
  console.log(auth)
  //console.log(userId)
  
  useEffect (()=>{
    const getUser=async ()=>{
      const response=await fetchUserProfile(userId)

      if(response.success){
    setUser(response.data.user)
      }
      setLoading(false)
    }
    getUser();
  }, [userId])
 
  if(loading){
    return<Loader/>
  }

const checkIfUserIsAFriend = () =>{
  const friends=auth.user.friendships;
  
  const friendIds=friends.map((friend)=>  friend.to_user._id) 
  const index=friendIds.indexOf(userId)
  if(index !== -1){
    return true;
  }
  return false;
}

  //const showAddFriendsBtn=checkIfUserIsAFriend();
  //console.log(location)
  //let {user={}}=location.state
//   const[user, setUser]=useState();
//   const [loading, setLoading]=useState(true)
//   const {userId}=useParams();

//   console.log('userId', userId)
//   // const location=useLocation();
//   // console.log('location', location)
   
// useEffect (()=>{
//   const getUser=async ()=>{
//     const response=await fetchUserProfile(userId)
//     if(response.success){
//       setUser(response.data.user)
//     }else{
         
//     }
//     setLoading(false)
//   }
//   getUser()
// }, [userId])

// if(loading=true){
//   return<Loader/>

  return (
    <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""/>

        </div>

<div className={styles.field}>
 <div className={styles.fieldLabel}>Email</div>
<div className={styles.fieldValue}>{user.email}</div>
</div>

< div className={styles.field}>
 <div className={styles.fieldLabel}>Name</div>

<div className={styles.fieldValue}>{user.name}</div>
 </div>
 <div className={styles.btnGrp}>
 {checkIfUserIsAFriend() ? (
  <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
 ):(
  <button className={`button ${styles.saveBtn}`}>Add Friend</button>
 )}
 
 </div>
 </div>
  )
}

export default UserProfile

