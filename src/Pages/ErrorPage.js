import React from 'react';
import '../Styles/ErrorPage.css';

const ErrorPage = () => {
    return (
        <div id='errorPageContainer'>
            <img src={require('../Styles/Pictures/Logo.png')} id='errorPagePic'/>
            <div id='errorText'>Sorry, this page does not exist!</div>
        </div>
    )
}

export default ErrorPage;