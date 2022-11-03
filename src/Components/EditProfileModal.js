import React, {useState, useEffect} from 'react';
import '../Styles/EditProfileModal.css';
import {RELIE_API} from '../Config/Com';

const EditProfileModal = (props) => {

    const [state, setState] = useState({
        first_name: '', 
        last_name: '', 
        email: '', 
        phone_number: '',
        maritalStatus: '',
        address: ''
    })

    useEffect(() => {

        setState(previousData =>{
            return {...previousData, maritalStatus: props.info.maritalStatus}
        })

        getPersonInfo();

    }, [])

    async function getPersonInfo () {
        await fetch(`${RELIE_API}profile/${localStorage.getItem('id')}`)
        .then(results => results.json())
        .then(results => {
            setState({first_name: results[0].first_name, last_name: results[0].last_name, email: results[0].email, 
                phone_number: results[0].phone_number, joined: results[0].created, status: results[0].status, address: results[0].address
            })
            
            if(results[1].marital_status === 'U') {
                setState(previousData => {
                    return {...previousData, maritalStatus: "Unmarried"}
                })
            }

            if(results[1].marital_status === 'M') {
                setState(previousData => {
                    return {...previousData, maritalStatus: "Married"}
                })
            }
        }
        )
    }

    const openModal = () => {
            document.getElementById('profileModal').className = 'profileModalAfter';
            document.getElementById('profileAll').style = 'filter: blur(10px)';
    }

    const closeModal = () => {
        document.getElementById('profileModal').className = 'profileModalAfterClose';
        document.getElementById('profileAll').style = 'filter: blur(0px)';
    }

    const handleChange = (e) => {

        if(e.target.name === 'first_name') {
            if(e.target.value === '') {
                setState(previousData => {
                    return {...previousData, first_name: props.info.first_name}
                })
            }
            else {
                setState(previousData => {
                    return {...previousData, first_name: e.target.value}
                })
            }
        }

        if(e.target.name === 'last_name') {
            if(e.target.value === '') {
                setState(previousData => {
                    return {...previousData, last_name: props.info.last_name}
                })
            }
            else {
                setState(previousData => {
                    return {...previousData, last_name: e.target.value}
                })
            }
        }
        
        if(e.target.name === 'email') {
            if(e.target.value === '') {
                setState(previousData => {
                    return {...previousData, email: props.info.email}
                })
            }
            else {
                setState(previousData => {
                    return {...previousData, email: e.target.value}
                })
            }
        }

        if(e.target.name === 'phone') {
            if(e.target.value === '') {
                setState(previousData => {
                    return {...previousData, phone_number: props.info.phone}
                })
            }
            else {
                setState(previousData => {
                    return {...previousData, phone_number: e.target.value}
                })
            }
        }

        if(e.target.name === 'maritalStatus') {
            if(e.target.value === '') {
                setState(previousData => {
                    return {...previousData, maritalStatus: props.info.maritalStatus}
                })
            }
            else {
                setState(previousData => {
                    return {...previousData, maritalStatus: e.target.value}
                })
            }
        }
    }

    async function handleSave() {

        await fetch(`${RELIE_API}myProfile/${localStorage.getItem('id')}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(state)
        })
        .then(results => results.json())
        .then(results => alert(results.message))
        .then(setTimeout("document.location.reload(true)", 200))
    }

    return (
        <div id='editProfileModalContainer'>
            <div id='profileEditButton' onClick={openModal}>Edit Profile</div>
            <div id='profileModal' className='profileModal'>
                <div id='editProfileTitle'>{state.first_name} {state.last_name}</div>
                <div id='editProfileX' onClick={closeModal}>X</div>
                <img src={require('../Styles/Pictures/profile.png')} id='editProfileModalPicture'/>
                <form id='editProfileModalInfo'>
                    <div id='profileModalFnameText'>First Name: <input id='profileModalFname' name='first_name' placeholder={state.first_name} onChange={handleChange}/></div>
                    <div id='profileModalLnameText'>Last Name: <input id='profileModalLname' name='last_name' placeholder={state.last_name} onChange={handleChange}/></div>
                    <div id='profileModalEmailText'>Email: <input id='profileModalEmail' name='email' placeholder={state.email} onChange={handleChange}/></div>
                    <div id='profileModalPhoneText'>Phone Number: <input id='profileModalPhone' name='phone' placeholder={state.phone_number} onChange={handleChange}/></div>
                    <div id='profileModalMaritalStatusText'>Marital Status: 
                        <select id='profileModalMaritalStatus' name='maritalStatus' placeholder={state.maritalStatus} onChange={handleChange}>
                            <option value="" selected disabled hidden>{state.maritalStatus}</option>
                            <option>Married</option>
                            <option>Unmarried</option>
                        </select>
                    </div>
                    <div id='profileModalStreetText'>Street: <input id='profileModalStreet' name='street' placeholder={state.address} onChange={handleChange}/></div>
                    <div id='profileAddressContainer'>
                        <div id='profileModalCityText'>City: <input id='profileModalCity' name='city' onChange={handleChange}/></div>
                        <div id='profileModalZipCodeText'>Zip Code: <input id='profileModalZipCode' name='zipCode' onChange={handleChange}/></div>
                    </div>
                    <div id='profileModalButtons'>
                        <div id='profileModalCancelButton' onClick={closeModal}>Cancel</div>
                        <div id='profileModalSaveButton' onClick={handleSave}>Save</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal;