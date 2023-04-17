import React, { useState ,useEffect} from "react";
import { rank } from "./fetchname";

function Rank(){
    const [CoinRank,setRank] = useState(0);
    var i=0;
    
    useEffect(()=>{
        function getRank(){
            setRank(rank)   
        }
        setTimeout(()=>{
            clearInterval(fetcher)
        },1000)
        var fetcher = setInterval(getRank,100);
        return()=> clearInterval(fetcher);
    },[])

    return(
        <span>
        {CoinRank}
        </span>
    )
}
export default Rank;