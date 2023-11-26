import React, { useState } from 'react';
import "./style.css"
import Input from '../Input/Input';
import Button from '../Button/Button';
import {GoogleAuthProvider, createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { auth,db, doc } from '../../firebase';
import {toast} from "react-toastify";
import Showlogin from './Showlogin';
import { useNavigate } from 'react-router-dom';
import { getDoc,setDoc } from 'firebase/firestore';
// import { GoogleAuthProvider } from 'firebase/auth';
import { provider } from '../../firebase';


function SignupSignInComponent() {
  const [name,Setname]=useState("");
  const [email,Setemail]=useState("");
  const [password,Setpassword]=useState("");
  const [cpassword,Setcpassword]=useState("");
  const[loading,Setloading]=useState(false);
  const[loginform,Setloginform]=useState(false);
  const navigate=useNavigate();
 
  
  function SignupWithEmail()
  {
    //authentication 
    console.log(name,email,password,cpassword);
    Setloading(true)
    if(name!=="" && email!=="" && password!=="" && cpassword!==""){
      if(password==cpassword){

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    toast.success("User Created")
    Setloading(false)
    Setname("");
    Setemail("");
    Setpassword("");
    Setcpassword("");
    createDoc(user)
    navigate("/dashboard")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    Setloading(false)
    // ..
  });
}else
{
  toast.error("Password and Confirm Password doesnt match");
  Setloading(false);
}
}
else
{
  toast.error("All fields are required")
  Setloading(false)
}
  }

  //code for saving the documents of the user


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
 
//code for signup and signin with google
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
        navigate("/dashboard")
        Setloading(false)
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
  
          <>
          {loginform ? <Showlogin Setloginform={Setloginform}/> :
    <div className='signup-wrapper'>
      <h2 className='title'>Signup on <span style={{color:"var(--theme)"}}>Financely</span></h2>
      <form>
        <Input placeholder={"john Doe"} state={name} Setstate={Setname} label={"Full name"} type="text"></Input>
        <Input placeholder={"johnDoe123@gmail.com"} state={email} Setstate={Setemail} label={"Email"} type="mail" ></Input>
        <Input placeholder={"Password"} state={password} Setstate={Setpassword} label={"Example@123"} type="password" ></Input>
        <Input placeholder={"Confirm your password"} state={cpassword} Setstate={Setcpassword} label={"Example@123"} type="password"></Input>
        <Button text={ loading ? "Loading..." : "Signup Using Email and password"} onClick={SignupWithEmail} disabled={loading}></Button>
        <p className='p-login'>Or</p>
        <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true} onClick={()=>SignupWithGoogle()}></Button>
        <p className='p-login' onClick={()=>Setloginform(true)}>Have an account already? Click Here</p>
      </form>
     
    </div>
}
    </>
  )
  
   
  
}

export default SignupSignInComponent