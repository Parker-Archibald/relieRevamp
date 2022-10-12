import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import ErrorPage from '../Pages/ErrorPage';
import Orders from '../Pages/Orders';
import Quotes from '../Pages/Quotes';
import Training from '../Pages/Training';
import Profile from '../Pages/Profile';

const Routing = () => {

    if(localStorage.getItem('isLoggedIn') === true || localStorage.getItem('isLoggedIn') === 'true' ) {
        return(
            <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/quotes' element={<Quotes/>}/>
                <Route path='/training' element={<Training/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        )
    }

    else {
        return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        )
    }
}

export default Routing;