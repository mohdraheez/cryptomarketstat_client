import React from 'react'
import Datacreator from './attachdata'
import axios from 'axios'
import { useState , useEffect } from 'react'

var indexvalue = 20

function Loader(){
  indexvalue = indexvalue + 10;
  console.log(indexvalue)
}

function ReturnData(arr,index){
    if(index<indexvalue){
    return(
        <Datacreator key={index} 
        rank={arr.rank} 
        name={arr.name} 
        supply={arr.supply} 
        price={arr.priceUsd}
        change24hr={arr.changePercent24Hr} 
        volume={arr.volumeUsd24Hr} 
        marketcap={arr.marketCapUsd}
        symbol={arr.symbol}
        />
    )
    }
}

function Tabledata(){
    
    const [data,setdata] = useState([]);
    const [loading,setloading] = useState(true);

    

    useEffect(()=>{
        var url= "https://coindekho.onrender.com/apidata"
        // var url= "http://192.168.201.88:3333/apidata"
        const fetchdata = async()=>{
            axios.get(url)
            .then((response)=>{
            setdata(response.data.data)
            setloading(false);
            })
            .catch('error',(err)=>{
            console.log(err)
        })
        }

        document.querySelector('.showmorebtn').addEventListener('click',()=>{
            Loader();
            fetchdata();
        })

        const caller =setInterval(fetchdata, 1000);
        fetchdata();
        return()=>clearInterval(caller);

        // console.log(data);

    },[])   


    if(loading)
    return(
        <tr><td>loading</td></tr>
    )

    return(
        <>      
            {data.map(ReturnData)}
        </>
    )
}

export default Tabledata;