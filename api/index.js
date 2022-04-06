//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js')
const { conn, Genre } = require('./src/db.js')
const axios = require('axios');
const { portalSuspended } = require('pg-protocol/dist/messages');
const { API_KEY } = process.env;

// Syncing all the models at once.
// Force : false ---> guarda en la DB, no reinicia al levantar de nuevo el servidor !
conn.sync({ force: true }).then(async () => {
  // Todo lo que se haga aca, se va a realizar antes de levantar el servidor !
  // Precargar generos.

    const verificacion = await Genre.findAll()
  // Verificar si no hay nada en la db.
    if(verificacion.length < 1) {   // si es menor a uno no tiene contenido.
      // Si no hay nada en e DB, pido los episodios a la API.
      // Lo cargo.
      const pedido  = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      // Cuando tengo los generos, los formateo.
      
      const formateo = pedido.data.results.map((gen) => {
        return{
          id:gen.id,
          name:gen.name,
          
          
        }
      })
      console.log(formateo);
      // Por último, los creo en la base de datos.
      // bulkCreate ---> recibe un arreglo y crea una fila por cada uno.
      const carga = await Genre.bulkCreate(formateo);
      console.log("Pre-carga de Genre lista !");
    }

    server.listen(process.env.PORT, () => {
      console.log("%s listening at 3000"); // eslint-disable-line no-console
    });
  });