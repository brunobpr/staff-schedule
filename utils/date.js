exports.getDays = function(weekNumber, yearNumber){
    var adjust = 2022 - yearNumber;
    return[
        new Date(yearNumber, 0,(weekNumber*7) - 4 + adjust).toString().substring(0, 3) + " (" + new Date(yearNumber, 0,(weekNumber*7) - 4 + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) - 4 + adjust).toISOString().substring(5, 7)+")",
        new Date(yearNumber, 0,(weekNumber*7) - 3 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) - 3 + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) - 3 + adjust).toISOString().substring(5, 7)+")",
        new Date(yearNumber, 0,(weekNumber*7) - 2 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) - 2 + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) - 2 + adjust).toISOString().substring(5, 7)+")",
        new Date(yearNumber, 0,(weekNumber*7) - 1 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) - 1  + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) - 1 + adjust).toISOString().substring(5, 7)+")",
        new Date(yearNumber, 0,(weekNumber*7) + 0 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) - 0 + adjust).toISOString().substring(5, 7)+")",
        new Date(yearNumber, 0,(weekNumber*7) + 1 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) + 1 + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) + 1  + adjust).toISOString().substring(5, 7)+")",
        new Date(yearNumber, 0,(weekNumber*7) + 2 + adjust).toString().substring(0, 3) + " ("  + new Date(yearNumber, 0,(weekNumber*7) + 2 + adjust).toString().substring(8, 10)+"/" + new Date(yearNumber, 0,(weekNumber*7) + 2 + adjust).toISOString().substring(5, 7)+")",
    ]

}

