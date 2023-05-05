import React from 'react';
import TableHead from './tablehead';
import Tabledata from './tabledata';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function Home(){
    return(
        <div className='home'>
            <table className=''>
                <thead className='tableHead'>
                    <TableHead key="tablehead"/>
                </thead>
                <tbody className='tableData'>
                    <Tabledata key="tabledata"/>
                </tbody>
            </table>
            <button className='showmorebtn' >
                Show more
            </button>
        </div>
    )
}

export default Home