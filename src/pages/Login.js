import React from 'react'
import {Navigate} from 'react-router-dom'
import styles from '../styles/login.module.css';
import { useState } from 'react';
import {login} from '../api'
import { useAuth } from '../hooks';


const Login = () => {
const [email,setEmail] = useState('');
const [password, setPassword] = useState("");
const [logging, setLogging] = useState(false);
const auth=useAuth()
//console.log(auth)
    
  
const handleSubmit = async(e)=>{
      e.preventDefault();
      setLogging(true);
      const response=await auth.login(email, password);
       console.log(response);
      if(response.success){
        return{
            success :true
        }
      }
      setLogging(false)
    }
    //const response=await login(email, password)
   
    if(auth.user){
      return <Navigate to="/" />;
    }

  return (
    <div>
        <form className={styles.loginForm} onSubmit={handleSubmit} >
          <span className={styles.loginSignupHeader}>Log In</span>
          <div className={styles.field}>
            <input
              type="email"
              placeholder="Email"
              value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              placeholder="password"
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <div className={styles.field}>
          <button disabled={logging} >
             {logging?'Logging in...':'Log In'}
            </button>
          </div>
        </form>
      </div>
  )
}

export default Login
