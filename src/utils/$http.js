import axios from 'axios'
import { Message } from 'element-ui'

import store from '@/store'
import { headers, marketHost } from '@/config'

/* 
@name   $http
@desc   基于 axios 封装的 http 请求
        使用方法同 axios 具体参考官方文档
        默认情况下仅返回状态码为 2xx 且 resStatus 200 的结果
        此处认为返回的结果是完全可信的，结果中的数据结构问题请自行处理
@remark 自定义参数添加到 axios 方法 options 对象中
    loading         boolean[false]     是否显示全局加载
    showError       boolean[false]     是否自动提示错误
    errCallback     boolean[false]     是否返回响应错误
@params 
@result
*/

class Helper {
    static resHandler(res) {
        this.setLoading(res)
        if (res.status === 200) {
            if (res.data.resStatus === 200) {
                return res.data.result
            }
            switch (res.data.busCode) {
                case '927':
                    Message.error('登录凭证已过期，请重新登陆！')
                    setTimeout(() => {
                        location.href = marketHost
                    }, 1200)
                    store.commit('CLEAR_TOKEN')
                    return new Promise(() => {})
                default:
                    this.setErrMessage(res)
                    return this.setErrCallback(res)
            }
        } else {
            return res.data
        }
    }

    static errHandler(res) {
        this.setLoading(res)
        this.setErrMessage(res)
        return this.setErrCallback(res)
    }

    static setLoading(res) {
        if (res.config.loading !== false) {
            store.dispatch('hideLoading')
        }
    }

    static setHeaders(config) {
        const httpHeader = {}
        if (config.loading !== false) {
            store.dispatch('showLoading')
        }
        headers.forEach(item => {
            httpHeader[item] = store.state.token[item] || ''
        })
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            ...httpHeader,
            ...config.headers
        }
        return config
    }

    static setErrMessage(res) {
        if (res.config.showError !== false) {
            if (res.data.message) {
                Message.error(res.data.message)
            } else {
                Message.error(res.statusText)
            }
        }
    }

    static reqErrHandler(err) {
        console.log(err)
        console.warn(
            '请求发生错误，暂不清楚发生原因，发生错误时请联系 hfq 处理'
        )
    }

    static setErrCallback(res) {
        if (res.config.errCallback) {
            return Promise.reject(res.data)
        } else {
            return new Promise(() => {})
        }
    }
}

// axios 实例
const $http = axios.create()

// 添加请求拦截器
$http.interceptors.request.use(
    // 在发送请求之前做些什么
    conf => Helper.setHeaders(conf),
    // 对请求错误做些什么
    error => Helper.reqErrHandler(error)
)

// 添加响应拦截器
$http.interceptors.response.use(
    // 对响应数据做点什么
    res => Helper.resHandler(res),
    // 对响应错误做点什么
    err => Helper.errHandler(err.response)
)

export default $http
