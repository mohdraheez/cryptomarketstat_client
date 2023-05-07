import React from "react";
import Newsdata from "./newsdata";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// function displayonNews(){
//     document.querySelector('.selected').classList.remove('selected');
//     document.querySelector('.newstag').classList.add('selected')
//     window.location.href = `/news`;
// }


// function displayonNewstag(){
//     document.querySelector('.selected').classList.remove('selected');
//     document.querySelector('.newstag').classList.add('selected')
// }


function News(){
    // setTimeout(()=>{
    //     if(document.querySelector('.newstag')){
    //         displayonNewstag();
    //     }
    // },500)


    return(
        <div >
            <nav className="newsnav">
                <ul className="navitems newsitems">
                    <li className="select list1  bg-secondary text-light">
                        Latest
                    </li>
                    <li className="list2 bg-secondary text-light">
                        Handpicked
                    </li>
                    <li className="list3 bg-secondary text-light">
                        Trending
                    </li>
                    <li className="list4 bg-secondary text-light">
                        Bullish
                    </li>
                    <li className="list5 bg-secondary text-light">
                        Bearish
                    </li>
                </ul>
            </nav>
        <div className="news">
            <Newsdata />
            <button className='newsshowmorebtn' >
                Nextpage
            </button>
        </div>
        </div>
    )
}

export default News;
// export {displayonNews}