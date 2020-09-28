<template>
    <div style="height: 300px;width: 500px">
        <myPlayer
                id="1234"
                ref="video"
                scVideoSrc="http://182.145.195.238:1936/hls/08103021122A63A2E00.m3u8"
                scVideoHeight="100%"
                :scAutoplay="true"
                :isLive="true"
                :isProcess="false"
                :videoName="'测试设备'"
                :isvVideoName="true"
                :videoNamePosition="'right'"
                videoId="video1234"
        ></myPlayer>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
            this.$refs.video.initVideo()
        },
    }
</script>
<style lang="less" scoped></style>
