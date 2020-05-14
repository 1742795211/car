import access from  "./index"


//获取code
export function login(code){
    return access({
            url:'/login',
            params:{
                code:code
            }
    })
}
//添加车牌
export function addPlates(plate,time){
    console.log(plate,time)
    return access({
            url:'/addplate',
            params:{
                plate:plate,
                time:time
            }
    })
}
//删除车牌
export function deltePlate(plate){

     console.log(plate)
    return access({
            url:'/deltePlate',
            params:{
                plate:plate
            }
    })
}
//获取车牌
export function getMyPlates(){
    return access({
            url:'/getMyPlates',
           
    })
}
//获取全部车牌
export function getAllPlates(){
    return access({
            url:'/getAllPlates',
           
    })
}

export function findrecord(plate){
    console.log(plate)
    return access({
            url:'/findrecord',
            params:{
                plate:plate
            }
           
    })
}

export function updatastatu(plate,statu){//禁用
    console.log(plate)
    return access({
            url:'/updatastatu',
            params:{

                plate:plate,
                statu:statu
            }
    })
}

