class wolf{
    constructor(json,start){
        this.json  = json
        this.keys  = Object.keys(this.json)
        this.temp  = []
        this.start = start
        this.len   = this.keys.length + (this.start < 0 ? this.start : 0)
        this.index = []
    }  
    get = (id,index=-1) => {
        let array = []
        this.keys.forEach(n=>{
            index==-1 ? array.push(this.json[n][id]) : array.push(this.json[n][id][index]) 
         })
         return array
    } 
    take = (id,index=-1) => {
        let INDEX = [],array = [],i;
        for(i=this.start;i<this.len;i++){
            try{
                index==-1 ? array.push(this.json[i.toString()][id]) : array.push(this.json[i.toString()][id][index])
                INDEX.push(i+(this.start < 0 ? -this.start : 0))
            }
            catch(e){
                
            }
        }
        this.index = INDEX
        return array
    }
}
