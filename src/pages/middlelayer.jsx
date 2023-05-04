import React from 'react'
import '../middlelayer.css'
import {displayonwish} from './attachdata'
import {displayontop} from './attachdata'
function MiddleLayer(){
    return(
        <div className="middlelayer">
            <ul className="navitems">
                <li className="selected topcoins" onClick={displayontop}>Top Coins</li>
                <li className="whishlist" onClick={displayonwish}>Whishlist</li>
            </ul>
        </div>
    )
}

export default MiddleLayer;