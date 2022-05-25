const { Router } = require('express');
const { getAllDogs, getById, createDog } = require('../controllers/Dogs.js')


const router = Router();

router.get('/', getAllDogs)
router.get('/:id', getById)
router.post('/', createDog) 
// router.delete('/:id', deleteGame)


module.exports = router;