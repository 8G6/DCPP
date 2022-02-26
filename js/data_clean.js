

dates    = []
high     = []
low      = []
opening  = []
closeing = []
index    = []

temp_dates = []
temp_high  = []


function reverse(a){
    let u=[]
    for(i=(a.length-1);i>=0;i--){
        u.push(a[i])
    }
    return u
}

function update(start,end,json,other){
    dates    = []
    high     = []
    low      = []
    opening  = []
    closeing = []
    index    = []
    let k=Object.keys(data)
    let count=0
    for(i=-7;i<k.length-8;i++){
        dates.push(data[i.toString()]["Date"][0])
        index.push(count)
        high.push(data[i.toString()]['High'])
        low.push(data[i.toString()]['Low'])
        opening.push(data[i.toString()]['Open'])
        closeing.push(data[i.toString()]['Close'])
        count++
    }
    
    
    dates    = reverse(dates.slice(start==0 ? 1 : start,end))
    high     = high.slice(start==0 ? 1 : start,end)
    low      = low.slice(start==0 ? 1 : start,end)
    opening  = opening.slice(start==0 ? 1 : start,end)
    closeing = closeing.slice(start==0 ? 1 : start,end)

    

    maped_dates = []
    let temp=0
    for(k=0;k<dates.length;k++){
        temp = encode(dates[k])
        maped_dates.push(temp)
    }

    plot(json.id.a,'line',dates.slice(start==0 ? 1 : start,end),maped_dates.slice(start==0 ? 1 : start,end),json.label.a,false)
    plot(json.id.b,'line',dates.slice(start==0 ? 1 : start,end),reverse(index.slice(start==0 ? 1 : start,end)),json.label.b,false)
    
    lazy(other.id.a,other.label.a,dates.slice(start==0 ? 1 : start,end),high)
    lazy(other.id.b,other.label.b,dates.slice(start==0 ? 1 : start,end),low)
    lazy(other.id.c,other.label.c,dates.slice(start==0 ? 1 : start,end),opening)
    lazy(other.id.d,other.label.d,dates.slice(start==0 ? 1 : start,end),closeing)
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


    int   = []
    float = []
    for(j=0;j<data.length;j++){
        int.push(y[j][0]) 
        float.push(y[j][1]) 
    }

    return [int,float]
}

let outs = []

function show(array,name){
    let clean = simply(array)
    outs.push(clean)
    plot(name+'_int','line',dates,reverse(clean[0]),name+'_int',false)
    plot(name+'_float','line',dates,reverse(clean[1]),name+'_float',false)
}

function lazy(text,label,dates,array){
    plot(text,'line',dates,reverse(array),label,false)
    show(array,text)
}

setTimeout(()=>{

    let json = {
        id:{
        a:'dates_3',
        b:'index_3'
        },
        label:{
            a:'dates_3',
            b:'index_3'
        }
    }
    let other = {
        id:{
            a:'high_3',
            b:'low_3',
            c:'opening_3',
            d:'closeing_3'
        },
        label:{
                a:'highest (3/3) values in $',
                b:'lowest (3/3) values in $',
                c:'opening (3/3) values in $',
                d:'closing (3/3) values in $'
        }
    }
    update(0,56,json,other)
    json = {
        id:{
        a:'dates_2',
        b:'index_2'
        },
        label:{
            a:'dates_2',
            b:'index_2'
        }
    }
    other = {
    id:{
        a:'high_2',
        b:'low_2',
        c:'opening_2',
        d:'closeing_2'
    },
    label:{
            a:'highest (2/3) values in $',
            b:'lowest (2/3) values in $',
            c:'opening (2/3) values in $',
            d:'closing (2/3) values in $'
    }
    }
    update(55,389,json,other)
    json = {
        id:{
        a:'dates_1',
        b:'index_1'
        },
        label:{
            a:'dates_1',
            b:'index_1'
        }
    }
    other = {
    id:{
        a:'high_1',
        b:'low_1',
        c:'opening_1',
        d:'closeing_1'
    },
    label:{
            a:'highest (1/3) values in $',
            b:'lowest (1/3) values in $',
            c:'opening (1/3) values in $',
            d:'closing (1/3) values in $'
    }
    }
    update(1,2500,json,other)

},500)


