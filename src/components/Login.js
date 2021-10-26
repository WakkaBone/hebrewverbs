import React, {useState} from 'react';
import "firebase/auth"
import {auth} from "../Config";

const Login = ({currentUser, setCurrentUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messageSignUp, setMessageSignUp] = useState('')
    const [messageSignIn, setMessageSignIn] = useState('')
    const signUp = (email, password) => {auth.createUserWithEmailAndPassword(email, password).catch(e => {
        setMessageSignIn('')
        setMessageSignUp('Oops, something went wrong')
    })}
    const signIn = (email, password) => {auth.signInWithEmailAndPassword(email, password).catch(res => {
        setMessageSignUp('')
        setMessageSignIn('Oops, something went wrong')
    })
    }

    return (
        <div>
        <div className='registerAndLogin'>
            {currentUser ? '' : <input className='mobileAuthInputs' onChange={(e) => {
                setMessageSignUp('')
                setMessageSignIn('')
                setEmail(e.target.value)
            }} type='text' placeholder='e-mail'/>}
            {currentUser ? '' : <input className='mobileAuthInputs' onChange={(e) => {
                setMessageSignUp('')
                setMessageSignIn('')
                setPassword(e.target.value)
            }} type='password' placeholder='password (min 8 symbols)'/>}
            {currentUser ? '' : <button className='buttonTest' onClick={() => signUp(email, password)}>Sign up</button>}
            {currentUser ? '' : <button className='buttonTest' onClick={() => signIn(email, password)}>Sign in</button>}
        </div>
            <div style={{textAlign: 'center', marginTop: '5px'}}><p className='message'>{messageSignIn ? messageSignIn : ''}{messageSignUp ? messageSignUp : ''}</p></div>
            </div>
    );
};

export default Login;