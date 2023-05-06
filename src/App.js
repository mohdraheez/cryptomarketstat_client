import react from 'react';
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

function App() {
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
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;