import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"
import "./plugins/element.js"
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://192.168.1.165:8080/'


axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers['Authorization'] = window.sessionStorage.getItem('token')
  config.headers['appid'] = window.sessionStorage.getItem('appid')
  // 在最后必须 return config
  return config
})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
