var express = require('express'),
    router = express.Router(),
    rosterController = require('../controllers/roster-controller')
    staffController = require('../controllers/staff-controller')
   



router.get('/', rosterController.showRoster);
router.get('/new-roster', rosterController.newRosterPage);
router.post('/new-roster', rosterController.createRoster);
router.post('/', rosterController.updateShift);
router.get('/new-staff', staffController.newStaffPage);
router.post('/new-staff', staffController.createStaff);
module.exports = router;