import React, {useState, useEffect} from 'react';
import '../Styles/QuoteList.css';
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';


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

    const openDetails = () => {
        if(!document.getElementById(`${quote.quote_name}quoteDetailContainer`).name || document.getElementById(`${quote.quote_name}quoteDetailContainer`).name === 'closed') {
            document.getElementById(`${quote.quote_name}quoteDetailContainer`).style.animation = 'openDetail .5s forwards';
            document.getElementById(`${quote.quote_name}quoteDetailContainer`).name = 'opened';
            document.getElementById('quoteArrow').style.display = 'none';
            document.getElementById('quoteArrowDownContainer').className = 'quoteArrowDownContainerAfter';
        }
        else {
            document.getElementById(`${quote.quote_name}quoteDetailContainer`).style.animation = 'closeDetail .25s forwards';
            document.getElementById(`${quote.quote_name}quoteDetailContainer`).name = 'closed';
            document.getElementById('quoteArrow').style.display = 'inherit';
            document.getElementById('quoteArrowDownContainer').className = 'quoteArrowDownContainer';
        }
    }

    return (
        <div id='quoteListContainer'>
            <div id='quoteListTitleContainer' onClick={openDetails}>
                <div id='quoteListTitle'>{quote.quote_name}</div>
                <div id='quoteListDate'>{quote.quoteDate}</div>
                <IoIosArrowForward id='quoteArrow' className='quoteArrow'/>
                <div id='quoteArrowDownContainer'  className='quoteArrowDownContainer'><IoIosArrowDown id='quoteArrowDown' className='quoteArrowDown'/></div>
            </div>
            <div id={`${quote.quote_name}quoteDetailContainer`} style={{
                'backgroundColor': 'aliceblue',
                'marginTop': '-4.5vw',
                'height': '0vh',
                'display': 'flex',
                'flexDirection': 'column',
                'overflow': 'hidden',
                }}>
                <div id='singleQuoteStatusText'>Status: <div id='singleQuoteStatus'>{quote.quote_status}</div></div>
                <div id='singleQuoteUnderline'/>
                <div id='singleQuotePhoneText'>Phone Number: <div id='singleQuotePhone'>{quote.quote_phone}</div></div>
                <div id='singleQuoteUnderline'/>
                <div id='singleQuoteSqFootText'>Square Foot: <div id='singleQuoteSqFoot'>{quote.sq_foot.toLocaleString()}</div></div>
                <div id='singleQuoteUnderline'/>
                <div id='singleQuoteTot1Text'>Total 1: <div id='singleQuoteTot1'>${quote.quote_tot1.toLocaleString()}</div></div>
                <div id='singleQuoteUnderline'/>
                <div id='singleQuoteTot2Text'>Total 2: <div id='singleQuoteTot2'>${quote.quote_tot2.toLocaleString()}</div></div>
            </div>
        </div>
    )
}

export default QuotesList;