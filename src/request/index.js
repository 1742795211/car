import axios from 'axios'
import store from '../store/index'

axios.defaults.baseURL = 'http://lrp.jxfc0791.com'//第三方应用


// 1.创建axios的实例
const access = axios.create({
methods: 'get',
timeout:3000
   })

// 添加请求拦截器
access.interceptors.request.use(function(config) {
	// console.log(config)
  // 在发送请求之前做些什么 设置token 判断有没有token
	if (store.state.token) {

		config.headers.token = `${store.state.token}`;
		// config['headers']['Authorization'] = AUTH_TOKEN
	}
	return config;
}, function(error){
	// 对请求错误做些什么
	return Promise.reject(error);
});
export  default access