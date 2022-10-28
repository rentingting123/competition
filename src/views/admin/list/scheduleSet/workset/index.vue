<template>
  <div class="workset">
    <span class="title" @click="init">
      <i class="iconfont">&#xe655;</i>
      作品设置
    </span>
    <!-- 投票设置弹窗 -->
    <el-dialog
      title="作品设置"
      :append-to-body="true"
      :modal-append-to-body="false"
      :visible.sync="worksDialogVisible"
      :close-on-click-modal="false"
      :show-close='true'
      width="800px"
      style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
    >
      <div slot="title" class="dialogHeader">
        作品设置
        <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/again.gif" class="againGuide" @click="guideshow=true"/>
      </div>
      <el-form :model="workSet" ref="workSet" label-width="0" class="demo-ruleForm">
        <div class="el-zuop-main">
          <div class="setzp-title">
            <span>作品内容：</span>
            <el-checkbox-group class="el-fm-photo" v-model="workSet.content">
              <el-checkbox label="1">封面图</el-checkbox>
              <el-checkbox label="2">作品名</el-checkbox>
              <el-checkbox label="3">简介</el-checkbox>
              <el-checkbox label="4">作品介绍</el-checkbox>
              <el-checkbox label="5"><el-input v-model="workKeyword" size="small" style="width:150px;"></el-input></el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="attachList" v-if="workSet.content.includes('5')">
            <div class="setzp-centent start " >
              <span>{{workKeyword}}: </span>
              <div>
                <div class="question" >
                  <div v-for="item,k in keywordList" :key="k" style="margin-bottom:10px">
                    <el-input class="el-fileName-input" v-model="item.name" placeholder="请输入关键词"></el-input>
                    <i class="iconfont" @click="delKeyworkd(k)">&#xe61e;</i>
                  </div>
                  <el-checkbox v-model="customKeyword" style="margin-top: 20px">允许参赛者自定义{{workKeyword}}</el-checkbox>
                  <el-checkbox v-model="multiple" style="margin-top: 20px">允许参赛者多选{{workKeyword}}</el-checkbox>
                </div>

                <div class="el-div-button" style="margin: 0 0 20px 13px" @click="addKeyworkd">
                  <i class="iconfont">&#xe62d;</i> <span> 增加{{workKeyword}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="attachList">
            <div class="setzp-centent ">
              <span>作品审核：</span>
              <el-radio-group class="el-sz-panduanra" v-model="workSet.review">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
            <div class="workSetReview" v-if="workSet.review">
              <p style="line-height:32px">单校数量限制：</p>
              <div class="workSetReviewp">
                <p>
                  本科院校通过总数上限
                  <el-input class="smallInput" size="small" type="number" min="1" max="999" v-model="schoolLimit.benPoolNum" ></el-input>
                  个 且不超过总作品数
                  <el-input class="smallInput" size="small" type="number" min="1" max="100" v-model="schoolLimit.benPoolProportions" @change="changeSchoolLimit('benPoolProportion')"></el-input>
                  %
                </p>
                <p>
                  专科院校通过总数上限
                  <el-input class="smallInput" size="small" type="number" min="1" max="999" v-model="schoolLimit.gaoPoolNum" ></el-input>
                  个 且不超过总作品数
                  <el-input class="smallInput" size="small" type="number" min="1" max="100" v-model="schoolLimit.gaoPoolProportions" @change="changeSchoolLimit('gaoPoolProportion')"></el-input>
                  %
                </p>
                <p>
                  独立院校通过总数上限
                  <el-input class="smallInput" size="small" type="number" min="1" max="999" v-model="schoolLimit.duPoolNum" ></el-input>
                  个 且不超过总作品数
                  <el-input class="smallInput" size="small" type="number" min="1" max="100" v-model="schoolLimit.duPoolProportions" @change="changeSchoolLimit('duPoolProportion')"></el-input>
                  %
                </p>
              </div>
            </div>
          </div>
          <div class="attachList">
            <div class="setzp-centent start">
              <span>作品赛题: </span>
              <div>
                <el-radio-group class="el-sz-panduanra" v-model="isTopic">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>

                <div class="question" v-if="isTopic">
                  <div v-for="item,k in topicList" :key="k" style="margin-bottom:10px">
                    <el-input class="el-fileName-input" v-model="item.name" placeholder="请输入赛题"></el-input>
                    <i class="iconfont" @click="delQuestion(k)">&#xe61e;</i>
                  </div>
                  <el-checkbox v-model="custom" style="margin-top: 20px">允许参赛者自定义赛题</el-checkbox>
                </div>

                <div class="el-div-button" style="margin: 0 0 20px 13px" v-if="isTopic" @click="addQuestion">
                  <i class="iconfont">&#xe62d;</i> <span> 增加赛题</span>
                </div>
              </div>
            </div>
          </div>

          <div class="setzp-centent el-name">
              <span>作品提交须知：</span>
              <el-input type="textarea" class="el-fileName-input" autosize placeholder="请输入作品提交须知" v-model="workSet.agreement"></el-input>
          </div>

          <div v-for="(zpitme,q) in workSet.attachList" :key="q" class="attachList">
            <div>
              <div class="setzp-centent">
                <span>
                  附件必填
                  <el-tooltip content="该阶段参赛人员必须上传作品">
                    <i class="el-icon-question"></i>
                  </el-tooltip>：
                </span>

                <el-radio-group class="el-sz-panduanra" v-model="zpitme.attach">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </div>
              
              <div class="setzp-centent">
                <span>附件名称：</span>
                <el-input
                  :prop="'file.' + q +'.attachName'"
                  :rules="{ required: true, message: '请输入作品附件名称', trigger: 'blur' }"
                  class="el-fileName-input"
                  v-model="zpitme.attachName"
                  placeholder="请输入作品附件名称"
                ></el-input>
                <i  v-if="q != 0" class="iconfont" @click="delfujian(q)">&#xe61e;</i>
              </div>
              <div class="setzp-centent">
                <span>可接受形式：</span>
                <el-checkbox-group class="el-sz-leixing" v-model="zpitme.attachType">
                  <el-checkbox label="1" class="el-ck-wrd" style="margin-left:30px;">文档类（仅限pdf）</el-checkbox>
                  <el-checkbox label="2" class="el-ck-wrd">媒体类（仅限mp4、mp3）</el-checkbox>
                  <el-checkbox label="3" class="el-ck-wrd">图片类（如jpeg、jpg、gif、png等）</el-checkbox>
                  <el-checkbox label="4" class="el-ck-wrd">作品外链 &nbsp;</el-checkbox>
                  <el-checkbox label="5" class="el-ck-wrd" style="margin-left:-84px;">压缩文件（仅限zip）</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="setzp-centent">
                <span>附件要求说明：</span>
                <el-input
                  :prop="'file.' + q +'.notice'"
                  :rules="{ required: false, message: '请输入附件要求', trigger: 'blur' }"
                  class="el-fileName-input"
                  v-model="zpitme.notice"
                  placeholder="请输入附件要求"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="el-div-button">
            <span @click="addfj()">增加作品附件</span>
          </div>
        </div>
        <div class="group_btn">
          <el-button size="small" :disabled='loading' @click="worksDialogVisible = false">取消</el-button>
          <el-button size="small" :disabled='loading' type="primary" @click="submitsetZP('workSet')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    
    <noviceGuide v-if="guideshow" :close='closeGuide' :lists='guideList' type='3' id='69'/>
  </div>
</template>

<script>
import network from "@/api/jxapi";
import util from "@/utils/util";
import noviceGuide from '../../noviceGuide'
import { setNoviceGuide, getNoviceGuide } from '@@/utils/commons'
export default {
  props: ["rowId", "competitionId"],
  components:{
    noviceGuide
  },
  data() {
    return {
      //作品设置
      worksDialogVisible: false,
      workSet: {
        content: ["1", "2", "3", "4", "5"],
        agreement: '',
        review: false,
        attachList: [
          {
            attach: false, //附件是否必填
            attachName: "", //附件名
            notice: "", //是否选中
            attachType: [], //可接受的形式
            attachId: util.randomChar(12)
          }
        ]
      },
      schoolLimit:{
        benPoolNum: 999,
        benPoolProportion: 1,
        benPoolProportions: 100,
        gaoPoolNum: 999,
        gaoPoolProportion: 1,
        gaoPoolProportions: 100,
        duPoolNum: 999,
        duPoolProportion: 1,
        duPoolProportions: 100
      },
      guideshow: false,
      guideList: [
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/1.png',
            width: '373px',
            id: 0,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/2.png',
            width: '623px',
            id: 1,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/3.png',
            width: '608px',
            id: 2,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/4.png',
            width: '744px',
            id: 3,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/5.png',
            width: '741px',
            id: 4,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/6.png',
            width: '608px',
            id: 5,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/7.png',
            width: '621px',
            id: 6,
        },
        {
            url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/worksSet/8.png',
            width: '608px',
            id: 7,
        },
      ], //
      custom: false,
      topicList: [],
      isTopic: false,
      keywordList: [],
      customKeyword: false,
      multiple: false,
      workKeyword: '作品关键词',
      loading: false,

    };
  },
  methods: {
    changeSchoolLimit(name){
      this.schoolLimit[name] = this.schoolLimit[name+'s'] / 100

    },
    addQuestion(){
      if(!this.topicList){
        this.topicList = []
      }
      this.topicList.push({
        name: '',
      })
    },
    addKeyworkd(){
      if(!this.keywordList){
        this.keywordList = []
      }
      this.keywordList.push({
        name: '',
      })
    },
    delQuestion(i){
      this.topicList.splice(i, 1)
    },
    delKeyworkd(i){
      this.keywordList.splice(i, 1)
    },
    async closeGuide(){
      this.guideshow = false
      setNoviceGuide('works_set')
    },
    async init() {
      this.loading = false
      let res = await network.getpoolGetSetting({
        data: { rowId: this.rowId, competitionId: this.competitionId }
      });
      this.worksDialogVisible = true
      if (res == "error" || !res)
      return (this.workSet.rowId = this.rowId);
      // 默认值
      const content = res.content.map(c => c + "");
      const attachList = res.attachList.map(att => {
        const attachType = att.attachType.map(t => t + "");
        att.attachType = attachType;
        return att;
      });
      res.content = content;
      // 作品审核判断
      if(content.includes('6')){
        res.review = true
      }else{
        res.review = false
      }
      res.attachList = attachList;
      this.workSet = res;
      this.custom = res && res.custom ? true : false
      this.customKeyword = res && res.customKeyword ? true : false
      this.multiple = res && res.multiple ? true : false
      this.isTopic = res && res.isTopic ? true : false
      this.workKeyword = res && res.workKeyword || '作品关键词'
      let topicList = res && res.topicList || []
      
      let arr = []
      topicList.map(item=>{
        arr.push({
          name: item
        })
      })
      this.topicList = arr
      
      let keywordList = res && res.keywordList || []
      arr = []
      keywordList.map(item=>{
        arr.push({
          name: item
        })
      })
      this.keywordList = arr

      // 单校数量限制
      this.schoolLimit.benPoolNum = res.schoolLimit && res.schoolLimit.benPoolNum || 999
      this.schoolLimit.gaoPoolNum = res.schoolLimit && res.schoolLimit.gaoPoolNum || 999
      this.schoolLimit.duPoolNum = res.schoolLimit && res.schoolLimit.duPoolNum || 999
      this.schoolLimit.benPoolProportion = res.schoolLimit && res.schoolLimit.benPoolProportion || 1
      this.schoolLimit.gaoPoolProportion = res.schoolLimit && res.schoolLimit.gaoPoolProportion || 1
      this.schoolLimit.duPoolProportion = res.schoolLimit && res.schoolLimit.duPoolProportion || 1

      this.schoolLimit.benPoolProportions = this.schoolLimit.benPoolProportion * 100
      this.schoolLimit.gaoPoolProportions = this.schoolLimit.gaoPoolProportion * 100
      this.schoolLimit.duPoolProportions = this.schoolLimit.duPoolProportion * 100


      this.$nextTick(()=>{
        // 判断是否进过新手引导
        if(getNoviceGuide('works_set')){
            this.guideshow = true
        }else{
            this.guideshow = false
        }
      })
      
    },
    /**
     * 作品设置里面删除附件
     */
    delfujian(i) {
      this.workSet.attachList.splice(i, 1);
    },
    /**
     * 作品设置里面的增加作品附件
     */
    addfj() {
      this.workSet.attachList.push({
        attach: true, //附件是否必填
        attachName: "", //附件名
        notice: "", //附件要求
        attachType: [], //可接受的形式
        attachId: util.randomChar(12)
      });
    },

    /**
     * 作品设置确定提交
     */
    submitsetZP(formName) {
      this.loading = true
      let flag = false;
      this.workSet.attachList.filter(res => {
        if (!res.attachName) {
          return (flag = true);
        }
      });
      if (flag) {
        this.loading = false
        return this.$message.warning("请输入作品附件名称");
      }

      // 作品审核处理 (需要则content加上‘6’，不需要则删除)
      if(this.workSet.review){
        if(!this.workSet.content.includes('6')){
          this.workSet.content.push('6')
        }
        // 判断单校数量限制
        for(let i in this.schoolLimit){
          if(!this.schoolLimit[i]){
            this.loading = false
            return this.$message.warning('请填写单校数量限制')
          }
        }
      }else{
        let i = this.workSet.content.indexOf('6')
        if( i != -1){
          this.workSet.content.splice(i, 1)
        }
      }
      
      let topicList = []
      this.topicList.map(item=>{
        if(item){
          topicList.push(item.name)
        }
      })
      // 作品关键词
      let keywordList = []
      this.keywordList.map(item=>{
        if(item){
          keywordList.push(item.name)
        }
      })
      // if(this.workSet.content.includes('5')){
      //   if(keywordList.length<1){
      //     return this.$message.warning('请增加关键词')
      //   }
      // }

      var obj = Object.assign(
        { competitionId: this.competitionId, rowId: this.rowId },
        this.workSet,
        {
          schoolLimit: this.schoolLimit,
          topicList: topicList,
          keywordList: keywordList,
          custom: this.custom ? 1 : 0,
          customKeyword: this.customKeyword ? 1 : 0,
          multiple: this.multiple ? 1 : 0,
          workKeyword: this.workKeyword || '作品关键词',
          isTopic: this.isTopic ? 1 : 0,
        }
      );
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let setWorkRule = await network.setpoolGetSetting({ data: obj });
          if (setWorkRule == "error") return this.loading = false;
          this.worksDialogVisible = false;
          this.$message.success("保存成功");
        } else {
          return false;
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.workset{
  display: inline-block;
  vertical-align: middle;
  .title{
    cursor: pointer;
  }
}
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0;
  cursor: pointer;
  span:nth-child(1) {
    font-weight: bold;
  }
}
.demo-ruleForm {
  margin-top: -25px;
}
.group_btn {
  border-top: 1px solid #dedede;
  text-align: right;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-bottom: -1.8rem;
}
.el-zuop-main {
  //height: 722px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0px 0 0 20px;
  background: #fff;
  box-sizing: border-box;
  overflow: auto;
  .setzp-title {
    background: #fafafa;
    width: 562px;
    height: 65px;
    padding: 20px 0 0 30px;
    margin-left: 10.9%;
    span {
      float: left;
    }
    .el-fm-photo {
      margin-left: 103px !important;
    }
  }
  .setzp-centent {
    padding: 20px 0 0 30px;
    margin-left: 10.9%;
    display: flex;
    align-items: center;
    &.start{
      align-items: flex-start;
      .question{
        width: 383px;
        height: auto;
        background: #FAFAFA;
        padding: 13px;
        margin: 0 0 20px;
      }
    }
    span {
      width: 100px;
    }
    .iconfont:hover {
      color: #d0021b;
    }
    img {
      margin-left: 20px;
      background: url("https://web.moocollege.com/mooc/hzq/competition/competition/删除.svg") no-repeat;
    }
    img:hover {
      background: url("https://web.moocollege.com/mooc/hzq/competition/competition/删除hover.svg")
        no-repeat;
    }
    .el-sz-panduanra {
      margin-left: 26px;
    }
    .el-sz-redio {
      margin-left: 48px;
      text-align: left;
    }
    .el-sz-redio2 {
      margin-left: 48px;
      text-align: left;
    }
    .el-fileName-input {
      background: #ffffff;
      border-radius: 2px;
      width: 321px;
      height: 36px;
    }
    .el-fileName-input.el-textarea{
      height: auto;
      width: 375px;
      margin-left: 16px;
    }
    .el-sz-leixing {
      background: #fafafa;
      width: 365px;
      height: 196px;
      text-align: left;
      .el-ck-wrd {
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 1px;
        padding-top: 20px;
        text-align: left;
        margin-left: 23px !important;
      }
      /deep/ label:nth-child(4) {
        margin-left: 25px !important;
      }
    }
  }
  .el-div-button {
    margin: 10px 0 30px 264px;
    font-size: 12px;
    color: #1d86ff;
    letter-spacing: 0.86px;
    cursor: pointer;
  }
}
/deep/.el-dialog__header{
  padding:  10px 20px;
  border-bottom: 1px solid #dedede;
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

.workSetReview{
  background: #fafafa;
  width: 562px;
  height: auto;
  padding: 20px 0 20px 30px;
  margin-top: 20px;
  margin-left: 10.9%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .workSetReviewp{
    width: 460px;
    height: auto;
    p{
      margin-bottom: 10px;
    }
    .smallInput{
      width: 60px;
    }
  }
  /deep/input[type='number']{
    padding-right: 3px;
  }
}
.attachList{
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}
</style>