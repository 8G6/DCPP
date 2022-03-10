let $ = (a) => document.querySelector(a) 

let test;

function range(start,end,step=1){
    let temp=[]
    for(i=start;i<end;i+=step)
        temp.push(i)
    return temp
}
function create(val){
    return `
    <div class="${val}">
        <h1>${val} value of a day</h1>
        <canvas id="${val}"></canvas>
        <div style="display: flex;">
            <div class="box">
                <h1>${val} value clean int</h1>
                <canvas id="${val}_int"></canvas> 
            </div>
            <div class="box">
                <h1>${val} value clean float</h1>
                <canvas id="${val}_float"></canvas> 
            </div>
        </div>
    </div>
    <br><br><br><br><br>`
}

function see(id){
    test='hide'
    if(i%2==0){
        document.querySelector('#'+id).classList.toggle('hide')
        temp='show'
    }
    else{
        document.querySelector('#'+id).classList.toggle('show')
        temp='hide'
    }
        
}

function load(start,end){
    k='<div id="plots">'
    for(a=start;a<end;a++){
        k+=`<canvas id="dates_${a}"></canvas>
        <canvas id="index_${a}"></canvas>`+create(`high_${a}`)+create(`low_${a}`)+create(`opening_${a}`)+create(`closeing_${a}`)
    }   
    document.body.innerHTML+=k+"</div>"
}

function camel(str){
    return str[0].toUpperCase()+str.slice(1,str.length)
}

function table(date,value){
    return `
    <div>
        <h1 class='title'>${camel(value)} value of ${date}</h1>
        ₹ : <input type="text" id="${value}_inr" class='output'>
        <br>
        $ : <input type="text" id="${value}_usd" class='output'>
    </div>
            `
}

function Predict(){
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let date   = $('#date').value.split('-')
    console.log(date)
    date       = months[parseInt(date[1])-1]+' '+date[2]+', '+date[0]
   
    out1 = ''
    out2 = ''

    for(i=0;i<2;i++){
        out1 += table(date,array[i])
    }
    for(i=2;i<array.length;i++){
        out2 += table(date,array[i])
    }
    setTimeout(()=>{
            $('#output1').innerHTML = out1
            $('#output2').innerHTML = out2
    },1)
    
    setTimeout(()=>{
        for(i=0;i<array[i].length;i++){
            $(`#${array[i]}_inr`).value = models[i].predict(date)*75
            $(`#${array[i]}_usd`).value = models[i].predict(date)
        }
    })
}