//return null if it cant be converted
//otherwise return object contain date time
let dateTimeConverter = (dateTime)=>{

    let date = dateTime.split(' ')[0];
    let time = dateTime.split(' ')[1];
    if(!date || !time){
        return null;
    }

    let years = date.split('-')[0];
    let months = date.split('-')[1];
    let days = date.split('-')[2];

    return new Date(years, parseInt(months)-1, days);
}

let isDateTimeInBetween = (currentDateTime, fromDateTime, toDateTime)=>{

    if(!currentDateTime || !fromDateTime || !toDateTime){
        return false;
    }

    
    let c_currentDate = dateTimeConverter(currentDateTime);
    let c_fromDate = dateTimeConverter(fromDateTime);
    let c_toDate = dateTimeConverter(toDateTime);

    

    return c_currentDate > c_fromDate && c_currentDate < c_toDate;
}

module.exports = isDateTimeInBetween;