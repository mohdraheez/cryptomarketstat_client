import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReturnImage(props) {
  const [Data, setData] = useState([]);

  const sym = props.sym;
  useEffect(() => {
    var fetchData = async () => {
      try {
        // var url = 'http://192.168.201.88:3333/apidataimg';
        var url = `https://coinsdekho.azurewebsites.net/apidataimg/${sym}`;
        const response = await axios.get(url)
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();


  }, []);

  return(
    <img src={Data} alt={sym} className={props.class}></img>
)
}

export default ReturnImage;
