const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
    },

    position:[{ grill: Boolean, salad: Boolean, sides: Boolean, dish: Boolean}],
    
    email:{
        type : String,
    },

});

module.exports = mongoose.model('Staff', StaffSchema);