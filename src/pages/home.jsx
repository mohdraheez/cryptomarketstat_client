import React from 'react';
import TableHead from './tablehead';
import Tabledata from './tabledata';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function Home(){
    return(
        <div className='home '>
            <div className='tablecontent table-responsive'>
            <table className='table table-hover table-dark table-striped align-middle'>
                <thead className='tableHead table-dark'>
                    <TableHead key="tablehead"/>
                </thead>
                <tbody className='tableData'>
                    <Tabledata key="tabledata"/>
                </tbody>
            </table>
            </div>
            <button className='showmorebtn' >
                Show more
            </button>
        </div>

    )
}

export default Home