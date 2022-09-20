const User = require('../models/User');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');



// @desc - Get all users
// @route - GET /users
// @access - Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
});

// @desc - Create new user
// @route - POST /users
// @access - Public
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicates
    const duplicateName = await User.findOne({ 'username': {'$regex': username, '$options': 'i'}}).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateName) {
        return res.status(409).json({ message: 'Ce pseudo est déjà utilisé.' })
    } 
    if (duplicateEmail) {
        return res.status(409).json({ message: 'Cet email est déjà enregistré.' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, email, "password": hashedPassword }

    // Create and store new user
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user "${username}" created.` })
    } else {
        res.status(400).json({ message: 'Invalid data received.' })
    }
});

// @desc - Update user
// @route - PATCH /users
// @access - Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, password, active, roles } = req.body

    // Confirm data
    if (!id || !username || !email || typeof active !== 'boolean') {
        return res.status(400).json({ message : 'All fields are required.' })
    }

    const user = await User.findById(id).exec();
    if(!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate
    const duplicateName = await User.findOne({ 'username': {'$regex': username, '$options': 'i'} }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();
        //allow updates to the original user
    if(duplicateName && duplicateName?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    if(duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate email' })
    }
    
    user.username = username;
    user.email = email;
    user.active = active;
    if(roles) { user.roles = roles }
    if(password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save();

    res.json({ message: `Le profil ${updatedUser.username} a été mis à jour` });

});

// @desc - Delete user
// @route - DELETE /users
// @access - Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'User ID required.' })
    }

    const user = await User.findById(id).exec();
    if(!user) {
        return res.status(400).json({ message : 'User not found.' })
    }

    const result = await user.deleteOne();
    const reply = `User ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}