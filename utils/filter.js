var Roster = require('../models/roster');
var Staff = require('../models/staff');
var Shift = require('../models/shifts');


exports.filterData  =  function (){
    data = {}
    Roster.find({}, function (err, roster) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        data.roster = roster;
        Staff.find({}, function (err, staff) {
            if (err) {
                //If a error occurs display the message
                res.status(400).json(err);
            }
            data.staffs = staff;
                Shift.find({}, function (err, shift) {
                if (err) {
                    //If a error occurs display the message
                    res.status(400).json(err);
                }

                data.shifts = shift;
                week = data.roster[0];
                filterData = []

    data.staffs.forEach(function (staff){
        filterData[staff.first_name] = {};
        filterData[staff.first_name].name = staff.first_name;
        week.monday.forEach(function (monday){
            if(monday.staffName == staff.first_name){
                filterData[staff.first_name].monday = monday.shift;
            }
        });
        week.tuesday.forEach(function (day){
            if(day.staffName == staff.first_name){
                filterData[staff.first_name].tuesday = day.shift;
            }
        });
        week.wednesday.forEach(function (day){
            if(day.staffName == staff.first_name){
                filterData[staff.first_name].wednesday = day.shift;
            }
        });
        week.thursday.forEach(function (day){
            if(day.staffName == staff.first_name){
                filterData[staff.first_name].thursday = day.shift;
            }
        });
        week.friday.forEach(function (day){
            if(day.staffName == staff.first_name){
                filterData[staff.first_name].friday = day.shift;
            }
        });
        week.saturday.forEach(function (day){
            if(day.staffName == staff.first_name){
                filterData[staff.first_name].saturday = day.shift;
            }
        });
        week.sunday.forEach(function (day){
            if(day.staffName == staff.first_name){
                filterData[staff.first_name].sunday = day.shift;
            }
        });
        return filterData;
    });
    });
    });
    });
    
}

