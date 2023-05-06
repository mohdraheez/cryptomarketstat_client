import React from 'react'
import { useState,useEffect } from 'react';
import { curchange } from './dropdown'
import axios from 'axios';
import Datacreator from './attachdata'
import starselected from '../images/starselected.png'

function attacher(arr,index){
    const [data,setdata] = useState([]);
    const [loading,setloading] = useState(true);

    useEffect(()=>{
        var id = arr.split(" ")[1];
        const getData = async ()=>{
            const response = await axios.get(`https://api.coinstats.app/public/v1/coins/${id}?currency=${curchange}`)
            setdata(response.data.coin)
            setloading(false)
        }

        getData();
    },[])

    if(loading){
        return(
            <>
            
            </>
        )
    }

    return(
        <Datacreator 
        key={index+data.symbol}
        img = {data.icon}
        rank={data.rank}
        name={data.name}
        supply={data.totalSupply}
        price={data.price}
        change24hr={data.priceChange1d}
        volume={data.volume}
        marketcap={data.marketCap}
        symbol={data.symbol}
        id={data.id}
    />
)
}

function WishlistTableData(){
    var style = {
        textAlign:"center"
    }
        if(!localStorage.getItem('whish')){
            return(
                <tr key="nothingrow">
                    <td key="nothing" style={style}>
                    Nothing in yout watchlist
                    </td>
                </tr>
            )
            }
        else{

            var string = localStorage.getItem('whish');
            var arr = JSON.parse(string);

            return(
                <>
                    {arr.map(attacher)}
                </>
            )
        }


}

export default WishlistTableData