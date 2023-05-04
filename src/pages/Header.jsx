import React from 'react'
import logo from './../images/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Dropdown from './dropdown';
import '../header.css'
import Options from './optiondropdown';

function eventHandler(e){
    var data = e.target.value;
    var val = e.target.value.split(" ")
    var length = val.length;
    if(document.getElementById(data)){
        window.location.href = `/Details/${val[length-1].toUpperCase()} ${val[0]}`;
    }
}

function Header() {
    return (
        <header className="header">
            <div className='heading'>
                <img src={logo} alt="logo" />
                <h1>CoinsDekho</h1>
            </div>
            <div className="searchcontainer">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="searchicon"  onClick={searchhandler}/> */}
                    <Options/>
            </div>

            <div className="rightcontainer">
                <Dropdown />
            </div>

            {/* <div className="Account">
                <FontAwesomeIcon icon={faUser} className="searchicon"/>
            </div> */}
        </header>
    );
}

export default Header;