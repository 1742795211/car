export function outtime(datatime){
   


    let str=datatime.toString();
    let d = new Date(str); 
    d=d.getFullYear() + '/' + p((d.getMonth() + 1)) + '/' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()); 

    let s=new Date(d).getTime();
    
    return s
}
function p(s) {
    return s < 10 ? '0' + s : s
  }