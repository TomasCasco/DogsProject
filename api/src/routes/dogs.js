const { Router } = require('express');
const { getAllDogs, AddDog , getDog, getDogs} = require('../metodos/dog');
const router = Router();



router.get('/', getAllDogs);

router.get('/:id', getDog);


router.post('/', AddDog);


module.exports = router;

