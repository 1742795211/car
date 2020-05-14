export function datatime(datatime){
  
    let str=datatime.toString();

    let d = new Date(str); 
    
    d=d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()); 
    return d
}
function p(s) {
    return s < 10 ? '0' + s : s
  }