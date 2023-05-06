import React from 'react';
import TableHead from './tablehead';
import WishlistTableData from './wishlistfetchdata'
function WishlistData(){
    return(
        <div className="home wishlist">
            <table className=''>
                <thead className='tableHead'>
                    <TableHead key="tablehead"/>
                </thead>
                <tbody className='tableData'>
                    <WishlistTableData key="watchlistdata"/>
                </tbody>
            </table>
        </div>
    );
}

export default WishlistData