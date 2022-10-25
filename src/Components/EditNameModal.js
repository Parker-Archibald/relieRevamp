import React, {useState} from 'react';
import '../Styles/EditNameModal.css';
import {RELIE_API} from '../Config/Com';

const EditNameModal = (props) => {

    const [user, setUser] = useState({
        first_name: props.info.first_name,
        last_name: props.info.last_name
    });

    const closeModal = () => {
        document.getElementById('nameModalContainer').className = 'nameModalContainerAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    const handleChange = (e) => {
        setUser(previousData => {
            return {...previousData, [e.target.name]: e.target.value}
        })
    }

    async function handleUpdate() {

        if(user.first_name === '') {
            setUser(previousData => {
                return {...previousData, first_name: props.info.first_name}
            })
        }

        if(user.last_name === '') {
            setUser(previousData => {
                return {...previousData, last_name: props.info.last_name}
            })
        }

        await fetch(`${RELIE_API}myProfile/${localStorage.getItem('id')}/name`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(results => results.json())
        .then(results => alert(results.message))
        .then(setTimeout("document.location.reload(true)", 200))
    }

    return (
        <div id='nameModalContainer' className='nameModalContainer'>
            <div id='nameModalTitle'>{props.info.first_name} {props.info.last_name}</div>
            <div id='nameModalField'>
                <div id='firstNameContainer'>
                    <div id='firstNameText'>First Name: </div>
                    <input id='firstNameItem' placeholder={props.info.first_name} onChange={handleChange} name='first_name'/>
                </div>
                <div id='lastNameContainer'>
                    <div id='lastNameText'>Last Name: </div>
                    <input id='lastNameItem' placeholder={props.info.last_name} onChange={handleChange} name='last_name'/>
                </div>
                <div id='nameModalButtonsContainer'>
                    <div id='nameModalCancel' onClick={closeModal}>Cancel</div>
                    <div id='nameModalSubmit' onClick={handleUpdate}>Update</div>
                </div>
            </div>
        </div>
    )
}

export default EditNameModal;