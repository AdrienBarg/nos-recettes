const express = require('express')
const router = express.Router()
const measureController = require('../controllers/measureController')

router.route('/')
    .get(measureController.getAllMeasures)
    .post(measureController.createNewMeasure)


module.exports = router;