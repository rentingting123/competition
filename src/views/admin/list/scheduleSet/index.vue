<template>
  <div class="scheduleSet">
    <span class="operateButton" :class="{'disabled': disabled}" @click="init">日程设置</span>

    <el-dialog
      title="日程设置"
      :modal-append-to-body="false"
      :append-to-body='true'
      :close-on-click-modal= false
      :visible.sync="schedule"
      :show-close='true'
      width="850px"
      height="1849px"
      style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
      >
      <div slot="title" class="dialogHeader">
        日程设置
        <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/again.gif" class="againGuide" @click="guideshow=true"/>
      </div>
      <el-tabs v-model="activeIndex" type="card" style="padding: 0 30px" closable addable @tab-remove="removeTab" @tab-add='addTab'>
        <el-tab-pane v-for="(list, index) in lists"
          :key="list.rowId"
          :label="list.competition_times && list.competition_times[0] && list.competition_times[0].name || '新增赛段'"
          :name="index+''"
        >
          <div class="competitionList">
            <div v-for="(item,j) in list.competition_times" :key="j">
              <!-- 最左边的名字和选择 -->
              <div class="competitionName">
                <span v-if="item.type==0">
                  赛段
                  <el-tooltip content="赛段结束时间必填。赛段内各自结束时间可不填，进入下一个开始时间段时系统将默认结束上个内容">
                    <i class="el-icon-question"></i>
                  </el-tooltip></span>
                <span v-else-if="item.type==1"><el-checkbox v-model="item.isNeed">报名</el-checkbox></span>
                <span v-else-if="item.type==2"><el-checkbox v-model="item.isNeed">提交作品</el-checkbox></span>
                <span v-else-if="item.type==3"><el-checkbox v-model="item.isNeed">评审作品</el-checkbox></span>
                <span v-else-if="item.type==4"><el-checkbox v-model="item.isNeed">结果发布</el-checkbox></span>
              </div>
              <!-- 名字和日期 -->
              <div class="scheduleShow">
                <span class="inputWidth">
                  <el-input size="small" v-model="item.name" placeholder="请输入名称" style="width:100%"/>
                </span>
                <span class="inputWidth">
                  <el-date-picker size="small" v-model="item.startTime" type="date"
                      value-format="yyyy-MM-dd" placeholder="开始时间" style="width:100%" @blur="checkStartTime(item, index, j)">
                  </el-date-picker>
                </span>
                <span class="inputWidth" v-if="item.type!=4">
                  <el-date-picker size="small" v-model="item.endTime" type="date"
                      value-format="yyyy-MM-dd" placeholder="结束时间" style="width:100%" @blur="checkEndTime(item, index, j)">
                  </el-date-picker>
                </span>
                <!-- 最右边的设置和删除按钮 -->
                <span>
                  <!-- 作品设置 -->
                  <workset v-if="item.type==2" :rowId='list.rowId' :competitionId='id' />
                  <!-- 评审设置 -->
                  <reviewset v-if="item.type==3" :rowId='list.rowId' :competitionId='id' />
                </span>
              </div>
              <!-- 是否显示 -->
              <div v-if="item.type!=0" class="editShow">
                <el-checkbox v-model="item.display">日程进度条中显示该日程</el-checkbox>
                <!-- 投票设置 -->
                <vote v-if="item.type==2" :rowId='list.rowId' :competitionId='id' />
              </div>
            </div>
          </div>

          <!-- 线上支付 -->
          <div class="competitionList">
            <!-- isPay 0关闭 1开启 -->
            <!-- payRule 0按团收费  1按人数收费参赛者 2按人数收费指导老师  3按人数收费 参赛者指导老师-->
            <!-- price 价格 -->
            <div  class="onlinepay">
                <p>
                  <span>线上报名费支付功能：</span>
                  <el-switch  v-model="list.isPay"  style="margin:0 10px" :active-value='1' :inactive-value='0'></el-switch>
                </p>
                <el-input type="number" :min="1"  v-if="list.isPay==1" placeholder="请输入单价" v-model="list.price" class="input-with-select">
                  <el-select v-model="list.payType" placeholder="请选择收费规则" style="width:150px" slot="prepend">
                    <el-option label="按团收费" :value="0"></el-option>
                    <el-option label="按人数收费" :value="1"></el-option>
                  </el-select>
                </el-input>
                <p v-if="list.isPay==1 && list.payType==1" class="pay-team-type">
                  <el-checkbox-group v-model="list.region">
                    <el-checkbox label="参赛者" :value="0"  name="type"></el-checkbox>
                    <el-checkbox label="指导老师" :value="1" name="type"></el-checkbox>
                  </el-checkbox-group>
                </p>
            </div>
          </div>

          <!-- 线下支付 -->
          <div class="competitionList">
            <div>
              <span>线下报名费支付功能：</span>
              <el-switch 
                v-model="pay.outlinePay" 
                style="margin:0 10px"
                :active-value='1'
                :inactive-value='0'
              ></el-switch>

              <el-form ref="form1" :model="pay" label-width="80px" style="margin-top: 20px;" class="form" v-if="pay.outlinePay==1">
                <el-form-item label="户名" prop="payAccount" :rules="[{ required: true, message: '户名不能为空', trigger: 'blur' }]">
                  <el-input v-model="pay.payAccount" placeholder="请输入户名" ></el-input>
                </el-form-item>
                <el-form-item label="帐号" prop="payNumber" :rules="[{ required: true, message: '帐号不能为空', trigger: 'blur' }]">
                  <el-input v-model="pay.payNumber" placeholder="请输入帐号" ></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="payAddress" :rules="[{ required: true, message: '开户行不能为空', trigger: 'blur' }]">
                  <el-input v-model="pay.payAddress" placeholder="请输入开户行" ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" :disabled='loading' @click="submit">确定</el-button>
      </div>
    </el-dialog>
     <noviceGuide v-if="guideshow" :close='closeGuide' :lists='guideList' type='3' id='68'/>
  </div>
</template>

<script>
import network from "@/api/jxapi/index";
import util from "@/utils/util";
import moment from 'moment'
import workset from './workset'
import vote from './vote'
import reviewset from './review'
import noviceGuide from '../noviceGuide'
import { setNoviceGuide, getNoviceGuide } from '@@/utils/commons'
export default {
  props: ["id", "disabled" ,'close'],
  data() {
    return {
      lists: [],
      schedule: false,
      activeIndex: 0,
      pay:{
        outlinePay: 0,
        payAccount: '',
        payNumber: '',
        payAddress: ''
      },
      guideshow: false,
      guideList: [
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/1.png',
            width: '373px',
            id: 0,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/2.png',
            width: '623px',
            id: 1,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/3.png',
            width: '608px',
            id: 2,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/4.png',
            width: '744px',
            id: 3,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/5.png',
            width: '741px',
            id: 4,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/6.png',
            width: '608px',
            id: 5,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/7.png',
            width: '621px',
            id: 6,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/8.png',
            width: '608px',
            id: 7,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/9.png',
            width: '669px',
            id: 8,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/scheduleSet/10.png',
            width: '608px',
            id: 9,
        },
      ], //
      loading: false,
    };
  },
  components:{
    workset,
    vote,
    reviewset,
    noviceGuide,
  },
  created() {
    
  },
  methods: {
    async closeGuide(){
      this.guideshow=false
      setNoviceGuide('schedule_set')
    },
    // 检测开始时间
    checkStartTime(item, i, j){
      // i 赛段  j进度0赛段1报名2提交作品3评审作品4结果发布
      let startTime = item.startTime
      let endTime = item.endTime
      if(!startTime) return;
      // 本身时间判断
      if(endTime && moment(startTime) > moment(endTime)){
        this.$set(this.lists[i].competition_times[j],'startTime','')
        return this.$message.warning('开始时间应该小于结束时间')
      }
      // 修改赛段总体时间
      if(j==0){
        let time1 = this.lists[i].competition_times[1].startTime
        let time2 = this.lists[i].competition_times[2].startTime
        let time3 = this.lists[i].competition_times[3].startTime
        let time4 = this.lists[i].competition_times[4].startTime
        if((time1 && moment(startTime)>moment(time1)) || 
           (time2 && moment(startTime)>moment(time2)) ||
           (time3 && moment(startTime)>moment(time3)) ||
           (time4 && moment(startTime)>moment(time4))){
          this.$set(this.lists[i].competition_times[j],'startTime','')
          return this.$message.warning('竞赛开始时间应该小于其他开始时间')
        }
      }else{ //修改报名作品等其他时间
        let start = this.lists[i].competition_times[0].startTime
        let end = this.lists[i].competition_times[0].endTime
        if((start&&moment(startTime)<moment(start)) || (end&&moment(startTime)>moment(end))){
          this.$set(this.lists[i].competition_times[j],'startTime','')
          return this.$message.warning('开始时间应该在竞赛的时间范围内')
        }
      }
    },
    // 检测结束时间
    checkEndTime(item, i, j){
      // i 赛段  j进度0赛段1报名2提交作品3评审作品4结果发布
      let startTime = item.startTime
      let endTime = item.endTime
      if(!endTime) return;
      // 本身时间判断
      if(endTime && moment(startTime) > moment(endTime)){
        this.$set(this.lists[i].competition_times[j],'endTime','')
        return this.$message.warning('开始时间应该小于结束时间')
      }

      // 修改赛段总体时间
      if(j==0){
        let time1 = this.lists[i].competition_times[1].endTime
        let time2 = this.lists[i].competition_times[2].endTime
        let time3 = this.lists[i].competition_times[3].endTime
        let time4 = this.lists[i].competition_times[4].endTime
        if((time1 && moment(endTime)<moment(time1)) || 
           (time2 && moment(endTime)<moment(time2)) ||
           (time3 && moment(endTime)<moment(time3)) ||
           (time4 && moment(endTime)<moment(time4))){
          this.$set(this.lists[i].competition_times[j],'endTime','')
          return this.$message.warning('竞赛开始时间应该小于其他开始时间')
        }
      }else{ //修改报名作品等其他时间
        let start = this.lists[i].competition_times[0].startTime
        let end = this.lists[i].competition_times[0].endTime
        if((start&&moment(endTime)<moment(start)) || (end&&moment(endTime)>moment(end))){
          this.$set(this.lists[i].competition_times[j],'endTime','')
          return this.$message.warning('开始时间应该在竞赛的时间范围内')
        }
      }

    },
    async init() {
      if(this.disabled) return;
      let res = await network.getSchedule({
        data: { competitionId: this.id }
      });
      if (res == "error") return;
      let arr = []
      if(res && res.competitionTimes && res.competitionTimes.length>0){
        arr = res && res.competitionTimes
      }else{
        arr.push(this.getBaseData())
      }
      
      // 线上支付
      for(let i in arr){
        // 初始化数据
        arr[i].payType = ''
        arr[i].region = []
        // 特殊处理数据
        if(arr[i].payRule==1){
          arr[i].payType = 1
          arr[i].region = ['参赛者']
        }else if(arr[i].payRule==2){
          arr[i].payType = 1
          arr[i].region = ['指导老师']
        }else if(arr[i].payRule==3){
          arr[i].payType = 1
          arr[i].region = ['参赛者', '指导老师']
        }else if(arr[i].payRule==0){
          arr[i].payType = 0
          arr[i].region = []
        }
      }

      this.lists = arr
      console.log(this.lists,'lists');
      // 线下支付
      this.pay = {
        outlinePay: res && res.outlinePay || 0,
        payAccount: res && res.payAccount || '',
        payNumber: res && res.payNumber || '',
        payAddress: res && res.payAddress || ''
      }
      this.schedule = true

      this.$nextTick(()=>{
        // 判断是否进过新手引导
        if(getNoviceGuide('schedule_set')){
            this.guideshow = true
        }else{
            this.guideshow = false
        }
      })

    },
    cancel() {
      return this.schedule = false
    },
    async submit(flag,unCheck){
      this.loading = true
      // 判断必填信息
      for(let i in this.lists){
        if(i==unCheck)continue
        if(!this.lists[i].competition_times[0].name || 
          !this.lists[i].competition_times[0].endTime || 
          !this.lists[i].competition_times[0].startTime ){
          this.$message.warning(`请填写《${this.lists[i].competition_times[0].name||'新增赛段'}》竞赛名称、开始时间、结束时间`)
          this.loading = false
          return false
        }
      }
      // 线下支付判断
      if(this.pay.outlinePay==1){
        if(!this.pay.payAccount || !this.pay.payAccount || !this.pay.payAccount){
          this.$message.warning('请填写完整线下报名费支付信息')
          this.loading = false
          return false
        }
      }
      
      for(let i in this.lists){
        // 排序
        this.lists[i].sort = i

        // 线上支付判断
        if(this.lists[i].isPay==1){
          if(!this.lists[i].price || this.lists[i].price<0){
            this.$message.warning('请输入支付金额')
            this.loading = false
            return false
          }

          if(this.lists[i].payType!=0 && this.lists[i].payType!=1){
            this.$message.warning('请选择收费类型')
            this.loading = false
            return false
          }

          if(this.lists[i].payType==0){
            this.lists[i].payRule = 0
          }else{
            if(this.lists[i].region.includes('参赛者') && this.lists[i].region.includes('指导老师')){
              this.lists[i].payRule = 3
            }else if(this.lists[i].region.includes('参赛者') && !this.lists[i].region.includes('指导老师')){
              this.lists[i].payRule = 1
            }else if(!this.lists[i].region.includes('参赛者') && this.lists[i].region.includes('指导老师')){
              this.lists[i].payRule = 2
            }else{
              this.$message.warning('按人数收费时，请选择收费对象')
              this.loading = false
              return false
            }
          }
        }
      }

      let params = {
        competitionId: this.id,
        competitionTimes: this.lists,
        ...this.pay
      }
      if(flag==1){
        this.loading = false
        return true
      }else if(flag==2){
        let res = await network.saveSchedule({ data: params });
        if(res=='error') return this.loading = false;
        this.loading = false
      }else{
        let res = await network.saveSchedule({ data: params });
        if(res=='error') return this.loading = false;
        this.loading = false
        this.$message.success("保存成功");
        this.close && this.close();
        this.schedule = false
      }
    },
    async removeTab(i){
      let rowId = this.lists[i].rowId
      if(this.lists.length<=1){
        return this.$message.warning('竞赛最少需要一个赛段')
      }
      this.$confirm("该日程删除后无法恢复，请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        if(this.lists[i].newadd){
          let res = await network.delSchedule({
            data: {
              rowId: rowId,
              res: this.id
            }
          });
          if (res == "error") return;
          this.lists.splice(i, 1);
        }else{
          let flag = await this.submit(1,i);
          if(!flag) return;
          let res = await network.delSchedule({
            data: {
              rowId: rowId,
              res: this.id
            }
          });
          if (res == "error") return;
          this.lists.splice(i, 1);
          this.$nextTick(() => {
            this.submit(2);
          });
        }
        // activeIndex处理
        if(i<=this.activeIndex && this.activeIndex!=0){
          this.activeIndex = --this.activeIndex + ''
        }
      })
    },
    addTab(){
      let name = this.getBaseData(this.lists.length);
      this.lists.push(name)
      this.activeIndex = this.lists.length-1 + ''
    },
    // 默认数据
    getBaseData(sort=0){
      return {
        isPay: 0,
        newadd: true,
        payRule: 0,
        price: 0,
        rowId: util.randomChar(12),
        scoreWeight: 1,
        sort: sort,
        competition_times: [
          {
            display: true,
            edit: null,
            endTime: "",
            isNeed: true,
            name: "新增赛段",
            signup: null,
            startTime: "",
            time: null,
            timeTypeValue: null,
            type: 0,
            upload: null,
          },
          {
            display: true,
            edit: null,
            endTime: "",
            isNeed: true,
            name: "新增赛段-报名",
            signup: null,
            startTime: "",
            time: null,
            timeTypeValue: null,
            type: 1,
            upload: null,
          },
          {
            display: true,
            edit: null,
            endTime: "",
            isNeed: true,
            name: "新增赛段-提交作品",
            signup: null,
            startTime: "",
            time: null,
            timeTypeValue: null,
            type: 2,
            upload: null,
          },
          {
            display: true,
            edit: null,
            endTime: "",
            isNeed: true,
            name: "新增赛段-评审",
            signup: null,
            startTime: "",
            time: null,
            timeTypeValue: null,
            type: 3,
            upload: null,
          },
          {
            display: true,
            edit: null,
            endTime: "",
            isNeed: true,
            name: "新增赛段-结果发布",
            signup: null,
            startTime: "",
            time: null,
            timeTypeValue: null,
            type: 4,
            upload: null,
          },
        ]
      }
    }
  }
};
</script>

<style lang="less" scoped>
.competitionList{
  width: 706px;
  height: auto;
  background: #F9F9F9;
  margin: 0 auto;
  padding: 20px 30px;
  margin: 10px auto;
  >div{
    padding: 28px 0 18px;
    border-bottom:1px solid #eeeeee;
    &:first-child{
      padding-top: 0;
    }
    &:last-child{
      border-bottom: none;
    }
  }
  .competitionName{
    display: inline-block;
    width: 120px;
  }
  .scheduleShow{
    display: inline-block;
    .inputWidth{
      width: 150px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .editShow{
    margin: 10px 0;
    margin-left: 130px;
    p{
      margin: 10px 0;
    }
  }
  .onlinepay{
    padding: 0;
    .input-with-select{
      width: 400px;
      margin: 10px 0;
    }
    .pay-team-type{
      margin: 10px 0;
    }
  }
}
.scheduleSet{
  display: inline-block;
  vertical-align: middle;
  .operateButton{
    font-size: 14px;
    font-weight: 500;
    color: #0078E2;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
    &.disabled{
      color: #D6D6D6;
      cursor: no-drop;
    }
  }
}

/deep/.el-dialog__footer{
  padding:  10px 20px;
  border-top: 1px solid #dedede;
}
/deep/.el-dialog__header{
  padding:  10px 20px;
  border-bottom: 1px solid #dedede;
}

/deep/.el-tabs__new-tab{
  border-color: #000;
  i{
    color: #000;
  }
}
.dialogHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .againGuide{
      cursor: pointer;
      height: 32px;
      margin-right: 30px;
  }
}


</style>

