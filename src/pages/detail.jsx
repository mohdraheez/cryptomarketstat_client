import React from "react";
import ReturnName from "./coinname";
import CryptoChart from './Fetchgraph'
import HighLowFetcher from './graphdata'
import { useParams } from "react-router-dom";
import '../detail.css'

function Detail(props){
    var param = useParams()
    console.log(param.id)
    return(
        <div>
                <ReturnName symbol={param.id} className="DeatailData"/>
                <div className="Detailcontent">
                    <div className="Detailcontentinnerdiv">
                            <HighLowFetcher sym={param.id}/>
                    </div>

                    <div className="graph">
                        <CryptoChart sym={param.id}/>
                    </div>
                </div>
        </div>
    )
}

export default Detail;