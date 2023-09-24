//importo los hooks que voy a usar de react
import React from 'react';
import{ useState, useEffect} from 'react';
//importo los hooks de react-redux (previamente los instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
import { getVgames, getPlatforms, sortvgames} from "../actions";
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
   const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage]= useState(1)
   const [vgamesPerPage]= useState(15)
   const [orden, setOrden] =useState('')

   const indexOfLastVgames= currentPage * vgamesPerPage//15
   const indexOfFirstVgames = indexOfLastVgames - vgamesPerPage//0
   const currentVgames = allVgames.slice(indexOfFirstVgames, indexOfLastVgames)
   console.log(currentVgames)
   const paginado = (pageNumber) =>{
       setCurrentPage(pageNumber)
   }
   
useEffect(()=>{
    dispatch(getVgames());
    dispatch(getPlatforms());
},[dispatch])

useEffect(()=>{
    dispatch(getVgames());
    dispatch(getPlatforms());
},[dispatch])
const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  });

function handleClick(e){
    e.preventDefault();
    dispatch(getVgames());
}


function handleSort(e){
    dispatch(sortvgames(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}


return (
    <div>
        <h1 className='title-card'>VIDEOGAMES PAGE </h1>
    <Link to = '/creategame'><h6 className='vgame-create'>Crear Juego!</h6> </Link>
    <button  className='Indivgame'onClick={e=> {handleClick(e)}}>
        Volver a cargar todos los Juegos
    </button>
    <br/>
    <br/>
    <div>
        </div>
      
        <select className='Filtervgame' onChange={e=> {handleSort(e)}}>
            <option  value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            <option value="rating">Rating</option>
        </select>

       
        <br />
        <br />
        <div className="">
            <button className="" type='submit'>Buscar</button>
            <input 
            className=""
            type="text"
            placeholder= 'Genres Filter...' required
            />
        </div>
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
            <Card name={el.name} 
             background_image={el.background_image} 
             rating={el.rating}
             genres={!currentVgames[0].createdInDb? el.Genres: 
             currentVgames[0].genres.map((el)=>el.name).join(' - ')}  
             released={el.released} 
             key={el.id}/>
            </Link>
            </div>
            )
        })
    }
    </div>
    </div>
     
)
}
