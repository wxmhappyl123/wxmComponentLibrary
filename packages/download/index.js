let baseUrl = '/'
// if(process.env.NODE_ENV == 'dev'){
//   // baseUrl = 'api'
//   baseUrl = ''
// } else {
//   // baseUrl = ''
//   baseUrl = 'api'
// }
/**
 * 向指定路径发送下载请求
 * @param{String} url 请求路径
 * @param{String} fileName 文件名
 * @param{String} params 参数
 * @param{String} fileType 文件类型
 * @param{String} requestMethod 请求类型
 * @param{String} header 请求的header
 */
function downLoadByUrl(requestMethod, url, fileName, params, fileType, header){
  let downloadFileType = fileType ? fileType : 'xls'
  // 设置参数
  let par = ''
  if(params && requestMethod == 'GET'){
    par = '?'
    for (let key in params){
      if(params[key]){
        par = par + `&${key}=${params[key]}`
      }
    }
  }
  var xhr = new XMLHttpRequest();
  //GET请求,请求路径url,async(是否异步)
  xhr.open(requestMethod ? requestMethod : 'GET', `${baseUrl}${url}${par}`, true);
  //设置请求头参数的方式,如果没有可忽略此行代码
  // xhr.setRequestHeader("token", token);
  // xhr.setRequestHeader("from", 'WEB');
  if(header) {
    for (let key in header){
      if(params[key]){
        xhr.setRequestHeader(key, params[key])
      }
    }
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  //设置响应类型为 blob
  xhr.responseType = 'blob';
  //关键部分
  xhr.onload = function (e) {
    //如果请求执行成功
    if (this.status == 200) {
      var blob = this.response;
      var filename = `${fileName}.${downloadFileType}`;//如123.xls
      var a = document.createElement('a');
      console.log(blob)
      //创键临时url对象
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download=filename;
      a.click();
      //释放之前创建的URL对象
      window.URL.revokeObjectURL(url);
    }
  };
  //发送请求
  if(requestMethod === 'POST'){
    xhr.send(JSON.stringify(params));
  }else {
    xhr.send();
  }
}
downLoadByUrl.install = function (Vue) {
  Vue.component('downLoadByUrl', downLoadByUrl)
}
export default downLoadByUrl
