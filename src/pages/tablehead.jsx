import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
var startupstyle ={
    display : "none"
}

function TableHead(){
    return(
        <tr className="tablecontent">
            <th className="rank rankbtn">Rank<FontAwesomeIcon icon={faCaretUp} className='rankup' style={startupstyle}/><FontAwesomeIcon icon={faCaretDown} className='rankdown'style={startupstyle}/></th>
                    <th>Coin</th>
                    <th className="pricebtn" >Price<FontAwesomeIcon icon={faCaretUp} className='priceup' style={startupstyle}/><FontAwesomeIcon icon={faCaretDown} className='pricedown'style={startupstyle}/></th>
                    <th className="hbtn">24h <FontAwesomeIcon icon={faCaretUp} className='hup' style={startupstyle}/><FontAwesomeIcon icon={faCaretDown} className='hdown'style={startupstyle}/></th>
                    <th className="hvbtn">24hVolume<FontAwesomeIcon icon={faCaretUp} className='hvup' style={startupstyle}/><FontAwesomeIcon icon={faCaretDown} className='hvdown'style={startupstyle}/></th>
                    <th className="supplybtn">Supply<FontAwesomeIcon icon={faCaretUp} className='supplyup' style={startupstyle}/><FontAwesomeIcon icon={faCaretDown} className='supplydown'style={startupstyle}/></th>

                    <th className="mrktcapbtn">MarketCap<FontAwesomeIcon icon={faCaretUp} className='mkcapup' style={startupstyle}/><FontAwesomeIcon icon={faCaretDown} className='mkcapdown'style={startupstyle}/></th>
        </tr>
    )
}

export default TableHead;