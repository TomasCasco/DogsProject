const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogs')
const temperamentRouter = require('./temperament')
const { Op } = require('sequelize');
const { createDb } = require('../metodos/createDb');



const router = Router();

//Inicialmente recarga toda la Db

router.use("/", async function (_req, _res, next) {
    let result =await createDb();
    if(result) next(); 
  });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;
