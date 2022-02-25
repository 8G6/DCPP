k=Object.keys(data)

dates=[]
high =[]
low  =[]

for(i=380;i>=-6;i--){
        dates.push(data[i.toString()]["Date"][0])
        high.push(data[i.toString()]['High']*1e3)
        low.push(data[i.toString()]['Low']*1e3)
}

 
ctx    = []
charts = []
c=0

function plot(id,type,label,value,title,beginAtZero){

    ctx.push(document.getElementById(id).getContext('2d'))
    charts.push(new Chart(ctx[c], {
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
    c++
}





