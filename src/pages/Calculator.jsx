import React from "react";
import PriceFetcher from "./CalcPrice";
var price = 0;
var cprice = 0;
var coins = 0;

function PriceFetch(sym,cur){
    localStorage.setItem("calcCur",cur);
    price = PriceFetcher(sym);
    return price;
}

function CurCalculator(input){
    if(isNaN(input)){
        return 0
    }
    else
    return (input * price);
}

function CoinCalculator(input){
    if(isNaN(input)){
        return 0
    }
    else if(input===0){
        return 0;
    }
    return (input/price);
}
export {CoinCalculator};
export {CurCalculator};
export {PriceFetch};
