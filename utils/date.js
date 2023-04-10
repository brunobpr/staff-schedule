exports.getDays = function(weekNumber, yearNumber){
    const weekNumberAdjustment = weekNumber - 1;
    let days = []
    for (let i = 2; i < 9; i++){
        let date = new Date(yearNumber, 0, (weekNumberAdjustment * 7) + i);
        days.push(date.toString().substring(0, 3) + " (" + date.toString().substring(8, 10)+"/" + date.toISOString().substring(5, 7)+")",)
    }
    return days;

}

