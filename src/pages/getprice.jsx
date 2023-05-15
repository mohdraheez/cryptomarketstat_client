import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import prev from './previousentry';
import { curchange } from './dropdown'
import { cursymbol } from './dropdown';
import { curvalue } from './dropdown';

var timer = 0;
function UpdatePrice(props){

    const [Price,setPrice] = useState(0);
    const [loading,setloading] = useState(true);
    // var cur = localStorage.getItem('cur');
    var id=props.id
    var symbol = props.sym;
    var Style = {
    }

    if (prev.hasOwnProperty(symbol)) {
        if(Number(Price).toFixed(6)===prev[symbol]){
            Style.color="white";
   
        }
        else if(Number(Price).toFixed(6)>prev[symbol]){
            Style.color = "#03C988"
        }
        else{
            Style.color ="#EA5455";
        }
        prev[symbol] = Number(Price).toFixed(6);

    }
    else{
        prev[symbol] = Number(Price).toFixed(6);
    }
    

    useEffect(()=>{
        var fetchprice = async() => {
            var url = `https://api.coincap.io/v2/assets/${id}`
            const response = await axios.get(url)
            if(loading){
                setloading(false);
            }
            else
            setloading(true);
            setPrice(response.data.data.priceUsd/curvalue)
        }
        var caller = setInterval(fetchprice,1000);
        fetchprice();
        return()=> clearInterval(caller);
    })

    var price = Price;
    if(Price>1){
        price = price.toFixed(2);
    }

    return(
        <h2 style={Style}>
            {cursymbol}{price}
        </h2>
    )

}

export default UpdatePrice;