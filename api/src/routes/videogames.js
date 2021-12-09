const { Router } = require('express');
const{Videogame, Genre}= require('../db')
const {getAllVgames}= require('../Controlador/functionController');
const { default: axios } = require('axios');


const router = Router();


router.get('/', async(req, res)=>{ //Busqueda por nombre
    
    const name = req.query.name;
    let vgamesTotal = await getAllVgames();
    if(name){
        let vgamesName = await vgamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
       vgamesName.length ?
       res.status(200).send(vgamesName):
       res.status(404).send('No se encontró el Juego');
  
    }else{
        res.status(200).send(vgamesTotal);
    }

  })

  router.post('/', async(req, res)=>{
      let{
        
        name,
        background_image,
        description,
        released,
        rating,
        createdInDb,
        platforms,
        genres,
      } =req.body;

      let vgamesCreated = await Videogame.create({
         
          name,
          background_image,
          description,
          released,
          rating,
          platforms,
          createdInDb,

      })
      let genreDb = await Genre.findAll({
          where:{name:genres}
      })
      vgamesCreated.addGenre(genreDb);
      res.send('Videojuego creado con éxito')

  })
    
  

  

    module.exports = router;