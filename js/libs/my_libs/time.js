function time(){
    let time = new Date().toString().split(' ')
    console.log(time)
}

setInterval(time(),1000)