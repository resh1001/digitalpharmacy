const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    avatar: {
        type: String
    }
});

let schema = mongoose.model('Prescription', prescriptionSchema)

module.exports = schema
