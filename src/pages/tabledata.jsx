import React from 'react'
import Datacreator from './attachdata'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { curchange } from './dropdown'
import { clear } from '@testing-library/user-event/dist/clear'
import { curvalue } from './dropdown'
var switcher = 0;
var firstload = 0;
var startindex = 0;
var indexvalue = 100

function Loader() {
    startindex = startindex+100;
}

function remover() {
    document.querySelector('.rankdown').style.display = "none";
    document.querySelector('.rankup').style.display = "none";
    document.querySelector('.pricedown').style.display = "none";
    document.querySelector('.priceup').style.display = "none";
    document.querySelector('.hdown').style.display = "none";
    document.querySelector('.hup').style.display = "none";
    document.querySelector('.hvdown').style.display = "none";
    document.querySelector('.hvup').style.display = "none";
    document.querySelector('.mkcapdown').style.display = "none";
    document.querySelector('.mkcapup').style.display = "none";
    document.querySelector('.supplyup').style.display = "none";
    document.querySelector('.supplydown').style.display = "none";
}


function ReturnData(arr, index) {
    var price = arr.priceUsd/curvalue;
    var volume = arr.volumeUsd24Hr/curvalue;
    var market = arr.marketCapUsd/curvalue;
        return (
            <Datacreator 
                key={arr.symbol+index}
                rank={arr.rank}
                name={arr.name}
                supply={arr.supply}
                price={price}
                change24hr={arr.changePercent24Hr}
                volume={volume}
                marketcap={market}
                symbol={arr.symbol}
                id={arr.id}
            />
        )
}

function offlinedata(arr,index) {
    return (
        <tr className="tabledatacontent" key={index}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}

function Tabledata() {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    var offline = [];

    for (var i = 0; i < indexvalue; i++) {
        offline.push('Loading')
    }

    useEffect(() => {
        const fetchdata = async () => {
         var url= `https://api.coincap.io/v2/assets?offset=${Number(localStorage.getItem('start'))}&limit=100`
           await axios.get(url)
                .then((response) => {
                    setdata(response.data.data)
                    setloading(false);
                })
                .catch('error', (err) => {
                    console.log(err)
                })
                
        }

        if(Number(localStorage.getItem("start"))===0){
            document.querySelector('.prev').style.display="none";
        }
        else{
            document.querySelector('.prev').style.display="";
        }

        if(Number(localStorage.getItem("start"))===2200){
            document.querySelector('.next').style.display="none";
        }
        else{
            document.querySelector('.next').style.display="";
        }


        document.querySelector('.next').addEventListener('click', () => {
            setdata([]);
            setloading(true);
            localStorage.setItem('start',Number(localStorage.getItem('start'))+100);
            fetchdata();
            if(Number(localStorage.getItem("start"))===0){
                document.querySelector('.prev').style.display="none";
            }
            else{
                document.querySelector('.prev').style.display="";
            }
    
            if(Number(localStorage.getItem("start"))===2200){
                document.querySelector('.next').style.display="none";
            }
            else{
                document.querySelector('.next').style.display="";
            }
            window.scrollTo(0, 0);
        })

        document.querySelector('.prev').addEventListener('click', () => {
            setdata([]);
            setloading(true);
            localStorage.setItem('start',Number(localStorage.getItem('start'))-100);
            fetchdata();
            if(Number(localStorage.getItem("start"))===0){
                document.querySelector('.prev').style.display="none";
            }
            else{
                document.querySelector('.prev').style.display="";
            }
    
            if(Number(localStorage.getItem("start"))===2200){
                document.querySelector('.next').style.display="none";
            }
            else{
                document.querySelector('.next').style.display="";
            }
            window.scrollTo(0, 0);
        })

        document.querySelector('.rankbtn').addEventListener('click', () => {
            if (switcher === 0) {
                switcher = 1;
                remover();
                document.querySelector('.rankup').style.display = "inline";
            }
            else {
                switcher = 0;
                remover();
                document.querySelector('.rankdown').style.display = "inline";
            }
            fetchdata();

        })

        document.querySelector('.pricebtn').addEventListener('click', () => {
            if (switcher !== 2) {
                switcher = 2;
                remover();
                document.querySelector('.pricedown').style.display = "inline";
            }
            else {
                switcher = 3;
                remover();
                document.querySelector('.priceup').style.display = "inline";
            }
            fetchdata();
        })

        document.querySelector('.hbtn').addEventListener('click', () => {
            if (switcher !== 4) {
                switcher = 4;
                remover();
                document.querySelector('.hdown').style.display = "inline";
            }
            else {
                switcher = 5;
                remover();
                document.querySelector('.hup').style.display = "inline";
            }
            fetchdata();
        })
        document.querySelector('.hvbtn').addEventListener('click', () => {
            if (switcher !== 6) {
                switcher = 6;
                remover();
                document.querySelector('.hvdown').style.display = "inline";
            }
            else {
                switcher = 7;
                remover();
                document.querySelector('.hvup').style.display = "inline";
            }
            fetchdata();
        })
        document.querySelector('.mrktcapbtn').addEventListener('click', () => {
            if (switcher !== 8) {
                switcher = 8;
                remover();
                document.querySelector('.mkcapdown').style.display = "inline";
            }
            else {
                switcher = 9;
                remover();
                document.querySelector('.mkcapup').style.display = "inline";
            }
            fetchdata();
        })
        document.querySelector('.supplybtn').addEventListener('click', () => {
            if (switcher !== 10) {
                switcher = 10;
                remover();
                document.querySelector('.supplydown').style.display = "inline";
            }
            else {
                switcher = 11;
                remover();
                document.querySelector('.supplyup').style.display = "inline";
            }
            fetchdata();
        })

        const setter = setInterval(fetchdata,400);
        return() => clearInterval(setter); 

    },[])


    

    if (loading){
        return (
            <>
                {offline.map(offlinedata)}
            </>
        )
    }
        switch(switcher){
            case 0: data.sort((a,b)=> a.rank-b.rank);
            break;
            case 1:data.sort((a,b) => b.rank-a.rank);
            break;
            case 2:data.sort((a,b) => b.priceUsd-a.priceUsd);
            break
            case 3:data.sort((a,b) => a.priceUsd-b.priceUsd);
            break;
            case 4:data.sort((a,b) => b.changePercent24Hr-a.changePercent24Hr);
            break
            case 5:data.sort((a,b) => a.changePercent24Hr-b.changePercent24Hr);
            break;
            case 6:data.sort((a,b) => b.volumeUsd24Hr-a.volumeUsd24Hr);
            break
            case 7:data.sort((a,b) => a.volumeUsd24Hr-b.volumeUsd24Hr);
            break;
            case 8:data.sort((a,b) => b.marketCapUsd-a.marketCapUsd);
            break;
            case 9:data.sort((a,b) => a.marketCapUsd-b.marketCapUsd);
            break;
            case 10:data.sort((a,b) => Number(b.supply)-Number(a.supply));
            break;
            case 11:data.sort((a,b) => a.supply-b.supply);
            break;
            default:data.sort((a,b)=> a.rank-b.rank);
          }

    return (
        <>
            {data.map(ReturnData)}
        </>
    )
}

export default Tabledata;