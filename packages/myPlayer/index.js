import myPlayer from './index.vue'
// 为组件添加 install 方法，用于按需引入
myPlayer.install = function (Vue) {
  Vue.component(myPlayer.name, myPlayer)
}
export default myPlayer

