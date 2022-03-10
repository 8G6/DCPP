let {encode} = new Date_map()
class predictor{
    constructor(type,order="order_2"){
        this.curves  = {"high":{"order_2":[-408.44858963901424,9137.33612499029],"int":1.0144927536231885,"exp":10000,"order_3":[-6540.508192694514,270286.5948308638,-2790976.2015474695]},"low":{"order_2":[-380.6339157953482,8473.453344106178],"int":1,"exp":10000,"order_3":[-7150.619246814867,295565.35799845634,-3052840.000748017]},"closeing":{"order_2":[-386.78500038426444,8644.769590271026],"int":1,"exp":10000,"order_3":[-7737.60934288234,319853.2376214956,-3303970.087767436]},"opening":{"order_2":[-378.11518819955745,8470.48057236645],"int":1,"exp":10000,"order_3":[-7671.1921368689445,317113.06841090694,-3275709.939038709]}}
        this.type    = type
        this.order   = order 
        this.coff    = this.curves[this.type][this.order]
        this.int     = this.curves[this.type].int
        this.exp     = this.curves[this.type].exp
    } 
    predict=(x)=>{
        x=encode(x)
        let [i,n,y]=[0,this.coff.length,0];
        for(i=0;i<n;i++){
            y+=this.coff[i] * x ** (n-i-1)
        }
        y = ((this.int+(y*1e-3))/this.exp)*1e3
        return y
    }
    bulk_predict=(array)=>{
        let predict_array = []
        for(i=0;i<array.length;i++)
            predict_array[i]=this.predit(array[i])
        return predict_array
    }
}