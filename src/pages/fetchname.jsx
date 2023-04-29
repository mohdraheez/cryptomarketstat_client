import React from "react";
import {useState,useEffect} from 'react'
import axios from "axios";

var rank = 0;

function ReturnCoinName(props){
    const [name,setName] = useState('');
    var sym = props.sym;
    useEffect(()=>{
       var fetchname = async() => {
        var url = `${process.env.server}/apidata/${sym}`
        const response = await axios.get(url)
        setName(response.data)
       }
       
       fetchname();
    },[])

    rank = name.rank;
    return(
        <h1>
           {name.name}
        </h1>    
        )
}

export default ReturnCoinName;
export {rank}