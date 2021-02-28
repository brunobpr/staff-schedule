exports.getDays = function(weekNumber, yearNumber){
    var adjust = 2021 - yearNumber;
    return[
        new Date(yearNumber, 0,(weekNumber*7) - 3 + adjust).toString().substring(0, 3) + " (" + new Date(yearNumber, 0,(weekNumber*7) - 3 + adjust).toString().substring(8, 10)+")",
        new Date(yearNumber, 0,(weekNumber*7) - 2 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) - 2 + adjust).toString().substring(8, 10)+")",
        new Date(yearNumber, 0,(weekNumber*7) - 1 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) - 1 + adjust).toString().substring(8, 10)+")",
        new Date(yearNumber, 0,(weekNumber*7)     + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7)     + adjust).toString().substring(8, 10)+")",
        new Date(yearNumber, 0,(weekNumber*7) + 1 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) + 1 + adjust).toString().substring(8, 10)+")",
        new Date(yearNumber, 0,(weekNumber*7) + 2 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) + 2 + adjust).toString().substring(8, 10)+")",
        new Date(yearNumber, 0,(weekNumber*7) + 3 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) + 3 + adjust).toString().substring(8, 10)+")",
]

}

