const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const verifyAdminJWT = require('../middleware/verifyAdminJWT')

router.route('/')
    .get(categoryController.getAllCategories)
    .post(verifyAdminJWT, categoryController.createNewCategory)
    .patch(verifyAdminJWT, categoryController.updateCategory)
    .delete(verifyAdminJWT, categoryController.deleteCategory)

module.exports = router;