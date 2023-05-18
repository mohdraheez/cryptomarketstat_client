import React , {useState,useEffect} from "react";
import { cursymbol, curvalue } from "./dropdown";
import axios from "axios";
function CoinAttacher(arr,index){
    var id = "collapse"+index;
    var coinbuyinput = "coin-buy-input"+index;
    var curbuyinput = "cur-buy-input"+index;
    var alertmessage = "alert-message"+index;
    var coinsellinput = "coin-sell-input"+index;
    var hid = "#collapse"+index;
    var buyPrice =0;
    var buyCoin = 0;
    if(arr.priceUsd){
    var price = Number(arr.priceUsd)/curvalue;
    var priceUsd = Number(arr.priceUsd);
    }
    var symbolsmall = arr.symbol.toLowerCase();
    var quantity = 0;
    var imgurl = `https://assets.coincap.io/assets/icons/${symbolsmall}@2x.png`
    if(price>2)
    price = price.toFixed(2);

    function coinBuyInput(e){
        var val = (e.target.value)
        if(isNaN(val)){
            document.getElementById(curbuyinput).value = "Error";
        }
        else{
             buyPrice = price*val;
            if(buyPrice<=Number(JSON.parse(localStorage.getItem('wallet')).balance)/curvalue){
                document.querySelector('#'+alertmessage).style.display = "none";
                document.querySelector('#'+curbuyinput).value = buyPrice;
            }
            else{
                document.querySelector('#'+curbuyinput).value = buyPrice;
                document.querySelector('#'+alertmessage).style.display = "block";
            }

        }
    }

    function curBuyInput(e){
        var val = (e.target.value)

        if(isNaN(val)){
            document.querySelector("#"+coinbuyinput).value = "Error";
        }
        else{
            buyCoin = Number(val)/price;
            if(Number(val)<=Number(JSON.parse(localStorage.getItem('wallet')).balance)/curvalue){
                document.querySelector('#'+alertmessage).style.display = "none";
                document.querySelector('#'+coinbuyinput).value = buyCoin;
            }
            else{
                document.querySelector('#'+coinbuyinput).value = buyCoin;
                document.querySelector('#'+alertmessage).style.display = "block";
            }

        }
    }


    function buy(){
        if(Number(document.querySelector('#'+curbuyinput).value)<=Number(JSON.parse(localStorage.getItem('wallet')).balance)/curvalue)
        {
            var balance = Number(JSON.parse(localStorage.getItem('wallet')).balance);
            var usd = priceUsd;
            var quant = Number(document.querySelector('#'+curbuyinput).value)/price
            var bal = usd*quant;
            var key = arr.symbol +" "+arr.id;
            console.log(balance-bal);
            console.log(quant);
            console.log(usd);
            console.log(key);
            var obj = {
                coin: key,
                invested:bal,
                balance :balance-bal,
                priceusd:usd,
                quantity:quant
            }
            var userid = JSON.parse(localStorage.getItem("loginAutentication")).id;
            axios.post("https://cryptomarketstat.azurewebsites.net/updatewallet",[userid,obj])
            
        }
        // console.log(priceUsd)
    }

    return (
        <div className="invest-coin-item" key={id}>
        <ul className='invest-coin'>
            <li className='invest-coin-name-li'>
                <img className="invest-coin-img" src={imgurl}></img>
                <div>
                    {arr.name}
                    <small>{arr.symbol}</small>
                </div>
            </li>
            <li>
                {cursymbol}{price}
            </li>
            <button className='trade-btn btn btn-primary' data-bs-toggle="collapse" data-bs-target={hid} aria-expanded="false" aria-controls="collapseExample">Trade</button>
        </ul>
        <div className='collapse' id={id}>
            <div >
                <strong className='text-danger' id={alertmessage} >Insufficient balance</strong>
                <strong className='text-success quantity'>Available Quantity:{quantity}</strong>
            </div>
            <div className='collapse-inner-div'>
           <div className='buy-div'>
                <input type="text" id={coinbuyinput} placeholder="Quantity" onInput={coinBuyInput}></input>
                <input type="text" id={curbuyinput} placeholder="Price" onInput={curBuyInput}></input>
                <button className="btn btn-success" onClick={buy}>BUY</button>
            </div>
            <div className='sell-div'>
                <input type="text" id="coin-sell-input" placeholder="Quantity"></input>
                <button className='btn btn-danger'>SELL</button>
            </div>
           </div>
        </div>
    </div>
    )
}

function Coins(){
    const [loading, setLoading] = useState(true);
    const [watchlist, setWatchlist] = useState([]);
  
    useEffect(() => {
      
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

    

    return (
        <>
            {watchlist.map(CoinAttacher)}
        </>
    )
}

export default Coins;