import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { curIds } from './dropdown';
import { curvalue } from './detaildesc';

function PriceFetcher(symb){
    const [price,setprice] = useState(0);
    var id = symb;
    useEffect(()=>{
        var fetchprice = async() => {
            // var url = `https://min-api.cryptocompare.com/data/price?fsym=${sym}&tsyms=${localStorage.getItem("calcCur")}`
            var url = `https://api.coincap.io/v2/assets/${id}`;
            const response = await axios.get(url)
            setprice(response.data.data.priceUsd/curvalue)
        }

        var caller = setInterval(()=>{
            fetchprice();
        },350);
        fetchprice();
        return()=> clearInterval(caller);
    },[])
    var Price = price
    if(price<1)
    Price = price;
    else
    Price = Number(price).toFixed(2);
    return Price;
}

export default PriceFetcher;