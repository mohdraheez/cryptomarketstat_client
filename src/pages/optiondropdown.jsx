import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import '../styles.css'
var arr = [];


function Options(){
    const [data,setdata] = useState('');
    const [loading,setloader] = useState(true);
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    


    function arraycreator(ar,index){
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
        var data = e;
    var val =e.split(" ")
    var length = val.length;
    window.location.href = `/Details/${val[0].toUpperCase()} ${val[length-1]}`;
    }

    function renderSuggestion(suggestion) {
        
        return <div className="suggestion" onClick={()=>{suggestionselected(suggestion)}}>{suggestion}</div>;
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
          placeholder: 'search',
          value: value,
          className:"search",
          onChange: onChange,
        }}

        theme={
            {suggestionsContainer:'suggestionbox'}
        }
      />
    )
}

export default Options;