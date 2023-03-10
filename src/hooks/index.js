import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider";
import { editProfile, fetchUserFriends, login as UserLogin, register } from "../api";
import jwt from 'jwt-decode'
import { setItemLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage} from "../utils";


export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getUser =async () =>{
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if (userToken) {
          const user = jwt(userToken);
          const response=await fetchUserFriends()
          
          let friendships=[]
          if(response.success){
            friendships=response.data.friendships
          }
          setUser({
        ...user,
        friendships,
          });
        }
        setLoading(false);
      }
     getUser()
    }, []);
    
  
    const updateUser =async(userId, name, password, confirmPassword)=>{
      const response = await editProfile(userId, name, password, confirmPassword);
        console.log('response', response)

      if (response.success) {
         setUser(response.data.user);
        setItemLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
        );
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    }
    const login = async (email, password) => {
      const response = await UserLogin(email, password);
  
      if (response.success) {
        setUser(response.data.user);
        setItemLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
        );
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    };

    const signup= async (name,email, password, confirmPassword) => {
      const response= await register(name, email, password, confirmPassword)

      if(response.success){
        return{
          success:true
        }
      }else{
        return{
          success :false,
          message : response.message,
        }
      }
    }

  
    const logout = () => {
      setUser(null);
      removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };
  
    return {
      user,
      login,
      logout,
      loading,
      signup,
      updateUser,
    };
  };

// export const useAuth =()=>{
//     return useContext(AuthContext)
// }

// export const useProvideAuth =() =>{
//     const [user, setUser]=useState(null);
//     const [loading, setLoading]=useState(true)

// useEffect (() =>{
// const userToken=getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
//      if(userToken){
//         const user=jwt(userToken)
//         setUser(user)
       
//      }
//      setLoading(false)
//     },[])
    

//  const login = async(email, password)=> {
//  const response=await UserLogin(email, password)

//  if(response.success){
//     setUser(response.data.user)
// setItemLocalStorage(LOCALSTORAGE_TOKEN_KEY,
//     response.data.token ? response.data.token : null )
//     return{
//         success :true
//     }
//  }else{
//     return {
//         success : false,
//         message: response.message,
//     }
//  }
//     }
// const logout=() =>{}
//     setUser(null)
//    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
//     return{
//         user,
//         login,
//         logout,
//         loading
//     }
// }