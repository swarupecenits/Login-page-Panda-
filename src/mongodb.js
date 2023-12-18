const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormDatabase")
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((err) => {
        console.log('Failed to connect');
    })

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model('LogInCollection', logInSchema)

module.exports = collection