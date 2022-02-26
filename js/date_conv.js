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
    list    = date.split(',')
    list[0] = list[0].split(" ")
    day     = parseInt(list[0][1])
    month   = list[0][0]
    year    = parseInt(list[1])
    
    months  = genMonths(year)
    keys    = Object.keys(months)

    days = 0
    for(i=0;i<keys.length;i++){
        if(keys[i].slice(0,3)==month){
            days+=day
            break
        }
        else{
            days+=months[keys[i]]
        }
    }
    console.log(year,month,day, ((year-2001)+days*1e-3))
    return ((year-2001)+days*1e-3)
}

function format(coded){
    coded=coded.toString().split('.')
    year = parseInt(coded[0])
    days = coded[1] ? parseFloat('0.'+coded[1].slice(0,3))*1000 : 0
    console.log(days)
    return [year,days]
}
function decode(coded){
    [year,days]=format(coded)
    console.log(year,days)
    months = genMonths(year)
    keys = Object.keys(months)
    val=0
    for(i=0;i<keys.length;i++){
        val+=months[keys[i]]
        if(val>=days){
            break
        }
    }
    return `${week_finder(2e3+year,days)} ${keys[i]} ${months[keys[i]]-(val-days)}, ${2e3+year}`
}



function conv(n){
    n=n.toString().split('.')
    int   = parseInt(n[0])
    float = parseFloat('0.'+n[1])*1e3
    return [int,parseInt(float.toString().slice(0,3))]
}


// module.exports = {
//     format,
//     conv,
//     encode,
//     decode,
//     genMonths,
//     week_finder,
//     weeks,
//     leap_year
// }