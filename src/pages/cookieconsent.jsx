import React from 'react';
import {useState} from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

var hide = {
    display:"none"
}

var show={
    display:"flex"
}


function CookieConsent(){
    const [style,update] = useState(show);

 useEffect(()=>{
    if(localStorage.getItem("cookie")){
        update(hide);
    }
 },[])
 function HideConsent(){
    update(hide);
    localStorage.setItem("cookie",true);
}


    return(
        <div className="cookieconsent" style={style}>
            <p>
            We use cookies to offer you better browsing experience, personalize content,and serve targeted advertisements. if you continue to use this site, you consent to use of cookies.
            </p>
            <p>
            <FontAwesomeIcon icon={faXmark} onClick={HideConsent}/>
            </p>
        </div>
        )
}

export default CookieConsent;