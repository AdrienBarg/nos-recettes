const asyncHandler = require('express-async-handler');
const Ingredient = require('../models/Ingredient');


// @desc - Get all ingredients
// @route - GET /ingredients
// @access - Public
const getAllIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find().lean()
    if (!ingredients?.length) {
        return res.status(400).json({ message: 'Aucun ingrédient trouvé.' })
    }
    res.json(ingredients)
});

// @desc - Create new ingredients
// @route - POST /ingredients
// @access - Private
const createNewIngredient = asyncHandler(async (req, res) => {
    const { name, defaultMeasure } = req.body

    // Confirm data
    if (!name || !defaultMeasure) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate
    const duplicateName = await Ingredient.findOne({ 'name' : { '$regex': name, '$options': 'i'} }).lean().exec()
    if(duplicateName) {
        return res.status(409).json({ message: 'Cet ingrédient existe déjà.' })
    }
    
    const ingObject = { name, defaultMeasure }
    // Create and store new ingredient
    const ingredient = await Ingredient.create(ingObject)
    if (ingredient) {
        res.status(201).json({ message : `Nouvel ingrédient ${name} ajouté.` })
    } else {
        res.status(400).json({ message: 'Données saisies incorrectes.' })
    }
});

// @desc - Update ingredients
// @route - PATCH /ingredients
// @access - Private
const updateIngredient = asyncHandler(async (req, res) => {
    const { id, name, defaultMeasure, active } = req.body

    // Confirm data
    if (!id || !name || !defaultMeasure || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const ingredient = await Ingredient.findById(id).exec();
    if(!ingredient) {
        return res.status(400).json({ message: 'Ingredient non trouvé.' })
    }

    // Check for duplicate
    const duplicateName = await Ingredients.findOne({ 'name' : { '$regex': name, '$options': 'i'} }).lean().exec()
    if(duplicateName && duplicateName?._id.toString() !== id ) {
        return res.status(409).json({ message: 'Cet ingrédient existe déjà.' })
    }

    ingredient.name = name;
    ingredient.defaultMeasure = defaultMeasure;
    ingredient.active = active;
    const updatedIngredient = await ingredient.save()
    res.json({ message: `L'ingrédient ${updatedIngredient.name} a été mis à jour.` })

});

// @desc - Delete ingredients
// @route - DELETE /ingredients
// @access - Private
const deleteIngredient = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Ingredient ID required.' })
    }

    const ingredient = await Ingredient.findById(id).exec()
    if(!ingredient) {
        return res.status(400).json({ message : 'L\'ingredient n\'a pas été trouvé.' })
    }

    const result = await ingredient.deleteOne();
    const reply = `Ingredient ${result.name} with ID ${result._id} deleted. `

    res.json(reply)
});

module.exports = {
    getAllIngredients,
    createNewIngredient,
    updateIngredient,
    deleteIngredient
}