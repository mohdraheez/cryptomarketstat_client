import React ,{useState,useEffect} from 'react'
import {price} from './graphdata';

function UpdatePrice(){
    const [Price,setPrice] = useState(0);

    useEffect(()=>{
        var fetcher = () =>{
            setPrice(price)
        }

        var caller = setInterval(fetcher,500);
        fetcher();
        return()=> clearInterval(caller);
    })


    return(
        <h2>
            ${Price}
        </h2>
    )

}

export default UpdatePrice;