
let $ = (a) => document.querySelector(a)
function toRad(Value) {
    return Value * Math.PI / 180
}
function distance(lat1, lon1, lat2, lon2) {
    let R = 6371 // km
    let dLat = toRad(lat2 - lat1)
    let dLon = toRad(lon2 - lon1)
    lat1 = toRad(lat1)
    lat2 = toRad(lat2)

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d
}

function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cal_dis);
}
}

function cal_dis(position) {
  let x =  position.coords.latitude;
  let y =  position.coords.longitude+0.0002;
  let dits  = Object.keys(data)
  json = {}
  distances = []
  let t = '<h1>Your Location</h1><br>'
  t += `<iframe id='map' width="700" height="440" src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=${x},${y}+(Title)&amp;ie=UTF8&amp;t=k&amp;z=19&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`
  for(i=0;i<dits.length;i++){
      let dis = distance(x,y,data[dits[i]].Latitude,data[dits[i]].Longitude)
      json[dis] = data[dits[i]]
      distances.push(dis)
  }

  distances=distances.sort()
  let near = json[distances[0]]
//   near.Longitude+=0.0002
  console.log(near,distances[0])
  t += '<h1>Camera Location</h1><br>'
  t += `<iframe id='map' width="700" height="440" src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=${near.Latitude},${near.Longitude}+(Title)&amp;ie=UTF8&amp;t=k&amp;z=19&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`
  let u = Object.keys(near)
  t+='<table>'
  for(i=0;i<u.length;i++){
      t+='<tr><td>'+u[i]+'</td><td>:</td>'+'<td>'+near[u[i]]+'</td><tr>'
  }
  t+='</table>'
  t+=`<h1>The ${near['Type of System']} is ${distances[0].toFixed(3)} km away </h1>`
  console.log(t)
  $('#maps').innerHTML = t

}