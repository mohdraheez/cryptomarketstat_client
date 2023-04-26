import React from 'react'
import logo from './../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dropdown from './dropdown';
import '../header.css'
import Options from './optiondropdown';

function eventHandler(e){
    var data = e.target.value;
    var val = e.target.value.split(" ")
    var length = val.length;
    if(document.getElementById(data)){
        window.location.href = `/Details/${val[length-1].toUpperCase()}`;
    }
}

var collapse = 0;

document.querySelector('body').addEventListener('click',(e)=>{
    if(e.target.classList[2]!=="searchicon"){
    console.log('came here')
    document.querySelector('.rightcontainer').classList.remove('rightcontainercollapse');
    document.querySelector('.searchcontainer').classList.remove('searchcontainercollapse');
    document.querySelector('.search').classList.remove('searchcollapse');
    }
})

function searchhandler(){
    if(window.innerWidth <= 510)
    {
        collapse = 1;
        document.querySelector('.rightcontainer').classList.add('rightcontainercollapse');
        document.querySelector('.searchcontainer').classList.add('searchcontainercollapse');
        document.querySelector('.search').classList.add('searchcollapse');

    }
    console.log('gotclicked')

}



function Header() {
    return (
        <header className="header">
            <img src={logo} alt="logo" />
            <div className="searchcontainer">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchicon"  onClick={searchhandler}/>
                <input list="cryptolist" placeholder="search" className="search" name="cryptolist" onInput={eventHandler}/>
                <datalist id="cryptolist" name="cryptolist" >
                    <Options/>
                </datalist>
            </div>

            <div className="rightcontainer">
                <Dropdown />
            </div>

            <div className="Account">
                <FontAwesomeIcon icon={faUser} className="searchicon"/>
            </div>
        </header>
    );
}

export default Header;