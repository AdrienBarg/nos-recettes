const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async(req, res) => {

    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' })
    }

    const foundUser = await User.findOne({ email }).populate('books.id').exec()
    if(!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect.' })
    }
    
    const username = foundUser.username
    const roles = foundUser.roles
    const id = foundUser._id
    const books = foundUser.books

    const match = await bcrypt.compare(password, foundUser.password)
    if(!match) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect.' })
    }

    const accessToken = jwt.sign(
        {
            "UserInfo" : {
                "username": foundUser.username,
                "roles": foundUser.roles,
                "id": foundUser.id,
                "books": foundUser.books
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: true,
        sameSite: 'None', //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiry : set to match refresh token
    });

    // Send accesToken containing username and ...
    res.json({ accessToken, username, roles, id, books })

});

// @desc Refresh
// @route GET /auth/refresh
// @access Public
const refresh = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) {
        return res.status(401).json({ message: 'Veuillez vous connecter pour accéder à cette page.' })
    }

    const refreshToken = cookies.jwt
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if(err) return res.status(403).json({ message: 'Accès refusé. Veuillez vous connecter pour accéder à cette page.' })
            
            const foundUser = await User.findOne({ username: decoded.username })
            if(!foundUser) return res.status(401).json({ message: 'Veuillez vous connecter pour accéder à cette page.' })
            const username = foundUser.username
            const roles = foundUser.roles
            const id = foundUser._id
            const books = foundUser.books

            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "username": foundUser.username,
                        "roles": foundUser.roles,
                        "id": foundUser.id,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );

            res.json({ accessToken, id, username, roles });
        })
    )
};

// @desc Logout
// @route GET /auth/logout
// @access Public
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // Success but no content
    res.clearCookie('jwt', { //same options as created cookie
        httpOnly: true,
        secure: true,
        sameSite: 'None', 
    })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}