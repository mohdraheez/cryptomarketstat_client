import React from "react";
import prev from './previousentry';
import { cursymbol } from "./dropdown";
import star from '../images/star.png'
import starhover from '../images/starhover.png'
import starselected from '../images/starselected.png'
import { json, useLocation, useParams } from "react-router-dom";
var page = "topcoins"

function convertor(elem){
    if(Number(elem)<1000000){
        elem = (Number(elem)/1000).toFixed(2)+"k"
    }
    else if(Number(elem)<1000000000){
        elem = (Number(elem)/1000000).toFixed(2) + "m"
    }
    else if (Number(elem)<1000000000000){
        elem = (Number(elem)/1000000000).toFixed(2) + "b"
    }
    else{
        elem = (Number(elem)/1000000000000).toFixed(2) + "t"
    }
    return elem;
}

function clickonwish(){
    window.location = '/wishlist';
}
function clickontop(){
        window.location = '/';
}

function displayonwish(){
    page = "wishlist"
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.whishlist').classList.add('selected')
}

function displayontop(){
    page ="topcoins"
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.topcoins').classList.add('selected')
}


function addhover(e){
    if(e.target.alt!="liked")
    e.target.src = starhover;
}

function removehover(e){
    if(e.target.alt!="liked")
    e.target.src = star;
}

function addclicked(e,sym,id,path){
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


function eventHandler(e,sym,id){
    if(e.target.className!="like")
    window.location.href = `/Details/${sym} ${id}`;
}

function Datacreator(props){
    var symbol = props.symbol
    var price = props.price
    var name = props.name;
    var id = props.id;
    var str = symbol +" "+ id;
    var param = useParams();
    var path = useLocation().pathname;

    if(param.id==="wishlist"){
        displayonwish();
    }

    if(param.id===""){
        displayontop();
    }

    if(localStorage.getItem("whish")){
        var str = symbol + " "+ id
        var string = localStorage.getItem("whish");
        var arr = JSON.parse(string);
        var index = arr.indexOf(str);
        if(index!=-1 && document.querySelector("#"+props.symbol)){
            document.querySelector("#"+props.symbol).alt="liked"
            document.querySelector("#"+props.symbol).src=starselected;
        }
    }

    var positve = {
        color: "#03C988"
    }

    var negative = {
        color: "#FF8787"
    }

    var Style = {
    }

    if (prev.hasOwnProperty(symbol)) {
        if(Number(price).toFixed(6)===prev[symbol]){
            Style.color="white";
        }
        else if(Number(price).toFixed(6)>prev[symbol]){
            Style.color = "#03C988"
        }
        else{
            Style.color ="#FF8787";
        }
        prev[symbol] = Number(price).toFixed(6);

    }
    else{
        prev[symbol] = Number(price).toFixed(6);
    }
    
    return(
        <tr className="tabledatacontent" name={props.symbol} onClick={(e)=>{eventHandler(e,symbol,id)}}>
        <td className="rankdata"><span><img src={path==='/wishlist'?starselected:star} alt={param.id==="wishlist"?"liked":"like"} className="like" id={props.symbol} onMouseEnter={addhover} onMouseLeave={removehover} onClick={(e)=>{addclicked(e,symbol,id,path)}}></img>{props.rank}</span></td>
        <td className="name"><img src={props.img} alt={props.symbol} className="logo"/><span className="namespan">{props.name}  <span className="sym">{props.symbol}</span></span></td>
        <td style={Style}>{cursymbol}{Number(props.price)<1?Number(props.price).toFixed(8):Number(props.price).toFixed(2)}</td>
        <td style={Number(props.change24hr)>=0?positve:negative}>{Number(props.change24hr).toFixed(2)}%</td>
        <td>{cursymbol}{convertor(props.volume)}</td>
        <td className="supply">{convertor(props.supply)}</td>
        <td>{cursymbol}{convertor(props.marketcap)}</td>
        </tr>
    )
   
}

export default Datacreator;
export {clickonwish}
export {clickontop}