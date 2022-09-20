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
    const { name, alt } = req.body

    // Confirm data
    if(!name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicates
    const duplicateName = await Measure.findOne({ 'name': {'$regex': name, '$options': 'i'}}).lean().exec();
    if (duplicateName) {
        return res.status(409).json({ message: 'Cette mesure est déjà enregistrée.' })
    }

    const measureObject = { name, alt }
    // Create and store new measure
    const measure = await Measure.create(measureObject)
    if (measure) {
        res.status(201).json({ message: `Nouvelle mesure "${name}" créée.` })
    } else {
        res.status(400).json({ message: 'Invalid data received.' })
    }
});

// @desc - Update measure
// @route - PATCH /measures
// @access - Private
const updateMeasure = asyncHandler(async (req, res) => {
    const { id, name, alt, active } = req.body

    // Confirm data
    if (!id || !name) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const measure = await Measure.findById(id).exec()
    if (!measure) {
        return res.status(400).json({ message: 'Measure not found.' })
    }

    // Check for duplicate
    const duplicateName = await Measure.findOne({ 'name': {'$regex': name, '$options': 'i'} }).lean().exec();
    // allow updates to the original measure
    if (duplicateName && duplicateName?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate measure name.' })
    }

    measure.name = name;
    if (alt) { measure.alt = alt }
    measure.active = active

    const updatedMeasure = await measure.save()
    res.json({ message: `La mesure ${updatedMeasure.name} a été mise à jour.` })
});

// @desc - Delete measure
// @route - DELETE /measures
// @access - Private
const deleteMeasure = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'Measure ID required.' })
    }

    const measure = await Measure.findById(id).exec()
    if (!measure) { 
        return res.status(400).json({ message: 'Measure not found.' })
    }
    
    const result = await measure.deleteOne()
    const reply = `Measure '${result.name}' with ID '${result.id}' deleted.`
    res.json(reply)
});


module.exports = {
    getAllMeasures,
    createNewMeasure,
    updateMeasure,
    deleteMeasure
}