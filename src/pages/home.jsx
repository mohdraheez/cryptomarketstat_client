import React from 'react';
import TableHead from './tablehead';
import Tabledata from './tabledata';


function Home(){
    return(
        <div className='home'>
            <table>
                <thead className='tableHead'>
                    <TableHead/>
                </thead>
                <tbody className='tableData'>
                    <Tabledata/>
                </tbody>
            </table>
            <button className='showmorebtn' >
                Show more
            </button>
        </div>
    )
}

export default Home