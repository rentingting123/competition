<template>
  <div class="home">
    <div class="head">
       <div style="height: 41px;">
          <el-form ref="form" :inline="true" :model="formData" label-width="80px">
          <el-form-item label="">
            <el-input v-model="formData.name" placeholder="搜素">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
       </div>
        <div style="height: 41px;">
          <el-button type="danger" plain>  <i class="iconfont icon-shanchu1"></i>批量删除</el-button>
          <el-button type="success" plain><i class="iconfont icon-daoru"></i>导入</el-button>
          <el-button type="success" plain><i class="iconfont icon-daochu"></i>导出</el-button>
          <el-button type="primary" plain><i class="iconfont icon-xiaodui"></i>自动校对</el-button>
          <el-button type="primary" ><i class="iconfont icon-gengxin"></i>导入核对</el-button>
        </div>
    </div>
    <div class="content">
      <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      style="width: 100%">
       <el-table-column
      type="selection"
      width="55">
       </el-table-column>
       <el-table-column
       label="序号"
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="date"
        label="作品名称"
         >
      </el-table-column>
      <el-table-column
        prop="date"
        label="学校名称"
         >
      </el-table-column>
      <el-table-column
        prop="date"
        label="奖项名称"
         >
         <template slot="header">
                <el-select
                  v-model="poolStatus"
                  @change="selected=>statusChang('jiangxiangmingcheng',selected)"
                  size="medium"
                  placeholder="奖项名称"
                >
                  <el-option
                    v-for="item in poolStatusList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="参赛人"
         >
      </el-table-column>
      <el-table-column
        prop="date"
        label="指导老师"
         >
      </el-table-column>
      <el-table-column
        prop="date"
        label="队名"
         >
      </el-table-column>
      <el-table-column
        prop="date"
        label="类别"
         >
          <template slot="header">
                <el-select
                  v-model="poolStatus"
                  @change="selected=>statusChang('leibie',selected)"
                  size="medium"
                  placeholder="类别"
                >
                  <el-option
                    v-for="item in poolStatusList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="组别"
         >
          <template slot="header">
                <el-select
                  v-model="poolStatus"
                  @change="selected=>statusChang('zubie',selected)"
                  size="medium"
                  placeholder="组别"
                >
                  <el-option
                    v-for="item in poolStatusList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="状态"
         >
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return{
     poolStatus: "",
     poolStatusList: [
        {
          text: "奖项名称",
          value: "",
        },
        {
          text: "未提交",
          value: 0,
        },
        {
          text: "审核中",
          value: 7,
        },
        {
          text: "已通过",
          value: 8,
        },
        {
          text: "已反馈",
          value: 10,
        },
      ],
    formData:{},
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
  }
},
methods:{
    statusChang(row, value) {
      console.log(value, row);
    },
   handleSelectionChange(val) {
        // this.multipleSelection = val;
      }
}
}
</script>

<style scoped>
::v-deep .el-table__header th{
  background: rgb(241, 242, 244);
}
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgb(240, 242, 244);
}
.home{
  text-align: left;
  padding: 0;
}
.content{
  padding: 20px;
}
</style>