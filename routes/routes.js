var express = require('express'),
    router = express.Router(),
    rosterController = require('../controllers/roster-controller')
    staffController = require('../controllers/staff-controller')
    shiftController = require('../controllers/shift-controller')
   



router.get('/', rosterController.showRoster);
router.get('/new-roster', rosterController.newRosterPage);
router.post('/new-roster', rosterController.createRoster);
router.post('/', rosterController.updateShift);
router.get('/new-shift', shiftController.newShiftPage);
router.post('/new-shift', shiftController.createShift);
router.get('/new-staff', staffController.newStaffPage);
router.post('/new-staff', staffController.createStaff);
router.get('/history', rosterController.showHistoricRosters);

module.exports = router;