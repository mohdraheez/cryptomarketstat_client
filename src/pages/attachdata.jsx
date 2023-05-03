import React from "react";
import prev from './previousentry';
import { cursymbol } from "./dropdown";

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


function eventHandler(sym,name){
    window.location.href = `/Details/${sym} ${name}`;
}

function Datacreator(props){
    var symbol = props.symbol
    var price = props.price
    var name = props.name;

    

    var positve = {
        color: "#03C988"
    }

    var negative = {
        color: "#FF8787"
    }

    var Style = {
    }

    if (prev.hasOwnProperty(symbol)) {
        if(Number(price).toFixed(3)===prev[symbol]){
            Style.color="black";
        }
        else if(Number(price).toFixed(3)>prev[symbol]){
            Style.color = "#03C988"
        }
        else{
            Style.color ="#FF8787";
        }
        prev[symbol] = Number(price).toFixed(3);

    }
    else{
        prev[symbol] = Number(price).toFixed(3);
    }
    
    
    return(
        <tr className="tabledatacontent" name={props.symbol} onClick={()=>{eventHandler(symbol,name)}}>
        <td>{props.rank}</td>
        <td className="name"><img src={props.img} alt={props.symbol} className="logo"/> {props.name} <span>{props.symbol}</span></td>
        <td style={Style}>{cursymbol}{Number(props.price).toFixed(2)}</td>
        <td style={Number(props.change24hr)>=0?positve:negative}>{Number(props.change24hr).toFixed(2)}%</td>
        <td>{cursymbol}{convertor(props.volume)}</td>
        <td className="supply">{cursymbol}{convertor(props.supply)}</td>
        <td>{cursymbol}{convertor(props.marketcap)}</td>
        </tr>
    )
}

export default Datacreator;