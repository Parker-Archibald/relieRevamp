import React, {useEffect, useState} from 'react';
import '../Styles/Orders.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {RELIE_API} from '../Config/Com';
import OrderList from '../Components/OrderList';
import Loading from '../Components/Loading';


const Orders = () => {

    const [order, setOrder] = useState({
        orderData: []
    });

    useEffect(() => {
        getOrders();
    },[])

    async function getOrders() {

        await fetch(`${RELIE_API}myOrders/${localStorage.getItem('id')}`)
        .then(results => results.json())
        .then(results => results.map(() => <OrderList info={results} key={order}/>))
        .then(results => setOrder({orderData: results}))
    }

    return(
        <div id='ordersContainer'>
            <div id='ordersTitle'>Orders</div>
            <div id='ordersAll'>
                <div id='addOrdersContainer'>
                    <div id='addOrdersTitle'>My Orders</div>
                    <div id='addOrdersButton'>New Order</div>
                </div>
                <div id='addOrdersLine'/>
                <div id='searchMyOrdersContainer'>
                    <select id='searchByDropdown' defaultValue='Select'>
                        <option value='firstName'>First Name</option>
                        <option value='lastName'>Last Name</option>
                    </select>
                    <AiOutlineSearch id='searchMyOrdersIcon'/>
                    <input type='search' id='searchMyOrders' placeholder='Search My Orders'/>
                </div>
                <div id='allOrdersContainer'>
                    {order.orderData}
                </div>
            </div>
            <Loading/>
        </div>
    )
}

export default Orders;