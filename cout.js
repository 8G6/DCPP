let {parse,stringify} = JSON

PBR_buster=(A)=>parse(stringify(A))


function upper_trigular(matrix,){
    let l = matrix.length,r,i,j,k;
    for(i=0;i<l;i++){
        for(j=0;j<l;j++){
            if(j>i){
                r=matrix[j][i]/matrix[i][i]
                for(k=0;k<l;k++)
                    matrix[j][k] -= r * matrix[i][k]
            }
        }
    }
    return matrix
}

function  det(A){
    let matrix = A
    let l = matrix.length,r,det=1
    matrix = upper_trigular(matrix)
    for(i=0;i<l;i++)
        det*=matrix[i][i]
    return det
}


function crammers(A,B){
    let det_A             = det(PBR_buster(A))
    let X                 = []
    let i,j;
    for(i=0;i<A.length;i++){
        temp=PBR_buster(A)
        for(j=0;j<A.length;j++){
            temp[j][i]=B[j]
        }
        console.log(temp)
        X.push(det(temp)/det_A)
    }
    return X   
}

console.log(crammers([[1,1],[1,-1]],[10,0]))