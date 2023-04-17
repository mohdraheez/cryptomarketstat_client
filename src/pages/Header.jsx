import React from 'react'
import logo from './../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dropdown from './dropdown';

import '../header.css'


function Header() {
    return (
        <header className="header">
            <img src={logo} alt="logo" />
            <div className="searchcontainer">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchicon" />
                <input type="text" placeholder="search" className="search" />
            </div>

            <div className="rightcontainer">
                <Dropdown/>
            </div>

            <div className="Account">
                <FontAwesomeIcon icon={faUser} className="searchicon"/>
            </div>
        </header>
    );
}

export default Header;