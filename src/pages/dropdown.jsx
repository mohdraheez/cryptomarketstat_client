import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {useState} from "react"
var curchange = "USD";
var cursymbol = "$";
var curs = ["INR","EUR","USD","IDR","TWD","CNY","JPY"]

var currencysymbol={
        "INR":"₹",
        "USD":"$",
        "EUR":"€",
        "IDR":"IDR",
        "TWD":"NT$",
        "CNY":"CN¥",
        "JPY":"¥"
}

var curfullname = {
        "INR":"Indian Rupee",
        "USD":"US Dollar",
        "EUR":"Euro",
        "IDR":"Indonesian Rupiah",
        "TWD":"New Taiwan Dollar",
        "CNY":"Chinese Yuan",
        "JPY":"Japnese Yen"
}



function Dropdown(){
    if(!localStorage.getItem("cur")){
        localStorage.setItem("cur","USD");
    }
    else{
        curchange = localStorage.getItem("cur");
    }
    cursymbol = currencysymbol[curchange];
    const [cur,setcur] = useState(localStorage.getItem("cur"));

    function returnCurMenu(array,index){
        return(
            <li className="curli" key={index}>
            <a className="dropdown-item" href="#"
                onClick={()=>{
                    localStorage.setItem("cur",array);
                    curchange = array;
                    setcur(array);
                }}>
                <span className="cur">{array}</span> &nbsp;&nbsp;&nbsp;{curfullname[array]}
            </a>
                
            </li>   
        )
    }

    return(
        <div className="dropdown bg-secondary " data-bs-theme="dark">
                    <button className="btn dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" id="dropdownMenuButtonDark" aria-expanded="false">
                        {cur}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                        {curs.map(returnCurMenu)}
                    </ul>
        </div>
    );
}

export default Dropdown;
export {curchange};
export {cursymbol};
export {curs};
export {curfullname};
export {currencysymbol};