const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');


// @desc - Get all categories
// @route - GET /category
// @access - Public
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().lean()
    if (!categories?.length) {
        return res.status(400).json({ message: 'Aucune catégorie trouvée.' })
    }
    res.json(categories)
});

// @desc - Create new categorie
// @route - POST /category
// @access - Private
const createNewCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    // Confirm data
    if (!name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate
    const duplicateName = await Category.findOne({ 'name' : { '$regex': name, '$options': 'i'} }).lean().exec()
    if(duplicateName) {
        return res.status(409).json({ message: `La catégorie '${name}' existe déjà. ` })
    }
    
    const catObject = { name }
    // Create and store new category
    const category = await Category.create(catObject)
    if (category) {
        res.status(201).json({ message : `Nouvelle catégorie '${name}' ajoutée.` })
    } else {
        res.status(400).json({ message: 'Données saisies incorrectes.' })
    }
});

// @desc - Update categorie
// @route - PATCH /category
// @access - Private
const updateCategory = asyncHandler(async (req, res) => {
    const { id, name, active } = req.body

    // Confirm data
    if (!id || !name || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const category = await Category.findById(id).exec();
    if(!category) {
        return res.status(400).json({ message: 'Categorie non trouvé.' })
    }

    // Check for duplicate
    const duplicateName = await Category.findOne({ 'name' : { '$regex': name, '$options': 'i'} }).lean().exec()
    if(duplicateName && duplicateName?._id.toString() !== id ) {
        return res.status(409).json({ message: 'Cette catégorie existe déjà.' })
    }

    category.name = name;
    category.active = active;
    const updatedCategory = await category.save()
    res.json({ message: `L'ingrédient '${updatedCategory.name}' a été mis à jour.` })

});

// @desc - Delete categorie
// @route - DELETE /category
// @access - Private
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Category ID required.' })
    }

    const category = await Category.findById(id).exec()
    if(!category) {
        return res.status(400).json({ message : `La catégorie '${id}' n'a pas été trouvée.` })
    }

    const result = await category.deleteOne();
    const reply = `Category ${result.name} with ID ${result._id} deleted. `

    res.json(reply)
});

module.exports = {
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory
}