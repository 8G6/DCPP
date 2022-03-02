let Dogie       = new wolf(data,-7);
let dates       = Dogie.take('Date',0)
let high        = Dogie.take('High')
let low         = Dogie.take('Low')
let opening     = Dogie.take('Open')
let closeing    = Dogie.take('Close')
let index       = Dogie.index
let O_dates     = new Date_map(dates)
let maped_dates = O_dates.getCoded()

let obj         = {
                    json:[maped_dates,index],
                    other:[high,low,opening,closeing]
                  }

let Plot        = new plot(dates,obj)

setTimeout(()=>{
        Plot.itrate([[1,3000],[1,389],[1,55]])     

},1000)

