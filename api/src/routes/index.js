const { Router } = require('express');
const Dogs = require('./Dogs.js')
const Temper = require('./Temper.js')


const router = Router();

router.use('/dogs', Dogs)
router.use('/temperament', Temper)


module.exports = router;
