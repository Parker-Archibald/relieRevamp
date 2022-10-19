import React, {useState, useEffect} from 'react';
import '../Styles/QuoteList.css';
import {IoIosArrowForward} from 'react-icons/io';


const QuotesList = (props) => {

    const [quote, setQuote] = useState({
        quoteDate: '',
        quote_id: props.info.quote_id,
        quote_name: props.info.quote_name,
        quote_phone: props.info.quote_phone,
        quote_status: props.info.quote_status,
        quote_tot1: props.info.quote_tot1,
        quote_tot2: props.info.quote_tot2,
        sq_foot: props.info.sq_foot
    })

    useEffect(() => {
        changeDate(props.info.quote_date);
    }, [])

    async function changeDate(date) {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();
        const newDate = month + '/' + day + '/' + year;

        setQuote(previousData => {
            return {...previousData, quoteDate: newDate}
        })
    }

    return (
        <div id='quoteListContainer'>
            <div id='quoteListTitleContainer'>
                <div id='quoteListTitle'>{quote.quote_name}</div>
                <div id='quoteListDate'>{quote.quoteDate}</div>
                <IoIosArrowForward id='quoteArrow'/>
            </div>
            <div id='quoteDetailContainer'>
                la
            </div>
        </div>
    )
}

export default QuotesList;