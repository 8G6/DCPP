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
    k=create('high')+create('low')
    document.body.innerHTML+=k
}