import React, { useState,useEffect } from "react";
import axios from 'axios';
import { curchange } from './dropdown'
import { cursymbol } from "./dropdown";
import { curvalue } from "./dropdown";
import { timeinitial } from "./Fetchgraph";
import { timearray } from "./Fetchgraph";
var change = 0;
var price = 0;

function HighLowFetcher(props){
    const [High,setHigh] = useState(0);
    const [Low,setLow] = useState(0);
    const [First,setFirst] = useState(0);
    const [Last,setLast] = useState(0);
    var cur = localStorage.getItem('cur');
    var sym = props.sym;

    var positive = {
        color: "#03C988"
    }
    var negative = {
        color: "#EA5455"
    }

    useEffect(()=>{
        const fetcher = async ()=>{
            try {
                var now = Date.now();
                var before= now - (timearray[timeinitial][1] * 60 * 1000);
  
                var url = `https://api.coincap.io/v2/assets/${props.id}/history?interval=${timearray[timeinitial][0]}&start=${before}&end=${now}`;
                const response = await axios.get(url)
                const data =response.data.data;
                var length = data.length;
                setLast((response.data.data[length-1].priceUsd))
                setFirst((response.data.data[0].priceUsd))
                setHigh(response.data.data.sort((a,b) => Number(b.priceUsd)- Number(a.priceUsd))[0].priceUsd)
                setLow(response.data.data.sort((a,b) => Number(a.priceUsd)- Number(b.priceUsd))[0].priceUsd)
            }
            catch(error){
                console.log(error)
            }
        }


        var fetchdata = setInterval(fetcher, 500);
        fetcher();
        return ()=> clearInterval(fetchdata)
    },[])

    change = (((Last-First)*100)/First).toFixed(2);
    price = Number(Last);
    var Avg= (Number(Last)-Number(First))/curvalue;
    if(Avg>1)
    Avg = Number(Avg).toFixed(2)
    var high = Number(High)/curvalue;
    if(high>1)
    high = Number(high).toFixed(2);
    var low = Number(Low)/curvalue;
    if(low>1)
    low = Number(low).toFixed(2)
        
    return(
        <>
            <div>
            <h6>{timearray[timeinitial][2]} High</h6>
            <h5>{cursymbol}{high}</h5>
            </div>
            <div>
            <h6>{timearray[timeinitial][2]} Low</h6>
            <h5>{cursymbol}{low}</h5>
            </div>
            <div>
            <h6>{timearray[timeinitial][2]} Change %</h6>
            <h5 style={change<0?negative:positive}>{change}%</h5>
            </div>
            <div>
            <h6>{timearray[timeinitial][2]} Change Price</h6>
            <h5 style={change<0?negative:positive}>{cursymbol}{Avg}</h5>
            </div>
        </>
    )

}

export default HighLowFetcher;
export {change};
export {price};