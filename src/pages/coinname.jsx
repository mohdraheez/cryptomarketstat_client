import React from 'react'
import UpdatePrice from './getprice';
import ReturnImage from './fetchimg';
import ReturnCoinName from './fetchname'
import Rank from './fetchrank';
function ReturnName(props){

    return(
        <div className='detailheader'>
            <p className="Rank">Rank #<Rank /></p>
            <div className='detailheading'>
            <ReturnImage sym={props.symbol} class="detaillogo"/> <ReturnCoinName sym={props.symbol}/> <span>{props.symbol}</span>
            </div>
            <div>
                <UpdatePrice/>
            </div>
        </div>
    );
}

export default ReturnName;