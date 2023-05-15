import React, { useState } from "react";
import CoinDesc from "./coindesc";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { curs, curfullname, currencysymbol } from "./dropdown";
import {PriceFetch} from './Calculator'
import { CurCalculator,CoinCalculator } from "./Calculator";
import { curIds } from "./dropdown";
import axios from "axios";
var curvalue = 1;
function DetailDesc(props){
    const [cur,setcur] = useState("USD");
    var price = PriceFetch(props.id,cur)
    var curfetcher = async(cur)=>{
        const response = await axios.get(`https://api.coincap.io/v2/rates/${curIds[cur]}`)
        curvalue = response.data.data.rateUsd;
    }

    function returnCurMenu(array,index){
        return(
            <li className="curli" key={index}>
            <a className="dropdown-item"
                onClick={()=>{
                    setcur(array);
                    curfetcher(array);
                }}>
                <span className="cur">{array}</span> &nbsp;&nbsp;&nbsp;{curfullname[array]}
            </a>
                
            </li>   
        )
    }

    if(document.getElementById('curinput'))
    document.getElementById('curinput').value=CurCalculator(document.getElementById('coininput').value);
    if(document.getElementById('coininput'))
    document.getElementById('coininput').value=CoinCalculator(document.getElementById('curinput').value);


    function onCoinInput(e){
        document.getElementById('curinput').value=CurCalculator(e.target.value);
    }

    function onCurInput(e){
        document.getElementById('coininput').value=CoinCalculator(e.target.value);
    }

    return(
        <div className="detaildesc text-light">
            <CoinDesc key={props.sym} sym={props.sym}/>
            <div className="calculator">
                <h2>{props.sym} Calculator</h2>
                <form className="calcform">
                    <div className="bg-dark">
                    <label for="coininput">
                    <div className=" " data-bs-theme="dark">
                        <button className="btn dropdown text-light" type="button" aria-expanded="false">
                        {props.sym}
                    </button>
                    </div>
                    </label>
                    <input type="text" id="coininput" onInput={onCoinInput}>

                    </input>
                    </div>
                    <div className="bg-dark">
                    <label for="curinput">
                        <div className="dropdown" data-bs-theme="dark">
                        <button className="btn dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" id="dropdownMenuButtonDark" aria-expanded="false">
                        {cur}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                        {curs.map(returnCurMenu)}
                    </ul>
                        </div>
                    </label>
                    <input type="text" id="curinput" onInput={onCurInput}>
                        
                    </input>
                    </div>
                </form>
                <div>
                    1 {props.sym} = {currencysymbol[cur]} {price}
                </div>
            </div>
        </div>
    )
}

export default DetailDesc;
export {curvalue}