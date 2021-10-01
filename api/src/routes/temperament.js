const { Router } = require('express')
const { getAllTemperaments } = require('../metodos/temperament.js')

const router = Router();



// Get temperaments
router.get('/', getAllTemperaments);
 

module.exports = router;

