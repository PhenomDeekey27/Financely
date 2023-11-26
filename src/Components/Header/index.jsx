import React, { useEffect } from 'react';
import "./style.css"
import { auth } from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import Userpic from "../../assets/user.png"
function Header() {
  const [user,loading]=useAuthState(auth);
  const navigate=useNavigate();
  useEffect(()=>
  {
    if(user)
    {
      navigate("/dashboard")

    }
  },[user,loading])
  function logoutFnc()
  {
    try
    {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged Out Successfully")
        navigate("/")
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });
    }catch(error)
    {
      toast.error(error)

    }
  

  }
  return (
  <div className="navbar">
    <p className='logo'>Financely</p>
    {user && (
    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
      <img src={user.photoURL ? user.photoURL :Userpic} alt="" referrerPolicy='no-referrer' style={{
        borderRadius:"50%",
        width:"2rem",
        height:'2rem'
      }} />
     
    <p className='logo link' onClick={logoutFnc}>Logout</p>
    </div>)}
  
   
  </div>
  )
}

export default Header