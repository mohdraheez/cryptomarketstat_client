import React from 'react'
import UpdatePrice from './getprice';
import axios from 'axios';
import {useState,useEffect} from 'react'
import { curchange } from './dropdown'
import star from '../images/star.png'
import starhover from '../images/starhover.png'
import starselected from '../images/starselected.png'
import { useParams } from 'react-router-dom';

function addhover(e){
    if(e.target.alt!="liked")
    e.target.src = starhover;
}

function removehover(e){
    if(e.target.alt!="liked")
    e.target.src = star;
}

function addclicked(e,sym,id){
    if(e.target.alt === "like")
    {
        if(localStorage.getItem("whish")){
            var str = sym + " "+ id
            var string = localStorage.getItem("whish");
            var arr = JSON.parse(string);
            
            arr.push(str)
            var arrtostore = JSON.stringify(arr)
            localStorage.setItem("whish",arrtostore)
        }
        else{
            var str = sym + " "+ id
            var arr= [];
            arr.push(str);
            var arrtostore = JSON.stringify(arr)
            localStorage.setItem("whish",arrtostore)
        }
        e.target.alt = "liked"
        e.target.src = starselected;
    }
    else{
        var str = sym + " "+ id;
        var string = localStorage.getItem("whish");
        var arr = JSON.parse(string);
        var index = arr.indexOf(str);
        arr.splice(index,1);
        console.log(arr)

        var arrtostore = JSON.stringify(arr)
        localStorage.setItem("whish",arrtostore)

        e.target.alt = "like"
        e.target.src = star;
    }
}

function ReturnName(props){
    const [data,setdata] = useState('');
    var cur = localStorage.getItem("cur")
    var sym = props.symbol;
    var id = props.id;
    var style={star};
    useEffect(()=>{
       var fetchname = async() => {
        var url = `https://api.coincap.io/v2/assets/${id}`
        const response = await axios.get(url)
        console.log(response.data.data)        
        setdata(response.data.data)
        }
        if(localStorage.getItem("whish")){
            var str = sym + " "+ id
            var string = localStorage.getItem("whish");
            var arr = JSON.parse(string);
            var index = arr.indexOf(str);
            if(index!=-1 && document.querySelector("#"+props.symbol)){
                document.querySelector("#"+props.symbol).alt="liked"
                document.querySelector("#"+props.symbol).src=starselected;
            }
        }
       fetchname();
    },[])

    var symbolsmall = sym.toLowerCase();
    var imgurl = `https://assets.coincap.io/assets/icons/${symbolsmall}@2x.png`
    return(
        <div className='detailheader'>
            <p className="Rank"><img src={star} alt="like" className="like" id={props.symbol} onMouseEnter={addhover} onMouseLeave={removehover} onClick={(e)=>{addclicked(e,sym,id)}}></img>Rank #{data.rank}</p>
            <div className='detailheading'>
            <img src={imgurl} className="detaillogo" /><h1>{data.name}</h1> <span>{props.symbol}</span>
            </div>
            <div>
                <UpdatePrice key={sym} id={id}/>
            </div>
        </div>
    );
}

export default ReturnName;