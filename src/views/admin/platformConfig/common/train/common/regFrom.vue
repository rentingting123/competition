<template>
  <div class="all">
    <div class="sett" @click="getSignupFieldList">设置</div>

    <el-dialog
      class="trainPayAll"
      :append-to-body='true'
      :show-close="false"
      :visible.sync="trainRegShow"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="title">
        <p>报名表设置</p>
      </div>
      <div class="trainPay">
        <el-table label-position="left" :data="tableData" border class="table">
          <el-table-column prop="name" label="内容" min-width="200">
            <template slot-scope="scope">
              <el-input :disabled="scope.row.type==1" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="flag" label="是否必填" min-width="80">
            <template slot-scope="scope">
              <!-- <el-switch
                v-model="scope.row.flag"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch> -->
              <el-checkbox v-model="scope.row.flag">{{scope.row.flag?'必填':'非必填'}}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="require" label="编辑" min-width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :disabled="scope.row.type==1"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button size="mini" type="success" class="addBtn" @click="handleadd()">添加</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="trainRegShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {randomChar} from '~utils'
// import api from '~src/api/api.js'
export default {
  props:['getData'],
  data() {
    return {
      trainRegShow: false,
      oldList:[],
      tableData: [
        {
          name: "手机号",
          value: "phone",
          flag: true,
          type:1,
        },
        {
          name: "学校",
          value: "school",
          flag: true,
          type:1,
        },
        {
          name: "部门",
          value: "department",
          flag: true,
          type:1,
        },
        {
          name: "姓名",
          value: "name",
          flag: true,
          type:1,
        },
        {
          name: "性别",
          value: "sex",
          flag: true,
          type:1,
        },
        {
          name: "Email",
          value: "email",
          flag: true,
          type:1,
        },
        {
          name: "住宿",
          value: "hostel",
          flag: true,
          type:1,
        },
        {
          name: "带家属情况",
          value: "family",
          flag: true,
          type:1,
        },
        
      ]
    };
  },
  created(){
    // console.log(this.getData)
  },
  methods: {
    async getSignupFieldList(){
      this.trainRegShow=true
      if(this.$route.query.id){
        let data = {
          id:this.$route.query.id,
        }
        await api.get('Api/training/selectSignupFieldList',data).then(res =>{
          let arr = []
          this.oldList = res
            res.forEach((ele) =>{
              arr.push(ele.value)
            })
            this.tableData.forEach((e,index) =>{
              if(arr.indexOf(e.value)<0){
                this.oldList.push(this.tableData[index])
              }
            })
          })
          this.tableData = this.oldList
      }else{
        return
      }
      
    },
    handleadd() {
      this.tableData.push({
        name: "",
        value: Math.random(),
        flag: false,
        type:0
      });
    },
    handleDelete(index, row) {
      // todo 删除
      this.tableData.splice(index, 1);
    },
    submit(){
      this.trainRegShow = false
      this.$emit('transmitTableData',this.tableData)
    }
  }
};
</script>

<style lang='less' scoped>
.sett {
  background: #1890FF;
  border-radius: 5px;
  width: 75px;
  height: 30px;
  line-height: 30px;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin-top: 10px;
  margin-left: 12px;
  cursor: pointer;
}
.addBtn{
  margin-top: 10px;
  background: #1890FF;
  border-radius: 4px;
}
</style>