import React from 'react'
import Header from '../Components/Header'
import SignupSignInComponent from '../Components/SignupSignin/SignupSignInComponent'

function Signup() {
  return (
    <div>
      <Header></Header>
      <div className='wrapper'>
        <SignupSignInComponent></SignupSignInComponent>
      </div>
    </div>
  )
}

export default Signup