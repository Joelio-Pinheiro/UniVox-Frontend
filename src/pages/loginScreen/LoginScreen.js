import React from 'react'
import { loginScreenStyle } from '../../styles/loginScreen/LoginScreenStyles'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'

export function LoginScreen(){
    return(
        <div className="loginScreen">
            <img src='C:\Users\luiz\Univox-Frontend\src\icons\UnivoxIcon2.jpeg' alt='Univox_label_1'></img>
            <h1 id="entryHeader">Entre na sua conta</h1>
            
            <EmailInput />
            <PasswordInput />

            <input id="reminder" type="checkbox"/>
        </div>
    )
}