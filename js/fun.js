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
    k+=`<canvas id="dates_1"></canvas>
        <canvas id="index_1"></canvas>`
    k+=create('high_1')+create('low_1')+create('opening_1')+create('closeing_1')
    k+=`<canvas id="dates_2"></canvas>
        <canvas id="index_2"></canvas>`
    k+=create('high_2')+create('low_2')+create('opening_2')+create('closeing_2')
    k+=`<canvas id="dates_3"></canvas>
        <canvas id="index_3"></canvas>`
    k+=create('high_3')+create('low_3')+create('opening_3')+create('closeing_3')
    document.body.innerHTML+=k
}