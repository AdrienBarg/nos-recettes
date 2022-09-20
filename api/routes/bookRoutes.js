const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.route('/myBooks')
    .get(bookController.getMyBooks)

router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createNewBook)

module.exports = router;