import React from "react";
import logo from "./../images/logo.webp"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
function Footer(){
    return(
        <footer className="Footer bg-secondary text-light">
            <div className="footerheading">
            <img src={logo} className="footerimg"></img>
            <h1>CryptoMarketStat</h1>
            </div>
            <h1 className="description">
            CryptoMarketStat is a comprehensive cryptocurrency market data platform that allows you to track and analyze the latest prices, market capitalization, trading volume, and other key metrics for thousands of cryptocurrencies in real-time. Our easy-to-use interface provides a user-friendly experience for both beginners and advanced traders alike, allowing you to quickly and easily navigate the complex world of cryptocurrency trading. With advanced charting tools and powerful analytics, Coin Dekho is the ultimate resource for anyone looking to stay ahead of the game in the fast-paced world of cryptocurrency."
            </h1>
        </footer>
    )
}

export default Footer;