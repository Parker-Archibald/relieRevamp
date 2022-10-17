import React, {useState, useEffect} from 'react';
import '../Styles/EditProfileModal.css';
import {RELIE_API} from '../Config/Com';

const EditProfileModal = (props) => {

    const [state, setState] = useState({
        first_name: props.info.first_name, 
        last_name: props.info.last_name, 
        email: props.info.email, 
        phone: props.info.phone,
    })

    useEffect(() => {
        getPersonInfo();
    }, [])

    async function getPersonInfo () {
        await fetch(`${RELIE_API}profile/${localStorage.getItem('id')}`)
        .then(results => results.json())
        .then(results => setState({first_name: results[0].first_name, last_name: results[0].last_name, email: results[0].email, 
            phone: results[0].phone_number, joined: results[0].created, status: results[0].status
        }))
    }

    const openModal = () => {
            document.getElementById('profileModal').className = 'profileModalAfter';
            document.getElementById('profileAll').style = 'filter: blur(10px)';
    }

    const closeModal = () => {
        document.getElementById('profileModal').className = 'profileModalAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    return (
        <div id='editProfileModalContainer'>
            <div id='profileEditButton' onClick={openModal}>Edit Profile</div>
            <div id='profileModal' className='profileModal'>
                <div id='editProfileTitle'>{state.first_name} {state.last_name}</div>
                <img src={require('../Styles/Pictures/profile.png')} id='editProfileModalPicture'/>
                <form id='editProfileModalInfo'>
                    <div id='profileModalFnameText'>First Name: <input id='profileModalFname' placeholder={state.first_name}/></div>
                    <div id='profileModalLnameText'>Last Name: <input id='profileModalLname' placeholder={state.last_name}/></div>
                    <div id='profileModalEmailText'>Email: <input id='profileModalEmail' placeholder={state.email}/></div>
                    <div id='profileModalPhoneText'>Phone Number: <input id='profileModalPhone' placeholder={state.phone}/></div>
                    <div id='profileModalButtons'>
                        <div id='profileModalCancelButton' onClick={closeModal}>Cancel</div>
                        <div id='profileModalSaveButton'>Save</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal;