const asyncHandler = require('express-async-handler');
const Role = require('../models/Role');


// @desc - Get all roles
// @route - GET /roles
// @access - Public
const getAllRoles = asyncHandler(async (req, res) => {
    const roles = await Role.find().lean()
    if (!roles?.length) {
        return res.status(400).json({ message: 'Aucun role trouvé.' })
    }
    res.json(roles)
});

// @desc - Create new roles
// @route - POST /roles
// @access - Private
const createNewRole = asyncHandler(async (req, res) => {
    const { name } = req.body

    // Confirm data
    if (!name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate
    const duplicateName = await Role.findOne({ 'name' : { '$regex': name, '$options': 'i'} }).lean().exec()
    if(duplicateName) {
        return res.status(409).json({ message: `Le role '${name}' existe déjà. ` })
    }
    
    const roleObject = { name }
    // Create and store new role
    const role = await Role.create(roleObject)
    if (role) {
        res.status(201).json({ message : `Nouveau role '${name}' ajouté.` })
    } else {
        res.status(400).json({ message: 'Données saisies incorrectes.' })
    }
});

// @desc - Update roles
// @route - PATCH /roles
// @access - Private
const updateRole = asyncHandler(async (req, res) => {
    const { id, name, active } = req.body

    // Confirm data
    if (!id || !name || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const role = await Role.findById(id).exec();
    if(!role) {
        return res.status(400).json({ message: 'Role non trouvé.' })
    }

    // Check for duplicate
    const duplicateName = await Role.findOne({ 'name' : { '$regex': name, '$options': 'i'} }).lean().exec()
    if(duplicateName && duplicateName?._id.toString() !== id ) {
        return res.status(409).json({ message: 'Ce role existe déjà.' })
    }

    role.name = name;
    role.active = active;
    const updatedRole = await role.save()
    res.json({ message: `Le role '${updatedRole.name}' a été mis à jour.` })

});

// @desc - Delete roles
// @route - DELETE /roles
// @access - Private
const deleteRole = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Role ID required.' })
    }

    const role = await Role.findById(id).exec()
    if(!role) {
        return res.status(400).json({ message : `Le role '${id}' n'a pas été trouvé.` })
    }

    const result = await role.deleteOne();
    const reply = `Role ${result.name} with ID ${result._id} deleted. `

    res.json(reply)
});

module.exports = {
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole
}