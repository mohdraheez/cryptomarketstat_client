import React from 'react'
import '../middlelayer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import {clickonwish} from './attachdata'
// import {clickontop} from './attachdata'
// import {displayonNews} from './news'
import { Link, useLocation } from 'react-router-dom';

function MiddleLayer(){
    var param = useLocation();
    var home = 'homeli'
    var wishlist = 'wishlistli'
    var news = 'newsli'
    var invest = 'investli'
    if(param.pathname==='/wishlist')
    wishlist ='selected'
    else if(param.pathname==='/news')
    news = 'selected'
    else if(param.pathname==='/invest')
    invest = 'selected'
    else 
    home = 'selected'


    home+=" topcoins"
    wishlist+=" whishlist"
    news += " newstag"
    invest += " investtag"

    return(
        <nav className="bg-dark middlelayer">
            <ul className="navitems">
            <Link to="/" className="nounderline"><li className={home}>Top Coins</li></Link>
            <Link to="/invest" className="nounderline"><li className={invest}>
                Invest/Trade<span>[demo]</span>
                </li></Link>
            <Link to="/wishlist" className="nounderline"><li className={wishlist}>WatchList</li></Link>
            <Link to="/news" className="nounderline"><li className={news}>News</li></Link>
            </ul>
        </nav>
    )
}

export default MiddleLayer;