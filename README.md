# 起步
安装inphase-component组件
```
 npm i wxm-component-library
```
引用main.js中引入样式
```
import 'wxm-component-library/lib/wxm-component-library.css';
```
全局注册
```
import wxm-component-library from 'wxm-component-library';
Vue.use(wxm-component-library);
```
部分引用
```
import {myPlayer} from 'wxm-component-library';
```
# myPlayer API 单个视频
## 属性
### video的id
- 配置项：`videoId`
- 类型: String
- 默认值：无
- 描述：毕传项，不传不能初始化。

### 视频播放地址
- 配置项：`scVideoSrc`
- 类型: String
- 默认值：无
- 描述：毕传项，不传不能初始化。

### 自动播放
- 配置项：`scAutoplay`
- 类型: Boolean
- 默认值：true
- 描述：非毕传项

### 视屏宽度
- 配置项：`scVideoWidth`
- 类型: String
- 默认值：100%
- 描述：非毕传项,不传则为父级的宽度

### 视屏高度
- 配置项：`scVideoHeight`
- 类型: String
- 默认值：100%
- 描述：非毕传项,不传则为父级的高度

### 是否显示进度条
- 配置项：`isProcess`
- 类型: Boolean
- 默认值： true 根据isLive值判断，如果为直播则不显示进度条
- 描述：根据isLive值判断，如果为直播则不显示进度条

### 是否截图
- 配置项：`screenShot`
- 类型: Boolean
- 默认值：true
- 描述：非毕传项


### 封面图
- 配置项：`posterImg`
- 类型: String
- 默认值：无
- 描述：非毕传项

### 初始化调用 initVideo方法
```html
<myPlayer
                id="1234"
                ref="video"
                scVideoSrc="http://0.0.0.0:8080/hls/08103021122A63A2E00.m3u8"
                scVideoHeight="100%"
                :scAutoplay="true"
                :isLive="true"
                :isProcess="false"
                videoId="video1234"
        ></myPlayer>
```
-在需要初始化的地方，调用initVideo方法
```
 mounted() {
            this.$refs.video.initVideo()
        },
```
### 销毁实例调用 destroy
```$xslt
destroyHls() {
        this.videoHls.destroy()
      },
```
# splitScreenVideo API 分屏播放


### 视频播放地址源
- 配置项：`videoList`
- 类型: Array
- 默认值：无
- 描述：毕传项，不传不能初始化，url是毕传的，其他的参数可加可不加。
```` 
 videoList: [
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A63A2A00.m3u8'
          },
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A63A2E00.m3u8'
          },
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A6364C00.m3u8'
          },
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A6365300.m3u8'
          },
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A63A2400.m3u8'
          },
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A63A2800.m3u8'
          },
          {
            url: 'http://0.0.0.0:8080/hls/08103021122A6364D00.m3u8'，
            id： '8389920',
            name: '测试设备'
          },
        ]
````
### 分屏数
- 配置项：`splitNum`
- 类型: Number
- 默认值：9
- 描述：毕传项
- 参考值：1 | 2 | 4 | 9 | 16

### 自动播放
- 配置项：`scAutoplay`
- 类型: Boolean
- 默认值：true
- 描述：非毕传项

### 是否显示进度条
- 配置项：`isProcess`
- 类型: Boolean
- 默认值： true 根据isLive值判断，如果为直播则不显示进度条
- 描述：根据isLive值判断，如果为直播则不显示进度条

### 是否截图
- 配置项：`screenShot`
- 类型: Boolean
- 默认值：true
- 描述：非毕传项


### 封面图
- 配置项：`posterImg`
- 类型: String
- 默认值：无
- 描述：非毕传项

### 初始化调用 setVideo方法
````html
<splitScreenVideo
             ref="splitScreen"
             :videoList="videoList"
             :splitNum="16"
             :scAutoplay="false"
             :isLive="false"
             :screenShot="false"
             :isProcess="true"
           ></splitScreenVideo>
````
-初始化:
````
this.$nextTick(() => {
          this.$refs.splitScreen.setVideo()
        })
````
-销毁:
````
 this.$nextTick(() => {
          this.$refs.splitScreen.destroyVideo()
        })
````
# downLoadByUrl API 文件下载
#### 全局注册了  wxm-component-library 后再需要的地方直接调用
-描述: 此下载方法支持post，get，
-参数（都是String）： url 请求路径， fileName 文件名，params 参数，fileType 文件类型，  requestMethod 请求类型（大写）， header 请求的header
-示例:
````
 let params = {
      areaId: 1264416533667684354
    }
    let header = {
      from: 'WEB',
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJzbiI6IjE2MDA5MTA4NDQ5MTMiLCJ1c2VySWQiOjEyNjQ3ODAyMTk3MjkwOTI2MTAsImlhdCI6MTYwMDkxMDg0OSwiZXhwIjoxNjAxNTE1NjQ5fQ.uP1AroEF9FYGdyUKleYSxNma4qjL_QXQJDPo9EmeIks'
    }
    this.downLoadByUrl('GET','api/dogs/dogs/manures/download', '知识',params, 'xls', header)
````
