import React from 'react';
import TableHead from './tablehead';
import Tabledata from './tabledata';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function Home(){
    localStorage.setItem('start',0);

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
            <div className="buttons">
            <button className='showmorebtn prev' >
                Previous
            </button>
            <button className='showmorebtn next' >
                Next
            </button>
            </div>
        </div>

    )
}

export default Home