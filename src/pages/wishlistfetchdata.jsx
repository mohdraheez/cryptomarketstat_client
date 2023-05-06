import React from 'react'
import { useState,useEffect } from 'react';
import { curchange } from './dropdown'
import axios from 'axios';
import Datacreator from './attachdata'
import starselected from '../images/starselected.png'
var i =0;

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

       return ()=> clearInterval(fetcher);
    },[])

    var empty = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "]


    if(loading){
        return(
            <>
                {empty.map(returnEmpty)}
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

function returnEmpty(arr,index){
    return(
        <tr className="tabledatacontent" key={index}>
                    <td key="nothing">
                        {arr}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            </tr>
    )
}

function WishlistTableData(){
    var style = {
        textAlign:"center"
    }

                    
    var empty = ["Nothing in yout watchlist"," "," "," "," "," "," "," "," "," "," "," "," "," "]

        if(!localStorage.getItem('whish')){
            return(
                <>
                {empty.map(returnEmpty)}
                </>
            )
    }
        var string = localStorage.getItem('whish');
        var arr = JSON.parse(string);
        if(arr.length===0){
            return(
                <>
                {empty.map(returnEmpty)}
                </>
            )
        }
        else{

            return(
                <>
                    {arr.map(attacher)}
                </>
            )
        }


}

export default WishlistTableData