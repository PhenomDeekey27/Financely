import "./login.css";

import React,{useState} from 'react';
import Button from "../Button/Button";
import Input from "../Input/Input";
import {GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth,db, doc } from '../../firebase';
import { toast } from "react-toastify";
import { getDoc,setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { provider } from "../../firebase";



function Showlogin({Setloginform}) {
    const [email,Setemail]=useState("");
  const [password,Setpassword]=useState("");
  const [loading,Setloading]=useState(false);
 
  const navigate=useNavigate();
 
 

  //signing with mail
  function loginWithEmail(){
    Setloading(true)
    if(email!="" && password!="")
    {
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged in");
    console.log(user);
    Setemail("");
    Setpassword("");
    Setloading(false)
    navigate("/dashboard")
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    Setloading(false)
  });
    }else
    {
      toast.error("All fields are required")
      Setloading(false)
    }
  
  }
  //signing with google


 
  //function for creating and saving user-info

  async function createDoc(user)
  {
    //make sure that the doc with the user does
    Setloading(true)
    if(!user) return;
    const userRef=doc(db,"users",user.uid);
    const userData= await getDoc(userRef);
    if(!userData.exists()){
    try{
    await setDoc(doc(db, "users",user.uid),
    {
      name:user.displayName ? user.displayName : name,
      email,
      photoUrl:user.photoUrl ? user.photoUrl : "",
      createdAt:new Date()
    });
    Setloading(false)
  }catch(e){
    toast.error(e.message)
    Setloading(false)

  }
}else
{
  toast.error("User already exists");
  Setloading(false)
}

  }


  function SignupWithGoogle()
  {
    Setloading(true)
    try
    {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
     
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("user>>>",user);
        toast.success("User Authenticated");
        createDoc(user)
        Setloading(false)
        navigate("/dashboard")
    
      }).catch((error) => {
        // Handle Errors here.
        
        console.log(error)
        Setloading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage)
        // ...
      });

    }catch(e)
    {
      toast.error(e.message)
      Setloading(false)
    }
   
  }







  return (
    <div className="login-wrapper">
          <h2 className='title'>Login on <span style={{color:"var(--theme)"}}>Financely</span></h2>
        <form>
          <Input placeholder={"johnDoe123@gmail.com"} state={email} Setstate={Setemail} label={"Email"} type="mail" ></Input>
          <Input placeholder={"Password"} state={password} Setstate={Setpassword} label={"Example@123"} type="password" ></Input>
          <Button text={ loading ? "Loading..." : "Login Using Email and password"} onClick={loginWithEmail} disabled={loading}></Button>
          <p className="p-login">Or</p>
          <Button text={loading ? "Loading..." : "Login Using Google"} blue={true} onClick={()=>SignupWithGoogle()} ></Button>
          <p className="p-login" onClick={()=>Setloginform(false)}>Don't have an account ? click here </p>
        </form>

    </div>
  )
}

export default Showlogin;