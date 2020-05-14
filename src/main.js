import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'vant/lib/index.css';
import Vant from 'vant';



Vue.use(Vant);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//   document.title = to.meta.title
//   }
//   next()
//   })
 
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
