let [x,y] =[[],[]]

for(i=1;i<10;i++){
    x.push(i)
    y.push((i*2**0.5)+3)
}

let i,j;
let s_x  = 0
let s_y  = 0
let s_x2 = 0
let s_xy = 0
let n    = 10-1

for(i=a;i<b;i++){
    s_x  += x[i-a]
    s_y  += y[i-a]
    s_x2 += x[i-a]*x[i-a]
    s_xy += x[i-a]*y[i-a]
}

console.log(x,y)