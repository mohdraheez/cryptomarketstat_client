import React, { useState,useEffect } from "react";
import axios from 'axios';


var change = 0;
var price = 0;

function HighLowFetcher(props){
    const [High,setHigh] = useState(0);
    const [Low,setLow] = useState(0);
    const [First,setFirst] = useState(0);
    const [Last,setLast] = useState(0);
    var currency = '$'
    var sym = props.sym;

    var positive = {
        color: "#03C988"
    }
    var negative = {
        color: "#DF2E38"
    }

    useEffect(()=>{
        const fetcher = async ()=>{
            try {
                var url = `https://coinsdekho.azurewebsites.net/apidatagraph/${sym}`;
                const response = await axios.get(url)
                console.log(response)
                var length = response.data.Data.Data.length;
                setLast((response.data.Data.Data[length-1].close))
                setFirst((response.data.Data.Data[0].close))
                setHigh(response.data.Data.Data.sort((a,b) => Number(b.high)- Number(a.high))[0].high)
                setLow(response.data.Data.Data.sort((a,b) => Number(a.low)- Number(b.low))[0].low)
            }
            catch(error){
                console.log(error)
            }
        }


        var fetchdata = setInterval(fetcher, 1000);
        fetcher();
        return ()=> clearInterval(fetchdata)
    },[])

    change = (((Last-First)*100)/First).toFixed(2);
    price = Number(Last);
    return(
        <>
            <div>
            <h6>High : {currency}{High}</h6>
            <h6>Low : {currency}{Low}</h6>
            </div>

            <div>
            <h6>change : <span style={change<0?negative:positive}>{change}%</span></h6>
            <h6>Average : {currency}{((First+Last)/2).toFixed(2)}</h6>

            </div>
        </>
    )

}

export default HighLowFetcher;
export {change};
export {price};