import React, {useState, useEffect} from 'react';
import '../Styles/Profile.css';
import {RELIE_API} from '../Config/Com';

const Profile = () => {

    const [state, setState] = useState({
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('id');

        getUser(userId);

    }, [])

    async function getUser(userId) {
        await fetch(`${RELIE_API}profile/${userId}`)
        .then(results => results.json())
        .then(results => setState({first_name: results[0].first_name, last_name: results[0].last_name, email: results[0].email, 
            phone: results[0].phone_number, joined: results[0].created, status: results[0].status
        }))

        console.log(state.status)

        // if(state.status === 1) {
        //     setState(previousData => {
        //         return {...previousData, status: 'Active'}
        //     })
        //     console.log(state.status)
        // }
        // else {
        //     setState(previousData => {
        //         return {...previousData, status: 'Inactive'}
        //     })
        //     console.log(state.status)
        // }
    }

    return (
        <div id='profileContainer'>
            <div id='profileCircle'/>
            <img src={require('../Styles/Pictures/profile.png')} id='profilePic'/>
            <div id='profileTitle'>{state.first_name} {state.last_name}</div>
            <div id='profileInfoContainer'>
                <div id='profileFirst'>First Name: {state.first_name}</div>
                <div id='profileLast'>Last Name: {state.last_name}</div>
                <div id='profileEmail'>Email: {state.email}</div>
                <div id='profilePhone'>Phone: {state.phone}</div>
                <div id='profileJoined'>Joined: {state.joined}</div>
                <div id='profileStatus'>Status: {state.status}</div>
            </div>
        </div>
    )
}

export default Profile;