let {parse,stringify} = JSON

function PBR_buster(A){
    return parse(stringify(A))
}

function det(matrix){
    return (matrix[0][0]*matrix[1][1])-(matrix[0][1]*matrix[1][0])
}

function crammer(a,b){
    let x = []
    let y = []

    let i,j;
    let s_x  = 0
    let s_y  = 0
    let s_x2 = 0
    let s_xy = 0
    let n    = b-a

    for(i=a;i<b;i++){
        x.push(i)
        y.push(2**0.5*i+3)
    }


    for(i=a;i<b;i++){
        s_x  += x[i-a]
        s_y  += y[i-a]
        s_x2 += x[i-a]*x[i-a]
        s_xy += x[i-a]*y[i-a]
    }
    
    let A=[
        [s_x,n],
        [s_x2,s_x]
    ]
    
    let B = [s_y,s_xy]

    console.log(A,B)
     
    let detA = det(PBR_buster(A))

    let output = [];
    let temp   = []

    for(i=0;i<A.length;i++){
        temp = PBR_buster(A)
        for(j=0;j<A.length;j++){
            temp[j][i] = B[j] 
        }
        output.push(det(temp)/detA)
    }
    console.log(output)
    for(i=a;i<b;i++){
        console.log(y[i-a],(x[i-a]*output[0]+output[1]),y[i-a]-(x[i-a]*output[0]+output[1]))
    }
}

crammer(1,10)