import React from 'react'
import UpdatePrice from './getprice';
import axios from 'axios';
import {useState,useEffect} from 'react'
import { curchange } from './dropdown'

function ReturnName(props){
    const [data,setdata] = useState('');
    var cur = localStorage.getItem("cur")
    var sym = props.symbol;
    var name = String(props.name).toLowerCase();    
    useEffect(()=>{
       var fetchname = async() => {
        var url = `https://api.coinstats.app/public/v1/coins/${name}?currency=${curchange}`
        const response = await axios.get(url)        
        setdata(response.data.coin)


        }
       fetchname();
    },[])


    return(
        <div className='detailheader'>
            <p className="Rank">Rank #{data.rank}</p>
            <div className='detailheading'>
            <img src={data.icon} class="detaillogo" /><h1>{data.name}</h1> <span>{props.symbol}</span>
            </div>
            <div>
                <UpdatePrice sym={sym}/>
            </div>
        </div>
    );
}

export default ReturnName;