import React from "react";
import {Link, useParams} from 'react-router-dom';
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function Detail(){
 
    const dispatch = useDispatch()
    
    const {id} = useParams()
    useEffect(() =>{
        dispatch(getDetail(id))
    },[dispatch,id])
    const myVgame = useSelector((state) => state.detail)
    
    console.log(myVgame, 'hola')

    //function handleReset(e){
  //(getDetail(e))
   // }
    return (
        <div>
          
              
                <div>
                   <h1>{myVgame.name}</h1> 
                <img src={ myVgame.background_image} alt= '' width='500px' height='700px'/>
                <h3>Rating:{myVgame.rating}</h3>
                <ul> <h3>Generos:</h3>{!myVgame.createdInDb? myVgame.genres.map(el => el.name ).join(' - '):myVgame.genres.map(el => el.name ).join(' - ')}</ul>
                <h3>Fecha de Lanzamiento:</h3>{myVgame.released}
                 <ul> <h3>Plataformas:</h3>{myVgame.platforms.map(el => el.platform.name + ' ')}</ul>
                 <h3> Descripción:</h3>{myVgame.description_raw === '' ? (
					<p className="">No se encontro una descipcion</p>
				) : (
					<p className="">{myVgame.description_raw}</p>
				)}
                </div >
         
            
            <Link to= '/home' >
                <button >Volver</button>
            </Link>
        </div>
    )
}