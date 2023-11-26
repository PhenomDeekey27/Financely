import React from 'react';
import "./style.css"

function Input({label,state,Setstate,placeholder,type}) {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input placeholder={placeholder} value={state} onChange={(e)=>Setstate(e.target.value)} className='custom-input' type={type} />
    </div>
  )
}

export default Input;