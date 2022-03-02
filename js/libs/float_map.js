Array.prototype.min = function(){
    return Math.min.apply(null,this);
}
Array.prototype.max = function(){
    return Math.max.apply(null,this);
}
function map_exp(array){
    return 10**(array.min().toString().split('.')[1].length)
}
function code(n,exp,k=-1){
        n*=exp
        n=k==-1 ? ((n.toString().match('.') ? parseInt(n+.1) : n)) : k-((n.toString().match('.') ? parseInt(n+.1) : n))
        n*=1e-3
        n=n.toString().split('.')
        return [parseInt(n[0]),parseInt((parseFloat('0.'+n[1])*1e3).toString().slice(0,3))]
}
class map{
    min_map = (array) => {
        let int = [],float = [];
        let exp = map_exp(array)
        array.forEach(n=>{
            n=code(n,exp)
            int.push(n[0])
            float.push(n[1])
        })

        return [int,float]
    }
    max_map = (array) => {
        let int = [],float = [];

        let exp = map_exp(array)
       
        let max = array.max()
        array.forEach(n=>{
            n=code(n,exp,max)
            int.push(n[0])
            float.push(n[1])
        })
        return [int,float]
    }
}