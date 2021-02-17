var express = require('express'),
    router = express.Router(),
    rosterController = require('../controllers/roster-controller')
   



router.get('/', rosterController.showRoster);
router.post('/', rosterController.updateShift);
module.exports = router;