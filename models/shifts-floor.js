const mongoose = require('mongoose');

const ShiftFloorSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('ShiftFloor', ShiftFloorSchema);