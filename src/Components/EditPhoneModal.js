import React from 'react';
import '../Styles/EditPhoneModal.css';

const EditPhoneModal = (props) => {

    const closeModal = () => {
        document.getElementById('editPhoneModalContainer').className = 'editPhoneModalContainerAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    return ( 
        <div id='editPhoneModalContainer' className='editPhoneModalContainer'>
            <div id='editPhoneModalTitle'>{props.info.first_name} {props.info.last_name}</div>
            <div id='phoneModalField'>
                <div id='phoneModalItemText'>Phone: </div>
                <input id='phoneModalItem' placeholder={props.info.phone}/>
            </div>
            <div id='nameModalButtonsContainer'>
                    <div id='nameModalCancel' onClick={closeModal}>Cancel</div>
                    <div id='nameModalSubmit'>Update</div>
            </div>
        </div>
    )
}

export default EditPhoneModal;