<template>
  <div class="specialset">
      <span class="operateButton" :class="{'disabled': disabled}" @click="specialShow">报名设置</span>

      <el-dialog
        title="报名设置"
        :modal-append-to-body="false"
        :append-to-body='true'
        :visible.sync="special"
        :close-on-click-modal= false
        width="800px"
        height="1849px"
        top="50px"
        style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
        >
        <el-form
          :model="ruleFormCom"
          :rules="rulesCom"
          ref="ruleFormCom"
          label-width="0"
          class="demo-ruleForm"
        >
          <div class="setting_model">
            <div class="type_select">
              <h1 class="title">
                <i style="color:red;">*</i> 竞赛类型
                <span>单选</span>
              </h1>
              <ul class="type_list">
                <el-radio-group v-model="ruleFormCom.applyType" @change="applyTypeChange" size="small">
                  <el-radio :label="1" border>个人</el-radio>
                  <el-radio :label="2" border>团队</el-radio>
                </el-radio-group>
              </ul>
              <div class="group_num_show">
                <div class="group_num" v-show="ruleFormCom.applyType==2">
                  <h1 class="title">团队参赛者人数下限</h1>
                  <el-input-number
                    v-model="ruleFormCom.teamMinMember"
                    @change="handleChange"
                    :min="1"
                    :max="999"
                    label="团队参赛者人数下限"
                  ></el-input-number>
                </div>
                <div class="group_num" v-show="ruleFormCom.applyType==2">
                  <h1 class="title">团队参赛者人数上限</h1>
                  <el-input-number
                    v-model="ruleFormCom.teamMaxMember"
                    @change="handleChange"
                    :min="1"
                    :max="999"
                    label="团队参赛者人数上限"
                  ></el-input-number>
                </div>
              </div>
              <div class="group_num_show">
                <div class="group_num">
                  <h1 class="title">指导老师人数上限</h1>
                  <el-input-number
                    v-model="ruleFormCom.teamMaxCoach"
                    @change="handleChange"
                    :min="0"
                    :max="999"
                    label="指导老师人数上限"
                  ></el-input-number>
                </div>
                <div class="group_num">
                  <h1 class="title">企业老师人数上限</h1>
                  <el-input-number
                    v-model="ruleFormCom.teamMaxCompanyTeacher"
                    @change="handleChange"
                    :min="0"
                    :max="999"
                    label="企业老师人数上限"
                  ></el-input-number>
                </div>
                <div class="group_num">
                  <h1 class="title">指导老师参赛团队上限</h1>
                  <el-input-number
                    v-model="ruleFormCom.coachMaxTeam"
                    @change="handleChange"
                    :min="0"
                    :max="999"
                    label="指导老师参赛团队上限"
                  ></el-input-number>
                </div>
              </div>
            </div>
            <!-- 竞赛年份  -->
            <!-- :prop="'hotels.' + index +'.address'"
            :rules="{ required: true, message: '请输入酒店地址', trigger: 'blur' }"-->
            <div class="year_select" style="display:inline-block;margin-right:43px;">
              <h1 class="title"><i style="color:red;">*</i> 竞赛年份</h1>
                <el-date-picker
                  prop="competitionYear"
                  v-model="ruleFormCom.competitionYear"
                  type="year"
                  placeholder="请选择年"
                ></el-date-picker>
            </div>

            <div class="round_select" style="display:inline-block;width:260px;">
              <h1 class="title">竞赛届数</h1>
              <el-input
                placeholder="请输入竞赛届数"
                type="Number"
                min="0"
                v-model="ruleFormCom.competitionRound"
              >
                <template slot="prepend">第</template>
                <template slot="append">届</template>
              </el-input>
            </div>

            <!-- 竞赛范围 -->
            <div class="year_select">
              <h1 class="title"><i style="color:red;">*</i> 竞赛范围</h1>
              <!-- 第一级 -->
              <range :competitionLevel='ruleFormCom.competitionLevel' :competitionRange='ruleFormCom.competitionRange' :setDate='setRang' />
            </div>

            <!-- 添加标签 -->
            <div class="year_select">
              <h1 class="title">添加标签 <span>请选择1个标签</span></h1>
              <div>
                <div class="tag_type" v-for="(item,index) in ruleFormCom.tags" :key="index"
                 :class="{'active':ruleFormCom.labelActive === index}"
                  @click="pitchTags(index)" >
                  {{item.tagName}}
                  <i class="el-icon-close" v-if="ruleFormCom.labelActive === index" @click.stop="closeTag(index)" ></i>
                </div>
                <div class="add_tag" v-if="ruleFormCom.tags.length<5">
                  <input placeholder="请输入标签" type="text" v-model="addTageName" />
                  <i class="el-icon-plus" @click="addTag"></i>
                </div>
              </div>
            </div>
               <!-- 配置团队标签 -->
            <div class="year_select">
              <h1 class="title">配置团队标签 
                <span>配置成功后，报名团队在设置标签时可进行使用 </span>
                </h1>
              <!-- <div>
                <div class="tag_type" v-for="(item,index) in ruleFormCom.searchLabel" :key="index"
                 :class="{'active':ruleFormCom.labelActive1 === index}" @click="pitchTags1(index)" >
                  {{item.tagName}}
                  <i class="el-icon-close" v-if="ruleFormCom.labelActive1 === index" @click.stop="closeTag1(index)" ></i>
                </div>
                <div class="add_tag" v-if="ruleFormCom.searchLabel.length<5">
                  <input placeholder="请输入标签" type="text" v-model="addTageName1" />
                  <i class="el-icon-plus" @click="addTag1"></i>
                </div>
              </div> -->

                <div>
                <div
                  class="tag_type"
                  style="margin-top: 10px"
                  v-for="(item,index) in ruleFormCom.searchLabel"
                  :key="index"
                  :class="{'active':item.checked}"
                  @click="IdentifyStudent1(index)"
                >
                  {{item.labelName}}
                  <i
                    class="el-icon-close"
                    v-if="item.checked"
                    @click.stop="closeDegrees1(index)"
                  ></i>
                </div>
                <div class="add_tag" v-if="ruleFormCom.searchLabel.length < 5">
                  <input placeholder="请输入团队标签" type="text" v-model="addTageXueli1" />
                  <i class="el-icon-plus" @click="addXueli1"></i>
                </div>
              </div>
            </div>
            <!--竞赛群体-->
            <div class="radio_select">
              <span class="el-danxiao">竞赛群体：</span>
              <el-checkbox-group
                v-model="ruleFormCom.applyGroup"
                @change="judgeStudent"
                class="competition_group"
              >
                <el-checkbox :label="1">面向在校学生</el-checkbox>
                <el-checkbox :label="3">面向教师</el-checkbox>
                <el-checkbox :label="2">面向社会</el-checkbox>
              </el-checkbox-group>
              <div v-if="studentActive">
                <div
                  class="tag_type"
                  style="margin-top: 10px"
                  v-for="(item,index) in ruleFormCom.competition_degrees"
                  :key="index"
                  :class="{'active':item.checked}"
                  @click="IdentifyStudent(index)"
                >
                  {{item.tagName}}
                  <i
                    class="el-icon-close"
                    v-if="item.checked"
                    @click.stop="closeDegrees(index)"
                  ></i>
                </div>
                <div class="add_tag">
                  <input placeholder="请输入学历" type="text" v-model="addTageXueli" />
                  <i class="el-icon-plus" @click="addXueli"></i>
                </div>
              </div>
            </div>

            <!--报名方式-->
            <div class="radio_select">
              <span class="el-danxiao">报名材料审核：</span>
              <el-radio-group
                v-model="ruleFormCom.signType"
                @change="signTypeData"
                class="competition_group"
              >
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
            <div class="radio_select">
              <span class="el-danxiao">单校参赛上限：</span>
              <el-input-number class="schoolNum" :min="1" v-model="ruleFormCom.schoolNum"></el-input-number>
            </div>
            <!--学校报名表-->
            <div class="radio_select" v-if="ruleFormCom.signType">
              <span  class="el-danxiao">学校报名表：</span>
              <div class="uploadP">
                <div class="biaoming" @click="dialogEntryFormVisible = true" v-if="!isEntryFormDone">
                  <i class="iconfont">&#xe634;</i>
                  <span>编辑报名表</span>
                </div>
                <div class="yishengcheng" v-else>
                  <i class="iconfont">&#xe63f;</i>
                  <span>已生成报名表</span>
                  <el-button type="danger" size="mini" style="margin-left: 10px;"  @click="delExtraSetting">删除报名表</el-button>
                </div>
              </div>
            </div>
            <div class="radio_select">
              <span class="el-danxiao">认证表提交按钮名称：</span>
              <el-input class="schoolNum" v-model="ruleFormCom.materialName"></el-input>
            </div>

            <div class="radio_select">
              <span class="el-danxiao">自动生成团队名称：</span>
              <el-radio-group v-model="ruleFormCom.autoTeam">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </div>
            <div class="radio_select">
              <span class="el-danxiao">自动审核团队信息：</span>
              <el-radio-group v-model="ruleFormCom.autoPass">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </div>
            <div class="radio_select">
              <span class="el-danxiao">检验报名须知：</span>
              <el-radio-group v-model="ruleFormCom.agreement">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
              
            </div>
            <div class="radio_select" v-if="ruleFormCom.agreement==1">
              <span class="el-danxiao">报名须知内容：</span>
              <editor class="m-text" :setDate="setLoginNotice" :stateData="ruleFormCom.agreementInfo"/>
            </div>
            <!--  -->
            <div class="radio_select">
              <span class="el-danxiao">
                重复报名
                <el-tooltip class="item" effect="dark" content="参赛者可以在同一赛项内进行多次报名/参加多个团队" placement="top-start">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
                ：
              </span>
              <el-radio-group v-model="ruleFormCom.signUpAgain">
                <el-radio :label="1">
                  <el-tooltip class="item" effect="dark" content="参赛者可以在同一赛项内进行多次报名/参加多个团队" placement="top-start">
                    <span>允许 <el-input v-model="ruleFormCom.signUpAgainNum" @change="changeSignUp" type="number" style="width:70px;"></el-input> 次</span>
                  </el-tooltip>
                </el-radio>
                <el-radio :label="0">不允许</el-radio>
              </el-radio-group>
            </div>

          </div>
          <div class="group_btn">
            <el-button @click="special = false">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleFormCom')">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog
        width="1060px"
        title="学校申报编辑表"
        :append-to-body="true"
        :fullscreen="false"
        :visible.sync="dialogEntryFormVisible"
        :show-close="true"
        :close-on-click-modal="false"
      >
        <entry-form v-if="dialogEntryFormVisible" :id='id' :baseInfo='baseInfo' :data="ruleFormCom.docSetting" @saveSuccess="saveEntryForm"></entry-form>
      </el-dialog>
  </div>
</template>
<script>
import network from "@/api/jxapi";
import entryForm from "./entryForm";
import editor from '@@/components/editor/index'
import range from '@@/components/competitionRange'

export default {
  props: ["id", 'disabled', 'close'],
  components: {
    entryForm,
    editor,
    range
  },
  data() {
    return {
      special: false,
      ruleFormCom: {
        applyType: 1, //1个人 2团队
        maxTeamMember: 0, //参赛人数上限
        maxTeamCoach: 0, //指导老师人数上限
        teamMinMember: 1, //这是初始值并且绑定值默认是1人
        teamMaxMember: 5, //这是初始值并且绑定值默认是5人
        teamMaxCoach: 3, //这是指导师
        teamMaxCompanyTeacher: 0, //这是企业导师,默认为0，不添加
        coachMaxTeam: 1, //指导老师能加入的团队
        competitionYear: "", //年选择
        range: "", //参赛范围
        labelActive: 0, //标签是否选中 0未选 1选中
        labelActive1: 0, //标签是否选中 0未选 1选中
        applyGroup: [], //竞赛群体
        competition_degrees: [], //竞赛群体学生
        autoTeam: 0, //自动生成团队名称：
        autoPass:1,
        agreement: 0, //0 不需要竞赛报名须知 1 需要竞赛报名须知
        agreementInfo: '', //竞赛报名须知
        teamList: [], //省赛分组
        teamQuList: [], //区赛
        issueSchool: [
          { schoolType: "", educationList: [] },
          { schoolType: "", educationList: [] },
          { schoolType: "", educationList: [] }
        ],
        searchLabel:[],
        tags: [], //这是多个标签的数组
        xuelis: [], //学历标签的数组
        zpworks: [], //作品关键词的数组
        tagPitch: "", //选中的标签
        tagPitch1: "", //选中的标签
        tagpitchWork: "", //选中的作品
        applyFileUrl: [], //报名表
        signType: true, //这边是选择报名方式
        docSetting: {}, //报名表
        schoolNum: 10, //学校初始值
        competitionRound: "", //第几届
        materialName: '补交材料',
      },
      rulesCom: {
        competitionYear: [
          { type: "date", required: true, message: "请选择年份",trigger: "change" }
        ],
        range: [
          { required: false, message: "请选择竞赛范围", trigger: "change" }
        ]
      },
      baseInfo: {},
      dialogEntryFormVisible: false,
      isEntryFormDone: false, //报名表是否已发布
      
      addTageName: "", //用户新增标签内容临时存放
      addTageName1: "", //用户新增标签内容临时存放
      addTageXueli: "", //用户新增的学历
      addTageXueli1: "", //用户新增的学历
      studentActive: 0, //判断是否学生如果有学生就激活
      xueLiActive: '1', //学历标签选择状态
      xueLiActive1: '1', //学历标签选择状态
      searchlist:[]

    };
  },
  async created() {
    
  },
  methods: {
    delExtraSetting(){
      this.$confirm("删除后无法恢复，请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res =  await network.delExtraSetting({data:{
          competitionId: this.id
        }})
        if(res=='error') return;
        this.$message.success('删除成功')
        this.isEntryFormDone = false;
      })
    },
    async specialShow(){
      if(this.disabled) return
      await this.getBaseInfo();
      this.getCompetitionSetApi();
      this.special = true;
    },
    setRang(obj){
      this.$set(this.ruleFormCom,'competitionRange', obj.competitionRange)
      this.$set(this.ruleFormCom,'competitionLevel', obj.competitionLevel)
    },
    setLoginNotice(val){
      this.ruleFormCom.agreementInfo = val
    },
    async getBaseInfo() {
      let res = await network.getCompetitionDetail({ id: this.id });
      if (res == "error") return;
      if(res.searchLabel){
         res.searchLabel.forEach(item => {
        item.checked = 0
        this.searchlist.push(item)
      })
      }
      // this.searchlist = res.searchLabel
      this.baseInfo = res;
      localStorage.setItem("baseInfo", JSON.stringify(res));
    },
    //竞赛设置  个人
    /**
     * 获取竞赛设置信息
     */
    async getCompetitionSetApi() {
      const obj = {
        competitionId: this.id
      };

      const data = this.baseInfo;
      if (data.competitionYear) {
        this.ruleFormCom.competitionYear = data.competitionYear.toString();
      }
      // console.log(data);
      this.ruleFormCom.applyType = data.applyType 
      
      this.ruleFormCom.teamMaxMember = data.teamMaxMember;
      this.ruleFormCom.teamMinMember = data.teamMinMember;
      this.ruleFormCom.teamMaxCoach = data.teamMaxCoach;
      this.ruleFormCom.teamMaxCompanyTeacher = data.teamMaxCompanyTeacher || 0;
      this.ruleFormCom.coachMaxTeam = data.coachMaxTeam || 1;
      this.ruleFormCom.searchLabel = data.searchLabel || [];
      
      this.ruleFormCom.competitionRange = data.competitionRange && data.competitionRange || "";
      this.ruleFormCom.competitionRound = data.competitionRound && data.competitionRound || "";
      this.ruleFormCom.competitionLevel = data.competitionLevel && data.competitionLevel || "";
      // console.log(data.searchLabel);
      if (data.applyGroup) {
        this.ruleFormCom.applyGroup = data.applyGroup;
      }
      if (data.tags && data.tags.tags) {
        const tags = data.tags.tags.filter(tag => tag.tagtype === "标签");
        this.ruleFormCom.tags = tags.map(tag => {
          return { tagName: tag.tagname, checked: true };
        });
      }

      // 报名表
      this.ruleFormCom.signType = Boolean(data.isApplyFile);
      this.ruleFormCom.materialName = data.materialName || '补交材料';
      this.ruleFormCom.docSetting = data.extraSetting.docSetting
        ? data.extraSetting.docSetting
        : {};
      this.isEntryFormDone = data.extraSetting.docSetting
        ? data.extraSetting.docSetting.isDone
        : false;
      // 学历
      if (
        data.competitionDegrees &&
        data.competitionDegrees.competition_degrees
      ) {
        const degree = data.competitionDegrees.competition_degrees;
        this.ruleFormCom.competition_degrees = degree.map(d => {
          return { tagName: d.degree, checked: true };
        });
      }

      // 团队名称设置
      this.ruleFormCom.autoTeam = data.autoTeam==1 ? data.autoTeam : 0;

      this.ruleFormCom.agreement = data.agreement==1 ? data.agreement : 0;
      this.ruleFormCom.agreementInfo = data.agreementInfo

      this.ruleFormCom.autoPass = data.autoPass==1 ? data.autoPass:0;
      
      if (data.tags && data.tags.tags) {
        const tags = data.tags.tags.filter(tag => tag.tagtype === "作品分类");
        this.ruleFormCom.zpworks = tags.map(tag => {
          return { tagName: tag.tagname, checked: true };
        });
      }
      if (data.extraSetting.issueSchool) {
        var arr = data.extraSetting.issueSchool;
        for (let i = 0; i < arr.length; i++) {
          this.ruleFormCom.issueSchool[i].schoolType =
            arr[i].schoolType == i + 1;
          this.ruleFormCom.issueSchool[
            i
          ].educationList = data.extraSetting.issueSchool[i].educationList.map(
            item => {
              return item.toString();
            }
          );
        }
      }
      this.ruleFormCom.schoolNum = data.schoolNum;

      this.obj = data;
      this.judgeStudent();
      
      // 设置重复报名
      if(data && data.teamNum>1){
        this.$set(this.ruleFormCom, 'signUpAgain', 1)
        this.$set(this.ruleFormCom, 'signUpAgainNum', data.teamNum)
      }else{
        this.$set(this.ruleFormCom, 'signUpAgain', 0)
      }
    },
    applyTypeChange(e){
      if(e==1){
        this.ruleFormCom.teamMinMember = 1
        this.ruleFormCom.teamMaxMember = 1
      }
    },
    /**
     * @Description: 选中的标签
     */
    pitchTags(index) {
      this.ruleFormCom.labelActive = index;
      this.ruleFormCom.tagPitch = this.ruleFormCom.tags[index];
    },
    pitchTags1(index) {
      this.ruleFormCom.labelActive1 = index;
      this.ruleFormCom.tagPitch1 = this.ruleFormCom.searchLabel[index];
    },
    //标签切换
    closeTag(index) {
      this.ruleFormCom.tags.splice(index, 1);
    },
    //标签切换
    closeTag1(index) {
      this.ruleFormCom.searchLabel.splice(index, 1);
    },
    /**
     * 用户自己填写的内容新增
     */
    addTag() {
      if (!this.addTageName) {
        return this.$message.warning("请输入新增标签内容！");
      }
      this.ruleFormCom.tags.push({
        tagName: this.addTageName,
        checked: 0
      });
      this.pitchTags(this.ruleFormCom.tags.length-1)
      this.addTageName = "";
    },
      addTag1() {
      if (!this.addTageName1) {
        return this.$message.warning("请输入新增标签内容！");
      }
      this.ruleFormCom.searchLabel.push({
        tagName: this.addTageName1,
        checked: 0
      });
      this.pitchTags1(this.ruleFormCom.searchLabel.length-1)
      this.addTageName1 = "";
    },
    /**
     * @Description: 判断用户是否选择中
     */
    IdentifyStudent(index) {
      //this.xueLiActive = index;
      this.ruleFormCom.competition_degrees[index].checked = this.ruleFormCom.competition_degrees[index].checked ? 0 : 1;
    },
    // 标签
    IdentifyStudent1(index) {
      //this.xueLiActive1 = index;
      this.ruleFormCom.searchLabel[index].checked = this.ruleFormCom.searchLabel[index].checked ? 0 : 1;
    },
    //删除学历
    closeDegrees(index) {
      this.ruleFormCom.competition_degrees.splice(index, 1);
      this.xueLiActive = 0;
    },
    // 删除标签
     closeDegrees1(index) {
      this.ruleFormCom.searchLabel.splice(index, 1);
      this.xueLiActive1 = 0;
    },
    /**
     * 用户新增的学历
     */
    addXueli() {
      if (!this.addTageXueli) {
        this.$message({
          message: "请输入新增标签内容！",
          type: "warning"
        });
        return;
      }
      this.ruleFormCom.competition_degrees.push({
        tagName: this.addTageXueli,
        checked: 0
      });
      this.addTageXueli = "";
    },
     addXueli1() {
      if (!this.addTageXueli1) {
        this.$message({
          message: "请输入新增标签内容！",
          type: "warning"
        });
        return;
      }
      this.ruleFormCom.searchLabel.push({
        labelName: this.addTageXueli1,
        checked: 0
      });
      this.addTageXueli1 = "";
    },
    //竞赛设置提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         
          this.saveCompetitionSetApi();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //保存竞赛设置
    async saveCompetitionSetApi() {
      // 团队标签设置数组
       let arr = []
       let delarr = []
       let idarr = []
       let hasarr = []
       this.searchlist.forEach(item => {
          idarr.push(item.id)
       })
          this.ruleFormCom.searchLabel.forEach(item => {
            if(item.id){
              hasarr.push(item.id)
            }else{
              arr.push(item.labelName)
            }
          })
          delarr = idarr.filter(item=>!hasarr.includes(item))
          this.ruleFormCom.searchLabel = arr
          this.ruleFormCom.delSearchLabel = delarr
      // 参赛人数数值
      if(this.ruleFormCom.teamMaxMember < this.ruleFormCom.teamMinMember){
        return this.$message.error('团队参赛者人数下限不能超出上限')
      }

      //时间格式化
      var year = new Date(this.ruleFormCom.competitionYear).getFullYear();
      //拼接标签
      var biaoqian = [];
      biaoqian.push(this.ruleFormCom.tags, this.ruleFormCom.zpworks);

      //拼接竞赛类型
      if(this.ruleFormCom.applyType!=1 && this.ruleFormCom.applyType!=2) {
        return this.$message.error("请选择竞赛类型");
      }

      var schoolList = [];
      for (let i = 0; i < this.ruleFormCom.issueSchool.length; i++) {
        let item = this.ruleFormCom.issueSchool[i];
        schoolList.push({
          schoolType: item.schoolType ? i + 1 : "",
          educationList: item.educationList
        });
      }
      
      const obj = {
        id: this.id,
        delSearchLabel:this.ruleFormCom.delSearchLabel,
        saveSearchLabel:this.ruleFormCom.searchLabel,
        applyType: this.ruleFormCom.applyType,
        teamMinMember: this.ruleFormCom.teamMinMember,
        teamMaxMember: this.ruleFormCom.teamMaxMember,
        teamMaxCoach: this.ruleFormCom.teamMaxCoach,
        teamMaxCompanyTeacher: this.ruleFormCom.teamMaxCompanyTeacher || 0,
        coachMaxTeam: this.ruleFormCom.coachMaxTeam || 1,
        competitionYear: year,
        competitionRange: this.ruleFormCom.competitionRange,
        competitionLevel: this.ruleFormCom.competitionLevel,
        applyGroup: this.ruleFormCom.applyGroup,
        tags: { tags: [] },
        schoolAuthen: this.ruleFormCom.signType,
        materialName: this.ruleFormCom.materialName,
        docSetting: this.ruleFormCom.docSetting,
        // maxMember: this.ruleFormCom.schoolNum,
        // authenDoc: this.ruleFormCom.authenDoc,
        autoTeam: this.ruleFormCom.autoTeam,
        autoPass: this.ruleFormCom.autoPass,
        agreement: this.ruleFormCom.agreement,
        agreementInfo: this.ruleFormCom.agreementInfo,
        issueSchool: schoolList,
        competitionDegrees: {
          competition_degrees: []
        },
        isApplyFile: this.ruleFormCom.signType ? 1 : 0,
        schoolNum: this.ruleFormCom.schoolNum,
        competitionRound: this.ruleFormCom.competitionRound
      };

      // 拼接重复报名
      if(this.ruleFormCom.signUpAgain){
        if(parseInt(this.ruleFormCom.signUpAgainNum)>1){
          obj.teamNum = parseInt(this.ruleFormCom.signUpAgainNum)
        }else{
          return this.$message.warning('重复次数必须大于1')
        }
      }else{
        obj.teamNum = 1
      }
      
      for (let i = 0; i < this.ruleFormCom.competition_degrees.length; i++) {
        let item = this.ruleFormCom.competition_degrees[i];
        obj.competitionDegrees.competition_degrees.push({
          degree: item.tagName,
          selected: 1
        });
      }
      //for(let i = 0; i < biaoqian.length;i++){
      //    obj.tags.tags.push({
      //        tagname: biaoqian[i][0]? biaoqian[i][0].tagName : '',
      //        tagtype: 1
      //    });
      //}
      for (let i = 0; i < this.ruleFormCom.tags.length; i++) {
        const tag = this.ruleFormCom.tags[i];
        obj.tags.tags.push({
          tagname: tag.tagName,
          tagtype: "标签"
        });
      }
      for (let i = 0; i < this.ruleFormCom.zpworks.length; i++) {
        const tag = this.ruleFormCom.zpworks[i];
        obj.tags.tags.push({
          tagname: tag.tagName,
          tagtype: "作品分类"
        });
      }
      const res = await network.saveCompetitionSetApi({ data: obj });
      this.special = false;
      if (res == "error") return this.$message.error(res.message);
      this.getBaseInfo();
      this.$message.success("保存成功");
      this.close && this.close();
    },
    handleChange(value) {},
    /**
     * @Description: 面对学生多选，判断是否选择面对学生
     */
    judgeStudent() {
      this.studentActive = this.ruleFormCom.applyGroup.indexOf(1) == -1 ? 0 : 1;
    },
    /**
     * @Description: 方法改变
     */
    signTypeData() {
      this.ruleFormCom.applyFileUrl = [];
    },
    saveEntryForm(isDone) {
      this.dialogEntryFormVisible = false;
      if (isDone) {
        this.isEntryFormDone = true;
      }
    },
    changeSignUp(){
      this.$set(this.ruleFormCom, 'signUpAgain', 1)
    }
  },
};
</script>

<style lang="less" scoped>
//竞赛设置
.demo-ruleForm {
  margin-top: -25px;
  /deep/ input[type="number"]{
    padding-right: 3px;
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
/deep/.el-upload-dragger {
  padding-top: 35px;
}
.group_btn {
  border-top: 1px solid #dedede;
  text-align: right;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-bottom: -1.8rem;
}
.setting_model {
  cursor: pointer;
  margin: 0 auto;
  overflow: auto;
  text-align: left;
  padding: 0px 100px;
  box-sizing: border-box;
  overflow: hidden;
  h1.title {
    font-size: 14px;
    color: #4a4a4a;
    margin-top: 20px;
    letter-spacing: 1px;
    span {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0.86px;
    }
  }
  .delname {
    cursor: pointer;
    float: right;
    margin-right: -30px;
    margin-top: -50px;
    i:hover {
      color: #d0021b;
    }
  }
  .type_select {
    .type_list {
      margin-top: 10px;
      display: flex;
      li {
        font-size: 14px;
        color: #1d86ff;
        margin-right: 10px;
        padding: 6px 10px;
        box-sizing: border-box;
        border: 1px solid #1d86ff;
        border-radius: 98px;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
        background: #1d86ff;
      }
    }
    .group_num_show{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .group_num {
      display: inline-block;
      vertical-align: middle;
      /deep/ .el-input-number {
        margin-top: 10px;
      }
    }
  }
  .radio_select {
    margin-top: 20px;
    font-size: 14px;
    color: #4a4a4a;
    .schoolNum {
      width: 126px !important;
    }
    .competition_group {
      display: inline-block;
      vertical-align: middle;
    }
    .personage {
      vertical-align: top;
    }
    .uploadP {
      display: inline-block;
      vertical-align: middle;
      .delete-btn {
        cursor: pointer;
        float: right;
      }
      /deep/ .el-upload-dragger {
        padding-top: 30px;
      }
      .el-upload__text {
        padding-top: 30px;
      }
      .el-upload__tip {
        padding-top: 10px;
      }
      .biaoming {
        border: 1px solid #1d86ff;
        border-radius: 5px;
        padding: 5px 20px 5px 20px;
        margin-top: -5px;
        float: left;
        color: #1d86ff;
        span {
          font-size: 14px;
          letter-spacing: 0;
        }
      }
      .cert {
        color: #ffffff;
        background-color: #1d86ff;
      }
      .yishengcheng {
        float: left;
        margin-left: 10px;
        i {
          color: #52c41a;
        }
        span {
          font-size: 16px;
          color: #787d81;
          letter-spacing: 0;
        }
      }
    }
    .el-danxiao {
      display: inline-block;
      vertical-align: middle;
      width: 150px;
      text-align: left;
    }
  }
  .year_select,
  .radio_select {
    /deep/ .el-form-item {
      margin-top: 10px;
    }
    .tag_type {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-top: 10px;
      margin-right: 10px;
      font-size: 14px;
      color: #1d86ff;
      padding: 6px 10px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      i {
        margin-left: 10px;
      }
    }
    .add_tag {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      font-size: 0;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      margin-top: 10px;
      input {
        width: 115px;
        height: 31px;
        padding: 6px 10px;
        box-sizing: border-box;
        outline: none;
        border: 0;
        border-radius: 98px;
        background-color: transparent;
      }
      i {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        position: absolute;
        top: -1px;
        right: -2px;
        color: #ffffff;
        background-color: #1d86ff;
      }
    }
    .active {
      color: #ffffff;
      background: #1d86ff;
    }
    .title {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
  }
  .round_select .title {
    margin-bottom: 10px;
  }
}
/deep/ .ql-editor{
  min-height: 50px;
}

.specialset{
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
</style>