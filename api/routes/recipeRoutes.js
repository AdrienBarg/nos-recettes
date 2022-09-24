const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/myRecipes')
    .get(verifyJWT, recipeController.getMyRecipes)

router.route('/')
    .get(recipeController.getAllRecipes)
    .post(recipeController.createNewRecipe)

module.exports = router;