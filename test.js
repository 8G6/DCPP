not = (a) => a=='1' ? '0' : '1'
function no(text){
    out = ''
    text.split('').forEach(k => {

        k = k.charCodeAt().toString(2)
        k.split('').forEach(n=>{
            out+=not(n)
        })
        out+=' '
    });
    console.log(out)
}


no('This is soo easy')
