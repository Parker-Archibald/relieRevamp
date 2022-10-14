import React, {useEffect, useState} from 'react';
import '../Styles/Dashboard.css';
import {Link} from 'react-router-dom';
import {RELIE_API} from '../Config/Com';

const Dashboard = () => {

    const [state, setState] = useState({
        quoteCount: 0,
        orderCount: 0
    });

    useEffect(() => {
        getQuoteCount();
    }, [])

    async function getQuoteCount() {
        fetch(`${RELIE_API}quotes&OrdersNumber/${localStorage.getItem('id')}`)
        .then(results => results.json())
        .then(results => setState({quoteCount: Object.values(results[0])[0], orderCount: Object.values(results[1])[0]}))
    }

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
                <Link to='/quotes' id='dashboardQuotesBox' style={{'textDecoration': 'none', 'color': 'black'}}>
                    <div id='dashboardQuotesTitle'>My Quotes</div>
                    <div id='dashBoardQuotesAmount'>{state.quoteCount}</div>
                </Link>
                <Link to='/orders' id='dashboardOrdersBox' style={{'textDecoration': 'none', 'color': 'black'}}>
                    <div id='dashboardOrdersTitle'>My Orders</div>
                    <div id='dashBoardOrderAmount'>{state.orderCount}</div>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;