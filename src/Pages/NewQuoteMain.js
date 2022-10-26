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

    const handleShiftName = (e) => {

        if(e.target.id === 'quoteMainNameText') {

        }

        if(document.getElementById(e.target.name).className === e.target.name || document.getElementById(e.target.name).className === `${e.target.name}AfterClose`) {
            document.getElementById(e.target.name).className = `${e.target.name}After`;
            // document.getElementById(e.target.id).placeholder = '';
        }

        else if(e.target.value) {
            return;
        }
        
        else {
            document.getElementById(e.target.name).className = `${e.target.name}AfterClose`;
        }
    }
    
    return (
        <div id='newQuoteMainContainer'>
            <div id='newQuoteMainTitle'>Quotes</div>
            <div id='newQuoteMainAll'>
                <div id='newQuoteTop'>
                    <div id='newQuoteAllTitle'>New Quote</div>
                    <div id='newQuoteDate'>{newQuote.date}</div>
                </div>
                <div id='quoteMainNameContainer'>
                    <div id='quoteMainNameText' className='quoteMainNameText' name='quoteMainNameText' onClick={handleShiftName}>Quote Name: </div>
                    <input type='name' id='quoteMainNameInput' name='quoteMainNameText' onClick={handleShiftName} onBlur={handleShiftName}/>
                    <div id='quoteMainPhoneText' className='quoteMainPhoneText'>Phone: </div>
                    <input type='phone' id='quoteMainPhoneInput' name='quoteMainPhoneText' onClick={handleShiftName} onBlur={handleShiftName}/>
                    
                </div>
                <br/><input placeholder='test' style={{'marginBottom': '2vh'}}/>
            </div>
        </div>
    )
}

export default NewQuoteMain;