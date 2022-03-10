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
function avg(arr){
        let i,AVG=0;
        for(i=0;i<arr.length;i++){
           AVG+=arr[i]
        }
        return (AVG/arr.length)
}
setTimeout(()=>{
        let i,j;
        models = {}
        coff   = {}
        Plot.itrate([[1,3000],[1,389],[1,70]]) 
        splitted = Plot.data 
        Keys = ['high_3','low_3','closeing_3','opening_3']
        for(i=0;i<Keys.length;i++){
                models[Keys[i]]={}
                coff[Keys[i]]={}
                for(j=2;j<4;j++){
                        models[Keys[i]][`order_${j}`]=new curve_master()
                        coff[Keys[i]][`order_${j}`]=models[Keys[i]][`order_${j}`].curve_fit(splitted[Keys[i]][1],splitted[Keys[i]][0][1],j)
                        coff[Keys[i]][`int`]=avg(splitted[Keys[i]][0][0])
                        coff[Keys[i]][`exp`]=splitted[Keys[i]][0][2]
                }
        }

},1000)







