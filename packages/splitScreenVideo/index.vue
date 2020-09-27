<template>
  <div :class="contentClass">
    <div v-for="(item,index) in videoData" :key="index">
      <myPlayer
        :id="`${index}`"
        :ref="index"
        :scVideoSrc="item.url"
        scVideoHeight="100%"
        :scAutoplay="scAutoplay"
        :isLive="isLive"
        :screenShot="screenShot"
        :isProcess="isProcess"
        :videoId="`video2${index}`"
      ></myPlayer>
    </div>
  </div>
</template>
<script>
  import {filterSplitClass} from '../myPlayer/filter'
  export default {
    name: 'mySplitScreenVideo',
    props: {
      /**
       * 视频源
       */
      videoList: {
        type: Array,
        default: function () {
          return
        }
      },
      /**
       * 分屏数
       */
      splitNum: {
        type: Number,
        default: 9
      },
      // 自动播放
      scAutoplay: {
        type: Boolean,
        default: true
      },
      // 是否显示进度条
      isProcess: {
        type: Boolean,
        default: false
      },
      //是否是直播
      isLive: {
        type: Boolean,
        default: true
      },
      //是否截图
      screenShot: {
        type: Boolean,
        default: true
      },
    },
    data (){
      return{
        contentClass: filterSplitClass(this.splitNum),
        videoData: []
      }
    },
    mounted () {
    },
    methods: {
      setVideo() {
        this.getVideoData()
        let that = this
        this.videoData.forEach((item, index) => {
          if(item.url){
            this.$nextTick(() => {
              // 获取到video组件 init
              that.$refs[index][0].initVideo()
            })
          }
        })
      },
      getVideoData () {
         if(this.splitNum <= this.videoList.length) {
           this.videoData = this.videoList.slice(0,this.splitNum)
         }else {
           this.videoData = this.videoList
           console.log('传过来的video===',this.videoList.length)
           console.log('传过来的video===',this.splitNum - this.videoList.length)
           let num = this.splitNum - this.videoList.length
           for(let i = 0; i<num; i++){
             console.log(i)
             let obj = {
               url: ''
             }
             this.videoData.push(obj)
           }
         }
      },
      /**
       * 销毁
       */
      destroyVideo() {
        let that = this
        this.videoData.forEach((item, index) => {
          if(item.url){
            this.$nextTick(() => {
              // 获取到video组件 init
              that.$refs[index][0].destroyHls()
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../myPlayer/player.less";
</style>
