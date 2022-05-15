<template>
  <div class="app_title">
    型号搜索
  </div>
  <SearchMian @onSearch="onSearch" />
  <ListMian @Loalist="onLoalist" :v-show="SetData.islist" :productlist="SetData.productlist" v-if="SetData.productlist.length > 0" :total="SetData.total" />
</template>

<script>
import SearchMian from './components/SearchMian.vue';
import ListMian from './components/ListMian.vue';
import { getAllMembrane, GetSearch } from '@/api/index';
import { reactive, onMounted, onUnmounted  } from 'vue';
import { ElNotification  } from "element-plus";
export default {
  name: 'App',
  components: {
    SearchMian,
    ListMian
  },
  setup(){
      let SetData = reactive({
        page: 1,
        num: 20,
        Searchval:'',
        productlist:[],
        total:'',
        islist:true
      })



    
      function onSearch(value){
        SetData.productlist = [];
         SetData.total = 0
         SetData.page = 1
         SetData.num = 20
         SetData.Searchval = value
        getAllMembraneto()
      }


      /**加载更多*/
      function onLoalist(){ 
        let newproductlist =  SetData.productlist
        SetData.productlist = []
        SetData.page+=1
        getAllMembraneto(newproductlist)
      }

      function getAllMembraneto(newdata=[]){
        
        SetData.islist = false
        getAllMembrane({page:SetData.page,num:SetData.num,Searchval:SetData.Searchval}).then(res => {
          var data = res.data
          var newpropsto = newdata;
          if(data.list.length  >= 1){
                SetData.islist = true
                SetData.total += data.total

                data.list.forEach(function(value,index){
                    value.product = JSON.parse(value.product)
                    newpropsto.push(value)
                })  
                 SetData.productlist = newpropsto
          }else{
             SetData.productlist = newdata
            ElNotification.warning({
              message: '数据已加载完',
              offset: 10,
            })
          }
        })
      }
 

      onMounted(()=>{
        getAllMembraneto()
      }) 
 
      return {
        SetData,
        onSearch,
        onLoalist
      }
  }
}
</script>

<style>
.app_title{
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  padding: 9px 0px;
}
</style>
