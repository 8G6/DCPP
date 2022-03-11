
let {encode} = new Date_map()
class predictor{
    constructor(type,order="order_2"){
        this.curves  = {"high":{"order_2":[-408.44858963901424,9137.33612499029],"int":1.0144927536231885,"exp":10000,"order_3":[-6540.508192694514,270286.5948308638,-2790976.2015474695]},"low":{"order_2":[-380.6339157953482,8473.453344106178],"int":1,"exp":10000,"order_3":[-7150.619246814867,295565.35799845634,-3052840.000748017]},"closeing":{"order_2":[-386.78500038426444,8644.769590271026],"int":1,"exp":10000,"order_3":[-7737.60934288234,319853.2376214956,-3303970.087767436]},"opening":{"order_2":[-378.11518819955745,8470.48057236645],"int":1,"exp":10000,"order_3":[-7671.1921368689445,317113.06841090694,-3275709.939038709]}}
        this.type    = type
        this.order   = order 
        this.coff    = this.curves[this.type][this.order]
        this.int     = this.curves[this.type].int
        this.exp     = this.curves[this.type].exp
        this.nocoded = {"high":{"order_2":[-0.038341774615060185,0.9629135893186316],"order_3":[-0.8095186736463893,33.4655826816949,-345.60712792239184]},"low":{"order_2":[-0.03806339157953046,0.9473453344105025],"order_3":[-0.7150619242806263,29.556535811310617,-305.18400019333757]},"closeing":{"order_2":[-0.038678500038411556,0.9644769590268306],"order_3":[-0.7737609337571288,31.985323795006526,-330.29700911673405]},"opening":{"order_2":[-0.03781151881993248,0.9470480572361619],"order_3":[-0.7671192148253618,31.711306891775244,-327.47099442813976]}}
        this.nomap   = this.nocoded[this.type][this.order]
    } 
    predict=(x)=>{
        x=encode(x)
        let [i,n,y]=[0,this.coff.length,0];
        for(i=0;i<n;i++){
            y+=this.coff[i] * x ** (n-i-1)
        }
        y = ((this.int+(y*1e-3))/this.exp)*1e3
        return ((y-1e-2)**2)**0.5
    }
    predict_nomap=(x)=>{
        x=encode(x)
        let [i,n,y]=[0,this.nomap.length,0];
        for(i=0;i<n;i++){
            y+=this.nomap[i] * x ** (n-i-1)
        }
        return ((y-1e-2)**2)**0.5
    }
    bulk_predict=(array)=>{
        let predict_array = []
        for(i=0;i<array.length;i++)
            predict_array[i]=this.predit(array[i])
        return predict_array
    }
}