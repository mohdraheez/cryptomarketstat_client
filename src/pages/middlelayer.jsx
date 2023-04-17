import React from 'react'
import '../middlelayer.css'

function MiddleLayer(){
    return(
        <div className="middlelayer">
            <ul className="navitems">
                <li>Top Coins</li>
                <li>Top Gainers</li>
                <li>Top Losers</li>
            </ul>
        </div>
    )
}

export default MiddleLayer;