import axios from 'axios'
// import {  Message } from 'element-plus'
const BASE_API = 'http://huodong.zhuike.world/';
// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['platform'] = 'admin'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.statusCode !== 200) {


      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.statusCode === 50008 || res.statusCode === 50012 || res.statusCode === 50014) {
        // to re-login
      }
      if (res.statusCode === 301 || res.statusCode === 302) {
        //   Message({
        //     message: res.statusMsg,
        //     type: 'error',
        //     duration: 1000,
        //     onClose() {

        //     }
        //   })
      }else{
        // Message({
        //   message: res.statusMsg || 'Error',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        
        return Promise.reject(new Error(res.statusMsg || 'Error'))
      }


    } else {
      
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
