import React, {useState, useEffect} from 'react';
import '../Styles/Profile.css';
import {RELIE_API} from '../Config/Com';
import EditProfileModal from '../Components/EditProfileModal';
import EditNameModal from '../Components/EditNameModal';
import {FiEdit} from 'react-icons/fi';
import EditEmailModal from '../Components/EditEmailModal';
import EditPhoneModal from '../Components/EditPhoneModal';

const Profile = () => {

    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        maritalStatus: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('id');

        getUser(userId);

    }, [])

    async function getUser(userId) {
        await fetch(`${RELIE_API}profile/${userId}`)
        .then(results => results.json())
        .then(results => {
            const date = results[0].created

            const parsedDate = new Date(date);
            const day = parsedDate.getDate();
            const month = parsedDate.getMonth();
            const year = parsedDate.getFullYear();
            const newDate = month + '/' + day + '/' + year;

            setState({first_name: results[0].first_name, last_name: results[0].last_name, email: results[0].email, 
                phone: results[0].phone_number, joined: newDate, status: results[0].status, address: results[0].address, zipcode: results[0].zipcode
            })

            if(results[1].marital_status === 'U') {
                setState(previousData => {
                    return {...previousData, maritalStatus: "Unmarried"}
                })
            }
            else if(results[1].marital_status === "M") {
                setState(previousData => {
                    return {...previousData, maritalStatus: "Married"}
                })
            }
            else {
                setState(previousData => {
                    return {...previousData, maritalStatus: results[1].marital_status}
                })
            }
        });

    }

    return (
        <div id='profileContainer'>
            <div id='profileAll'>
                <div id='profileCircle'/>
                <img src={require('../Styles/Pictures/profile.png')} id='profilePic'/>
                <div id='profileTitle'>{state.first_name} {state.last_name}</div>
                <div id='profileInfoContainer'>
                    <div id='profileFirst'>
                        <div id='profileCatTitle'>Name:</div>
                        <div id='profileFirstText'>{state.first_name} {state.last_name}</div>
                        </div>
                    <div id='profileEmail'>
                        <div id='profileCatTitle'>Email:</div>
                        <div id='profileEmailText'>{state.email}</div>
                    </div>
                    <div id='profilePhone'>
                        <div id='profileCatTitle'>Phone:</div>
                        <div id='profilePhoneText'>{state.phone}</div>
                    </div>
                    <div id='profileAddress'><div id='profileCatTitle'>Address:</div><div id='profileAddressText'>{state.address}</div></div>
                    <div id='profileJoined'><div id='profileCatTitle'>Joined:</div><div id='profileJoinedText'>{state.joined}</div></div>
                    <div id='profileStatus'><div id='profileCatTitle'>Status:</div><div id='profileStatusText'>{state.status}</div></div>
                    <div id='profileMaritalStatus'><div id='profileMStatusTitle'>Marital Status:</div><div id='profileMaritalStatusText'>{state.maritalStatus}</div></div>
                </div>
            </div>
            <EditProfileModal info={state}/>
        </div>
    )
}

export default Profile;