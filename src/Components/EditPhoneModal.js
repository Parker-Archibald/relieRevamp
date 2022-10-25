import React, {useState} from 'react';
import '../Styles/EditPhoneModal.css';
import {RELIE_API} from '../Config/Com';

const EditPhoneModal = (props) => {

    const [profileInfo, setProfileInfo] = useState({
        phone_number: props.info.phone
    })

    const closeModal = () => {
        document.getElementById('editPhoneModalContainer').className = 'editPhoneModalContainerAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    const handleChange = (e) => {
        if(e.target.value === '') {
            setProfileInfo({phone_number: props.info.phone})
        }
        else {
            setProfileInfo({phone_number: e.target.value})
        }
        
    }

    async function handleUpdate() {
        await fetch(`${RELIE_API}myProfile/${localStorage.getItem('id')}/phone`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(profileInfo)
        })
        .then(results => results.json())
        .then(results => alert(results.message))
        .then(setTimeout("document.location.reload(true)", 200))
    }

    return ( 
        <div id='editPhoneModalContainer' className='editPhoneModalContainer'>
            <div id='editPhoneModalTitle'>{props.info.first_name} {props.info.last_name}</div>
            <div id='phoneModalField'>
                <div id='phoneModalItemText'>Phone: </div>
                <input id='phoneModalItem' placeholder={props.info.phone} onChange={handleChange}/>
            </div>
            <div id='nameModalButtonsContainer'>
                    <div id='nameModalCancel' onClick={closeModal}>Cancel</div>
                    <div id='nameModalSubmit' onClick={handleUpdate}>Update</div>
            </div>
        </div>
    )
}

export default EditPhoneModal;