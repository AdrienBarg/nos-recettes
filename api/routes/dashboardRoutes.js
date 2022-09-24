const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(dashboardController.getMyCollection)

router.route('/bookmarks')
    .get(dashboardController.getMyBookmarks)


module.exports = router