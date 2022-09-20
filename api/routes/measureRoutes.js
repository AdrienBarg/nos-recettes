const express = require('express')
const router = express.Router()
const measureController = require('../controllers/measureController')
const verifyAdminJWT = require('../middleware/verifyAdminJWT')

router.route('/')
    .get(verifyAdminJWT, measureController.getAllMeasures)
    .post(verifyAdminJWT, measureController.createNewMeasure)
    .patch(verifyAdminJWT, measureController.updateMeasure)
    .delete(verifyAdminJWT, measureController.deleteMeasure)

module.exports = router;