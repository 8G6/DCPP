class Date_map{
    constructor(dates){
        this.dates = dates
        this.weeks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        this.coded = []
    } 
    genMonths=(year)=>{
        return {
                January: 31,
                February: this.leap_year(year) ? 29 : 28,
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
    
    week_finder=(year,days)=>{
        t_d=(year-2001)*365+days-9
        t_d = (t_d/7)-parseInt(t_d/7)
        return this.weeks[parseInt((t_d*7)+0.1)]
    }

    leap_year=(year)=>{
        if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) 
            return true
        else 
            return false
    }

    encode=(date)=>{
        let list    = date.split(',')
            list[0] = list[0].split(" ")
        let day     = parseInt(list[0][1])
        let month   = list[0][0]
        let year    = parseInt(list[1])
        
        let months  = this.genMonths(year)
        let keys    = Object.keys(months)

        let days = 0

        for(let i=0;i<keys.length;i++){
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
    format=(coded)=>{
        coded=coded.toString().split('.')
        year = parseInt(coded[0])
        days = coded[1] ? parseFloat('0.'+coded[1].slice(0,3))*1000 : 0
        console.log(days)
        return [year,days]
    }
    decode=(coded)=>{
        let [year,days]=format(coded)
        let months = this.genMonths(year)
        let keys = Object.keys(months)
        val=0
        for(i=0;i<keys.length;i++){
            val+=months[keys[i]]
            if(val>=days){
                break
            }
        }
        return `${week_finder(2e3+year,days)} ${keys[i]} ${months[keys[i]]-(val-days)}, ${2e3+year}`
    }
    getCoded=()=>{
        this.coded = []
        this.dates.forEach(n=>this.coded.push(this.encode(n)))
        return this.coded
    }
}