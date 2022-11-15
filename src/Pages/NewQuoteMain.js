import React, { useEffect, useState } from 'react';
import '../Styles/NewQuoteMain.css';
import {RELIE_API} from '../Config/Com';
import {Link} from 'react-router-dom';

const NewQuoteMain = () => {

    const [newQuote, setNewQuote] = useState({
        date: '',
        allProducts: [],
        adminFees: [],
        insulationTypes: [],
    })

    const [totalAmount, setTotalAmount] = useState();

    useEffect(() => {
        setDate();

        getAllProducts();

        getInsulationTypes();
    }, [])

    const setDate = () => {
        const parsedDate = new Date();
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();
        const newDate = month + '/' + day + '/' + year;

        setNewQuote({date: newDate})
        
    }

    async function getAllProducts() {
        await fetch(`${RELIE_API}getProducts`)
        .then(results => results.json())
        .then(results => {
            let newAdminFees = [];
            let prodRest = [];
            let prodList = [];
            let tempAmount1 = 0;
            let tempAmount2 = 0;

            for(let i = 0; i < results.length; i++) {
                if(results[i].prod_type_id === 1) {
                    newAdminFees.push(results[i])
                }
                else if(results[i].prod_type_id === 4) {
                    setTotalAmount(() => {
                        return { total1: results[i].prod_cost, total2: results[i].prod_cost}
                    })
                    tempAmount1 = results[i].prod_cost
                    tempAmount2 = results[i].prod_cost
                }
                else {
                    prodRest.push(results[i])
                }
            }

            newAdminFees = newAdminFees.map(data => {
                return (<option>{data.prod_name}</option>)
            })

            for(let i = 0; i < prodRest.length; i++) {
                if(prodRest[i].prod_type_id === 2) {
                    prodList.push(prodRest[i])
                }
            }

            const handleOutlineClick = (e) => {
                document.getElementById(e.target.id).style.outline = 'none';
            }
        
            prodList = prodList.map(data => {

                const openInputs = (e) => {
                    if(document.getElementById(`${e.target.name}Quote1`).style.display === 'none') {
                        document.getElementById(`${e.target.name}Quote1`).style.display = 'inherit'
                        document.getElementById(`${e.target.name}Quote2`).style.display = 'inherit'
                    }
                    else {
                        document.getElementById(`${e.target.name}Quote1`).style.display = 'none'
                        document.getElementById(`${e.target.name}Quote2`).style.display = 'none'
                    }

                    handleUpdateTotal(e);
                }

                const handleUpdateTotal = (e) => {
                    if(document.getElementById(e.target.id).checked) {
                        tempAmount1 += data.prod_cost;
                        tempAmount2 += data.prod_cost;

                        setTotalAmount(previousData => {
                            return {previousData, total1: tempAmount1, total2: tempAmount2}
                        })
                    }
                    else {
                        tempAmount1 -= data.prod_cost;
                        tempAmount2 -= data.prod_cost;
                        setTotalAmount({total1: tempAmount1, total2: tempAmount2})
                    }
                    
                }
                
                const handleUpdateProdAmount = (e) => {
                    if(e.target.id === `${data.prod_name}Quote1`) {
                        if(e.target.value < 0) {
                            alert("Value needs to be positive.")
                            e.target.value = 1;
                        }
                        else if(e.target.value === 0 || e.target.value === '0') {
                            let amount = tempAmount1 - data.prod_cost;
                            setTotalAmount(previousData => {
                                return {...previousData, total1: amount}
                            })
                        }
                        else if(e.target.id === 1) {
                            let amount = totalAmount.total1 - data.prod_cost;
                            setTotalAmount(previousData => {
                                return {...previousData, total1: amount}
                            })
                        }
                        else {
                            let amount = tempAmount1 - data.prod_cost;
                            let totalCost = e.target.value * data.prod_cost;
                            let t = amount + totalCost;

                            setTotalAmount(previousData => {
                                return {...previousData, total1: t}
                            })
                        }
                    }
                    else {
                        if(e.target.value < 0) {
                            alert("Value needs to be positive.")
                            e.target.value = 1;
                        }
                        else if(e.target.value === 0 || e.target.value === '0') {
                            let amount = tempAmount2 - data.prod_cost;
                            setTotalAmount(previousData => {
                                return {...previousData, total2: amount}
                            })
                        }
                        else if(e.target.id === 1) {
                            let amount = totalAmount.total2 - data.prod_cost;
                            setTotalAmount(previousData => {
                                return {...previousData, total2: amount}
                            })
                        }
                        else {
                            let amount = tempAmount2 - data.prod_cost;
                            let totalCost = e.target.value * data.prod_cost;
                            let t = amount + totalCost;

                            setTotalAmount(previousData => {
                                return {...previousData, total2: t}
                            })
                        }
                    }
                }

                return (
                    <div id={`${data.prod_name}Container`} style={{
                    'display': 'flex',
                    'marginTop': '1vh',
                    'borderBottom': '1px solid lightgray',
                    'padding': '.75vh',
                    'width': '90%',
                    'position': 'relative',
                    'left': '2.5%'
                    }}>
                        <input type='checkbox' id={`${data.prod_name}Checkbox`} name={`${data.prod_name}`} style={{'marginLeft': '3vw'}} onClick={openInputs}/>
                        <div id={`${data.prod_name}Title`} style={{
                            'marginLeft': '2vw',
                            'width': '50vw'
                        }}>{data.prod_name}</div>
                        <input type='number' id={`${data.prod_name}Quote1`} name={`${data.prod_name}`} style={{'display': 'none', 'width': '10%', 'position': 'relative'}} onClick={handleOutlineClick} onChange={handleUpdateProdAmount} placeholder='1'/>
                        <input type='number' id={`${data.prod_name}Quote2`} name={`${data.prod_name}`} style={{'display': 'none', 'width': '10%', 'marginLeft': '2vw'}} onClick={handleOutlineClick} onChange={handleUpdateProdAmount} placeholder='1'/>
                    </div>
                )
            })

            setNewQuote(previousData => {
                return {...previousData, allProducts: prodList, adminFees: newAdminFees}
            })
        })

    }

    async function getInsulationTypes() {
        fetch(`${RELIE_API}insulation`)
        .then(results => results.json())
        .then(results => {
            let prices = results;

            prices = prices.map((data) => {
                return(<option>{data.ins_type}</option>)
            })

            setNewQuote(previousData => {
                return {...previousData, insulationTypes: prices}
            })
        })
    }
    
    return (
        <div id='newQuoteMainContainer'>
            <div id='newQuoteMainTitle'>Quotes</div>
            <div id='newQuoteMainAll'>
                <div id='newQuoteMainTitleContainer'>
                    <div id='newQuoteMainAllTitle'>New Quote</div>
                    <div id='newQUoteMainAllDate'>{newQuote.date}</div>
                </div>
                <div id='newQuoteMainAllDetails'>
                    <div id='newQuoteFirstContainer'>
                        <div id='newQuoteDetailsNameContainer'>
                            <div id='newQuoteDetailsNameTitle'>Quote Name:</div>
                            <input id='newQuoteDetailsNameInput'/>
                        </div>
                        <div id='newQuotePhoneContainer'>
                            <div id='newQuotePhoneTitle'>Phone Number:</div>
                            <input type='phone' id='newQuotePhoneInput'/>
                        </div>
                    </div>
                    <div id='newQuoteSecondContainer'>
                        <div id='newQuotePreRContainer'>
                            <div id='newQuotePreRTitle'>Pre R Value:</div>
                            <input id='newQuotePreRInput'/>
                        </div>
                        <div id='newQuoteSqFtContainer'>
                            <div id='newQuoteSqFtTitle'>Square Foot:</div>
                            <input id='newQuoteSqFtInput'/>
                        </div>
                        <div id='newQuoteYearContainer'>
                            <div id='newQuoteYearTitle'>Year:</div>
                            <input id='newQuoteYearInput'/>
                        </div>
                    </div>
                    <div id='newQuoteThirdContainer'>
                        <select id='newQuoteAdminFeeInput'>
                            <option default selected disabled hidden>Admin Fee Product ID</option>
                            {/* <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option> */}
                            {newQuote.adminFees}
                        </select>
                    </div>
                    <div id='newQuoteQuoteOptionsContainer'>
                        <select id='newQuoteQuote1Option'>
                            <option default selected disabled hidden>Quote 1</option>
                            {/* <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option> */}
                            {newQuote.insulationTypes}
                        </select>
                        <select id='newQuoteQuote2Option'>
                        <option default selected disabled hidden>Quote 2</option>
                            {/* <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option> */}
                            {newQuote.insulationTypes}
                        </select>
                    </div>
                    <div id='quoteMainOptionsSeperator'/>
                    <div id='productsContainer'>
                        <div id='quote1Quote2Container'>
                            <div id='quote1Section'>Q1</div>
                            <div id='quote2Section'>Q2</div>
                        </div>
                        {newQuote.allProducts}
                    </div>
                    <div id='newQuoteMainButtonsContainer'>
                        <Link to='/quotes' id='newQuoteCancelButton' style={{'textDecoration': 'none', 'color': 'black'}}>Cancel</Link>
                        <Link to='/newQuoteSecond' state={{from: '/NewQuoteMain', total: totalAmount}} id='newQuoteNextButton' style={{'textDecoration': 'none', 'color': 'black'}}>Next</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewQuoteMain;