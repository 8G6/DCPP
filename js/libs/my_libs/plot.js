let MAP   = new map()
let temp=[]
let reverse=(array)=>{
    temp=[]
    for(i=(array.length-1);i>=0;i--){
        temp.push(array[i])
    }
    return temp
}
class plot{
    constructor(x,y){
        this.c      = 0
        this.ctx    = []
        this.charts = []
        this.temp   = []
        this.x      = x
        this.y      = y
        this.slice  = []
        this.data   = {}
    }  
    graph=(id,type,label,value,title,beginAtZero=false)=>{
        this.ctx.push(document.getElementById(id).getContext('2d'))
        this.charts.push(new Chart(this.ctx[this.c], {
            type: type,
            
            data: {
                labels:label ,
                lineThickness: 5,
                datasets: [{
                    label: title,
                    data:value
                }]
            },
            
            options: {
                scales: {
                    y: {
                        beginAtZero: beginAtZero
                    }
                }
            }
        }));
        this.c++
    }
    lazy=(text,label,dates,array,beginAtZero=false)=>{
        this.graph(text,'line',dates,array,label,beginAtZero)
        this.show(text,dates,array)
    }
    
    show=(t,d,a)=>{
        let clean = MAP.min_map(a)
        this.graph(t+'_int','line',d,clean[0],t+'_int',false)
        this.graph(t+'_float','line',d,clean[1],t+'_float',false)
        this.data[t]=[clean,new Date_map(d).getCoded(),d]
    }
    split=(start,end,json,other)=>{
        let dates = this.x
        let i=0;
        for(i=0;i<json.ids.length;i++){
            this.graph(
                json.ids[i],
                'line',
                reverse(dates.slice(start==0 ? 1 : start,end)),
                reverse(json.arrays[i].slice(start==0 ? 1 : start,end)),
                json.labels[i]
            )
        }
        dates = this.x
        for(i=0;i<other.ids.length;i++){
            this.lazy(
                other.ids[i],
                other.labels[i],
                reverse(dates.slice(start==0 ? 1 : start,end)),
                reverse(other.arrays[i].slice(start==0 ? 1 : start,end))
            )
        }
    }
    template=(i,obj)=>{
        return {
            json : {
                ids:[`dates_${i}`,`index_${i}`],
                labels:[`dates_${i}`,`index_${i}`],
                arrays:obj.json
            },
            other : {
                ids:[`high_${i}`,`low_${i}`,`opening_${i}`,`closeing_${i}`],
                labels:[
                    `highest (${i}/3) values in $`,
                    `lowest (${i}/3) values in $`,
                    `opening (${i}/3) values in $`,
                    `closing (${i}/3) values in $`
                ],
                arrays:obj.other
            }
        }
    
    }
    itrate=(array)=>{
        let temp = {};
        this.slice.push(array)
        let y,i;
        for(i=0;i<array.length;i++){
            y    = this.y
            temp = this.template(i+1,y)
            this.split(array[i][0],array[i][1],temp.json,temp.other)
        }
    }
}
