import React, {useState, useEffect} from 'react';
import '../Styles/Quotes.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {RELIE_API} from '../Config/Com';
import QuotesList from '../Components/QuotesList';
import {Link} from 'react-router-dom';

const Quotes = () => {

    const [quote, setQuote] = useState({
        quotes: []
    });

    useEffect(() => {
        getQuotes()
    }, [])

    async function getQuotes() {
        await fetch(`${RELIE_API}myQuotes/${localStorage.getItem('id')}`)
        .then(results => results.json())
        .then(results => results.map(data => <QuotesList info={data} key='quotes'/>))
        .then(results => setQuote({quotes: results}))
    }

    return (
        <div id='quotesContianer'>
            <div id='quotesTitle'>Quotes</div>
            <div id='quotesAll'>
                <div id='quotesTopContainer'>
                    <div id='quotesTopTitle'>My Quotes</div>
                    <Link to='/newQuote' id='addQuoteButton' style={{'color': 'black', 'textDecoration': 'none'}}>New Quote</Link>
                </div>
                <div id='quotesTopLine'/>
                <div id='searchQuotesContainer'>
                    <select id='searchByDropdown' defaultValue='Select'>
                        <option value='firstName'>First Name</option>
                        <option value='lastName'>Last Name</option>
                    </select>
                    <AiOutlineSearch id='searchMyOrdersIcon'/>
                    <input id='searchQuotesInput' placeholder='Search My Quotes'/>
                </div>
                <div id='allQuotesForRep'>
                    {quote.quotes}
                </div>
            </div>
        </div>
    )
}

export default Quotes;