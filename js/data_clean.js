k=Object.keys(data)

dates    = []
high     = []
low      = []
opening  = []
closeing = []



dates = reverse(dates)

function reverse(a){
    let u=[]
    for(i=(a.length-1);i>=0;i--){
        u.push(a[i])
    }
    return u
}

function update(n){
    console.log(n)
    for(i=-7;i<n;i++){
        dates.push(data[i.toString()]["Date"][0])
        high.push(data[i.toString()]['High'])
        low.push(data[i.toString()]['Low'])
        opening.push(data[i.toString()]['Open'])
        closeing.push(data[i.toString()]['Close'])
    }
    for(i=0;i<charts.length;i++){
        charts[i].update()
    }
}
function simply(data){
    
    min_data=Math.min.apply(Math,data)
    console.log(min_data)

    x=[]
    y=[]
    
    eval(`data_exp = 1e${min_data.toString().split('.')[1].length}`)
    
    min_data = min_data*data_exp

    for(j=0;j<data.length;j++){
        k=data[j]
        data[j]=data[j]*data_exp
        data[j]=((data[j].toString().match('.') ? parseInt(data[j]+.1) : data[j]))
        data[j]*=1e-3
        y.push(conv(data[j]))
    }

    console.log(c,'\n\n')

    int   = []
    float = []
    
    for(j=0;j<data.length;j++){
        int.push(y[j][0]) 
        float.push(y[j][1])   
    }

    return [int,float]
}


function show(array,name){
    let clean = simply(array)
    clean[0]  = reverse(clean[0])
    clean[1]  = reverse(clean[1])
    plot(name+'_int','line',dates,clean[0],name+'_int',false)
    plot(name+'_float','line',dates,clean[1],name+'_float',false)
    
}

function lazy(text,label,dates,array){
    plot(text,'line',reverse(dates),reverse(array),label,false)
    show(array,text)
}

setTimeout(()=>{
    update(1000)
    lazy('high','highest values in $',dates,high)
    lazy('low','lowest values in $',dates,low)
    lazy('opening','opening values in $',dates,opening)
    lazy('closeing','closing values in $',dates,closeing)
},500)
