import react, { useEffect } from 'react';
import reactDOM from 'react-dom';
import { BrowserRouter,Switch, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './pages/Header';
import MiddleLayer from './pages/middlelayer';
import Detail from './pages/detail';
import './styles.css'
import Footer from './pages/footer'
import News from './pages/news'
import WishlistData from './pages/watchlistdata'
import CookieConsent from './pages/cookieconsent';
import Login from './pages/login';
import axios from 'axios';

function App() {
  localStorage.setItem("whish",[]);
  if(localStorage.getItem("loginAutentication")){
    var array = JSON.parse(localStorage.getItem("loginAutentication"));
    console.log(array);

    if(array.hasOwnProperty("id")){
      const getWishlist = async () =>{
        const response = await axios.get('https://cryptomarketstat.azurewebsites.net/getwishlist',{params:{"id":array.id}});
        localStorage.setItem("whish",JSON.stringify(response.data))
      } 
      getWishlist();
    }
    else{
    localStorage.setItem("whish",[]);
    }
  }
  else{
    localStorage.setItem("whish",[]);
  }

  return (
    <BrowserRouter >
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path="/" element={
          <div className="content">
            <MiddleLayer/>
            <Home/>
          </div>
        }>
        </Route>
        <Route path="/:id" element={
          <div className="content">
            <MiddleLayer/>
            <WishlistData/>
          </div>
        }></Route>
        <Route path='/Details/:id' 
          element={
            <>
              <Detail/>
            </>
          }
        >    
        </Route>

        <Route path='/login' 
          element={
            <div className="content">
              <Login/>
            </div>
          }
        ></Route>

        <Route path='/news' 
          element={
            <div className="content">
              <MiddleLayer />
              <News/>
            </div>
          }
        >    
        </Route>
        
      </Routes>
      {/* <CookieConsent /> */}
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;