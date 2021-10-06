var Roster = require('../models/roster');
var RosterFloor = require('../models/roster-floor');
var Staff = require('../models/staff');
var StaffFloor = require('../models/staff-floor');

exports.createStaff = function (req, res) {
    data = req.body;
    staff = {
        "first_name": data.firstName,
        "last_name": data.lastName,
        "position": [{
            "grill": data.grill != undefined ? true : false,
            "salad": data.salad != undefined ? true : false,
            "sides": data.sides != undefined ? true : false,
            "dish": data.dish != undefined ? true : false,
        }],
        "email": data.email,
    }
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
        var newStaff = new Staff(staff);
        newStaff.save(function (err, staff) {
            if (err) {
                res.status(400).json(err);
            }
            Roster.find({}, function (err, roster) {
                if (err) {
                    //If a error occurs display the message
                    res.status(400).json(err);
                }
                body = roster[roster.length - 1];
                if(data.lastName != ""){
                    data.firstName = data.firstName + " " + data.lastName[0] + "."
                }
                body.staffs.push(
                    {
                        "name": data.firstName,
                        "monday": "OFF",
                        "tuesday": "OFF",
                        "wednesday": "OFF",
                        "thursday": "OFF",
                        "friday": "OFF",
                        "saturday": "OFF",
                        "sunday": "OFF",
                    }
                )
                // console.log(body);
                Roster.updateOne({ _id: body._id }, {
                    $addToSet:
                        { staffs: body.staffs }
                },
                    function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                    })
                res.redirect('/');
            })
        });
    }else{
        var newStaff = new StaffFloor(staff);
        newStaff.save(function (err, staff) {
        if (err) {
            res.status(400).json(err);
        }
        RosterFloor.find({}, function (err, roster) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            }
            body = roster[roster.length - 1];
             if(data.lastName != ""){
                    data.firstName = data.firstName + " " + data.lastName[0] + "."
                }
            body.staffs.push(
                {
                    "name": data.firstName,
                    "monday": "OFF",
                    "tuesday": "OFF",
                    "wednesday": "OFF",
                    "thursday": "OFF",
                    "friday": "OFF",
                    "saturday": "OFF",
                    "sunday": "OFF",
                }
            )
            // console.log(body);
            RosterFloor.updateOne({ _id: body._id }, {
                $addToSet:
                    { staffs: body.staffs }
            },
                function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                })
            res.redirect('/');
        })
    });
    }
};

exports.getEmail = function () {
    var data = [];
    Staff.find({}, function (err, staffs) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        else {
            staffs.forEach(function (staff) {
                data.append(staff.email);
            })
            return data;
        }
    });
};

exports.updateStaff = function (req, res) {
    data = req.body;
    updated = {
        "first_name": data.firstName,
        "last_name": data.lastName,
        "email": data.email,
    }
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
        Staff.findById(data.id, function (err, staff) {
            if (err) {
                console.log(err);
            }
            else {
                old_name = staff.first_name;
                Staff.updateOne({ _id: data.id }, updated,
                    function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                    })
                Roster.find({}, function (err, rosters) {
                    if (err) {
                        //If a error occurs display the message
                        res.status(400).json(err);
                    }
                    latest = rosters[rosters.length - 1];
                    Roster.findById(latest._id, function (err, roster) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            roster.staffs.forEach(staff => {
                                if (staff.name == old_name) {
                                    staff.name = data.firstName;
                                }
                            });
                            Roster.updateOne({ _id: latest._id }, roster,
                                function (err, result) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    res.redirect('back');
                                })
                        }
                    });
                })
            }
        });
    }else{
        StaffFloor.findById(data.id, function (err, staff) {
            if (err) {
                console.log(err);
            }
            else {
                old_name = staff.first_name;
                StaffFloor.updateOne({ _id: data.id }, updated,
                    function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                    })
                RosterFloor.find({}, function (err, rosters) {
                    if (err) {
                        //If a error occurs display the message
                        res.status(400).json(err);
                    }
                    latest = rosters[rosters.length - 1];
                    RosterFloor.findById(latest._id, function (err, roster) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            roster.staffs.forEach(staff => {
                                if (staff.name == old_name) {
                                    staff.name = data.firstName;
                                }
                            });
                            RosterFloor.updateOne({ _id: latest._id }, roster,
                                function (err, result) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    res.redirect('back');
                                })
                        }
                    });
                })
            }
        });
    }
};


exports.newStaffPage = function (req, res) {
    res.render('staffForm', {});
}

exports.deleteSfaffPage = function (req, res) {
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
    Staff.find({}, function (err, staff) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        res.render('delete-staff', {
            data: staff
        });
    });}else{
        StaffFloor.find({}, function (err, staff) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            }
            res.render('delete-staff', {
                data: staff
            });
        });
    }
}


exports.deleteSfaff = function (req, res) {
    const replacer = (key, value) => typeof value === 'undefined' ? null : value;
    const stringified = JSON.stringify(req.user, replacer); 
    const parsedUser = JSON.parse(stringified)
    if(parsedUser.section == "kitchen"){
        Staff.findByIdAndDelete(req.body.id, function (err, staff) {
            if (err) {
                console.log(err)
            }
            else {
                Roster.find({}, function (err, rosters) {
                    if (err) {
                        //If a error occurs display the message
                        res.status(400).json(err);
                    }
                    latest = rosters[rosters.length - 1];
                    Roster.findById(latest._id, function (err, roster) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            roster.staffs.forEach(staff => {
                                if (staff.name == req.body.name) {
                                    index = roster.staffs.indexOf(staff)
                                    roster.staffs.splice(index, 1);
                                }
                            });
                            Roster.updateOne({ _id: latest._id }, roster,
                                function (err, result) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                        }
                    });
                })
                res.redirect('back');
            }
        })}else{
            StaffFloor.findByIdAndDelete(req.body.id, function (err, staff) {
                if (err) {
                    console.log(err)
                }
                else {
                    RosterFloor.find({}, function (err, rosters) {
                        if (err) {
                            //If a error occurs display the message
                            res.status(400).json(err);
                        }
                        latest = rosters[rosters.length - 1];
                        RosterFloor.findById(latest._id, function (err, roster) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                            roster.staffs.forEach(staff => {
                                if (staff.name == req.body.name) {
                                    index = roster.staffs.indexOf(staff)
                                    roster.staffs.splice(index, 1);
                                }
                            });
                            RosterFloor.updateOne({ _id: latest._id }, roster,
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                            }
                        });
                    })
                    res.redirect('back');
                }
            })
        }
}