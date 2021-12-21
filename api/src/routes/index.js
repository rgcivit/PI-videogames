
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const videogamesRouter= require('./videogames')
const genresRouter= require('./genres')
const idRouter = require('./vgamesByid')
const platform = require('./platforms')
const create = require('./createVgames')

const router = Router();

router.use('/videogames', videogamesRouter)
router.use('/genres', genresRouter)
router.use('/videogame', idRouter)
router.use('/platform', platform)
router.use('/videogames',create)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);//En este caso no está modularizado!!!




module.exports = router;