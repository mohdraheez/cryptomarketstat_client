import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import axios from 'axios';
import {change} from './graphdata'
import { curchange } from './dropdown'
import { curvalue } from './dropdown';
import 'chartjs-plugin-zoom';

Chart.register(CategoryScale);

var timeinitial = 0;

var timearray = [["m1",10,"10m"],["m1",30,"30m"],["m5",60,"1h"],["h1",24*60,"1d"],["d1",30*24*60,"1M"],["d1",365*24*60,"1Y"]]

var times = {
  "10m":0,
  "30m":1,
  "1h":2,
  "1d":3,
  "1M":4,
  "1Y":5
}

function InitialUpdate(val){
  timeinitial = times[val];
}


const CryptoChart = (props) => {
    const [Data, setData] = useState([]);
    var sym = props.sym
    var positive =  "#03C988";
    var negative = "#F45050"
    var bnegative = 'rgba(223, 46, 56, 0.3)';
    var bpositive = 'rgba(3, 201, 136,0.3)'

    useEffect(() => {
        var fetchData = async () => {
            try {
              var now = Date.now();
              var before= now - (timearray[timeinitial][1] * 60 * 1000);

              var url = `https://api.coincap.io/v2/assets/${props.id}/history?interval=${timearray[timeinitial][0]}&start=${before}&end=${now}`;
              const response = await axios.get(url)
              const data =response.data.data;
              // const filteredData = window.innerWidth < 768
              // ? data.filter((d) => d.time > (Date.now() - 30 * 60 * 1000) / 1000)
              // : data;
              setData(data);
            } catch (err) {
              console.log(err);
            }
          };

          var fetcher = setInterval(fetchData,1000);
          fetchData();
          return()=>clearInterval(fetcher);

        }, []);


        

        const chartData = {
            labels: Data && Data.map((data) => new Date(data.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})),
            
            datasets: [
              {
                label: '',
                data: Data && Data.map((data) => data.priceUsd/curvalue),
                borderColor: change<0?negative:positive,
                fill: true,
                backgroundColor:change<0?bnegative:bpositive,
                pointRadius: 1,
                borderWidth: 1,
              },
            ],
          };
        
         const Options = {
            responsive: true,
            layout: {
              padding: {
                left: 0,
                right: 0
              }
            },
            scales: {
              x: {
                display: true,
                offset: false,
                grid:{
                    display:false
                },
                ticks: {
                color:'white',
                font: {
                  size: window.innerWidth < 600 ? 6 : 10
                }
              }
              },
              y: {
                display: true,
                position:"right",
                grid :{
                    display:false
                },
                ticks: {
                  color:'white',
                  font: {
                    size: window.innerWidth < 600 ? 6 : 10
                  }
                }
              }
            },
            animation: {
                duration: 1000
            },
            
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              },
              
            }
          };
          return (
            <div className='chartdiv'>
              <Line data={chartData} options={Options} />
            </div>
          );

}


export default CryptoChart;
export {InitialUpdate};
export {timeinitial}
export {timearray}