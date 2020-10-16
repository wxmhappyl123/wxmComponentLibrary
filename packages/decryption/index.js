const CryptoJS = require('crypto-js');  //引用AES源码js
function getPadType (val) {
    const obj = {
        'ZeroPadding': CryptoJS.pad.ZeroPadding,
        'NoPadding': CryptoJS.pad.ZeroPadding,
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
 * 解密
 * @param{String} word 需要解密的字符串
 * @param{String} paddingType pad类型
 * @param{String} modeType mode类型
 * @param{String} setAseKey key
 * @param{String} setAseIv iv
 */
function myDecrypt(word, paddingType, modeType, setAseKey, setAseIv) {
    if(!setAseKey && !setAseIv){
        let  encrypt = word.replace(/[\r\n]/g,"");
        let parsedWordArray = CryptoJS.enc.Base64.parse(encrypt);
        let msg = parsedWordArray.toString(CryptoJS.enc.Utf8);
        let jo = JSON.parse(msg);
        return  jo
    } else {
         setAseKey = CryptoJS.enc.Utf8.parse(setAseKey);
         setAseIv = CryptoJS.enc.Utf8.parse(setAseIv);
        let encryptedHexStr = CryptoJS.enc.Base64.parse(word)
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
        let decrypt = CryptoJS.AES.decrypt(srcs, setAseKey, {
            iv: setAseIv,
            mode: getModeType(modeType),
            padding: getPadType(paddingType) })
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
        console.log('解密后的===',JSON.parse(decryptedStr.toString()))
        return JSON.parse(decryptedStr.toString())
    }
}

myDecrypt.install = function (Vue) {
    Vue.component('myDecrypt', myDecrypt)
}
export default myDecrypt
