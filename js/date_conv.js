function genMonths(year){
    return {
            January: 31,
            February: leap_year(year) ? 29 : 28,
            March: 31,
            April: 30,
            May: 31,
            June: 30,
            July: 31,
            August: 31,
            September: 30,
            October: 31,
            November: 30,
            December: 31
        }
}

let weeks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function week_finder(year,days){
    t_d=(year-2001)*365+days-9
    t_d = (t_d/7)-parseInt(t_d/7)
    return weeks[parseInt((t_d*7)+0.1)]
}

function leap_year(year){
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true
    } else {
       return false
    }
}

function encode(date){
    date = date.split(',')
    year = parseInt(date[1])
    month = date[0].split(' ')
    date  = parseInt(month[1])
    month = month[0]
    months = genMonths(year)
    days = 0
    let keys=Object.keys(months)
    for(i=0;i<keys.length;i++){
        if(keys[i].slice(0,3)==month){
            days+=date
            break
        }
        else{
            days+=months[keys[i]]
        }
    }
    return ((year-2001)+days*1e-3)
}

function format(coded){
    coded=coded.toString().split('.')
    year = parseInt(coded[0])
    days = parseInt()
    if(coded[1].length==4){
        days = parseInt(coded[1].slice(0,3))
    }
    else{
        days = coded[1]
    }
    return [year,days]
}
function decode(coded){
    [year,days]=format(coded)
    months = genMonths(year)
    keys = Object.keys(months)
    val=0
    for(i=0;i<keys.length;i++){
        val+=months[keys[i]]
        if(val>=days){
            break
        }
    }
    return `${week_finder(year,days)} ${keys[i]} ${months[keys[i]]-(val-days)}, ${year}`
}



function conv(n){
    n=n.toString().split('.')
    int   = parseInt(n[0])
    float = parseFloat('0.'+n[1])*1e3
    return [int,parseInt(float.toString().slice(0,3))]
}

// let data = require('./dataset')

