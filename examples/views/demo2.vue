<template>
    <div>
        <myPlayer
                id="1234"
                ref="video"
                scVideoSrc="http://182.145.195.238:1936/hls/08103021122A63A2E00.m3u8"
                scVideoHeight="100%"
                :scAutoplay="true"
                :isLive="true"
                :isProcess="false"
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
            let params = {
                areaId: 1264416533667684354
            }
            let header = {
                from: 'WEB',
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJzbiI6IjE2MDA5MTA4NDQ5MTMiLCJ1c2VySWQiOjEyNjQ3ODAyMTk3MjkwOTI2MTAsImlhdCI6MTYwMDkxMDg0OSwiZXhwIjoxNjAxNTE1NjQ5fQ.uP1AroEF9FYGdyUKleYSxNma4qjL_QXQJDPo9EmeIks'
            }
            this.downLoadByUrl('GET','/dogs/dogs/manures/download', '知识',params, 'xls', header)
        },
    }
</script>
<style lang="less" scoped></style>
