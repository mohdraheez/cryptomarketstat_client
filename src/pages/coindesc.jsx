import axios from "axios";
import React, { useEffect, useState } from "react";

function CoinDesc(props){
    const [data,setdata] = useState([]);
    const [loading,setLoading] = useState(true);
    var sym = props.sym;
    useEffect(()=>{
        const fetchdata= async()=>{
            const response = await axios.get('https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol='+sym+' ')
            setdata(response.data.Data);
            setLoading(false);
        }

        fetchdata();
    },[])
    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }
    return (
        <div className="coindescription">
            <h1>What is {data.NAME}</h1>
            {data.ASSET_DESCRIPTION_SUMMARY}
        </div>
    )
}

export default CoinDesc;
