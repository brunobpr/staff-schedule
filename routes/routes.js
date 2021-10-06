var express = require('express'),
    router = express.Router(),
    rosterController = require('../controllers/roster-controller')
    staffController = require('../controllers/staff-controller')
    shiftController = require('../controllers/shift-controller')
    userController = require('../controllers/user-controller')
   
router.get('/home', userController.userLoginPage);
router.get("/", isLoggedIn, rosterController.showRosterAdmin); 
router.post('/', isLoggedIn, rosterController.updateShift);
router.get('/new-roster', isLoggedIn, rosterController.newRosterPage);
router.post('/new-roster', isLoggedIn, rosterController.createRoster);
router.get('/new-shift', isLoggedIn, shiftController.newShiftPage);
router.post('/new-shift', isLoggedIn, shiftController.createShift);
router.get('/new-staff', isLoggedIn, staffController.newStaffPage);
router.post('/new-staff', isLoggedIn, staffController.createStaff);
router.post("/update-staff", isLoggedIn, staffController.updateStaff);
router.get("/staff-delete", isLoggedIn, staffController.deleteSfaffPage);
router.post("/staff-delete", isLoggedIn, staffController.deleteSfaff);
router.get('/history', isLoggedIn, rosterController.showHistoricRosters);
router.get("/register", isLoggedIn, userController.newUserPage);
router.post("/register", isLoggedIn, userController.createNewUser);
router.get("/login", userController.userLoginPage); 
router.post("/login", userController.userLoginAuth);
router.get("/logout", userController.userLogout); 
  
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/home"); 
} 

module.exports = router;