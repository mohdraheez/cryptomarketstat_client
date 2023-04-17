import React from 'react'

function TableHead(){
    return(
        <tr className="tablecontent">
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>24hVolume</th>
            <th>Supply</th>
            <th>MarketCap</th>
        </tr>
    )
}

export default TableHead;