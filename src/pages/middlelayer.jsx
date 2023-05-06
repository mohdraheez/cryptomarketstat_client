import React from 'react'
import '../middlelayer.css'
import {clickonwish} from './attachdata'
import {clickontop} from './attachdata'
import {displayonNews} from './news'
function MiddleLayer(){
    return(
        <nav className="middlelayer">
            <ul className="navitems">
                <li className="selected topcoins" onClick={clickontop}>Top Coins</li>
                <li className="whishlist" onClick={clickonwish}>WatchList</li>
                <li className="newstag" onClick={displayonNews}>News</li>
            </ul>
        </nav>
    )
}

export default MiddleLayer;