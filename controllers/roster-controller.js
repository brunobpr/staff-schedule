// Code written by Bruno Ribeiro based on Mikhail Timofeev lecturers at CCT Dublin 
var Roster = require('../models/roster');
var Staff = require('../models/staff');
var Shift = require('../models/shifts');
const roster = require('../models/roster');



exports.createStaff = function (req, res) {

    
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        body = roster[0];
        body.staffs.push(
            {
                "name"   : "Billy",
                "monday" : "08 17",
                "tuesday" : "08 17",
                "wednesday" : "14 23",
                "thursdasy" : "08 17",
                "friday" : "08 17",
                "saturday" : "OFF",
                "sunday" : "OFF",
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
        
        res.redirect('back');
    }) 
    
};

exports.showRoster = function (req, res) {
    var mainData = {};

    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        mainData.roster = roster;
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


exports.updateShift  = function (req, res) {
    // Getting the ID from the request body and storing it in variable
    const id = req.body.id;
    filtered = req.body.staffName.split(",");
    const name = filtered[0];
    const day = filtered[1];
    if(req.body.startTime.includes(':')){
        var start = req.body.startTime.split(":")[0];
        var end = req.body.endTime.split(":")[0];
        console.log(start);
    }else{
        var start = "OFF";
        var end  = "";
    } 
    Roster.findById(id, function (err, roster) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            roster.staffs.forEach(staff => {
                if(staff.name == name){
                    staff[day] = (start + " " + end);
                }
            });
            Roster.updateOne({_id: id}, roster,
            function(err, result) {
              if (err) {
                console.log(err)
              } 
            })
            
            res.redirect('back');
        } 
    });
};