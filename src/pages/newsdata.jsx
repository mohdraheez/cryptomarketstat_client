import React from 'react'
import {useState,useEffect} from 'react' 
import axios from 'axios';
import he from 'he';

var indexnext = 20;
var indexfirst = 0;

function loader(){
    indexfirst  += 20;
    indexnext +=20;
}

function Descsender(html){
    return {__html : html};
}

function newsattacher(arr,index){
    var desc = arr.description;
    var ddesc = he.decode(desc);
    var timestamp = arr.feedDate;
    var date = new Date(timestamp);
    var localdate = date.toLocaleDateString();
    return(
        <div className="newsdata" key={index} >
            <h1>{arr.title}</h1>
            <span className='date'>Source:{arr.source} Updated:{localdate}</span>
            <img src={arr.imgURL} alt='img' className='newsimg'></img>
            <p>
                related coins : {arr.relatedCoins.map((arr,index)=>{
                    return(<>{arr} </>)
                })}
            </p>
            <div className='desc' dangerouslySetInnerHTML={Descsender(ddesc)}>
            </div>
            <a href={arr.link}>Click here to read more</a>
            </div>
    )
}

function Newsdata(){
    const [data,setdata] = useState('');
    const [loading,setloading] = useState(true);

    useEffect(()=>{
        var fetchdata = async ()=> {
            const response = await axios.get('https://api.coinstats.app/public/v1/news?skip='+indexfirst+'&limit='+indexnext);
            setdata(response.data.news);
            console.log(response.data.news)
            setloading(false);
        }
        document.querySelector('.newsshowmorebtn').addEventListener('click',()=>{
            setloading(true);
            loader();
            fetchdata()
        })

        fetchdata();

    },[])

    if(loading){
        return(
            <div>
                loading
            </div>    
            )
    }
    return (
        <>
            {data.map(newsattacher)}
        </>
    )
}

export default Newsdata;