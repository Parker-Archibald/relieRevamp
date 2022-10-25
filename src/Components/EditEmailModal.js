import React from 'react';
import '../Styles/EditEmailModal.css';

const EditEmailModal = (props) => {

    const closeModal = () => {
        document.getElementById('editEmailModalContainer').className = 'editEmailModalContainerAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    return(
        <div id='editEmailModalContainer' className='editEmailModalContainer'>
            <div id='editEmailModalTitle'>{props.info.first_name} {props.info.last_name}</div>
            <div id='editEmailModalField'>
                <div id='editEmailModalItemText'>Email:</div>
                <input id='editEmailModalItem' placeholder={props.info.email}/>
            </div>
            <div id='emailModalButtonsContainer'>
                    <div id='nameModalCancel' onClick={closeModal}>Cancel</div>
                    <div id='nameModalSubmit'>Update</div>
            </div>
        </div>
    )
}

export default EditEmailModal; 