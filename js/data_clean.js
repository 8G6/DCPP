k=Object.keys(data)

dates=[]
high =[]
low  =[]

for(i=387;i>=-7;i--){
        dates.push(data[i.toString()]["Date"][0])
        high.push(data[i.toString()]['High'])
        low.push(data[i.toString()]['Low'])
}

function simply(data){

    min_data=data.sort()[0]
    
    x=[]
    y=[]
    
    eval(`data_exp = 1e${min_data.toString().split('.')[1].length}`)
    
    min_data = min_data*data_exp
    
    for(j=0;j<data.length;j++){
        data[j]=data[j]*data_exp
        data[j]=(data[j].toString().match('.') ? parseInt(data[j]+.1) : data[j])-min_data
        data[j]*=1e-3
        y.push(conv(data[j]))
    }
    
    int   = []
    float = []
    
    for(j=data.length-1;j>=0;j--){
        int.push(y[j][0]) 
        float.push(y[j][1])   
    }
    return [int,float]
}

function show(array,name){
    let clean = simply(array)
    plot(name+'_int','line',dates,clean[0],name+'_int',false)
    plot(name+'_float','line',dates,clean[1],name+'_float',false)
}

setTimeout(()=>{
    plot('high','line',dates,high,'highest values in $',false)
    show(high,'high')
    plot('low','line',dates,low,'lowest values in $',false)
    show(low,'low')
},1000)