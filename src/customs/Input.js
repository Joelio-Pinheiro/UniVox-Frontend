import React from 'react'

export default function Input({id, value, onChange}){
    return(
        <div className="inputContainer">
            <input id={id} value={value} onChange={onChange}></input>
        </div>
    )
}