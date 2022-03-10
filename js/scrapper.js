url = 'https://coinmarketcap.com/currencies/dogecoin/historical-data/'
u=document.querySelectorAll('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div > div.b4d71h-2.hgYnhQ > table > tbody > tr')
p=document.querySelectorAll('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div > div.b4d71h-2.hgYnhQ > table > thead > tr  > th')
k=[]
p.forEach(n=>k.push(n.innerText))
json = {}
for(i=0;i<4000;i++){
    try{
        json[i]={};
        o=u[i].innerText.split('$');
        for(j=0;j<o.length;j++){
            if(j!=0)
                json[i][k[j].replaceAll('*','')]=o[j].match(',') ? parseInt(o[j].split(',').join('')) : parseFloat(o[j]);
            else if(j<o.length-1)
                json[i][k[j].replace(' ','_')] = parseInt(o[j].split(',').join(''))
                
        }
        json[i]['Date'] = o[0]
    }
    catch(e){}
}
document.querySelector('body').innerHTML = '<a>download</a>'

function create(text) {
    
    let a = document.querySelector('a');
    var file = new Blob([text], { type: 'text' });
    a.href = URL.createObjectURL(file);
    a.download = 'dataset.json';
}

create(JSON.stringify(json))
