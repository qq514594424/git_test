<template>
    <div class="list_mian" >
        <div class="list_warp" @scroll="listScroll($event)" v-for="(item,index) in SetData.listval" :key="index" style="overflow: auto">

            <div class="list_title list_title_disp"><span class="title_span">主型号：</span><span class="num_circle">{{index +1}}</span></div>
            <div class="list_title"><span class="title_span">通用型号：</span>{{item.currency}}</div>
            <div v-for="(vo ,inx) in item.product" :key="inx" class="list_title"><span class="title_span">{{vo.currency}}：</span>{{vo.product}}</div>

        </div>

        <div class="loding_warp">
            <el-button disabled v-if="SetData.total <= 3 ">数据已加载完...</el-button>
            <div v-else>
                <el-button disabled loading v-if="SetData.isloading">加载中...</el-button>
                <el-button @click="Loadmore" v-else>点击加载更多</el-button>
            </div>

        </div> 
    </div> 
</template>
<script>
import { reactive, toRefs, onMounted, watch } from "vue"
export default {
  components: {

  },
  props:['productlist','total'],
  name: 'ListMian',
  emits:['Loalist'],
  setup(props, context){




//    var newpropsto = [];
//    Processingnewdata(props.productlist)
//    function Processingnewdata(data){
//        console.log('aaa',data)
//         newpropsto = [];
//         if(data.length > 0){
//                 data.forEach(function(res,index){
//                 res.product = JSON.parse(res.product)
//                 newpropsto.push(res)
//             })  
//         }   
//    }
    

    let SetData = reactive({
        listval :props.productlist,
        isloading:false,
        total:props.total
    })



    let Loadmore = () => {
        context.emit('Loalist')
        SetData.isloading = true
        setTimeout(()=>{
            SetData.isloading = false
        },2000)
    }

    function indexIcon(index){
        return `&#${9312 + index};`
    }

    const handleScroll = () => {
    //获取了滚动元素的值
      let scrollTop = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      console.log(scrollTop)
    //   state.isVisible = scrollTop > state.visibilityHeight;
    }

    function listScroll($event) {
        console.log($event)
        if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
        console.log("到底")
        }

    }


    // watch(SetData, (newVal, oldValue) => {

    //         console.log('newVal',newVal);
    //         console.log('oldValue',oldValue);

    // });

    onMounted(() => {
        // window.addEventListener('scroll', handleScroll,true)
        // console.log('avvvv',SetData.listval)
    })



    return {
        Loadmore,
        indexIcon,
        handleScroll,
        listScroll,
        SetData,
    }
  } 
}
</script>
<style lang="scss" scoped>
.list_mian{
  width: 100%;
  height: 100%;
  padding: 15px 5px;
  box-sizing: border-box;
  .list_warp{
      width: 100%;
      height: 100%;
      border: solid 1px #454545;
      padding: 6px;
      box-sizing: border-box;
      overflow-y: scroll;
      margin-bottom: 16px;
      .list_title_disp{
          display: flex;
          align-items: center;
      }
      .list_title{
          margin-top: 8px;
          word-wrap: break-word;
          word-break: break-all;
          .title_span{
              font-weight: bold;
              font-size: 17px;
          }
      }
      div{
          line-height: 20px;
      }

  }
}
ul li{
    list-style: none;
}
.loding_warp{
    margin-top: 25px;
    text-align: center;
}
div{
    font-family:'黑体';
}
.num_circle{
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    display: block;
    border-radius: 100%;
    border: solid 1px rgb(13, 13, 13);
}
</style>