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

    monday: [mongoose.Schema.Types.Mixed],
    tuesday: [mongoose.Schema.Types.Mixed],
    wednesday: [mongoose.Schema.Types.Mixed],
    thursday: [mongoose.Schema.Types.Mixed],
    friday: [mongoose.Schema.Types.Mixed],
    saturday: [mongoose.Schema.Types.Mixed],
    sunday: [mongoose.Schema.Types.Mixed],    
});

module.exports = mongoose.model('Roster', RosterSchema);