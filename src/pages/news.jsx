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
        <div className="news">
            <Newsdata />
            <button className='newsshowmorebtn' >
                Nextpage
            </button>
        </div>
    )
}

export default News;
export {displayonNews}