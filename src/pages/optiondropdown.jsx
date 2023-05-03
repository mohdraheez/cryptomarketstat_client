import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import axios from "axios";




function optionsetter(arr){

    var data = arr.name+"   "+arr.symbol
    return(
        <>
            <option key={arr.symbol} value={data} className="cryptoption" id={data}/>
        </>
        
    )
}

function Options(){
    const [data,setdata] = useState('');
    const [loading,setloader] = useState(true);

    if(loading){
        var url= `https://api.coinstats.app/public/v1/coins?skip=0&limit=2000&currency=USD`

        axios.get(url)
        .then(response =>{
            setdata(response.data.coins);
            setloader(false);
        })
        .catch(error=>console.log(error))
    }

    if(loading){
        return(
            <>
                loading
            </>
        )
    }
    return(
        <>
            {data.map(optionsetter)}
        </>
    )
}

export default Options;