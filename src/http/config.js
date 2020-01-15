export default {
    method: 'post',
    // 基础url前缀
    baseURL: 'http://192.168.0.101:8080/upload-demo',
    //文件请求地址
    fileURL: 'http://47.103.12.90:3000/',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}