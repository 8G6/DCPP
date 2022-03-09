let {parse,stringify} = JSON

let PBR_buster=(A)=>parse(stringify(A))

class Matrix{
    constructor(){
        this.temp=[]
    }
    upper_trigular=(matrix)=>{
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
    det=(A)=>{
        let matrix = A
        let l = matrix.length,det=1,i;
        matrix = this.upper_trigular(matrix)
        for(i=0;i<l;i++)
            det*=matrix[i][i]
        return det
    }
    crammers=(A,B)=>{
        let det_A = this.det(PBR_buster(A))
        let X     = []
        let i,j;
        for(i=0;i<A.length;i++){
            let temp=PBR_buster(A)
            for(j=0;j<A.length;j++){
                temp[j][i]=B[j]
            }
            X.push(this.det(temp)/det_A)
        }
        return X   
    }
}

