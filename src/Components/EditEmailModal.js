import React, {useState} from 'react';
import '../Styles/EditEmailModal.css';
import {RELIE_API} from '../Config/Com';

const EditEmailModal = (props) => {

    const [userInfo, setUserInfo] = useState({
        email: props.info.email
    })

    const closeModal = () => {
        document.getElementById('editEmailModalContainer').className = 'editEmailModalContainerAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    const handleChange = (e) => {

        if(e.target.value === '') {
            setUserInfo({email: props.info.email})
        }

        else {
            setUserInfo({email: e.target.value})
        }
    }

    async function handleUpdate() {
        await fetch(`${RELIE_API}myProfile/${localStorage.getItem('id')}/email`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(results => results.json())
        .then(results => alert(results.message))
        .then(setTimeout("document.location.reload(true)", 200))
    }

    return(
        <div id='editEmailModalContainer' className='editEmailModalContainer'>
            <div id='editEmailModalTitle'>{props.info.first_name} {props.info.last_name}</div>
            <div id='editEmailModalField'>
                <div id='editEmailModalItemText'>Email:</div>
                <input id='editEmailModalItem' placeholder={props.info.email} onChange={handleChange}/>
            </div>
            <div id='emailModalButtonsContainer'>
                    <div id='nameModalCancel' onClick={closeModal}>Cancel</div>
                    <div id='nameModalSubmit' onClick={handleUpdate}>Update</div>
            </div>
        </div>
    )
}

export default EditEmailModal; 