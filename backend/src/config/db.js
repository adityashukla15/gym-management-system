const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Server connected to DB')
        })
        .catch(() => {
            console.log('Error connecting to DB')
        })
}

module.exports = connectToDB