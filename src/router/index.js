import Vue from 'vue'
import VueRoter from 'vue-router'

//2.安装插件
Vue.use(VueRoter)


//2.1懒加载
import scorement from '../views/scorement.vue'
import gotime from '../views/gotime.vue'


const router = new VueRoter({
    routes: [
        {
            path: '/',
            meta: {
                title: '车辆管理'
            }
        },
        {
            path: '/scorement',
            component: scorement,
            meta: {
                title: '车辆详情'
            }
        },
        {
            path: '/gotime',
            name: 'gotime',
            component: gotime,
            meta: {
                title: '车辆进出详情'
            }
        },
       
        




    ],
  



})
export default router