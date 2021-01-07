<template>
  <div
          :style="`height: ${scVideoHeight}; position: relative;`"
          class="hls-video-content"
          v-loading="loadingVideo"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <video width="100%" height="100%"
           :class="{'player' : isLive}"
           muted
           :id="videoId"
           :ref="'video'+videoId"
           :autoplay="scAutoplay"
           :controls="isProcess"
           :poster="posterImg"
           x-webkit-airplay="true"
           x5-video-player-fullscreen="true"
           :playsinline="false"
           webkit-playsinline
           x5-video-player-typ="h5">
    </video>
    <div class="error-content" v-if="loadingError">
      <slot name="errorImg">
        <!--errorImg-->
        <img :src="errorImg" alt="errorImg">
      </slot>
    </div>
    <div class="video-name" :class="videoNamePosition ? videoNamePosition : 'top'" v-if="videoName && isvVideoName">{{videoName}}</div>
    <div class="video-controls-content" v-if="!isProcess">
      <div class="play-btn">
          <span class="iconfont iconzanting1 pause" @click="videoPause" v-if="!isPause && !isLive && !isProcess"></span>
          <span class="iconfont iconbofang play" v-if="isPause  && !isLive && !isProcess" @click="videoPlay"></span>
      </div>
      <div class="other-btn">
        <span class="full-screen iconfont iconjietu2" title="截图" v-if="screenShot" @click="screenShotEnv('png')"></span>
        <br>
        <span class="full-screen iconfont iconquanping1" title="全屏" @click="fullScreen"></span> <br>
          <span v-for="(item, index) in btnList" v-if="btnList.length > 0" :key="index" @click="clickBtn(item)">
               <span class="full-screen other-btn-item">{{item.txt}}</span> <br>
          </span>
      </div>
    </div>
  </div>
</template>
<script>
  import Hls from 'hls.js'
    export default {
      name: 'myPlayer',
      data () {
        return{
          myPlayer: null,
          videoHls: null,
          isPause: false,//是否是暂停状态
          loadingVideo: false,
          loadingError: false,
          errorImg: require('./bg-no-vedio.png'),
          videoType: ['mp4', 'ogg']
        }
      },
    props: {
      videoId: {
        type: String,
        default: ''
      },
      // 自动播放
      scAutoplay: {
        type: Boolean,
        default: true
      },
      // 视屏宽度
      scVideoWidth:{
        type: String,
        default: '100%'
      },
      // 视屏高度
      scVideoHeight: {
        type: String,
        default: '100%'
      },
      // 是否显示进度条
      isProcess: {
        type: Boolean,
        default: false
      },
      // 视屏地址
      scVideoSrc: {
        type: String,
        default: ''
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
      posterImg:{
        type: String,
        default: ''
      },
      videoName: {
        type: String,
        default: ''
      },
      isvVideoName: {
        type: Boolean,
        default: false
      },
      videoNamePosition: {
        type: String,
        default: 'top'
      },
        btnList: {
          type: Array,
           default: function () {
               return
           }
        }
    },
    watch: {
      videoHls () {
        // console.log(this.videoHls)
      }
    },
    mounted(){
      this.watchVideo()
    },
    methods: {
        /**
         * 自定义按钮点击事件
         * @param item
         */
        clickBtn(item) {
           this.$emit(item.type, this.videoId, this.scVideoSrc)
        },
      /**
       * 监听是否播放失败
       */
      watchVideo() {
        let that = this
        var elevideo = document.getElementById(this.videoId);
        elevideo.addEventListener('ended', function () { //结束
          console.log("播放结束");
          that.isPause = true
        }, false)
      },
      /**
       * 截图
       *@param  fileName 需要保存的格式
       */
      screenShotEnv(fileName) {
        let fileType = fileName ? fileName : "png";  // 如果文件名中没有带后缀，默认使用
        // let video = document.querySelector('video');  // 找到需要截图的video标签
        let video = document.getElementById(this.videoId);  // 找到需要截图的video标签
        let canvas = window.canvas = document.createElement("canvas"); // 创建canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);  // 图片大小和视频分辨率一致
        let strDataURL = canvas.toDataURL("image/" + fileType);   // canvas中video中取一帧图片并转成dataURL
        let arr = strDataURL.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], {
          type: mime
        });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 1000);
      },
      /**
       * 全屏
       */
      fullScreen() {
        let ele = document.getElementById(this.videoId);
        if (ele .requestFullscreen) {
          ele .requestFullscreen();
        } else if (ele .mozRequestFullScreen) {
          ele .mozRequestFullScreen();
        } else if (ele .webkitRequestFullScreen) {
          ele .webkitRequestFullScreen();
        }
      },
      /**
       * 初始化 video
       */
      initVideo() {
         let that = this
         this.loadingVideo = true
          console.log(Hls.Events)
        let viodeType = this.videoType
        //判断是都支持Hls和视频是否为流地址
        if(Hls.isSupported() && viodeType.indexOf(this.scVideoSrc.substring(this.scVideoSrc.lastIndexOf(".") + 1)) == -1) {
          let video = document.getElementById(this.videoId)
          this.videoHls = new Hls()
          this.videoHls.loadSource(this.scVideoSrc)
          this.videoHls.attachMedia(video)
            this.videoHls.on(Hls.Events.LEVEL_LOADED,function () {
                console.log('播放中=LEVEL_LOADED======')
                that.$emit('leaveLoaded')
            })
          //加载成功
          this.videoHls.on(Hls.Events.MANIFEST_PARSED,function() {
            that.loadingVideo = false
            console.log('加载成功')
            if(this.scAutoplay || this.isLive){
              video.play()
              that.loadingVideo = false
              that.loadingError = false
              that.$emit('initSuccess', this.videoHls)
            }
          })
          //记载失败
          this.videoHls.on(Hls.Events.ERROR, (event, data) => {
            console.log('加载失败')
            that.loadingError = true
            that.loadingVideo = false
            that.$emit('initFail', this.videoHls)
          })
        }else {
          let that = this
          that.$refs['video'+that.videoId].src = that.scVideoSrc
          that.$refs['video'+that.videoId].addEventListener('loadedmetadata',function() {
            if(that.scAutoplay){
                this.loadingVideo = false
                that.loadingError = false
              that.$refs['video'+that.videoId].play()
            }
          })
          that.loadingVideo = false
        }
        // this.loadingVideo = false
      },
      /**
       * 销毁video
       */
      destroyHls() {
          if(Hls.isSupported() && this.videoType.indexOf(this.scVideoSrc.substring(this.scVideoSrc.lastIndexOf(".") + 1)) == -1){
              this.videoHls.destroy()
          }else {
              this.$refs['video'+this.videoId].pause()
          }
          this.loadingVideo = false
          this.loadingError = false
      },
      /**
       * 暂停
       */
      videoPause() {
        console.log('暂停====')
        this.$refs['video'+this.videoId].pause()
        this.isPause = true
      },
      /**
       * 播放
       */
      videoPlay() {
        console.log('播放====')
        this.$refs['video'+this.videoId].play()
        this.isPause = false
      }
    },
    created() {
    }
  }
</script>
<style lang="less" scoped>
  .error-content{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
    height: 100%;
    background-color: #000;
    display: flex;
    justify-content:center;
    align-content:center; //主轴居中对齐
    align-items:center;
    img{
      width: 10%;
    }
  }
    .other-btn-item{
        font-size: 12px !important;
    }
  /deep/.video-js{
    height: 100% !important;
    video{
      height: 100% !important;
    }
  }
  .full-screen{
    color: white;
    /*right: 0.5rem;*/
    font-size: 1rem;
    cursor: pointer;
    z-index: 12;
    /*bottom: 3px;*/
  }
  .iconjietu{
    /*right: 2rem;*/
  }
  // 影藏控制条
  .player::-webkit-media-controls{
    display:none !important;
  }
  video::-webkit-media-controls{
    z-index: 100;
    height: 2rem;
    line-height: 10px;
    display: flex;
    justify-content: space-between;
  }
  video::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  video{
    background: #000;
  }
  .video-controls-content{
    width: 100%;
    height: 100%;
    position: absolute;
    /*top: -100%;*/
    top: 0;
    left: 0;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    transition: linear .5s;
    /* Safari */
    -webkit-transition: linear .5s;
    z-index: 999;
    .play-btn{
      width: 80%;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      .iconfont{
        font-size: 2rem;
        margin-left: 20%;
      }
    }
    .other-btn{
      /*background: rgba(0, 0, 0, 0.3);*/
      text-align: center;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      line-height: 1rem;
    }

  }
  .hls-video-content:hover>.video-controls-content{
    opacity: 1;
  }
  .video-name{
    color: white;
    background: rgba(0, 0, 0, 0.7);
    text-align: left;
    position: absolute;
  }
  .top{
    width: 100%;
    height: 30px;
    line-height: 30px;
    left: 0;
    top: 0;
  }
  .left{
    width: 30px;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
  }
  .bottom{
    width: 100%;
    height: 30px;
    line-height: 30px;
    left: 0;
    bottom: 0;
    text-align: center;
  }
  .right{
    width: 30px;
    height: 100%;
    right: 0;
    top: 0;
    text-align: center;
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
  }
</style>
