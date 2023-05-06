import React from 'react';
import TableHead from './tablehead';
import WishlistTableData from './wishlistfetchdata'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function displayonwish(){
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.whishlist').classList.add('selected')
}

function WishlistData(){
    setTimeout(()=>{
    displayonwish();
    },500)
    return(
        <div className="home wishlist">
            <div className='tablecontent table-responsive'>
            <table className='table table-hover table-dark table-striped align-middle'>
                <thead className='tableHead table-dark'>
                    <TableHead key="tablehead"/>
                </thead>
                <tbody className='tableData'>
                    <WishlistTableData key="watchlistdata"/>
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default WishlistData