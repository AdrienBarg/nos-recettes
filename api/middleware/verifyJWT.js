const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startsWith('Bearer ')) { // space after 'Bearer ' is standard practice
        return res.status(401).json({ message: 'Accès non autorisé. Veuillez vous connecter.' })
    }

    const token = authHeader.split(' ')[1] // split then take what is after space ' '
    //console.log(token);

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Accès refusé. Veuillez vous connecter.' })
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )

}


module.exports = verifyJWT
