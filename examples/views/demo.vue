<template>
    <div>
            <div class="">
                <mySplitScreenVideo
                        ref="splitScreen"
                        :videoList="videoList"
                        :splitNum="9"
                        :scAutoplay="false"
                        :isLive="false"
                        :screenShot="false"
                        :isProcess="true"
                ></mySplitScreenVideo>
            </div>
            <span class="top-left"></span>
            <span class="top-right"></span>
            <span class="bottom-left"></span>
            <span class="bottom-right"></span>
    </div>
</template>
<script>
    export default {
        name: 'demo',
        components: {
        },
        data () {
            return{
                dialogVisible: false,
                videoList: [
                    {
                        url: 'http://182.145.195.238:1936/hls/08103021122A63A2A00.m3u8'
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
                ]
            }
        },
        mounted () {
            this.openDialog()
        },
        methods: {
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
    /deep/.el-dialog{
        background: rgba(8, 34, 88, 0.49);
        position: relative;
        box-shadow: #1b9efc  0px 0px .5rem inset;
    }
    /deep/.el-dialog__headerbtn .el-dialog__close{
        color: #fff;
    }
</style>
