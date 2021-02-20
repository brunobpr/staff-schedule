// Code written by Bruno Ribeiro based on Mikhail Timofeev lecturers at CCT Dublin 
var Roster = require('../models/roster');
var Staff = require('../models/staff');
var Shift = require('../models/shifts');



exports.newRosterPage = function (req, res) {
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        roster = roster[roster.length - 1];
        roster.weekNumber = roster.weekNumber + 1;
        res.render('newRoster', {
            //The front-end will be able to display the data    
            data: roster
        });
    })
};

exports.showHistoricRosters = function (req, res) {
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        else{
            res.render('history', {
                //The front-end will be able to display the data    
                data: roster
            });
        }
    });
};

exports.createRoster = function (req, res) {
    data = req.body;
    var staffs = [];
    Staff.find({}, function (err, staffData) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        } else {
            staffData.forEach(function (staff) {
                staffs.push({
                    "name": staff.first_name,
                    "monday": "",
                    "tuesday": "",
                    "wednesday": "",
                    "thursday": "",
                    "friday": "",
                    "saturday": "",
                    "sunday": "",
                });
            });
            ros = {
                "staffs": staffs,
                "weekNumber": data.weekNumber,
                "yearNumber": data.yearNumber
            }
            var newRoster = new Roster(ros);
            newRoster.save(function (err, roster) {
                if (err) {
                    res.status(400).json(err);
                }
                else{
                    res.redirect('/');
                }
            })
        }  
    });
};

exports.showRoster = function (req, res) {
    var mainData = {};

    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        mainData.roster = roster[roster.length - 1];
        Staff.find({}, function (err, staff) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            }
            mainData.staffs = staff;
            Shift.find({}, function (err, shift) {
                if (err) {
                    //If a error occurs display the message
                    res.status(400).json(err);
                }
                mainData.shifts = shift;
                res.render('calendar', {
                    //The front-end will be able to display the data    
                    data: mainData
                });
            });
        });
    });
};


exports.updateShift = function (req, res) {
    // Getting the ID from the request body and storing it in variable
    const id = req.body.id;
    filtered = req.body.staffName.split(",");
    const name = filtered[0];
    const day = filtered[1];
    if (req.body.startTime.includes(':')) {
        var start = req.body.startTime.split(":")[0];
        var end = req.body.endTime.split(":")[0];
    }else {
        var start = "OFF";
        var end = "";
    }
    if(req.body.startTime.includes('clean')){
        var start = "";
        var end = "";
    } 
    Roster.findById(id, function (err, roster) {
        if (err) {
            console.log(err);
        }
        else {
            roster.staffs.forEach(staff => {
                if (staff.name == name) {
                    staff[day] = (start + " " + end);
                }
            });           
            Roster.updateOne({ _id: id }, roster,
                function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    res.redirect('back');
                })  
        }
    });
};