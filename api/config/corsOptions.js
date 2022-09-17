const allowedOrigins = require('./allowedOrigins.js');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log('ok')
            callback(null, true)

        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    OptionsSuccessStatus: 200 
}

module.exports = corsOptions