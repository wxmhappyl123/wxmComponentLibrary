<template>
  <div class="batch-upload">
    <!--其他附件上传-->
    <el-upload
      v-if="uploadFileType !== 'image'"
      class="upload-demo"
      :action='uploadUrl'
       drag
      :multiple="uploadFileLimit !== 1"
      :before-upload="beforeUpload"
      :on-progress="uploadProgress"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :show-file-list="false"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <!--其他附件的附件列表-->
    <vuedraggable v-model="fileList"   v-if="uploadFileType !== 'image'" class="draggable">
      <transition-group>
        <div v-for="(item, $index) in fileList" :key="$index" class="upload-list">
          <div class="file-item">
            <i class="upload-icon iconfont" :class="[getFileIconByExt(item.fileExt)]"></i>
            <span class="upload-text">{{item.fileName ? item.fileName : item.originalName}}</span>
            <!--<span class="preview-btn" @click="previewFile(item)">预览</span>-->
            <i class="el-icon-close upload-close" @click="removeFile($index)"></i>
          </div>
          <el-progress v-if="item.percentage< 100" :percentage="item.percentage"></el-progress>
        </div>
      </transition-group>
    </vuedraggable>
    <!--图片上传-->
    <ul class="el-upload-list el-upload-list--picture-card" v-if="uploadFileType == 'image'">
      <li tabindex="0" class="el-upload-list__item is-success" v-for="(item,index) in fileList" :key="index" v-if="item">
        <img v-if="item.id" :src="`/user/uc/file/${item.id}/id/download`" class="el-upload-list__item-thumbnail"/>
        <img v-if="!item.id && item" :src="`/user/uc/file/${item}/id/download`" class="el-upload-list__item-thumbnail"/>
        <span class="el-upload-list__item-actions"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
        <span class="el-upload-list__item-actions">
            <!--<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(item)"><i class="el-icon-zoom-in"></i></span>-->
            <span class="el-upload-list__item-delete" @click="removeFile(index)"><i class="el-icon-delete"></i></span>
        </span>
      </li>
      <div class="loading" v-show="loading">
        <el-progress type="circle" :percentage="percentage" color="rgb(32, 160, 255)" :width="80"></el-progress>
      </div>
      <el-upload
        v-if="uploadFileType == 'image' && fileList.length < uploadFileLimit && !loading"
        :action='uploadUrl'
        :headers="uploadHeader"
        list-type="picture-card"
        :before-upload="beforeUpload"
        :on-progress="fileOnProgress"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :show-file-list="false">
        <i class="el-icon-plus"></i>
      </el-upload>
    </ul>
    <!--图片预览弹框-->
    <el-dialog  width="70%" top="4.5vh" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  let image = 'png,jpg,gif,jpeg,svg'
  import vuedraggable from 'vuedraggable'
//  import { getToken } from '@/utils/auth'
  export default {
    name: 'batch-upload',
    components: {
      vuedraggable,
    },
    data() {
      return {
        fileList: [],
        percentage: 0,
        loading: false,
        //预览文件id
        preViewId: '',
        dialogImageUrl: '',
        dialogVisible: false,
        uploadHeader: {
           token: sessionStorage.getItem('token'),
            from: 'WEB'
        }
      }
    },
    props: {
      uploadUrl: {
        type: String,
        default: ''
      },
      //读取到的文件list
      fileInfoList: {
        type: null,
        default: function () {
          return
        }
      },
      //上传的文件类型
      uploadFileType: {
        type: String,
        default: function () {
          return
        }
      },
      //最大允许上传个数
      uploadFileLimit: {
        type: Number,
        default: function () {
          return
        }
      }
    },
    watch: {
      'fileInfoList' () {
        if(this.fileInfoList && this.fileInfoList.length > 0) {
          if (typeof(this.fileInfoList) == 'string'){
            this.fileList =  this.fileInfoList.split(',')
          } else {
            this.fileList = this.fileInfoList
          }
        }
      }
    },
    methods:{
      /**
       * 上传中
       */
      fileOnProgress(event, file, fileList) {
        let percent = parseInt(event.percent.toFixed(0))
        this.percentage =  this._genPercentage(event.loaded, event.total)
      },
      /**
       * 图片预览
       * @params file
       */
      handlePictureCardPreview(item) {
        let fileId =  item.id ? item.id : item
        this.dialogImageUrl = `/user/resource/file/${fileId}/id/download`
        this.dialogVisible = true;
      },
      /**
       * 获取文件后缀
       * @param fileName
       */
      getFileExt(fileName) {
        if(!fileName){
          return ''
        }

        let index = fileName.lastIndexOf(".");
        return fileName.substring(index + 1, fileName.length);//后缀名
      },
      beforeUpload (file) {
        this.loading = true
        if(this.uploadFileType){
          let str = ''
          if(this.uploadFileType.indexOf('image') != -1){
            str =  this.uploadFileType.replace('image',image)
          }else {
            str = this.uploadFileType
          }
          let fileTypeIndex = file.name.lastIndexOf(".");
          const isFile = str.indexOf(file.name.substring(fileTypeIndex).split('.')[1]);
          if (isFile == -1) {
              this.$message.error('上传文件只能是' +str+ '格式!');
              this.loading = false
              return false
          }
        }
        if(this.uploadFileLimit && this.fileList.length >= this.uploadFileLimit){
          this.$message.error('最多只能上传' +this.uploadFileLimit+ '个文件!');
          return false
        }
      },
      uploadSuccess(res, file, fileList){//上传成功
        if(res){
          let data = res.data
          if (this.uploadFileType == 'image'){
            this.fileList.push(data)
          } else {
            let index = this.fileList.findIndex(item => item.uid === file.uid)
            if(index !== -1){
              this.fileList[index].percentage = 100
              this.fileList[index].id = data.id
            }
          }
        } else {
          this.$message.error({ message: '上传附件失败,请联系管理员!', duration: 2000 })
        }
        this.percentage = parseInt(99)
        this.loading = false
        this.$emit('upload-success')
      },
        uploadError() {
            this.loading = false
        },
      //上传过程中
      uploadProgress (event, file, fileList) {
        //判断是否已经加入列表中了
        let index = this.fileList.findIndex(item => item.uid === file.uid)
        if(index === -1){
          let item = {
            uid: file.uid,
            fileName: file.name,
            fileExt: '.' + this.getFileExt(file.name),
            percentage: this._genPercentage(event.loaded, event.total)
          }
          this.fileList.push(item)
        } else {
          this.fileList[index].percentage = parseInt((event.loaded/event.total * 100 - 8).toFixed(0))
        }
      },
      _genPercentage(loaded, total) {

        let real = parseInt((loaded/total * 100).toFixed(0))

        return real - 5 < 0 ? 0 : real - 5
      },
      removeFile(index) {
        this.fileList.splice(index, 1)
      },
      getFiles() {
        return this.fileList
      },
      reset(){
        this.fileList = []
      },
      /**
       *文件预览
       */
      previewFile(item) {
         this.dialogVisible  = true
         this.preViewId = item.id
      },
      /**
       *关闭预览弹框
       */
      closeDialog() {

      }
    },
    mounted() {
      if(this.fileInfoList && this.fileInfoList.length > 0) {
        if (typeof(this.fileInfoList) == 'string'){
          this.fileList =  this.fileInfoList.split(',')
        } else {
          this.fileList = this.fileInfoList
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .loading{
    width: 148px;
    height: 148px;
    border: 1px dashed #CCCCCC;
    border-radius: 10px;
  }
  /deep/.el-progress{
    width: auto;
  }
  .draggable{
    margin-top:20px;
  }
  .upload-list{
    cursor: pointer;
    padding: 5px;
    overflow: hidden;
    .file-item{
      height: 23px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .upload-icon{
        font-size: 23px;
      }
      .upload-text{
        margin-left: 10px;
        color: #606266;
        font-size: 14px;
        flex-grow: 1;
      }
      .upload-close{
        line-height: 20px;
        display: inline-block;
      }
    }

  }
  .upload-list:hover{
    background-color: #f5f7fa;
    color: #409eff;
    .upload-close{
      display: block;
    }
  }
  .preview-btn{
    color: #6B76FF;
    font-size: 14px;
    margin-right: 10px;
  }
  .el-upload-list--picture-card{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  /deep/.el-upload-dragger {
    width: 252px;
    height: 44px;
    display: flex;
    justify-content: flex-start;
  }
 /deep/ .el-upload-dragger .el-icon-upload {
    margin: 6px 0 20px;
    line-height: 30px;
    font-size: 35px;
   margin-left: 10px;
   margin-right: 10px;
  }
</style>
