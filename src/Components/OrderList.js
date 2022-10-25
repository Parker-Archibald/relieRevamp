import React, {useState, useEffect} from 'react';
import '../Styles/OrderList.css';
import { RELIE_API } from '../Config/Com';
import {IoIosArrowForward} from 'react-icons/io';
const OrderList = (props) => {

    const [order, setOrder] = useState({
        cust_id: props.info.cust_id,
        order_id: props.info.order_id,
        quote_id: props.info.quote_id,
        total_amount: 0,
        order_date: props.info.order_date
    })

    useEffect(() => {
        setTotal();
        getCustomerData();
    }, [])

    async function getCustomerData() {
        await fetch(`${RELIE_API}customerOrder/${order.cust_id}`)
        .then(results => results.json())
        .then(results => setOrder(previousData => {
            return {...previousData, fname: results[0].fname, lname: results[0].lname}
        }))
    }

    async function setTotal() {
        if(!props.info.total_amount || props.info.total_amount === null) {
            return
        }
        else {
            setOrder(previousData => {
                return {...previousData, total_amount: props.info.total_amount}
            })
        }
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