import React, { useEffect, useState } from 'react';
import '../Styles/NewQuoteMain.css';

const NewQuoteMain = () => {

    const [newQuote, setNewQuote] = useState({
        date: ''
    })

    useEffect(() => {
        setDate();
    }, [])

    const setDate = () => {
        const parsedDate = new Date();
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();
        const newDate = month + '/' + day + '/' + year;

        setNewQuote({date: newDate})
    }

    return (
        <div id='newQuoteMainContainer'>
            <div id='newQuoteMainTitle'>Quotes</div>
            <div id='newQuoteMainAll'>
                <div id='newQuoteAllTitle'>New Quote</div>
                <div id='quoteMainNameContainer'>
                    {/* <div id='quoteMainNameText'>Quote Name: </div> */}
                    <input type='name' id='quoteMainNameInput' placeholder='Quote Name:'/>
                    <div id='newQuoteDate'>{newQuote.date}</div>
                </div>
            </div>
        </div>
    )
}

export default NewQuoteMain;