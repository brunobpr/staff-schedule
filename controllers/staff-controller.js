var Roster = require('../models/roster');
var Staff = require('../models/staff');


exports.createStaff = function (req, res) {
        data = req.body;
        staff = {
            "first_name" : data.firstName,
            "last_name" : data.lastName,
            "position" : [{
                "grill" : data.grill != undefined ? true : false,
                "salad" : data.salad != undefined ? true : false,
                "sides" : data.sides != undefined ? true : false,
                "dish" : data.dish != undefined ? true : false,
            }],
            "email" : data.email,
        }
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
                body.staffs.push(
                    {
                        "name"   : data.firstName,
                        "monday" : "OFF",
                        "tuesday" :  "OFF",
                        "wednesday" :  "OFF",
                        "thursday" :  "OFF",
                        "friday" :  "OFF",
                        "saturday" :  "OFF",
                        "sunday" :  "OFF",
                    }
                )
               // console.log(body);
                Roster.updateOne({_id: body._id},{ $addToSet: 
                    { staffs: body.staffs} },
                function(err, result) {
                  if (err) {
                    console.log(err)
                  } 
                })
                   res.redirect('/');
            }) 
        }); 
};

exports.newStaffPage = function (req, res) {
    res.render('staffForm',{});
}