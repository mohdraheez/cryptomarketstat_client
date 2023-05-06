import React from 'react'
import Datacreator from './attachdata'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { curchange } from './dropdown'
import { clear } from '@testing-library/user-event/dist/clear'

var switcher = 0;
var firstload = 0;
var indexvalue = 100

function Loader() {
    indexvalue = indexvalue + 100;
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
    if (index < indexvalue) {
        return (
            <Datacreator 
                key={arr.symbol+index}
                img = {arr.icon}
                rank={arr.rank}
                name={arr.name}
                supply={arr.totalSupply}
                price={arr.price}
                change24hr={arr.priceChange1d}
                volume={arr.volume}
                marketcap={arr.marketCap}
                symbol={arr.symbol}
                id={arr.id}
            />
        )
    }
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
        const fetchdata = () => {
         var url= `https://api.coinstats.app/public/v1/coins?skip=0&limit=${indexvalue}&currency=${curchange}`
            axios.get(url)
                .then((response) => {
                    setdata(response.data.coins)
                    if(loading)
                    setloading(false);

                })
                .catch('error', (err) => {
                    console.log(err)
                })
                
        }

        if(firstload===0){
            firstload=1;
             fetchdata();
        }


        document.querySelector('.showmorebtn').addEventListener('click', () => {
            Loader();
            fetchdata();
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
            setloading(true)
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
            setloading(true)
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
            setloading(true)
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
            setloading(true)
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
            setloading(true)
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
            setloading(true)
            fetchdata();
        })

        const setter = setInterval(fetchdata,500);
        return() => clearInterval(setter); 
        // console.log(data);

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
            case 2:data.sort((a,b) => b.price-a.price);
            break
            case 3:data.sort((a,b) => a.price-b.price);
            break;
            case 4:data.sort((a,b) => b.priceChange1d-a.priceChange1d);
            break
            case 5:data.sort((a,b) => a.priceChange1d-b.priceChange1d);
            break;
            case 6:data.sort((a,b) => b.volume-a.volume);
            break
            case 7:data.sort((a,b) => a.volume-b.volume);
            break;
            case 8:data.sort((a,b) => b.marketCap-a.marketCap);
            break;
            case 9:data.sort((a,b) => a.marketCap-b.marketCap);
            break;
            case 10:data.sort((a,b) => Number(b.totalSupply)-Number(a.totalSupply));
            break;
            case 11:data.sort((a,b) => a.totalSupply-b.totalSupply);
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