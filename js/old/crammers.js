


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
        X.push(det(temp)/det_A)
    }
    return X   
}


function equation_model(n){
    let char = []
    let i;
    for(i=0;i<n;i++){
        char.push(String.fromCharCode(i+65))
    }
    let equation = 'y+'
    for(i=n-1;i>=0;i--){
        if(i!=0)
            equation+=`${char[n-i-1]}${'x'.repeat(i)}+`
        else
            equation+=`${char[n-i-1]}${'x'.repeat(i)}`

    }
    return equation 
}

function least_squares(n){
    let i=0,j=0,t;
    let equation  = equation_model(n)
    let equations = []
    for(i=0;i<n;i++){
        let k = equation.split('+')
        for(j=0;j<k.length;j++){
            k[j]+='x'.repeat(i)
            t   = k[j].match(/[x]/g)!=null ? k[j].match(/[x]/g).length : 0
            if(t>1){
                k[j] = k[j].match('y') ? `yx^${t}` : `${k[j].replace(/[x]/g,'')}x^${t}` 
            }
        }
        equations.push(k)
    }
    return equations
}
function predit(x,equation){
    let n = equation.length;
    let out = 0;
    for(i=0;i<n;i++){
        out+=equation[i] * x ** (n-1)
    }
    return out
}
function curve_fit(x,y,n){
    let i,j,k;
    let least_array = least_squares(n)
    let sigma_array_A = []
    let sigma_array_B = []
    let temp ;
    let l = x.length;
    for(i=0;i<least_array.length;i++){
        temp = PBR_buster(least_array[i])
        console.log(temp[0]+' = '+temp.slice(1,temp.length).join(' + '))
    }
    let flag = 0;
    for(i=0;i<least_array.length;i++){
        sigma_array_B[i]=0
        sigma_array_A[i]=[]
        flag = 0
        for(j=0;j<least_array[i].length;j++){
            sigma_array_A[i].push(0)
            for(k=0;k<l;k++){
                if(least_array[i][j].match('y') && !least_array[i][j].match('x')){
                    sigma_array_B[i]+=y[k]
                }
                else if(least_array[i][j].match('y') && least_array[i][j].match('x')){
                    temp = PBR_buster(least_array[i][j]).split('^')
                    sigma_array_B[i]+=y[k]*x[k]**(temp.length == 1 ? 1 : parseInt(temp[1]))
                }
                else if(least_array[i][j].match('x') && least_array[i][j].match(/[A-Z]/g)){
                    temp = PBR_buster(least_array[i][j]).split('^')
                    sigma_array_A[i][j]+=x[k]**(temp.length == 1 ? 1 : parseInt(temp[1]))
                    flag=1
                }
            }
            if(flag==1){
                sigma_array_A[i][j]=sigma_array_A[i][j]==0 ? l : sigma_array_A[i][j];
            }
        }
        sigma_array_A[i]=sigma_array_A[i].slice(1,sigma_array_A[i].length)
    }
    console.log(sigma_array_A,sigma_array_B)
    equation = least_array[0].slice(1,least_array[0].length)
    console.log(equation)
    let coff = crammers(sigma_array_A,sigma_array_B)
    console.log(coff)
    return coff
}


x=[21.054, 21.053, 21.052, 21.051, 21.05, 21.049, 21.048, 21.047, 21.046, 21.045, 21.044, 21.043, 21.042, 21.041, 21.04, 21.039, 21.038, 21.037, 21.036, 21.035, 21.034, 21.033, 21.032, 21.031, 21.03, 21.029, 21.028, 21.027, 21.026, 21.025, 21.024, 21.023, 21.022, 21.021, 21.02, 21.019, 21.018, 21.017, 21.016, 21.015, 21.014, 21.013, 21.012, 21.011, 21.01, 21.009, 21.008, 21.007, 21.006, 21.005, 21.004, 21.003, 21.002, 21.001]
y=[29, 20, 26, 39, 114, 70, 39, 31, 45, 68, 58, 60, 52, 45, 45, 41, 42, 44, 35, 30, 30, 27, 25, 22, 22, 24, 37, 35, 34, 27, 34, 41, 38, 41, 58, 69, 125, 197, 149, 180, 178, 184, 159, 122, 135, 160, 152, 155, 144, 127, 126, 116, 130, 130]


k=curve_fit(x,y,3)

