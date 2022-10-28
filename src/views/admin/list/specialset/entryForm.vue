<template>
    <div id="authentication">
        <div class="authentication">
            <!-- <p>学校申报编辑表</p> -->
            <div class="content">
                <el-form label-width="100px" class="demo-ruleForm" style="margin-left:70px;margin-bottom:50px;">
                    <el-form-item label="标题">
                        <el-input placeholder="请输入标题" v-model="title" style="width:430px;"></el-input>
                    </el-form-item>
                </el-form>
                <div class="wrapper">
                    <!--表格-->
                    <table class="table">
                        <tr>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.worksName">参赛作品名称</el-checkbox>
                            </td>
                            <td colspan="10"></td>
                        </tr>
                        <tr>
                            <td colspan="2" width="20%">
                                <el-checkbox v-model="columnNames.school">所在学校</el-checkbox>
                            </td>
                            <td colspan="4"></td>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.zip">邮政编码</el-checkbox>
                            </td>
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.contact">联系人</el-checkbox>
                            </td>
                            <td colspan="2"></td>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.address">通讯地址</el-checkbox>
                            </td>
                            <td colspan="6"></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.mobile">电话</el-checkbox>
                            </td>
                            <td colspan="2"></td>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.phone">手机</el-checkbox>
                            </td>
                            <td colspan="2"></td>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.email">Email</el-checkbox>
                            </td>
                            <td width="20%" colspan="2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-checkbox v-model="columnNames.team" checked>团队名称</el-checkbox>
                            </td>
                            <td colspan="10" class="addCtm">
                                <i class="iconfont" @click.stop="addCtm">&#xe61c;</i>
                            </td>
                        </tr>
                        <tr class="delCtm" v-for="(item, index) in ctmList" :key="'custom_'+index">
                            <td colspan="2" class="custom">
                                <el-checkbox v-model="item.checkboxValue"></el-checkbox>
                                <input placeholder="自定义内容" v-model="item.name">
                            </td>
                            <td colspan="10" class="delCtm">
                                <i class="iconfont" @click.stop="delCtm(index)">&#xe61e;</i>
                            </td>
                        </tr>
                        </table>
                        <table class="table">
                        <tr>
                            <td colspan="1" :rowspan="memberList.length+1" style="text-align:center;">
                                参<br>
                                赛<br>
                                者
                            </td>
                            <td colspan="1"><el-input v-model="memberColumns[0]" size="mini" placeholder="学生姓名" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[1]" size="mini" placeholder="性别" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[2]" size="mini" placeholder="学校" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[3]" size="mini" placeholder="院系" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[4]" size="mini" placeholder="专业" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[5]" size="mini" placeholder="手机" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[6]" size="mini" placeholder="学号" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[7]" size="mini" placeholder="年级" /></td>
                            <td colspan="1"><el-input v-model="memberColumns[8]" size="mini" placeholder="学历" /></td>
                        </tr>
                        <tr v-for="(item, index) in memberList" :key="'memberList_' + index">
                            <!--<td colspan="1" style="text-align:center;">{{index + 1}}</td>-->
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                        </tr>
                        <tr>
                            <td colspan="1" :rowspan="teacherList.length+1" style="text-align:center;">
                                <el-checkbox true-label="指导老师" class="teacher" v-model="columnNames.teacher" checked></el-checkbox><br>
                                指<br>
                                导<br>
                                老<br>
                                师
                            </td>
                            <!--<td colspan="1"></td>-->
                            <td colspan="1"><el-input v-model="teacherColumns[0]" size="mini" placeholder="教师姓名" /></td>
                            <td colspan="1"><el-input v-model="teacherColumns[1]" size="mini" placeholder="性别" /></td>
                            <td colspan="1"><el-input v-model="teacherColumns[2]" size="mini" placeholder="学校/企业" /></td>
                            <td colspan="1"><el-input v-model="teacherColumns[3]" size="mini" placeholder="院系/部门" /></td>
                            <td colspan="1"><el-input v-model="teacherColumns[4]" size="mini" placeholder="专业" /></td>
                            <td colspan="1"><el-input v-model="teacherColumns[5]" size="mini" placeholder="手机" /></td>
                            <td colspan="3"><el-input v-model="teacherColumns[6]" size="mini" placeholder="E-mail" /></td>
                        </tr>
                        <tr v-for="(item, index) in teacherList" :key="'teacherList_' + index">
                            <!--<td colspan="1" style="text-align:center;">{{index + 1}}</td>-->
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="3"></td>
                        </tr>
                    </table>

                    <!--表单-->
                    <!--作品内容简介-->
                    <div class="workContent">
                        <el-checkbox true-label="作品内容简介" v-model="columnNames.opusSynopsis">作品内容简介</el-checkbox>
                        限制字数
                        <el-input style="width:60px;" v-model="worksMaxNum"></el-input>
                        字
                    </div>
                    <div class="workContentBg"></div>

                    <!--自定义内容-->
                    <div class="customContent">
                        <p><i class="iconfont" @click="addCont">&#xe61c;</i></p>
                        <div class="customContentList" v-for="(item, index) in customColumnsList" :key="'customColumns_' + index">
                            <div class="contentCase">
                                <el-checkbox v-model="item.checkboxValue"></el-checkbox>
                                <el-input placeholder="自定义内容" v-model="item.name"></el-input>
                            </div>
                            <textarea v-model="item.note"></textarea>
                            <p><i class="iconfont" @click="delCont(index)">&#xe61e;</i></p>
                        </div>
                    </div>

                    <!--法律声明-->
                    <div class="customContentList">
                        <el-checkbox true-label="法律声明" v-model="columnNames.legalNotice">法律声明</el-checkbox>
                        <textarea v-model="legalNoticeTxt"></textarea>
                    </div>

                    <!--学校意见-->
                    <div class="customContentList">
                        <el-checkbox true-label="学校意见" v-model="columnNames.schoolOpinion" checked>学校意见</el-checkbox>
                        <div class="schoolOpinion">
                            <p>负责人（签名或盖章）（公章）</p>
                            <p>
                                <span>年</span>
                                <span>月</span>
                                <span>日</span>
                            </p>
                        </div>
                    </div>

                    <!--填写说明-->
                    <div class="customContentList">
                        <el-checkbox true-label="填写说明" v-model="columnNames.explain">填写说明：</el-checkbox>
                        <textarea v-model="explainTxt"></textarea>
                    </div>

                    <!--备注-->
                    <div class="customContentList">
                        <el-checkbox true-label="备注" v-model="columnNames.remark">备注：</el-checkbox>
                        <textarea v-model="remarkTxt"></textarea>
                    </div>
                </div>
                <!--按钮-->
                <div class="btn">
                    <el-button @click="publish(false)">保 存</el-button>
                    <el-button @click="review(true)">预 览</el-button>
                    <el-button @click="publish(true)">生 成</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import network from '@@/api/jxapi'
export default {
  data(){
      return {
          customColumnLists:[],
          ctmList: [
              {
                  name: '',
                  note: '',
                  isLarge: false,
                  checkboxValue: false,
              },
          ], //表格自定义列表 isLarge 默认false，生成认证表用
          customColumnsList: [], // 表单自定义内容 isLarge 默认true，生成认证表用
          memberList: [], //参赛者列表
          teacherList: [], //指导老师列表
          legalPlaceholder: "本人代表作品所有参赛者和指导老师承诺：已知晓并自愿接受评审规则和评审办法；本参赛作品知识产权关系明晰，无抄袭他人创意、作品和专利技术。 \n参赛队全体师生（签名）：", // 法律声明
          explainPlaceholder: "学校推荐意见一览的负责人应为学校教务部或院系主管教学的负责人。若作品无指导教师，指导教师栏可以空缺不填。", // 填写说明
          remarkPlaceholder: "参赛者和指导教师的手机号将自动注册，可通过手机号登录本平台。", // 备注
          title: '', // 标题
          columnNames: {
              worksName: false, // 参赛作品名称
              school: false, // 所在学校
              zip: false, // 邮政编码
              contact: false, // 联系人
              address: false, // 通讯地址
              phone: false, // 手机
              mobile: false, // 电话
              email: false, // 邮箱
              team: false, // 团队名称
              teacher: false, //指导老师
              legalNotice: false, // 法律声明checked
              schoolOpinion: false, // 学校意见
              explain: false, // 填写说明checked
              remark: false, // 备注checked
              opusSynopsis: false // 作品内容
          }, // 基本信息
          remarkTxt: '参赛者和指导教师的手机号将自动注册，可通过手机号登录本平台。', // 备注文本域
          legalNoticeTxt: '本人代表作品所有参赛者和指导老师承诺：已知晓并自愿接受评审规则和评审办法；本参赛作品知识产权关系明晰，无抄袭他人创意、作品和专利技术。 \n参赛队全体师生（签名）：', // 法律声明文本域
          explainTxt: '学校推荐意见一览的负责人应为学校教务部或院系主管教学的负责人。若作品无指导教师，指导教师栏可以空缺不填。', // 填写说明本域
          memberColumns: ['姓名', '性别', '学校', '院系', '专业','手机', '学号','年级', '学历',],
          teacherColumns: ['姓名', '性别', '学校/企业', '院系/部门', '专业', '手机','E-mail'],
          worksMaxNum: 400, // 限制字数input
      }
  },
  props: {
    data:{
      type: Object,
      default: {}
    },
    baseInfo: Object,
    id: [String, Number]
  },
  created(){
      this.numStudentPeople(this.memberList, 3); // 参数者人数
      this.numTeacherPeople(this.teacherList, 3); // 指导老师人数
      this.initData();
      let docSetting = this.baseInfo.extraSetting.docSetting
      this.customColumnLists = docSetting && docSetting.customColumns || []
      this.title = docSetting && docSetting.title || ''
      this.memberColumns = docSetting&&docSetting.memberColumns||this.memberColumns
      this.teacherColumns=docSetting&&docSetting.teacherColumns || this.teacherColumns
      
      if(this.customColumnLists.length>0){
          for(let i = 0; i < this.customColumnLists.length;i++){
            if(this.customColumnLists[i].name==="作品内容简介"){
                this.columnNames.opusSynopsis = "作品内容简介";
            }else if(this.customColumnLists[i].name==="备注"){
                if(this.customColumnLists[i].isLarge){
                        this.remarkTxt=this.customColumnLists[i].note
                        this.columnNames.remark="备注";
                }else{
                    return
                }
                
            }else if(this.customColumnLists[i].name==="法律声明"){
                if(this.customColumnLists[i].isLarge){
                        this.legalNoticeTxt=this.customColumnLists[i].note
                        this.columnNames.legalNotice="法律声明";
                }else{
                    return
                }
                
            }else if(this.customColumnLists[i].name==="填写说明"){
                if(this.customColumnLists[i].isLarge){
                        this.explainTxt=this.customColumnLists[i].note
                this.columnNames.explain="填写说明";
                }else{
                    return
                }
                
            }else if(this.customColumnLists[i].name==="学校意见"){
                if(this.customColumnLists[i].isLarge){
                        this.columnNames.schoolOpinion="学校意见";
                }else{
                    return
                }
                
                
            }
        }

      }else{
           this.title = ''
      }
      // 获取的数据进行处理，2是表单数据，1是表格数据，统一加上checkboxValue:true
      let arr1 =[],arr2=[]
      this.customColumnLists.map(item=>{
          if(item.type==2){
              arr1.push({
                  ...item,
                  checkboxValue:true
              })
          }else if(item.type==1){
              arr2.push({
                  ...item,
                  checkboxValue:true
              })
          }
      })
      this.customColumnsList = arr1
      this.ctmList = arr2
      
  },
  methods: {
      initData(){
           this.data.worksMaxNum = this.data.worksMaxNum || 400;
           
           if(!this.data.columnNames ||this.data.columnNames.length === 0) {
               for(let i in this.columnNames){
                   //this.columnNames[i] = true;
               }
           } else {
               for(let i in this.columnNames){
                   this.columnNames[i] = this.data.columnNames.includes(i) ? true : false;
               }
           }
      },
      /**
       * 页面初始化 生成相对应参数者人数
       * @param obj 对象, num 人数
       **/
      numStudentPeople(obj, num){
          for(let i=0;i<num;i++){
              obj.push({
                  name: "", 
                  sex: "",
                  phone: "",
                  degreeOrSpeciality: "",
                  technical: "",
                  signature: "",
              });
          }
      },
      /**
       * 页面初始化 生成相对应指导老师人数
       * @param obj 对象, num 人数
       **/
      numTeacherPeople(obj,num){
          for(let i=0;i<num;i++){
              obj.push({
                  name: "", 
                  sex: "",
                  phone: "",
                  degreeOrSpeciality: "",
                  technical: "",
                  signature: "",
              });
          }
      },
      /**
       * 添加表格自定义列表
       **/
      addCtm(){
          this.ctmList.push({
              name: '',
              note:'',
              isLarge: false,
              checkboxValue: false
          });
      },
      /**
       * 删除表格自定义列表
       * @param idx 下标
       **/
      delCtm(idx){
          this.ctmList.splice(idx,1);
      },

      /**
       * 添加表单自定义列表
       **/
      addCont(){
          this.customColumnsList.push({
              name: '',
              note: '',
              isLarge: true,
              checkboxValue: false
          });
      },
      /**
       * 删除表单自定义列表
       * @param idx 下标
       **/
      delCont(idx){
          this.customColumnsList.splice(idx,1);
      },
      async review() {
        await this.produceTable(false);
        let res = await network.reviewApi({
            data:{
                competitionId: this.id
            },
            config: { 
                responseType: 'arraybuffer'
            }
        })
      },
      publish(isDone){
          if (isDone) {
            this.$confirm('生成后将不可修改，确定要生成吗？', '温 馨 提 示', {
            confirmButtonText: '生成',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.produceTable(isDone);
            }).catch(() => {
            })
          } else {
            this.produceTable(isDone);
          }
      },
    /**
     * 发送请求
     * @param produceInfo 要发送的参数
     **/
    async produceTable(isDone){
      let columnNames = []
      let customColumns = []
      let tableArr = ['legalNotice','schoolOpinion','explain','remark','opusSynopsis']

       // 固定的名字
      for(let i in this.columnNames){
        if(!tableArr.includes(i)){
          if(this.columnNames[i]){
            columnNames.push(i)
          }
        }
      }

       // 文本域

        // 作品内容 opusSynopsis
        if(this.columnNames.opusSynopsis){
            customColumns.push({
                name: this.columnNames.opusSynopsis,
                note: '',
                isLarge: true
            })
        }

        // 表单自定义 位置在这儿
        this.customColumnsList.forEach(obj => {
            if(obj.checkboxValue){
            customColumns.push({
                name: obj.name,
                note: obj.note,
                type: 2,
                isLarge: obj.isLarge
            })
            }
        })
        
        // 法律声明 legalNotice
        if(this.columnNames.legalNotice){
           customColumns.push({
               name: this.columnNames.legalNotice,
               note: this.legalNoticeTxt,
               isLarge: true
           })
        }
        // 学校意见 schoolOpinion
        if(this.columnNames.schoolOpinion){
           customColumns.push({
               name: this.columnNames.schoolOpinion,
               note: '',
               isLarge: true
           })
        }

        // 填写说明 explain
        if(this.columnNames.explain){
           customColumns.push({
               name: this.columnNames.explain,
               note: this.explainTxt,
               isLarge: true
           })
        }
        // 备注 remark
        if(this.columnNames.remark){
           customColumns.push({
               name: this.columnNames.remark,
               note: this.remarkTxt,
               isLarge: true
           })
        }


      // 表格自定义
      this.ctmList.forEach(obj => {
        if(obj.checkboxValue){
          customColumns.push({
            name: obj.name,
            note: obj.note,
            type: 1, 
            isLarge: obj.isLarge
          })
        }
      })


      const params = {
        competitionId: parseInt(this.id),
        title: this.title,
        worksMaxNum: this.columnNames.opusSynopsis ? parseInt(this.worksMaxNum) : '',
        isDone,
        columnNames,
        customColumns,
        memberColumns: this.memberColumns,
        teacherColumns: this.teacherColumns
      };

      let res = await network.docCompetitionSettingDone({data:params});
      if(res=='error') return;
      this.$emit('saveSuccess', isDone)
    },
  }
}
</script>
<style lang="less">
.authentication{
    width: 1040px;
    margin: auto;
    text-align: start;
    color: #4A4A4A;
    >p{
        margin-top: 20px;
        margin-bottom: 14px;
        font-size: 14px;    
    }
    .content{
        width: 100%;
        background: #fff;
        padding: 50px 196px 40px 142px;
        box-sizing: border-box;
        .wrapper{
            width: 100%;
            .table{
                width: 100%;
                font-size:14px;
                color:#333333;
                border-width: 1px;
                border-color: #DEDEDE;
                border-collapse: collapse;
                background: #F9F9F9;
                td{
                    width: 58px;
                    height: 20px;
                    border-width: 1px;
                    padding: 8px;
                    border-style: solid;
                    border-color: #DEDEDE;
                    font-size: 14px;
                    .teacher{
                        margin-bottom: 8px;
                    }
                    .el-checkbox{
                        margin-right:0;
                    }
                }
                .el-input__inner {
                    padding: 0;
                }
                .custom{
                    background-color: #fff;
                    padding: 0 8px;
                    input{
                        border: none;
                        width: 80px;  
                        font-size: 14px;
                        height: 30px; 
                        padding-left: 5px; 
                        color: #4A4A4A;
                    }
                    input:focus{
                        outline: none;
                    }
                }
                .addCtm,.delCtm{
                    position: relative;
                    i{
                        position: absolute;
                        right:-20px;
                        top:10px;
                        font-size: 14px;
                        color:#9B9B9B;
                        cursor: pointer;
                    }
                    i:hover{
                        color: #4199FF;
                    }
                    .el-checkbox{
                        margin-right:0;
                    }
                }
            }
            // 作品内容简介
            .workContent{
                font-size: 14px;
                margin: 15px 0;
                padding-left: 11px;
                /deep/ .el-input__inner{
                    height: 32px;
                    line-height: 32px;
                    padding:0 8px;
                }
            }
            .workContentBg{
                width: 100%;
                height: 347px;
                border: 1px solid #DEDEDE;
                background: #F9F9F9;
                box-sizing: border-box;
            }
            // 自定义内容
            .customContent{
                >p{
                    margin: 10px 0;
                }
                i{
                    color:#9B9B9B;
                    cursor:pointer;
                    margin-left: 11px;
                }
                i:hover{
                    color: #4199FF;
                }
            }
            .addCustom{
                margin: 10px 0;
            }
            .customContentList{
                margin-bottom: 20px;
                .el-checkbox{
                    margin-left: 11px;
                    margin-right: 15px;
                }
                textarea{
                    border: none;
                    width: 100%;
                    min-height: 120px;
                    padding: 10px;
                    border: 1px solid #DEDEDE;
                    margin-top: 15px;
                    box-sizing: border-box;
                    font-size: 14px;
                }
                .contentCase{
                    display: flex;
                    align-items: center;
                }
            }
            .addCustom{
                width: 14px;
                height: 14px;
                border-radius: 100%;
                border: 1px solid #9B9B9B;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                img{
                    width: 12px;
                    height: 12px;
                    border-radius: 100%;
                }
            }
            // 学校意见
            .schoolOpinion{
                width: 100%;
                height: 140px;
                border: 1px solid #DEDEDE;
                background: #F9F9F9;
                box-sizing: border-box;
                font-size: 14px;
                margin-top: 15px;
                p:nth-child(1){
                    margin-top: 80px;
                    margin-left: 300px;
                }
                p:nth-child(2){
                    margin-top: 5px;
                    margin-left: 470px;
                    span{
                        margin-right: 50px;
                    }
                }
            }
        }
        // 按钮
        .btn{
            text-align: center;
            margin-top: 40px;
            button{
                width: 100px;
                font-size: 14px;
            }
            button:nth-child(1), button:nth-child(2) {
                color:#1D86FF;
                border: 1px solid #1D86FF;
                height: 40px;
            }
            button:nth-child(3) {
                height: 40px;
                border: none;
                color:#fff;
                background-image: linear-gradient(to right, #3EBBFF 0%, #1D86FF 100%);
            }
        }
    }
    /deep/ .el-checkbox__label{
        color: #4A4A4A;
    }
    /deep/ .el-checkbox__inner{
        width: 18px;
        height: 18px;
    }
    /deep/ .el-checkbox__inner::after{
        height: 10px;
        width: 5px;
        left: 5px;
    }
}
.full{
    text-align: center;
    h4{
        font-size: 16px;
    }
    p{
        margin-top: 20px;
        margin-bottom: 50px;
    }
}
/deep/ .upper{
    .el-dialog__header{
        display: none;
    }
}
</style>
