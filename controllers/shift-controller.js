var Shift = require('../models/shifts');
var ShiftFloor  = require('../models/shifts-floor');

exports.newShiftPage = function (req, res){
    array = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00","20:00","21:00","22:00","23:00"]
    res.render('newShift', {
        data: array
    });
}

exports.createShift = function (req, res){
    shift = {
        "name" : req.body.name,
        "startTime" : req.body.startTime,
        "endTime" : req.body.endTime,
    }
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
    var newShift= new Shift(shift);
    newShift.save(function (err, shift) {
        if (err) {
            res.status(400).json(err);
        }else{
            res.redirect('/');
        }
    });}else{
        var newShift= new ShiftFloor(shift);
    newShift.save(function (err, shift) {
        if (err) {
            res.status(400).json(err);
        }else{
            res.redirect('/');
        }
    });
    }
    
}