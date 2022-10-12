import React from 'react';
import '../Styles/Dashboard.css';
import {Link} from 'react-router-dom';

const Dashboard = () => {
    return (
        <div id='dashboardContainer'>
            <div id='dashboardTitle'>Dashboard</div>
            <div id='dashboardProfileBox'>
                <Link to='/profile' style={{'textDecoration': 'none', 'color': 'black'}}>
                    <img src={require('../Styles/Pictures/profile.png')} id='dashboardProfilePic'/>
                    <div id='dashboardProfileTitle'>My Profile</div>
                </Link>
            </div>
            <div id='dashboardData'>
                <div id='dashboardQuotesBox'>
                    <div id='dashboardQuotesTitle'>My Quotes</div>
                    <div id='dashBoardQuotesAmount'>45</div>
                </div>
                <div id='dashboardOrdersBox'>
                    <div id='dashboardOrdersTitle'>My Orders</div>
                    <div id='dashBoardOrderAmount'>20</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;