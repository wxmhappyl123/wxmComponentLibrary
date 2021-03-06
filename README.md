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

### 名称
- 配置项：`videoName`
- 类型: String
- 默认值：无
- 描述：非毕传项

### 是否显示名称
- 配置项：`isvVideoName`
- 类型: Boolean
- 默认值：false
- 描述：非毕传项

### 名称显示的位置
- 配置项：`videoNamePosition`
- 类型: String
- 默认值：top
- 描述：非毕传项
- 参考值：top | left | right | bottom
- 描述：传错默认在上方，不传也默认在上方

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

### 自定义按钮
- 配置项：`btnList`
- 类型: Array
- 默认值：无
- 描述：非毕传项, 返回事件为传入的type
````
[
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
                        
                        
                        cloudControl(id, src) {
                                        console.log('点击的按钮', id, src)
                                    },
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
# myEncryption API 加密
#### 全局注册了  wxm-component-library 后再需要的地方直接调用
-参数（都是String）： word 需要解密的字符串(毕传)， paddingType pad类型(不传或传错为ZeroPadding)，modeType mode类型(不传或传错为CBC)，setAseKey key，setAseIv iv
-示例:
````
    const setAseKey = 'm1xp9slgfa|su@m2'
    const setAseIv = 'pa!st17m@04h5u#0'
    console.log('=加密===',this.myEncryption('890890328905', 'ZeroPadding', 'CBC', setAseKey, setAseIv))
````
# myDecrypt API 解密
#### 全局注册了  wxm-component-library 后再需要的地方直接调用
-参数（都是String）： word 需要解密的字符串(毕传)， paddingType pad类型(不传或传错为ZeroPadding)，modeType mode类型(不传或传错为CBC)，setAseKey key，setAseIv iv
-示例:
````
    const setAseKey = 'm1xp9slgfa|su@m2'
   const setAseIv = 'pa!st17m@04h5u#0'
   let text = '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'
   console.log('解密===',this.myDecrypt(text, 'ZeroPadding', 'CBC', setAseKey, setAseIv))
   console.log('=加密===',this.myEncryption('890890328905', 'ZeroPadding', 'CBC', setAseKey, setAseIv))
   console.log('解密===',this.myDecrypt('1cVwCkr9EUdaJel40ymacQ==', 'ZeroPadding', 'CBC', setAseKey, setAseIv))
````
