import React from "react";
import ReturnImage from './fetchimg';
import prev from './previousentry';


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


function eventHandler(sym){
    console.log(sym)
    window.location.href = `/Details/${sym}`;
}

function Datacreator(props){
    var sym = '$'
    var symbol = props.symbol
    var price = props.price

    

    var positve = {
        color: "#03C988"
    }

    var negative = {
        color: "#03C988"
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
            Style.color ="03C988";
        }
        prev[symbol] = Number(price).toFixed(3);

    }
    else{
        prev[symbol] = Number(price).toFixed(3);
    }
    
    
    return(
        <tr className="tabledatacontent" name={props.symbol} onClick={()=>{eventHandler(symbol)}}>
        <td>{props.rank}</td>
        <td className="name"><ReturnImage sym={props.symbol} class="logo"/> {props.name} <span>{props.symbol}</span></td>
        <td style={Style}>{sym}{Number(props.price).toFixed(2)}</td>
        <td style={Number(props.change24hr)>0?positve:negative}>{Number(props.change24hr).toFixed(2)}%</td>
        <td>{sym}{convertor(props.volume)}</td>
        <td className="supply">{sym}{convertor(props.supply)}</td>
        <td>{sym}{convertor(props.marketcap)}</td>
        </tr>
    )
}

export default Datacreator;