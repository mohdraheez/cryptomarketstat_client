import react from 'react';
import reactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './pages/Header';
import MiddleLayer from './pages/middlelayer';
import Detail from './pages/detail';
import './styles.css'
import Footer from './pages/footer'



function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={
          <>
            <MiddleLayer/>
            <Home/>
            
          </>
        }>
        </Route>
        <Route path='/Details/:id' 
          element={
            <>
              <Detail/>
            </>
          }
        >    
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;