import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import he from 'he';

var trend = ``;

var indexnext = 20;
var indexfirst = 0;

function reloader(){
    indexfirst = 0;
    indexnext = 20;
}

function loader() {
    indexfirst += 20;
    indexnext += 20;
}

function Descsender(html) {
    return { __html: html };
}

function newsattacher(arr, index) {
    var desc = arr.description;
    var ddesc = he.decode(desc);
    var timestamp = arr.feedDate;
    var today = new Date();
    var now = today.getTime();
    var ago = (now-timestamp);
    var second = Math.floor(ago/1000);
    var minute = Math.floor(second/60);
    var source = arr.source;
    source = source.split(" ");

    if (source[0] != "Reddit") {
        return (
            <div className="newsdata" key={index} >
                <img src={arr.imgURL} alt='img' className='newsimg'></img>

                <div className='content'>
                    <span ><span className='source'>{arr.source}</span> <span className='date'>Updated:{minute}minutes ago</span></span>
                    <a href={arr.link} className='titlelink'><h1 className="newstitle">{arr.title}</h1></a>
                    <div className='desc' dangerouslySetInnerHTML={Descsender(ddesc)}>
                    </div>
                    <a href={arr.link} className='readmore'>Click here to read more</a>
                    <p className='related'>
                        related coins : {arr.relatedCoins.map((arr, index) => {
                            return (<>{arr} </>)
                        })}
                    </p>
                </div>
            </div>
        )
    }
}

function Newsdata() {
    const [data, setdata] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(() => {
        var fetchdata = async () => {
            const response = await axios.get('https://api.coinstats.app/public/v1/news/'+trend+'?skip=' + indexfirst + '&limit=' + indexnext);
            setdata(response.data.news);
            setloading(false);
        }
        document.querySelector('.newsshowmorebtn').addEventListener('click', () => {
            setloading(true);
            loader();
            fetchdata()
        })
        document.querySelector('.list1').addEventListener('click',()=>{
            document.querySelector('.select').classList.remove('select');
            document.querySelector('.list1').classList.add('select');
            trend='latest';
            setloading(true);
            fetchdata();
        })

        document.querySelector('.list2').addEventListener('click',()=>{
            document.querySelector('.select').classList.remove('select');
            document.querySelector('.list2').classList.add('select');
            trend='handpicked';
            reloader()
            setloading(true);
            fetchdata();
        })

        document.querySelector('.list3').addEventListener('click',()=>{
            document.querySelector('.select').classList.remove('select');
            document.querySelector('.list3').classList.add('select');
            trend='trending';
            reloader()
            setloading(true);
            fetchdata();
        })

        
        document.querySelector('.list4').addEventListener('click',()=>{
            document.querySelector('.select').classList.remove('select');
            document.querySelector('.list4').classList.add('select');
            trend='bullish';
            reloader()
            setloading(true);
            fetchdata();
        })

        document.querySelector('.list5').addEventListener('click',()=>{
            document.querySelector('.select').classList.remove('select');
            document.querySelector('.list5').classList.add('select');
            trend='bearish';
            reloader()
            setloading(true);
            fetchdata();
        })



        fetchdata();

    }, [])

    if (loading) {
        return (
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