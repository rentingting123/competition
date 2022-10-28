<template>
  <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="item in lists" :key="item.title" :name="item.title">
                <template slot="title">
                  <div class="title">
                     <div>
                         {{item.title}}
                     </div>
                     <div style="font-size: 14px;font-weight: 400;">{{item.createTime}}</div>
                  </div>
                </template>
          <div v-html="item.content"></div>
        </el-collapse-item>
      </el-collapse>
       <el-pagination
            :page-size="params.pageSize"
            v-if="total > 0"
            style="    text-align-last: center;"
              :current-page.sync='params.pageNum'
              layout="prev, pager, next"
              @current-change='currentChange'
              :total="total">
          </el-pagination>
  </div>
</template>
<script>
import network from "@@/api/jxapi/index";
import moment from "moment";
export default {
created(){
    this.getList()
},
data(){
    return{
        params:{
            pageNum:1,
            pageSize:5,
        },
        activeNames: ['1'],
        lists:[],
        total:0
    }
},
methods:{
    currentChange(page){
        this.params.pageNum = page
        this.getList()
    },
    handleChange(val) {
        // console.log(val);
    },
    async getList(){
        let res = await network.getUserMessage({data:this.params})
        if(res == 'error') return
        this.total = res.total
        this.lists = res.list
    }
},
 filters: {
    dtime(val) {
      if (!val) return "";
      return moment(val).format("YYYY-MM-DD");
    }
  }
}
</script>

<style scoped>
.title{
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 800;
    font-size: 16px;
}
</style>