import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../styles.css'
var arr = [];
var img = [];


function Options(){
    const [data,setdata] = useState('');
    const [loading,setloader] = useState(true);
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    


    function arraycreator(ar,index){
        var obj = {}
        obj.sym = data[index].symbol;
        obj.img = data[index].icon;
        img.push(obj)
        arr.push(data[index].symbol+" "+data[index].name)
    }

    if(loading){
        var url= `https://api.coinstats.app/public/v1/coins?skip=0&limit=2000&currency=USD`

        axios.get(url)
        .then(response =>{
            setdata(response.data.coins);
            setloader(false);
        })
        .catch(error=>console.log(error))
    }

    if(loading){
        return(
            <>
                loading
            </>
        )
    }

    if(arr.length===0){
        data.map(arraycreator)
    }

    function suggestionselected(e){
    var val =e.split(" ")
    var val2 = data.find(elem =>elem.symbol===val[0]);
    var val2 = val2.id;
    console.log(val2);
    window.location.href = `/Details/${val[0].toUpperCase()} ${val2}`;
    }

    function renderSuggestion(suggestion) {
        var url = img.find(obj =>obj.sym ===suggestion.split(' ')[0]);
        return <div className="suggestion bg-dark text-light" onClick={()=>{suggestionselected(suggestion)}}>{suggestion}<div><img className="sugimg" src={url.img} alt={url.sym}></img></div></div>;
      }


      function onChange(event, { newValue }) {
        setValue(newValue);
      }
      
      function onSuggestionsFetchRequested({ value }) {
        const filtered = arr.filter((crypto) =>
          crypto.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
      }
      
      function onSuggestionsClearRequested() {
        setSuggestions([]);
      }

    return(
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}

        inputProps={{
          placeholder: 'Search',
          value: value,
          className:"search form-control mr-sm-2 bg-dark text-light",
          onChange: onChange,
        }}

        theme={
            {suggestionsContainer:'suggestionbox dropdown'}
        }
      />
    )
}

export default Options;