//import { useEffect, useState } from 'react';
//import { getPosts } from '../api';
import { Home,Login, Signup, Setting,UserProfile} from '../pages';
import {Loader, Navbar} from './';
import {Routes, Route,Navigate} from 'react-router-dom';
import { useAuth } from '../hooks';

//import Signup from '../pages/Signup';
// import { BrowserRouter as Router, Route} from 'react-router-dom';

// function PrivateRoute({children, ...rest}){
//   const auth=useAuth()
//   return(
//     <Route
//     {...rest}
//     render={()=>{
//       if(auth.user){
//         return children
//       }
//       return <Navigate to='/login' />
//     }}
    
//     />
//   )
// }

const About =() =>{
  return <h1>About</h1>
}
const UserInfo=()=>{
  return <h1>UserInfo</h1>
}
const Page404 =() =>{
  return <h1>PageNotFound</h1>
}
const App =() =>{
  const auth=useAuth();
   

    //const [posts, setPosts]=useState([])
  //  const [loading, setLoading]=useState(true)
  

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await getPosts();
//      //console.log('response', response);

//       if(response.success){
//       setPosts(response.data.posts)
//       } 
    
//       setLoading(false)
//     };
//  fetchPosts();
//   }, []);

  if(auth.loading){
    return <Loader/>
  }
  return (
    <div className="App">
      <h1>Hello world</h1>
      <Navbar/>
      <Routes>
<Route path="/" element={<Home posts={[]}/>}/>
        {/* <Route path="/">
           <Home  posts={posts} />
        </Route> */}

        {/* <Route path="/login">
          <Login />
        </Route> */}
<Route exact path="/login" element={<Login />}/>
<Route exact path='/register' element={<Signup/>}/>
<Route exact path="/about" element={<About />}/>
<Route exact path="/setting" element={<Setting />}/>
<Route exact path="/user/:userId" element={<UserProfile/>} />

        {/* <Route path="/about">
        <About />
        </Route> */}


      {/* <Route path="/user/abcd" element={<UserInfo/>} /> */}

  <Route exact path="/user/abc" element={<UserInfo />}/>
      {/* <Route path="/user/abcd">
        <UserInfo />
        </Route> */}
  <Route path='*' element={<Page404 />} />
       
      </Routes>
      
    </div>
  );
}

export default App;
