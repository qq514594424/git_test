import request from '@/utils/request';

/***获取型号 */
export function getAllMembrane(data) {
    return request({
      url: 'index/Index/getAllMembrane?page='+data.page+'&size='+data.num+'&Searchval='+data.Searchval,
      method: 'get', 
    })
}


/***型号搜索 */
// export function GetSearch(data) {
//   return request({
//     url: 'index/Index/GetSearch?data='+data,
//     method: 'get', 
//   })
// }
