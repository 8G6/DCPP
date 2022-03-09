let matrix = new Matrix()
class curve_master{
    constructor(){
        this.coff = []
    } 
    equation_model=(n)=>{
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
    least_squares=(n)=>{
        let i=0,j=0,t;
        let equation  = this.equation_model(n)
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
    curve_fit=(x,y,n)=>{
        let i,j,k;
        let least_array = this.least_squares(n)
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
        let equation = least_array[0].slice(1,least_array[0].length)
        console.log(equation)
        let coff = matrix.crammers(sigma_array_A,sigma_array_B)
        this.coff = coff
        return coff
    }
    predit=(x)=>{
        let i;
        let n = this.coff.length;
        let out = 0;
        for(i=0;i<n;i++){
            out+=this.coff[i] * x ** (n-i-1)
        }
        return out
    }
}

