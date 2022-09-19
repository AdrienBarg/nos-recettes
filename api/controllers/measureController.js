const Measure = require('../models/Measure')
const asyncHandler = require('express-async-handler')

// @desc - Get all measures
// @route - GET /measures
// @access - Private
const getAllMeasures = asyncHandler(async (req, res) => {
    const measures = await Measure.find().lean()
    if(!measures?.length) {
        return res.status(400).json({ message: 'Aucune mesure trouvée.' })
    }
    res.json(measures)
});

// @desc - Create new measure
// @route - POST /measures
// @access - Private
const createNewMeasure = asyncHandler(async (req, res) => {
    const { name } = req.body

    // Confirm data
    if(!name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicates
    const duplicateName = await Measure.findOne({ 'name': {'$regex': name, '$options': 'i'}}).lean().exec();
    if (duplicateName) {
        return res.status(409).json({ message: 'Cette mesure est déjà enregistrée.' })
    }

    const measureObject = { name }
    // Create and store new measure
    const measure = await Measure.create(measureObject)
    if (measure) {
        res.status(201).json({ message: `Nouvelle mesure "${name}" créée.` })
    } else {
        res.status(400).json({ message: 'Invalid data received.' })
    }
});




module.exports = {
    getAllMeasures,
    createNewMeasure
}