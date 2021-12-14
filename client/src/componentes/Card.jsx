import React from 'react'
import './Card.css'
export default function Card({name,background_image,id, genres, released,rating}) {

    //genres
    //genres.name
    let gen = genres
    console.log(gen, 'hola soy gen')
    return (
        <div className='card'>
        <div key={id}>
            <h3>{name} </h3>
            <div>
                <label style={{color:'blue'}}>Géneros:</label>
            <h4>{gen}</h4>
            <h4>Released:</h4><h4 style={{color:'green', textShadow:' 2px 2px 8px #FF0000'}}>{released}</h4>
            </div>
            <img src={background_image} alt="img not found" width="350px" height="250px"/>
            <h4>Rating</h4> <h3 style={{color:'red', textShadow:' 2px 2px 8px #FF0000'}}>{rating}</h3>
        </div>
        </div>
    )
}