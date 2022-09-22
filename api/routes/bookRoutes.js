const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/myBooks')
    .get(verifyJWT, bookController.getMyBooks)

router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createNewBook)

module.exports = router;