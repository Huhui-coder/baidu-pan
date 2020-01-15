import axios from './api' // 倒入 api

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 此处的数据依然来自 Easy Mock
 */

// 单独导出


export const login = data => {
    return axios({
        url: '/user/loginUser',
        method: 'post',
        data
    })
} 
export const uploadFile = data => {
    return axios({
        url: '/file/saveFile',
        method: 'post',
        data
    })
}


// 默认全部倒出
// 根绝需要进行  
export default {
    login,
    uploadFile
}
