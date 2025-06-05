import React, { useState } from 'react'
import Input from '../../customs/Input'

export function EmailInput(){
    const [email, setEmail] = useState("");

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    return (
        <Input id="emailInput" value={email} onChange={handleEmailChange}></Input>
    )
}