const CryptoJS = require('crypto-js');  //引用AES源码js
function getPadType (val) {
    const obj = {
        'ZeroPadding': CryptoJS.pad.ZeroPadding,
        'NoPadding': CryptoJS.pad.NoPadding,
        'Pkcs7': CryptoJS.pad.Pkcs7,
        'Pkcs5': CryptoJS.pad.Pkcs7,
    }
    if(val){
        return obj[val]
    } else {
        return CryptoJS.pad.ZeroPadding
    }
}
function getModeType(val) {
    const obj = {
        'CBC': CryptoJS.mode.CBC,
        'ECB': CryptoJS.mode.ECB,
        'CFB': CryptoJS.mode.CFB,
        'OFB': CryptoJS.mode.OFB,
        'CTRGladman': CryptoJS.mode.CTRGladman,
        'CTR': CryptoJS.mode.CTR,
    }
    if(val){
        return obj[val]
    } else {
        return CryptoJS.mode.CBC
    }
}
/**
 * 加密
 * @param word 需要加密的字符串
 * @param paddingType pad类型
 * @param modeType mode类型
 * @param setAseKey key
 * @param setAseIv iv
 * @returns {string}
 */
function myEncryption(word, paddingType, modeType, setAseKey, setAseIv){
    setAseKey = CryptoJS.enc.Utf8.parse(setAseKey);
    setAseIv = CryptoJS.enc.Utf8.parse(setAseIv);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, setAseKey, {
        iv: setAseIv,
        mode: getModeType(modeType),
        padding: getPadType(paddingType) })
    return encrypted.toString()
}
myEncryption.install = function (Vue) {
    Vue.component('myEncryption', myEncryption)
}
export default myEncryption
