const express = require('express');
const router = express.Router();


const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

//router.route('/')

router.route('/myBooks')
    .get(bookController.getMyBooks)

/*router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)*/

module.exports = router;

module.exports = router