import React from 'react'
import Datacreator from './attachdata'
import axios from 'axios'
import { useState, useEffect } from 'react'

var switcher = 0;

var indexvalue = 20

function Loader() {
    indexvalue = indexvalue + 10;
    console.log(indexvalue)
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

function offlinedata() {
    return (
        <tr className="tabledatacontent">
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
        var url = `${process.env.server}/apidata`
        // var url= "http://192.168.201.88:3333/apidata"
        const fetchdata = async () => {
            axios.get(url)
                .then((response) => {
                    setdata(response.data.data)
                    setloading(false);
                })
                .catch('error', (err) => {
                    console.log(err)
                })
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

        const caller = setInterval(fetchdata, 1000);
        fetchdata();
        return () => clearInterval(caller);

        // console.log(data);

    }, [])


    

    if (loading)
        return (
            <>
                {offline.map(offlinedata)}
            </>
        )
        switch(switcher){
            case 0: data.data.sort((a,b)=> a.rank-b.rank);
            break;
            case 1:data.data.sort((a,b) => b.rank-a.rank);
            break;
            case 2:data.data.sort((a,b) => b.priceUsd-a.priceUsd);
            break
            case 3:data.data.sort((a,b) => a.priceUsd-b.priceUsd);
            break;
            case 4:data.data.sort((a,b) => b.changePercent24Hr-a.changePercent24Hr);
            break
            case 5:data.data.sort((a,b) => a.changePercent24Hr-b.changePercent24Hr);
            break;
            case 6:data.data.sort((a,b) => b.volumeUsd24Hr-a.volumeUsd24Hr);
            break
            case 7:data.data.sort((a,b) => a.volumeUsd24Hr-b.volumeUsd24Hr);
            break;
            case 8:data.data.sort((a,b) => b.marketCapUsd-a.marketCapUsd);
            break;
            case 9:data.data.sort((a,b) => a.marketCapUsd-b.marketCapUsd);
            break;
            case 10:data.data.sort((a,b) => Number(b.supply)-Number(a.supply));
            break;
            case 11:data.data.sort((a,b) => a.supply-b.supply);
            break;
            default:data.data.sort((a,b)=> a.rank-b.rank);
          }

    return (
        <>
            {data.map(ReturnData)}
        </>
    )
}

export default Tabledata;