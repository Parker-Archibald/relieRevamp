import React from 'react';
import '../Styles/Login.css';
import { useState } from 'react';
import {RELIE_API} from '../Config/Com';

const Login = () => {

    const [state, setState] = useState({
        // testEmail: 'test@test.com',
        // testPassword: 'test',
        tempEmail: '',
        tempPassword: ''

    });

    const handleChange = (e) => {
        setState(previousData => {
            return {...previousData, [e.target.name]: e.target.value}
        })
    }

    async function handleLogin() {

        await fetch(`${RELIE_API}user/${state.tempEmail}/${state.tempPassword}`)
        .then(results => results.json())
        .then(results => {
            if(results.loggedIn === true) {
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('id', `${results.id}`)
                setTimeout("document.location.reload(true)", 200);
            }
            else {
                alert(results.message)
            }
        })

        // testing hard coded login

        // if(state.tempEmail === state.testEmail && state.tempPassword === state.testPassword) {

        //     localStorage.setItem('isLoggedIn', true)
        //     setTimeout("document.location.reload(true)", 200);
        // }
        // else {
        //     alert('Not logged in!')
        // }
    }

    return (
        <div id='loginContainer'>
            <img src={require('../Styles/Pictures/Logo.png')} id='loginLogo'/>
            <div id='loginTitle'>Reli Energy Solutions</div>
            <form id='loginForm'>
                <input type='email' name='tempEmail' placeholder='Email' id='loginEmail' onChange={handleChange}/>
                <input type='password' name='tempPassword' placeholder='Password' id='loginPassword' onChange={handleChange}/>
                <div id='loginButton' onClick={handleLogin}>Login</div>
            </form>
        </div>
    )
}

export default Login;