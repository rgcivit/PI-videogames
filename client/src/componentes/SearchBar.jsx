import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVgames } from '../actions';
import './SearchBar.css'



export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setname]= useState('')
    
    function handleImputChange(e){
    e.preventDefault()
    setname(e.target.value)
    
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameVgames(name));
          
        
    }
    return (
        <div className="searchbar-div">
            <input 
            className="bar-btn"
            type="text"
            placeholder= 'Videogame...' required
            onChange = {(e) => handleImputChange(e)}
            />
            <button className="btn" type='submit' onClick={ (e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}