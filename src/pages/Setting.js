import React, { useState } from 'react'
import { useAuth } from '../hooks'
import styles from '../styles/setting.module.css'

const Setting = () => {
    const auth=useAuth();
 const [editMode, setEditMode]=useState(false)
 const [name, setName]=useState(auth.user ?.name ? auth.user.name : '')
 const [password, setPassword]=useState('')
 const [confirmPassword, setConfirmPassword]=useState('')
 const [savingForm, setSavingForm]=useState(false)  

const clearForm =() =>{
  setPassword('');
  setConfirmPassword('');
}

const updateProfile =async ()=>{
setSavingForm(true)
const response=await auth.updateUser(
  auth.user._id,
  name,
  password,
  confirmPassword,
    )
    if(response.success){
      setEditMode(false);
      setSavingForm(false)
      clearForm()
    }
    setSavingForm(false)
}
  return (
    <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""/>

        </div>

<div className={styles.field}>
 <div className={styles.fieldLabel}>Email</div>
<div className={styles.fieldValue}>{auth.user ?.email  }</div>
</div>

<div className={styles.field}>
 <div className={styles.fieldName}>Name</div>
 {editMode ? (
<input type='text' 
value={name}
onChange={(e)=> setName(e.target.value)} />
) : (
<div className={styles.fieldValue}>{auth.user ?.name  }</div>
)}
</div>

{editMode && (
    <>
    <div className={styles.field}>
 <div className={styles.fieldName}>Password</div>
 <input type='password'
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
   />
      </div>

 <div className={styles.field}>
 <div className={styles.fieldName}>Confirm Password</div>
    <input type='password'
    value={confirmPassword}
    onChange={(e)=>setConfirmPassword(e.target.value)} />  
      </div>
    </>
)}


 <div className={styles.btnGrp}>
    {editMode ? (
        <>
<button className={`button $(styles.saveBtn)`}
onClick={updateProfile}
disabled={savingForm}
>
     {savingForm ? 'saving profile..' : 'Save Profile'} </button>
        
     <button className={`button $(styles.editBtn)`}
      onClick={()=> setEditMode(false)}>
     Go Back </button> 
        </>
    ) :  (
    <button className={`button $(styles.editBtn)`}
    onClick={()=> setEditMode(true)}
    >Edit Profile </button>
    )}
    </div>                   
    </div>
  )
}

export default Setting

