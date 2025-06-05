import React, {useState} from 'react'
import Input from '../../customs/Input'
export function PasswordInput(){
    const [password, setPassword] = useState("");

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    return(
        <Input id="passwordInput" value={password} onChange={handlePasswordChange}></Input>
    )
}