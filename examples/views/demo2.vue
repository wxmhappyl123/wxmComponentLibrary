<template>
    <div style="height: 300px;width: 500px">
        <myPlayer
                id="1234"
                ref="video"
                scVideoSrc="http://182.145.195.238:1936/hls/08103021122A63A2E00.m3u8"
                scVideoHeight="100%"
                @cloudControl="cloudControl"
                :scAutoplay="true"
                :isLive="true"
                :isProcess="false"
                :btnList="btnList"
                :videoName="'测试设备'"
                :isvVideoName="true"
                :videoNamePosition="'top'"
                videoId="video1234"
        ></myPlayer>
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
                ]
            }
        },
        mounted() {
            this.$refs.video.initVideo()
        },
        methods: {
            cloudControl(id, src) {
                console.log('点击的按钮', id, src)
            },
        }
    }
</script>
<style lang="less" scoped></style>
