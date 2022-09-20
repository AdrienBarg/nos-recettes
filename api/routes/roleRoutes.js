const express = require('express')
const router = express.Router()
const roleController = require('../controllers/roleController')
const verifyAdminJWT = require('../middleware/verifyAdminJWT')

router.route('/')
    .get(verifyAdminJWT, roleController.getAllRoles)
    .post(verifyAdminJWT, roleController.createNewRole)
    .patch(verifyAdminJWT, roleController.updateRole)
    .delete(verifyAdminJWT, roleController.deleteRole)

module.exports = router;