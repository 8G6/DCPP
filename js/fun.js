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

function load(){
    k=''
    for(a=1;a<4;a++){
        k+=`<canvas id="dates_${a}"></canvas>
        <canvas id="index_${a}"></canvas>`+create(`high_${a}`)+create(`low_${a}`)+create(`opening_${a}`)+create(`closeing_${a}`)
    }
        
    document.body.innerHTML+=k
}