import React, {useState, useEffect} from 'react';
import '../Styles/NewQuoteSecond.css';

const NewQuoteSecond = () => {

    const [newQuote, setNewQuote] = useState({
        quoteDate: ''
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

        setNewQuote({quoteDate: newDate})
        
    }

    return (
        <div>
            <div id='newQuoteMainTitle'>Quotes</div>
            <div id='newQuoteMainAll'>
                <div id='newQuoteMainTitleContainer'>
                    <div id='newQuoteMainAllTitle'>New Quote</div>
                    <div id='newQUoteMainAllDate'>{newQuote.quoteDate}</div>
                </div>
                <div id='newQuoteSecondQuoteAmountsContainer'>
                    <div id='newQuoteSecondQuote1Container'>
                        <div id='newQuoteSecondQuote1Text'>Quote 1 Original</div>
                        <div id='newQuoteSecondQuote1Amount'>$1200</div>
                    </div>
                    <div id='newQuoteSecondQuote2Container'>
                        <div id='newQuoteSecondQuote2Text'>Quote 2 Original</div>
                        <div id='newQuoteSecondQuote2Amount'>$1000</div>
                    </div>
                    <div id='newQuoteSecondFirstContainer'>
                        
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default NewQuoteSecond;