const { Router } = require('express');
const { getAllTempers } = require('../controllers/Dogs.js')

const router = Router();

router.get('/', getAllTempers)

module.exports = router;