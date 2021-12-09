//importo los hooks que voy a usar de react
import React from 'react';
import{ useState, useEffect} from 'react';
//importo los hooks de react-redux (previamente los instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
import { getVgames, filterCreated, sortvgames} from "../actions";
//importo los componentes que voy a usar
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import './Home.css'
import SearchBar from './SearchBar';


//comienza el componente
export default function Home (){
   const dispatch = useDispatch();
   const allVgames =useSelector((state)=> state.videogames)
   const [currentPage, setCurrentPage]= useState(1)
   const [vgamesPerPage]= useState(15)
   const [orden, setOrden] =useState('')
   const indexOfLastVgames= currentPage * vgamesPerPage
   const indexOfFirstVgames = indexOfLastVgames - vgamesPerPage
   const currentVgames = allVgames.slice(indexOfFirstVgames, indexOfLastVgames)
   
   const paginado = (pageNumber) =>{
       setCurrentPage(pageNumber)
   }
   
useEffect(()=>{
    dispatch(getVgames());
},[dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getVgames());
}
function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
}
function handleSort(e){
    dispatch(sortvgames(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}


return (
    <div>
    <Link to = '/creategame'>Crear videogame</Link>
    <h1> PI VIDEOGAMES </h1>
    <button onClick={e=> {handleClick(e)}}>
        volver a cargar todos los videogames
    </button>
    <br />
    <div>
        <select onChange={e=> handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendentet</option>
            <option value="rating">Rating</option>
            </select>
        <select onChange={e=> handleFilterCreated(e)}>
            <option value="All">All</option>
           <option value="created">Created</option>
            <option value="api">Apigames</option>
        </select>
        
        <Paginado
        vgamesPerPage = {vgamesPerPage}
        allVgames = {allVgames.length}
        paginado ={paginado}
        />
        <SearchBar/>
        <br />
        <br />
        <div className ='container-cards'> 
    {  
    

        currentVgames?.map((el)=>{
            
            return (
            
            <div className='card-link'>
            <Link to={'/videogame/' + el.id} style={{textDecoration:'none' , color:'black'} }>
            <Card name={el.name} background_image={el.background_image} rating={el.rating}
             genres={el.genres}  released={el.released} key={el.id}/>
            </Link>
            </div>
            )
        })
    }
    </div>
    </div>
     </div>
)
}

