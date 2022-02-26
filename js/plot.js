
 
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





