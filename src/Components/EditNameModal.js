import React from 'react';
import '../Styles/EditNameModal.css';

const EditNameModal = (props) => {

    const closeModal = () => {
        document.getElementById('nameModalContainer').className = 'nameModalContainerAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    return (
        <div id='nameModalContainer' className='nameModalContainer'>
            <div id='nameModalTitle'>{props.info.first_name} {props.info.last_name}</div>
            <div id='nameModalField'>
                <div id='firstNameContainer'>
                    <div id='firstNameText'>First Name: </div>
                    <input id='firstNameItem' placeholder={props.info.first_name}/>
                </div>
                <div id='lastNameContainer'>
                    <div id='lastNameText'>Last Name: </div>
                    <input id='lastNameItem' placeholder={props.info.last_name}/>
                </div>
                <div id='nameModalButtonsContainer'>
                    <div id='nameModalCancel' onClick={closeModal}>Cancel</div>
                    <div id='nameModalSubmit'>Update</div>
                </div>
            </div>
        </div>
    )
}

export default EditNameModal;