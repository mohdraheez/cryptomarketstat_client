import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Datacreator from './attachdata';
import starselected from '../images/starselected.png';
import { curvalue } from './dropdown'

function WishlistTableData() {
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('whish')) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      const watchlist = JSON.parse(localStorage.getItem('whish'));
      const promises = watchlist.map((item) => {
        const id = item.split(' ')[1];
        return axios.get(`https://api.coincap.io/v2/assets/${id}`)
          .then(response => response.data.data)
          .catch(error => console.error(error));
      });
      const data = await Promise.all(promises);
      setWatchlist(data);
      setLoading(false);
    };

    const fetchInterval = setInterval(fetchData, 350);
    return () => clearInterval(fetchInterval);
  }, []);

  const renderEmpty = () => {
    const emptyData = ['Nothing in your watchlist', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    return emptyData.map((data, index) => (
      <tr className="tabledatacontent" key={index}>
        <td>{data}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ));
  };

  return (
    <>
      {loading ? (
        renderEmpty()
      ) : (
        <>
          {watchlist.map((data, index) => (
            <Datacreator 
              key={index + data.symbol}
              img={data.icon}
              rank={data.rank}
              name={data.name}
              supply={data.supply}
              price={data.priceUsd/curvalue}
              change24hr={data.changePercent24Hr}
              volume={data.volumeUsd24Hr/curvalue}
              marketcap={data.marketCapUsd/curvalue}
              symbol={data.symbol}
              id={data.id}
            />
          ))}
        </>
      )}
    </>
  );
}

export default WishlistTableData;
