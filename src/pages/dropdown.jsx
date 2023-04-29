import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {useState} from "react"

function Dropdown(){
    const [cur,setcur] = useState("USD");
    const [sel,setsel] = useState({
        cur1 : "INR",
        cur2 : "EUR",
        cur3 : "BTC"
    })

    return(
        <div className="dropdown">
                    <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {cur}
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="#"
                             onClick={()=>{
                                setcur(sel.cur1);
                                setsel({cur1:cur,cur2:sel.cur2,cur3:sel.cur3})
                            }}>
                                {sel.cur1}
                                </a>
                            </li>
                        <li><a class="dropdown-item" href="#"
                        onClick={()=>{
                            setcur(sel.cur2);
                            setsel({cur1:sel.cur1,cur2:cur,cur3:sel.cur3})
                        }}
                        >{sel.cur2}</a></li>
                        <li><a class="dropdown-item" href="#"
                        onClick={()=>{
                            setcur(sel.cur3);
                            setsel({cur1:sel.cur1,cur2:sel.cur2,cur3:cur})
                        }}
                        >{sel.cur3}</a></li>
                    </ul>
        </div>
    );
}

export default Dropdown;