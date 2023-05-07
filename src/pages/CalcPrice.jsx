import React, { useEffect, useState } from 'react'
import axios from 'axios';
function PriceFetcher(symb){
    const [price,setprice] = useState(0);
    var sym = symb;
    useEffect(()=>{
        var fetchprice = async() => {
            var url = `https://min-api.cryptocompare.com/data/price?fsym=${sym}&tsyms=${localStorage.getItem("calcCur")}`
            const response = await axios.get(url)
            setprice(response.data[localStorage.getItem("calcCur")])
        }
        var caller = setInterval(fetchprice,350);
        fetchprice();
        return()=> clearInterval(caller);
    },[])
    return price;
}

export default PriceFetcher;