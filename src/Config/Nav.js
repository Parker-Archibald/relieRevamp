import React, {useState} from 'react';
import '../Styles/Nav.css';
import {Link} from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import {MdOutlineDashboard} from 'react-icons/md';
import {MdOutlineShoppingCart} from 'react-icons/md';
import {IoMdQuote} from 'react-icons/io';
import {MdCastForEducation} from 'react-icons/md';
import {FaPenNib} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {GiHamburgerMenu} from 'react-icons/gi';

const Nav = () => {

    const [state, setState] = useState({
        first_name: 'Parker',
        last_name: 'Archibald'
    });

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        setTimeout("document.location.reload(true)", 200);
    }

    const handleOpenNav = () => {
        document.getElementById('navAll').className = 'navAllAfter';
        document.getElementById('navX').className = 'navXAfter';
    }

    const handleCloseNav = () => {
        document.getElementById('navAll').className = 'navAllAfterClose';
        document.getElementById('navX').className = 'navX';
    }

    return (
        <div id='navContainer'>
            <div id='navHamburger' className='navHamburger' onClick={handleOpenNav}>
                <GiHamburgerMenu/>
            </div>
            <div id='navX' className='navX' onClick={handleCloseNav}>X</div>
            <div id='navAll' className='navAll'>
                <div id='navProfilePic'>
                    {/* <CgProfile id='navProfileIcon'/> */}
                    <img src={require('../Styles/Pictures/profile.png')} id='navProfileIcon'/>
                </div>
                <div id='navName'>
                    {state.first_name} {state.last_name}
                </div>
                <div id='navButtonsContainer'>
                    <Link to='/' id='navDashboardContainer' style={{'textDecoration': 'none', 'color': 'black'}}>
                        <MdOutlineDashboard id='navDashboardIcon'/>
                        <div id='navDashboardButton'>Dashboard</div>
                    </Link>
                    <Link to='/orders' id='navOrdersContainer' style={{'textDecoration': 'none', 'color': 'black'}}>
                        <MdOutlineShoppingCart id='navOrdersIcon'/>
                        <div id='navOrdersButton'>Orders</div>
                    </Link>
                    <Link to='/quotes' id='navQuotesContainer' style={{'textDecoration': 'none', 'color': 'black'}}>
                        <IoMdQuote id='navQuotesIcon'/>
                        <div id='navQuotesButton'>Quotes</div>
                    </Link>
                    <Link to='/training' id='navTrainingContainer' style={{'textDecoration': 'none', 'color': 'black'}}>
                        <MdCastForEducation id='navTrainingIcon'/>
                        <div id='navTrainingButton'>Training</div>
                    </Link>
                    <div id='navPaperworkContainer'>
                        <FaPenNib id='navPaperworkIcon'/>
                        <div id='navPaperworkButton'>Paperwork</div>
                    </div>
                    <Link to='/' id='navLogoutContainer' onClick={handleLogout} style={{'textDecoration': 'none', 'color': 'black'}}>
                        <FiLogOut id='navLogoutIcon'/>
                        <div id='navLogoutButton'>Logout</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;