
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const videogamesRouter= require('./videogames')
const genresRouter= require('./genres')
const idRouter = require('./videogame')

const router = Router();

router.use('/videogames', videogamesRouter)
router.use('/genres', genresRouter)
router.use('/videogame', idRouter)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);//En este caso no está modularizado!!!




module.exports = router;