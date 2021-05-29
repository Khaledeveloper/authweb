const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
const dotenv = require('dotenv');
dotenv.config();
const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),

        new transports.Console({
            level: 'console',
            format: format.combine(format.timestamp(), format.json())
        }),



        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB_URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'errors',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;