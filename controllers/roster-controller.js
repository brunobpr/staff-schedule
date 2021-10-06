// Code written by Bruno Ribeiro based on Mikhail Timofeev lecturers at CCT Dublin 
var Roster = require('../models/roster');
var RosterFloor = require('../models/roster-floor');
var Staff = require('../models/staff');
var StaffFloor = require('../models/staff-floor');
var Shift = require('../models/shifts');
var ShiftFloor = require('../models/shifts-floor');
var date = require('../utils/date');


exports.newRosterPage = function (req, res) {
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
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
    })}else{
        RosterFloor.find({}, function (err, roster) {
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
        })}
};

exports.showHistoricRosters = function (req, res) {
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        else {
            res.render('history', {
                //The front-end will be able to display the data    
                data: roster
            });
        }
    });}else{
        RosterFloor.find({}, function (err, roster) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            }
            else {
                res.render('history', {
                    //The front-end will be able to display the data    
                    data: roster
                });
            }
        }); 
    }
};

exports.createRoster = function (req, res) {
    data = req.body;
    var staffs = [];
    if(data.weekNumber > 52){
        data.weekNumber = 0;
    }
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
    Staff.find({}, function (err, staffData) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        } else {
            staffData.forEach(function (staff) {
                if(staff.last_name != ""){
                   c
                }
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
                else {
                    res.redirect('/');
                }
            })
        }
    });}else{
        StaffFloor.find({}, function (err, staffData) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            } else {
                staffData.forEach(function (staff) {
                    if(staff.last_name != ""){
                        staff.first_name = staff.first_name + " " + staff.last_name[0] + "."
                    }
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
                var newRoster = new RosterFloor(ros);
                newRoster.save(function (err, roster) {
                    if (err) {
                        res.status(400).json(err);
                    }
                    else {
                        res.redirect('/');
                    }
                })
            }
        });
    }
};

exports.showRoster = function (req, res) {
    var mainData = {};
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        mainData.roster = roster[roster.length - 1];
        mainData.days = date.getDays(mainData.roster.weekNumber, mainData.roster.yearNumber);
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
                res.render('home', {
                    //The front-end will be able to display the data    
                    data: mainData
                });
            });
        });
    });
};

exports.showRosterAdmin = function (req, res) {
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)

    var mainData = {};
    if(parsedUser.section == "kitchen"){
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        mainData.section = "Kitchen Staff";
        mainData.roster = roster[roster.length - 1];
        mainData.days = date.getDays(mainData.roster.weekNumber, mainData.roster.yearNumber);
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
    }else{
        RosterFloor.find({}, function (err, roster) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            }
            mainData.roster = roster[roster.length - 1];
            mainData.days = date.getDays(mainData.roster.weekNumber, mainData.roster.yearNumber);
            StaffFloor.find({}, function (err, staff) {
                if (err) {
                    //If a error occurs display the message
                    res.status(400).json(err);
                }
                mainData.staffs = staff;
                
                ShiftFloor.find({}, function (err, shift) {
                    if (err) {
                        //If a error occurs display the message
                        res.status(400).json(err);
                    }
                    mainData.section = "Floor Staff";
                    mainData.shifts = shift;
                    res.render('calendar', {
                        //The front-end will be able to display the data    
                        data: mainData
                    });
                });
            });
        });
    }
};

exports.updateShift = function (req, res) {
    const id = req.body.id;
    filtered = req.body.staffName.split(",");
    const name = filtered[0];
    const day = filtered[1];
    if (req.body.startTime.includes(':')) {
        var start = req.body.startTime.split(":")[0];
        var end = req.body.endTime.split(":")[0];
    } else {
        var start = "OFF";
        var end = "";
    }
    if (req.body.startTime.includes('clean')) {
        var start = "";
        var end = "";
    }
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
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
    });}else{
        RosterFloor.findById(id, function (err, roster) {
            if (err) {
                console.log(err);
            }
            else {
                roster.staffs.forEach(staff => {
                    if (staff.name == name) {
                        staff[day] = (start + " " + end);
                    }
                });
                RosterFloor.updateOne({ _id: id }, roster,
                    function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        res.redirect('back');
                    })
            }
        });}
};