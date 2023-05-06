import React from 'react'
import '../middlelayer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {clickonwish} from './attachdata'
import {clickontop} from './attachdata'
import {displayonNews} from './news'
function MiddleLayer(){
    return(
        <nav className="bg-dark middlelayer">
            <ul className="navitems">
                <li className="selected topcoins" onClick={clickontop}>Top Coins</li>
                <li className="whishlist" onClick={clickonwish}>WatchList</li>
                <li className="newstag" onClick={displayonNews}>News</li>
            </ul>
        </nav>
    )
}

export default MiddleLayer;