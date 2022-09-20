const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdminJWT = require('../middleware/verifyAdminJWT')

router.route('/')
    .get(verifyAdminJWT, usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)
    .delete(verifyAdminJWT, usersController.deleteUser)

module.exports = router;