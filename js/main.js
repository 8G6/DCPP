

let dogie_high      = new predictor('high')
let dogie_low       = new predictor('low','order_3')
let dogie_closeing  = new predictor('closeing','order_3')
let dogie_opening   = new predictor('opening','order_3')

array  = ['max','min','closeing','opening']
let models = [dogie_high,dogie_low,dogie_closeing,dogie_opening]

let today = new Date().toString().split(' ').slice(1,4)

today  = today[0]+' '+today[1]+', '+today[2]
console.log(today)

let [out1,out2] = ['','']
for(i=0;i<2;i++){
    out1 += table('today',array[i])
}
for(i=2;i<array.length;i++){
    out2 += table('today',array[i])
}
setTimeout(()=>{
        $('#output1').innerHTML = out1
        $('#output2').innerHTML = out2
},1)

setTimeout(()=>{
    for(i=0;i<array.length;i++){
        $(`#${array[i]}_inr`).value = models[i].predict(today)*75
        $(`#${array[i]}_usd`).value = models[i].predict(today)
    }
})

let time = ()=>{
    let datetime = $('#datetime')
    let time = new Date().toString().split(' ')
    let date = time.slice(0,4)
    time     = time[4].split(':')
    time[3]='AM'
    let k=''
    if(parseInt(time[0])>12){
        time[0]=parseInt(time[0])-12
        time[0]=time[0]<10 ? `0${time[0]}` : time[0] 
        time[3]='PM'
    }
    time = time.slice(0,3).join(':')+' '+time[3]
    date = date.join(' ')
    
    datetime.innerHTML=time+'<br>'+date    
}
setInterval(time,1000)