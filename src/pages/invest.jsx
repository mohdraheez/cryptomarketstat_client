import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import money from '../images/money.png'
import axios from 'axios'
import ruppe from '../images/rupee.png'
import euro from '../images/euro.png'
import inodrupee from '../images/indorupee.png'
import ntdollar from '../images/new-taiwan-dollar.png'
import cny from '../images/yuan.png'
import yen from '../images/japanese-yen.png'
import { curchange, cursymbol, curvalue } from './dropdown'
import WishlistData from './watchlistdata'
import Coins from './investCoins'

var curimg = {
    "INR": ruppe,
    "EUR": euro,
    "USD": money,
    "IDR": inodrupee,
    "TWD": ntdollar,
    "CNY": cny,
    "JPY": yen

}

function InvestPorfolio() {
    const [curChange, setcurchange] = useState(curchange);
    const [curValue, setcurvalue] = useState(curvalue);
    useEffect(() => {
        const curchangedetector = () => {
            setcurchange(curchange);
            setcurvalue(curvalue);
        }
        var intervaller = setInterval(curchangedetector, 1000);
        return () => clearInterval(intervaller);
    }, [])
    if (localStorage.getItem('loginAutentication')) {
        var array = JSON.parse(localStorage.getItem('loginAutentication'))

        if (array.hasOwnProperty('id')) {
            if (array.id != null) {
                const getWishlist = async () => {
                    const balance = await axios.get('https://cryptomarketstat.azurewebsites.net/wallet', {
                        params: { id: array.id },
                    })
                    localStorage.setItem('wallet', JSON.stringify(balance.data))
                }
                getWishlist()
            }
        } else {
            window.location.href = '/login'
            localStorage.setItem(
                'wallet',
                JSON.stringify({ totalFund: 0, balance: 0, invested: 0 }),
            )
        }
    } else {
        window.location.href = '/login'
        localStorage.setItem(
            'wallet',
            JSON.stringify({ totalFund: 0, balance: 0, invested: 0 }),
        )
    }
    var data = JSON.parse(localStorage.getItem('wallet'))

    return (
        <div className="box">
            <div className="card card-box">
                <div className="card-top">
                    <div className="card-value">
                        <h3>Balance</h3>
                        <div className='card-money'>
                            <img src={curimg[curchange]} className="moneyimg"></img>
                            &nbsp;<h4>{(Number(data.balance) / curvalue).toFixed(2)}</h4>
                        </div>
                    </div>

                    <div className="card-value">
                        <h3>Invested</h3>
                        <div className='card-money'>
                            <img src={curimg[curchange]} className="moneyimg"></img>
                            &nbsp;<h4>{(Number(data.invested) / curvalue).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
                <div className="card-top">
                    <div className="card-value">
                        <h3>Current Portfolio Value</h3>
                        <div className='card-money'>
                            <img src={curimg[curchange]} className="moneyimg"></img>
                            &nbsp;<h2>{(Number(data.balance) / curvalue).toFixed(2)}</h2>
                        </div>
                    </div>

                    <div className="card-value">
                        <h3>Change</h3>
                        <div className='card-money'>
                            &nbsp;<h4>%{(Number(data.invested) / curvalue).toFixed(3)}</h4>
                        </div>
                    </div>
                </div>

            </div>
            <div className='card note-div bg-dark'>
                <div className='note'>
                    <small className='text-white'>Note : To invest in coins add them to watchlist</small>
                </div>
            </div>
            <div className="card invest-div">
                <ul className='invest-nav'>
                    <li className="">
                        Coins
                    </li>
                    <li className="">
                        Invested
                    </li>
                </ul>
            </div>

            <div className="card invest-coins">
                <Coins/>
            </div>
        </div>
    )
}

export default InvestPorfolio
