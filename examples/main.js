import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
import {downLoadByUrl} from '../packages/index'
// 把全局js挂接到vue原型上
Vue.prototype.downLoadByUrl = downLoadByUrl
import myPlayer from '../packages/index'
Vue.use(myPlayer)
import mySplitScreenVideo from '../packages/index'
Vue.use(mySplitScreenVideo)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

