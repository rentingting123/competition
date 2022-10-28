<template>
    <!--竞赛特殊设置-->
      <el-dialog class="jingsai" :show-close='false' title="竞赛特殊设置" :append-to-body='true' :visible.sync="special" width="50rem" height="570px" >
        <div slot="title" class="dialog-title">
          <span>竞赛特殊设置</span>
          
        </div>
        
        <div v-loading="setLoading">
        <div class="content">
          <div class="content_main" v-if="authority.setSignup">
            <div class="content_left">
              <el-tooltip>
                <div slot="content">
                  在竞赛进入下一个
                  <br>日程时会自动更新为日程设置内容
                </div>
                <p>当前报名状态：</p>
              </el-tooltip>
              <!--<div class="content_txt">勾选内容立即生效，在竞赛进入下一个日程时会自动更新为日程设置内容</div>-->
            </div>
            <div class="content_right">
              <el-checkbox-group v-model="checkListApply">
                <el-checkbox label="1">开放报名</el-checkbox>
                <el-checkbox label="2">可修改</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="content_main" v-if="authority.setWorks">
            <div class="content_left">
              <el-tooltip>
                <div slot="content">
                  在竞赛进入下一个
                  <br>日程时会自动更新为日程设置内容
                </div>
                <p>当前作品状态：</p>
              </el-tooltip>
              <!--<div class="content_txt">勾选内容立即生效，在竞赛进入下一个日程时会自动更新为日程设置内容</div>-->
            </div>
            <div class="content_right">
              <el-checkbox-group v-model="checkListUpload">
                <el-checkbox label="1">开放上传</el-checkbox>
                <el-checkbox label="2">可修改</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          
          <div class="closeCompetition" v-if="authority.closeCompetition">
              <p>竞赛状态：
                <span>
                  <el-switch
                    v-model="competitionType"
                    :disabled="competitionFinish"
                    @change="comTypeChange"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-text="competitionText"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-tooltip>
                </span>
              </p>
          </div>
        </div>        
        <span slot="footer" class="dialog-footer footBtn">
          <el-button @click="special = false">取 消</el-button>
          <el-button :disabled="competitionFinish" @click="saveSpecial" type="primary">确 定</el-button>
        </span>
        <div style="clear:both"></div>
        </div>
      </el-dialog>
</template>


<script>
import network from "@/api/jxapi/index";
import { mapState } from 'vuex'
import { getUserInfo } from '@/utils/commons.js'
import moment from 'moment'

export default {
  name: "jingsai",
  data() {
    return {
      setLoading: false,
      competitionFinish:false,
      special: true, //竞赛特殊设置
      checkListApply: [], //当前报名状态radioApply值
      checkListUpload: [], //当前上传状态radioUpload值

      competitionText:'进行中',
      competitionType:'1'
    };
  },
  computed: mapState({
      authority: state => state.authorityManagement,
  }),
  methods: {
    // 关闭竞赛
    comTypeChange(val){
      let _this = this
      if(val=="0"){
        this.$confirm('竞赛关闭后不可逆，确定关闭吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            _this.competitionText = '已结束';
        }).catch(()=>{
          _this.competitionType = "1"
           _this.competitionText = '进行中';
        })
      }else{
         _this.competitionText = '进行中';
      }
    },
    async getIsFinsh(id){
      let payDetail = await network.getPayDetail({data:{competitionId:id}});
      if(payDetail=='error') return;

      if(payDetail.isfinish==0){
        this.competitionType="0"
        this.competitionFinish = true
      }else{
        this.competitionType="1"
      }
    },
    async init(id) {
      this.checkListApply = [];
      this.checkListUpload = [];
      this.id = id;
      this.setLoading = true
      const list = await network.showSpecialDialog({ id: id });
      if (list == "error") return;

      const { signup, works } = list;
      if (signup.isOpen) {
        this.checkListApply.push('1');
      }
      if (signup.isEdit) {
        this.checkListApply.push('2');
      }

      if (works.isOpen) {
        this.checkListUpload.push('1');
      }
      if (works.isEdit) {
        this.checkListUpload.push('2');
      }
      this.setLoading = false
    },
    async saveSpecial(){
      let checkListApply = this.checkListApply.map((res)=>{return parseInt(res)})
      let checkListUpload = this.checkListUpload.map((res)=>{return parseInt(res)})
      let _this = this
      if(this.competitionType=='0'){
        this.$confirm('竞赛关闭后不可逆，确定关闭吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async ()=>{
          let param = {
            competitionId: _this.id,
            checkListApply: [],
            checkListUpload: [],
            isfinish: 0
          }
          const list = await network.saveSpecial({ data: param });
          if (list == "error") return;
          _this.special = false;
          _this.$message.success("保存成功");
        })
      }else{
        let param = {
          competitionId: this.id,
          checkListApply: checkListApply,
          checkListUpload: checkListUpload
        }
        const list = await network.saveSpecial({ data: param });
        if (list == "error") return;
        this.special = false;
        this.$message.success("保存成功");
      }
    },
  },
  created() {
      this.init(this.id);
      this.getIsFinsh(this.id);
  },
  props:['close','id','type'],
  watch:{
      special(val){
          if(!val){
              return this.close && this.close(this.type)
          }
      }
  }

};
</script>

<style lang="less" scoped>
.footBtn{
  float: right;
}
em {
  font-style: normal;
}

.jingsai {
  .content {
    width: 480px;
    margin: 100px auto;
    .content_main {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      .content_left {
        width: 128px;
        p {
          text-align: left;
          margin-bottom: 5px;
        }
        .content_txt {
          width: 131px;
          height: 68px;
          background-color: #fff468;
          font-size: 12px;
          border: 1px solid #9b9b9b;
          padding: 0 4px;
          box-sizing: border-box;
        }
      }
      .content_right {
        width: 350px;
        .el-radio-group {
          padding-top: 3px;
        }
        .el-radio {
          margin-bottom: 12px;
          margin-left: 15px;
        }
        .el-radio:nth-child(odd) {
          margin-right: 40px;
        }
      }
    }
    
    .closeCompetition{
      margin: 30px 0;
      p{
        width: 100%;
        color: #ff4949;
        span{
          float: right;
        }
      }
    }
    
  }
}
</style>
<style>
.input input {
  text-indent: 0.5rem;
}
</style>

