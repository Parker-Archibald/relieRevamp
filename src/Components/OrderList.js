import React, {useState, useEffect} from 'react';
import '../Styles/OrderList.css';
import { RELIE_API } from '../Config/Com';
import {IoIosArrowForward} from 'react-icons/io';
const OrderList = (props) => {

    const [order, setOrder] = useState({
        cust_id: props.info[0].cust_id,
        order_id: props.info[0].order_id,
        quote_id: props.info[0].quote_id,
        total_amount: props.info[0].total_amount,
        order_date: props.info[0].order_date
    })

    useEffect(() => {
        getCustomerData();
    }, [])

    async function getCustomerData() {
        await fetch(`${RELIE_API}customerOrder/${order.cust_id}`)
        .then(results => results.json())
        .then(results => setOrder(previousData => {
            return {...previousData, fname: results[0].fname, lname: results[0].lname}
        }))

        
    }

    return(
        <div id='orderListContainer'>
            <div id='orderListName'>{order.fname} {order.lname}</div>
            <div id='orderListCost'>${(order.total_amount).toLocaleString()}</div>
            <IoIosArrowForward id='orderListArrow'/>
        </div>
    )
}

export default OrderList;