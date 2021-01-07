<template>
    <div :style="'height:'+carouselHeight+'px'">
        <div class="split-content">
            <span :class="splitNum == item ? 'active' : ''" v-for="item in splitList" :key="item" @click="checkSplit(item)">{{item}}分屏</span>
        </div>
            <div style="height: calc(100% - 50px);">
                <mySplitScreenVideo
                        ref="splitScreen"
                        @initSuccess="initSuccess"
                        :videoList="videoList"
                        :splitNum="splitNum"
                        :btnList="btnList"
                        :scAutoplay="true"
                        :isLive="false"
                        :screenShot="false"
                        videoNamePosition="top"
                        :isProcess="true"
                ></mySplitScreenVideo>
            </div>
    </div>
</template>
<script>
    export default {
        name: 'demo',
        components: {
        },
        data () {
            return{
                carouselHeight: 0,
                btnList: [
                    {
                        type: 'cloudControl',
                        txt: '云台控制'
                    },
                    {
                        type: 'playBack',
                        txt: '录像回放'
                    },
                    {
                        type: 'checkDetail',
                        txt: '查看详情'
                    }
                ],
                dialogVisible: false,
                videoList: [
                    {
                        url: 'http://182.145.195.238:1936/hls/1010344EFBF7415B800.m3u8'
                    },
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A63A2E00.m3u8'
                    },
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A6364C00.m3u8'
                    },
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A6365300.m3u8'
                    },
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A63A2400.m3u8'
                    },
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A63A2800.m3u8'
                    },
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A6364D00.m3u8'
                    },
                    {
                        url: ''
                    },
                    {
                        url: ''
                    },
                ],
                splitNum: 4,
                splitList: [1,4,9,16]
            }
        },
        mounted () {
            const deviceHeight = document.documentElement.clientHeight
            this.carouselHeight = deviceHeight
            this.openDialog()
        },
        methods: {
            initSuccess(e) {
                console.log('初始化成功了-----', e)
            },
            checkSplit(item){
                this.splitNum = item
            },
            handleClose() {
                this.$nextTick(() => {
                    console.log(this.$refs.splitScreen)
                    this.$refs.splitScreen.destroyVideo()
                })
                this.dialogVisible = false
            },
            openDialog() {
                this.dialogVisible = true
                this.$nextTick(() => {
                    this.$refs.splitScreen.setVideo()
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .split-content{
        width: calc(95% - 80px);
        margin-left: 40px;
        display: flex;
        justify-content: center;
        span{
            display: inline-block;
            cursor: pointer;
            background: #1a376e;
            width: 80px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            margin-right: 10%;
            margin-top: 10px;
            border-radius: 5px;
            font-size: 12px;
        }
        span:last-child{
            margin-right: 0px;
        }
        span.active{
            background: #0b93d6;
        }
        /*text-align: center;*/
    }
    /deep/.el-dialog{
        background: rgba(8, 34, 88, 0.49);
        position: relative;
        box-shadow: #1b9efc  0px 0px .5rem inset;
    }
    /deep/.el-dialog__headerbtn .el-dialog__close{
        color: #fff;
    }
</style>
