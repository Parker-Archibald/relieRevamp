import React, {useState, useEffect} from 'react';
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
import {RELIE_API} from '../Config/Com';

const Nav = () => {

    const [state, setState] = useState({
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('id');

        getUser(userId);
    }, [])

    async function getUser(userId) {
        await fetch(`${RELIE_API}user/${userId}`)
        .then(results => results.json())
        .then(results => setState({first_name: results[0].first_name, last_name: results[0].last_name}))
    }

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('id');
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

    const handleOpenPaperwork = () => {
        if(document.getElementById('paperworkContainer').className === 'paperworkContainer' || document.getElementById('paperworkContainer').className === 'paperworkContainerAfterClose') {
            document.getElementById('paperworkContainer').className = 'paperworkContainerAfter';
        }
        else {
            document.getElementById('paperworkContainer').className = 'paperworkContainerAfterClose';
        }
    }

    return (
        <div id='navContainer'>
            <div id='navHamburger' className='navHamburger' onClick={handleOpenNav}>
                <GiHamburgerMenu/>
            </div>
            <div id='navX' className='navX' onClick={handleCloseNav}>X</div>
            <div id='navAll' className='navAll'>
                <Link to='/profile' onClick={handleCloseNav}>
                    <div id='navProfilePic'>
                        {/* <CgProfile id='navProfileIcon'/> */}
                        <img src={require('../Styles/Pictures/profile.png')} id='navProfileIcon'/>
                    </div>
                </Link>
                <div id='navName'>
                    {state.first_name} {state.last_name}
                </div>
                <div id='navButtonsContainer'>
                    <Link to='/' id='navDashboardContainer' onClick={handleCloseNav} style={{'textDecoration': 'none', 'color': 'black'}}>
                        <MdOutlineDashboard id='navDashboardIcon'/>
                        <div id='navDashboardButton'>Dashboard</div>
                    </Link>
                    <Link to='/orders' id='navOrdersContainer' onClick={handleCloseNav} style={{'textDecoration': 'none', 'color': 'black'}}>
                        <MdOutlineShoppingCart id='navOrdersIcon'/>
                        <div id='navOrdersButton'>Orders</div>
                    </Link>
                    <Link to='/quotes' id='navQuotesContainer' onClick={handleCloseNav} style={{'textDecoration': 'none', 'color': 'black'}}>
                        <IoMdQuote id='navQuotesIcon'/>
                        <div id='navQuotesButton'>Quotes</div>
                    </Link>
                    <Link to='/training' id='navTrainingContainer' onClick={handleCloseNav} style={{'textDecoration': 'none', 'color': 'black'}}>
                        <MdCastForEducation id='navTrainingIcon'/>
                        <div id='navTrainingButton'>Training</div>
                    </Link>
                    <div id='navPaperworkContainer' onClick={handleOpenPaperwork}>
                        <FaPenNib id='navPaperworkIcon'/>
                        <div id='navPaperworkButton'>Paperwork</div>
                    </div>
                   <div id='paperworkContainer' className='paperworkContainer'>
                        <a href='https://www.irs.gov/pub/irs-pdf/f1099msc.pdf' target="_blank" id='tenNinteyNineContainer' style={{'textDecoration': 'none', 'color': 'black'}}>1099</a>
                        <a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank" id='W9Container' className='W9Container' style={{'textDecoration': 'none', 'color': 'black'}}>W-9</a>
                        <a href="https://reliesolutions.com/vendor/codefire/cfusermgmt/web/images/paper_work/2019%20Rep%20Agreement.pdf" target="_blank" id='reliContractContainer' className='reliContractContainer' style={{'textDecoration': 'none', 'color': 'black'}}>Reli Contract</a>
                        <a href="https://reliesolutions.com/vendor/codefire/cfusermgmt/web/images/paper_work/direct_dep_elevate.pdf" target="_blank" id='directDepositContainer' className='directDepositContainer' style={{'textDecoration': 'none', 'color': 'black'}}>Direct Deposit</a>
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