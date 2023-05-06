import React from "react";
import Newsdata from "./newsdata";

function displayonNews(){
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.newstag').classList.add('selected')
    window.location.href = `/news`;
}


function displayonNewstag(){
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.newstag').classList.add('selected')
}


function News(){
    setTimeout(()=>{
        if(document.querySelector('.newstag')){
            displayonNewstag();
        }
    },500)


    return(
        <div >
            <nav className="newsnav">
                <ul className="navitems newsitems">
                    <li className="select list1">
                        Latest
                    </li>
                    <li className="list2">
                        Handpicked
                    </li>
                    <li className="list3">
                        Trending
                    </li>
                    <li className="list4">
                        Bullish
                    </li>
                    <li className="list5">
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
export {displayonNews}