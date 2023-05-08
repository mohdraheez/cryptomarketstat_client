import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { curchange } from './dropdown'
import { cursymbol } from './dropdown';
import { curvalue } from './dropdown';
function UpdatePrice(props){
    const [Price,setPrice] = useState(0);
    // var cur = localStorage.getItem('cur');
    var id=props.id
    useEffect(()=>{
        var fetchprice = async() => {
            var url = `https://api.coincap.io/v2/assets/${id}`
            const response = await axios.get(url)
            console.log(response.data.data.priceUsd/curvalue);
            setPrice(response.data.data.priceUsd/curvalue)
        }
        var caller = setInterval(fetchprice,350);
        fetchprice();
        return()=> clearInterval(caller);
    },[])

    var price = Price;
    if(Price>1){
        price = price.toFixed(2);
    }

    return(
        <h2>
            {cursymbol}{price}
        </h2>
    )

}

export default UpdatePrice;