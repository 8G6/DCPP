// data = require('./dataset')
// const {
//     format,
//     conv,
//     encode,
//     decode,
//     genMonths,
//     week_finder,
//     weeks,
//     leap_year
// }  = require('./date_conv')

// dates    = []
// high     = []
// low      = []
// opening  = []
// closeing = []
// index    = []

// let k=Object.keys(data)
//     let count=0
//     for(i=-7;i<k.length-8;i++){
//         dates.push(data[i.toString()]["Date"][0])
//         index.push(count)
//         high.push(data[i.toString()]['High'])
//         low.push(data[i.toString()]['Low'])
//         opening.push(data[i.toString()]['Open'])
//         closeing.push(data[i.toString()]['Close'])
//         count++
//     }
// for(k=20.001;k<21;k+=0.001)
// console.log(decode(k),k)

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
    return ((year-2001)+days*1e-3)
}

console.log(encode('Jan 17, 2021'))
console.log(encode('Feb 17, 2021'))
console.log(encode('Mar 17, 2021'))
console.log(encode('Apr 17, 2021'))
console.log(encode('May 17, 2021'))
console.log(encode('Jun 17, 2021'))
console.log(encode('Jul 17, 2021'))
console.log(encode('Aug 17, 2021'))
console.log(encode('Sep 17, 2021'))
console.log(encode('Nov 17, 2021'))
