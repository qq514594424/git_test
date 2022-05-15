<template>
  <div class="search dis_cent">

      <div class="search_left dis_cent">
        <el-input v-model="SetData.searchval" placeholder="点击搜索型号" >
            <template #prefix>
              <el-icon size="23px" color="#000000"><Search /></el-icon>
            </template>
        </el-input>
      </div>

      <el-button @click="addSearch">搜索</el-button>

  </div>
</template>

<script>
import {Search} from "@element-plus/icons";
import { reactive, onMounted  } from "vue"
export default {
  components: {
    Search,
  },
  name: 'SearchMian',
  emits:['onSearch'],
  setup(props,context){
    let SetData = reactive({
      searchval:''
    })


    
    function addSearch(){
        context.emit('onSearch',SetData.searchval)
    }



    return {
        SetData,
        addSearch
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dis_cent{
  display: flex;
  align-items: center;
}
.search{
  width: 100%;
  padding: 15px 5px;
  box-sizing: border-box;
  border-top: solid 1px rgb(222, 222, 222);
  border-bottom: solid 1px rgb(222, 222, 222);

  .search_left{
    width: 100%;
    border-radius: 50px;
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
</style>
