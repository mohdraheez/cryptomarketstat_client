import React from 'react'
import logo from './../images/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dropdown from './dropdown';
import '../header.css'
import Options from './optiondropdown';
import { Link } from 'react-router-dom';


function Header() {
    var login_style= {

    }
    var logout_style = {

    }

    if(localStorage.getItem("loginAutentication")){
        var userid = JSON.parse(localStorage.getItem("loginAutentication"));
        if(userid.hasOwnProperty("id")){
            login_style.display = "none";
            logout_style.display = "block";
        }
    }
    else{
        login_style.display = "block"
        logout_style.display = "none";
    }

    function logoutfunction(){
        localStorage.removeItem("loginAutentication")
        location.reload()
    }

    function loginfunction(){
        window.location.href = '/login';
    }

    return (
        <>
            <header className="header bg-dark">
                <div className='heading navbar-brand'>
                    <img src={logo} alt="logo" />
                    <h1>CryptoMarketStat</h1>
                </div>
                <div className="collapsemenu" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <FontAwesomeIcon icon={faBars} size="xl" style={{ color: 'white' }} />
                </div>
            </header>
            <div className="collapse" id="collapseExample">
                <div className="card card-body bg-dark">
                        <div className="collapsediv">
                            <div className="subdiv">
                                <Options></Options>
                                <Dropdown className="Dropdownwindow"></Dropdown>
                                <button className="btn btn-outline-success" style={login_style} onClick={loginfunction}>Login/Signup</button>
                                <button className="btn btn-outline-danger" style={logout_style} onClick={logoutfunction}>Logout</button>

                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Header;