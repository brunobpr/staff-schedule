const mongoose = require('mongoose');

const StaffFloorSchema = new mongoose.Schema({
    
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
    },

    email:{
        type : String,
    },

});

module.exports = mongoose.model('StaffFloor', StaffFloorSchema);