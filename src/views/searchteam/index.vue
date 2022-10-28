<template>
  <div class="searchall">
      <div class="searchteam">
      <button class="back" @click="back()">返回</button>
        <div class="form">
             <el-form  :model="form" class="demo-form-inline">
                 <el-row>
                    <el-col :span="6">
                         <el-form-item>
                      <el-select v-model="region">
                        <el-option label="找人组队" value="0"></el-option>
                        <el-option label="找团队" value="1"></el-option>
                      </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                         <el-form-item>
                             <div class="comsearch" v-if="region == 1">
                                   <el-select clearable filterable  v-model="form.competitionId">
                         <el-option
                          v-for="item in comlist"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                             </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item>
                          <el-input v-if="region == 1" v-model="form.tag" placeholder="搜索标签"></el-input>
                          <el-input v-else v-model="form.tag" placeholder="搜索个人姓名或者标签"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                      </el-form-item>
                    </el-col>
                 </el-row>
            </el-form>
        </div>
        <div class="formtitle">仅支持搜索本校成员或队长为本校身份的团队</div>
        <div class="tableheight" v-loading="loading">
            <searchteamTable v-if="region == 1"  ref="teamchild" :tag="form.tag" :competitionId="form.competitionId"></searchteamTable>
            <searchownTable v-else ref="child" :tag="form.tag"></searchownTable>
        </div>
         <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="100"
      style="text-align-last:center;width:100%"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination> -->
  </div>
  </div>
</template>

<script>
import network from "@/api/jxapi/index";
import searchteamTable from './teamtable'
import searchownTable from './owntable'
export default {
    components:{
        searchteamTable,
        searchownTable
    },
    created(){
        this.region = this.$route.query.type
        if(this.$route.query.type == '1'){
            this.form.competitionId = this.$route.quuery.id
        }
         this.getoption()
       
    },
data(){
    return{
        loading:false,
        region: undefined,
        comlist:[],
        page:1,
        form: {
          tag: '',
          pageNum:1,
            pageSize:10,
          competitionId:undefined
        },
        team:[],
        teams:[]
    }
},
   watch:{
//        form: {
// 　　　　handler(newValue, oldValue) {
// // 　　　　　　console.log(newValue)　　
// this.onSubmit()　　
// }},
        region(item1,item2){
            this.page = 1
            this.form.tag = ''
            this.onSubmit()
        },
    deep:true
},
methods:{
    async getoption(){
        let res = await network.selecthuangCompetitions({data:{name:'',isRank:''}})
        if(res=='error' | !res) return;
        this.comlist = res
        // this.$set(this.comlist, 'id', res.data.id)
        // this.$set(this.comlist, 'name', res.data.name)
        // this.$set(this.comlist, 'year', res.data.year)
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.onSubmit()
      },
      
    onSubmit(){
        this.$nextTick(function() {
        if(this.region == '1'){
           this.getoption()
           this.$refs.teamchild.getList();
        
        }else{
            this.$refs.child.getList();
        }
         })
    },
    back(){
        this.$router.go(-1)
    }
}
}
</script>
<style >
::v-deep .el-loading-spinner{
  text-align-last: center;
}
</style>
<style lang="less" scoped>
.searchall{
    width: 100%;
    background-color: #fff;
    .searchteam{
    text-align-last: left;
   background: #ffffff;
   width: 100%;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    // min-height: calc(100vh - 250px);
    .tableheight{
            min-height: calc(100vh - 464px);
    }
    .form{
        .comsearch{
            ::v-deep .el-input--suffix .el-input__inner{
                border-radius: 0;
                height: 36px;
                width: 240px;
            }
        }
        ::v-deep .el-input--suffix .el-input__inner{
            border-radius: 0;
            height: 36px;
            width: 142px;
        }
        ::v-deep .el-input__inner{
            border-radius: 0;
            height: 36px;
            width: 422px;
        }
        ::v-deep .el-form--inline .el-form-item{
            // margin-right: -6px;
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
            margin-bottom: 16px;
            margin-top: 10px;
        }
        ::v-deep .el-form-item{
            margin-bottom: 16px;
        }
        ::v-deep .el-button--primary{
            color: #FFF;
            background-color: #409EFF;
            border-color: #409EFF;
            border-radius: 0;
            padding: 10px 18px;
            text-align-last: center;
            width: 140px;
        }
        
    }
    .formtitle{
            font-size: 12px;
            font-weight: 400;
            text-align-last: right;
            color: #D0021B;
            width: 100%;
            margin-bottom: 11px;
        }
    .back{
        font-size: 14px;
        font-weight: 400;
        color: #4A4A4A;
        cursor: pointer;
        background-color: #fff;
        border: none;
        padding: 5px 0;
        line-height: 20px;
        letter-spacing: 1px;
        margin-bottom: 8px;
    }
}
}

</style>