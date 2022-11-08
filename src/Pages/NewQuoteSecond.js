import React, {useState, useEffect} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import '../Styles/NewQuoteSecond.css';
import { RELIE_API } from '../Config/Com';

const NewQuoteSecond = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [newQuote, setNewQuote] = useState({
        quoteDate: '',
        previousTotal1: 0,
        previousTotal2: 0,
        prodList: ''
    })

    useEffect(() => {
        setDate();

        setPrevioustotals();

        getProducts();
    }, [])

    const setDate = () => {
        const parsedDate = new Date();
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();
        const newDate = month + '/' + day + '/' + year;

        setNewQuote({quoteDate: newDate})
        
    }

    const setPrevioustotals = () => {
        setNewQuote(previousData => {
            return {...previousData, previousTotal1: location.state.total.total1, previousTotal2: location.state.total.total2}
        })
    }

    async function getProducts() {
        await fetch(`${RELIE_API}getProducts`)
        .then(results => results.json()) 
        .then(results => {

            let prodIdThree = []

            for(let i = 0; i < results.length; i++) {
                if(results[i].prod_type_id === 3) {
                    prodIdThree.push(results[i])
                }
            }

            // setNewQuote(previousData => {
            //     return {...previousData, prodListRaw: prodIdThree}
            // })

            prodIdThree = prodIdThree.map(prod => {

                const handleProdShift = (e) => {

                    if(!e.target.info) {
                        document.getElementById(e.target.id).info = 'closed'
                    }

                    if(document.getElementById(e.target.id).info === 'closed') {
                        document.getElementById(e.target.id).style.animation = 'moveProductName .25s forwards';
                        document.getElementById(e.target.id).info = 'opened';
                        document.getElementById(`${prod.prod_name}Amount1`).style.display = 'inherit';
                        document.getElementById(`${prod.prod_name}Amount2`).style.display = 'inherit';
                        document.getElementById(`${prod.prod_name}Amount1`).innerHTML = prod.prod_cost;
                        document.getElementById(`${prod.prod_name}Amount2`).innerHTML = prod.prod_cost;
                    }
                    else {
                        document.getElementById(e.target.id).style.animation = 'moveProductNameBack .25s forwards';
                        document.getElementById(e.target.id).info = 'closed';
                        document.getElementById(`${prod.prod_name}Amount1`).style.display = 'none';
                        document.getElementById(`${prod.prod_name}Amount2`).style.display = 'none';
                    }
                }

                return (
                    <div id={`${prod.prod_name}Container`} style={{
                        'display': 'flex',
                        'marginTop': '2vh',
                        'borderBottom': '1px solid lightgray',
                        'paddingBottom': '2vh', 
                        'width': '100%',
                    }}>
                        <div id={`${prod.prod_name}Title`} info='closed' style={{
                            'position': 'relative',
                            'width': '50%',
                            'left': '25%',
                            'textAlign': 'center'
                        }} onClick={handleProdShift}>
                                {prod.prod_name}
                        </div>
                        <div id={`${prod.prod_name}Amount1`} style={{'marginLeft': '15vw', 'display': 'none'}}>{newQuote.previousTotal1}</div>
                        <div id={`${prod.prod_name}Amount2`} style={{'marginLeft': '10vw', 'display': 'none'}}>{newQuote.previousTotal2}</div>
                    </div>
                )
            })

            setNewQuote(previousData => {
                return {...previousData, prodList: prodIdThree}
            })
        })
    }

    const handleProdShiftOuter = (e) => {
        
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
                        <div id='newQuoteSecondQuote1Amount'>${newQuote.previousTotal1}</div>
                    </div>
                    <div id='newQuoteSecondQuote2Container'>
                        <div id='newQuoteSecondQuote2Text'>Quote 2 Original</div>
                        <div id='newQuoteSecondQuote2Amount'>${newQuote.previousTotal2}</div>
                    </div>
                </div> 
                <div id='newQuoteSecondFirstContainer'>
                        {newQuote.prodList}
                        <div id='newQuoteSecondTotalAfterInstallContainer'>
                            <div id='newQuoteSecondTotalAfterInstallTitle'>Cost at Install</div>
                            <div id='newQUoteSecondTotalAfterInstallAmount1'>{newQuote.previousTotal1}</div>
                            <div id='newQUoteSecondTotalAfterInstallAmount2'>{newQuote.previousTotal2}</div>
                        </div>
                        <div id='newQuoteSecondRebateContainer'>
                            <div id='newQuoteSecondRebateTitle' className='newQuoteSecondRebateTitle' onClick={handleProdShiftOuter}>Rebate</div>
                            <div id='newQuoteSecondRebate1' className='newQuoteSecondRebate1'>{newQuote.previousTotal1}</div>
                            <div id='newQuoteSecondRebate2' className='newQuoteSecondRebate2'>{newQuote.previousTotal1}</div>
                        </div>
                </div>
                <div id='newQuoteSecondBackButton' onClick={() => navigate(-1)}>Back</div>
            </div>
        </div>
    )
}

export default NewQuoteSecond;