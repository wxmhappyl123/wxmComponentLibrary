import myPlayer from './index.vue'
import mySplitScreenVideo from './splitScreenVideo.vue'

// 导出组件
export default {
  install: function(Vue){
    Vue.component('myPlayer',myPlayer)
    Vue.component('mySplitScreenVideo',mySplitScreenVideo)
  }
}


