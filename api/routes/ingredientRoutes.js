const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
const verifyAdminJWT = require('../middleware/verifyAdminJWT')


router.route('/')
    .get(ingredientController.getAllIngredients)
    .post(verifyAdminJWT, ingredientController.createNewIngredient)
    .patch(verifyAdminJWT, ingredientController.updateIngredient)
    .delete(verifyAdminJWT, ingredientController.deleteIngredient)

module.exports = router;