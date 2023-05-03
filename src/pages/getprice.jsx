import React ,{useState,useEffect} from 'react'
import axios from 'axios';

function UpdatePrice(props){
    const [Price,setPrice] = useState(0);
    var cur = "USD"
    useEffect(()=>{
        var fetchprice = async() => {
            var url = `https://min-api.cryptocompare.com/data/price?fsym=${props.sym}&tsyms=${cur}`
            const response = await axios.get(url)
            setPrice(response.data[cur])
        }
        var caller = setInterval(fetchprice,500);
        fetchprice();
        return()=> clearInterval(caller);
    })


    return(
        <h2>
            ${Price}
        </h2>
    )

}

export default UpdatePrice;