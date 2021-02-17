const mongoose = require('mongoose');

const RosterSchema = new mongoose.Schema({

    weekNumber: {
        type: Number,
        required: true
    },
    yearNumber: {
        type: Number,
        required: true
    },

    staffs: [mongoose.Schema.Types.Mixed],   
});

module.exports = mongoose.model('Roster', RosterSchema);