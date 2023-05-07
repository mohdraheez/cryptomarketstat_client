import React from "react";
import ReturnName from "./coinname";
import CryptoChart from './Fetchgraph'
import HighLowFetcher from './graphdata'
import { useParams } from "react-router-dom";
import '../detail.css'
import DetailDesc from "./detaildesc";

function Detail(props){
    var param = useParams()
    var splitdata = param.id.split(' ');
    var sym = splitdata[0];
    var name = splitdata[1];
    return(
        <div className="Details">
                <ReturnName symbol={sym} name={name} className="DeatailData"/>
                <div className="Detailcontent">
                    <div className="Detailcontentinnerdiv">
                            <HighLowFetcher key={sym} sym={sym}/>
                    </div>

                    <div className="graph">
                        <CryptoChart key={sym} sym={sym}/>
                    </div>
                </div>
                <DetailDesc key={sym} sym={sym}/>

        </div>
    )
}

export default Detail;