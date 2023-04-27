import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import axios from 'axios';
import {change} from './graphdata'

Chart.register(CategoryScale);


const CryptoChart = (props) => {
    const [Data, setData] = useState([]);
    var sym = props.sym
    var positive =  "#03C988";
    var negative = "#DF2E38"
    var bnegative = 'rgba(223, 46, 56, 0.2)';
    var bpositive = 'rgba(3, 201, 136,0.2)'

    useEffect(() => {
        var fetchData = async () => {
            try {
              var url = `https://coinsdekho.azurewebsites.net/apidatagraph/${sym}`;
              // var url = 'http://127.0.0.1:3333/apidataimg';
              const response = await axios.get(url)
              const data =response.data.Data.Data;
              const filteredData = window.innerWidth < 768
              ? data.filter((d) => d.time > (Date.now() - 30 * 60 * 1000) / 1000)
              : data;
              setData(filteredData);
            } catch (err) {
              console.log(err);
            }
          };

          var fetcher = setInterval(fetchData,15000);
          fetchData();
          return()=>clearInterval(fetcher);

        }, []);


        

        const chartData = {
            labels: Data && Data.map((data) => new Date(data.time * 1000).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})),
            
            datasets: [
              {
                label: '',
                data: Data && Data.map((data) => data.close),
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
    
            scales: {
              x: {
                display: true,
                grid:{
                    display:false
                },
                ticks: {
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
              }

            }
          };
          return (
            <div className='chartdiv'>
              <Line data={chartData} options={Options} />
            </div>
          );

}


export default CryptoChart;