<template>
  <div class="msg_edit">
    <div class="head">
      <el-upload
        :show-file-list="false"
        :before-upload='beforeUpload'
        accept='.jpg, .png, .jpeg'
        :http-request='OssUpload'
        action='/'>
        <div style="width:110px;height:110px;margin:0 auto;" @click="toggleShow">
          <img v-if="userMessage.icon" :src="userMessage.icon" class="head_img"/>
          <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" class="head_img"/>
        </div>
      </el-upload>
    </div>
    <p class="head_px">{{$t('profile.iconSize')}}</p>
    <el-form :model="userMessage" ref="userMessage">
      <el-form-item
        prop="idcardName"
        :label="$t('profile.idcardName')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.idcardNameMess'), trigger: 'blur' },
          { min: 1, max: 20, message: $t('profile.idcardNameMess1'), trigger: 'blur' }
        ]"
      >
        <el-input :placeholder="$t('profile.idcardNameMess')" v-model="userMessage.idcardName" @input="toTrim()"></el-input>
      </el-form-item>

      <el-form-item
        prop="gender"
        :label="$t('profile.gender')"
        label-width="120px"
        :rules="[{ required: true, message: $t('profile.genderMess'), trigger: 'blur' },]"
      >
        <el-radio-group v-model="userMessage.gender">
          <el-radio label="1">{{$t('profile.man')}}</el-radio>
          <el-radio label="2">{{$t('profile.woman')}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="birthDay" :label="$t('profile.birthDay')" label-width="120px"
        :rules="[ { required: true, message: $t('profile.birthDayMess'), trigger: 'blur' }, ]"
      >
        <el-date-picker 
          v-model="userMessage.birthDay" 
          type="date" 
          @change="getAge" 
          :picker-options="pickerOptions"
          format='yyyy-MM-dd' 
          value-format='yyyy-MM-dd' 
          :placeholder="$t('profile.birthDayMess')"></el-date-picker>
      </el-form-item>

      <el-form-item prop="age" :label="$t('profile.age')" label-width="120px"
        :rules="[ { required: true, message: $t('profile.ageMess'), trigger: 'blur' }, ]"
      >
        <el-input :placeholder="$t('profile.ageMess')" type="number" disabled v-model="userMessage.age"></el-input>
      </el-form-item>

      <el-form-item
        prop="nationality"
        :label="$t('profile.nationality')"
        label-width="120px"
        :rules="[ { required: true, message: $t('profile.nationalityMess'), trigger: 'blur' }, ]"
      >
        <el-input :placeholder="$t('profile.nationalityMess')" v-model="userMessage.nationality"></el-input>
      </el-form-item>

      <el-form-item
        prop="isteacher"
        :label="$t('profile.isteacher')"
        label-width="120px"
        :rules="[ { required: true, message: $t('profile.isteacher'), trigger: 'blur' }, ]"
      >
        <el-radio-group v-model="userMessage.isteacher">
          <el-radio label="0">{{$t('profile.student')}}</el-radio>
          <el-radio label="1">{{$t('profile.teacher')}}</el-radio>
          <el-radio label="2">{{$t('profile.society')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="signature"
        :label="$t('profile.signature')"
        label-width="120px"
        :rules="[
          { required: false, message: $t('profile.signatureMess'), trigger: 'blur' },
          { min: 1, max: 30, message: $t('profile.signatureMess1'), trigger: 'blur'}
        ]"
      >
        <el-input :placeholder="$t('profile.signatureNoMess')" v-model="userMessage.signature"></el-input>
      </el-form-item>
      <el-form-item
        prop="idcardNumber"
        :label="$t('profile.idcardNumber')"
        label-width="120px"
        :rules="[
          { required: userMessage.isteacher==2, message: $t('profile.idcardNumberMess'), trigger: 'blur' },
          { min: 8, max: 18, message: $t('profile.idcardNumberMess1'), trigger: 'blur' }
        ]"
      >
        <el-input :placeholder="$t('profile.idcardNumberMess')" v-model="userMessage.idcardNumber"></el-input>
      </el-form-item>
       <!-- 添加标签 -->
       <el-form-item :label="$t('profile.tag')">
            <div class="year_select">
              <!-- <h1 class="title">个人竞赛能力标签</h1> -->
              <div>
                <div class="tag_type" 
                v-for="(item,index) in tagform.saveSearchLabel" 
                :key="index" 
                :class="{'active':item.checked}"
                 @click="pitchTags(index)" >
                  {{item.labelName}}
                  <i class="el-icon-close" v-if="item.checked" @click.stop="closeTag(index)" ></i>
                </div>
                <div class="add_tag" v-if="tagform.saveSearchLabel.length<5">
                    <el-select filterable allow-create default-first-option v-model="addTageName" placeholder="请输入标签">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  <i class="el-icon-plus" @click="addTag"></i>
                </div>
              </div>
            </div>
        </el-form-item>
      <el-form-item
        prop="companyName"
        v-if="userMessage.isteacher == '2'"
        :label="$t('profile.companyName')"
        label-width="120px"
        :rules="[
          { required: false, message: $t('profile.companyNameMess'), trigger: 'blur' },
        ]"
      >
        <el-select
          filterable
          v-model="userMessage.companyName"
          reserve-keyword
          remote
          :remote-method="remoteMethodcompany"
          :loading="loading"
          :placeholder="$t('profile.companyNameMess')"
        >
          <el-option
            v-for="item in companyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="addr"
        v-if="userMessage.isteacher == '2'"
        :label="$t('profile.addr')"
        label-width="120px"
        :rules="[
          { required: false, message: $t('profile.addrMess'), trigger: 'change' },
        ]"
      >
        <el-autocomplete
          class="inline-input"
          v-model="userMessage.addr"
          :fetch-suggestions="querySearch"
          :placeholder="$t('profile.addrMess')"
          @select="citySelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item
        v-if="userMessage.isteacher != '2'"
        prop="school"
        :label="$t('profile.school')"
        label-width="120px"
        :rules="[ { required: true, message: $t('profile.schoolMess'), trigger: 'blur' }, ]"
      >
      <Org   :shoolChange="shoolChange" v-model="userMessage.school"/>
        <!-- <el-select
          filterable
          v-model="userMessage.school"
          reserve-keyword
          remote
          :remote-method="remoteMethod"
          @change="shoolChange"
          :loading="loading"
          :placeholder="$t('profile.schoolMess')"
        >
          <el-option
            v-for="item in schoolList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item
        prop="academy"
        v-if="userMessage.isteacher != '2'"
        :label="$t('profile.academy')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.academyMess'), trigger: 'blur' },
        ]"
      >
        <el-input v-if='academyList.length<1' :placeholder="$t('profile.academyMess')" v-model="userMessage.academy"></el-input>
        <el-select v-else filterable v-model="userMessage.academy" :placeholder="$t('profile.Choose')">
          <el-option
            v-for="(item,index) in academyList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="major"
        v-if="userMessage.isteacher != '2'"
        :label="$t('profile.major')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.majorMess'), trigger: 'change' },
        ]"
      >
        <el-autocomplete
          v-if="majorList.length<1"
          v-model="userMessage.major"
          :fetch-suggestions="querySearchAsync"
          :placeholder="$t('profile.majorMess')"
          @select="handleSelect"
        ></el-autocomplete>
        <el-select filterable v-else  v-model="userMessage.major"  :placeholder="$t('profile.Choose')">
          <el-option
            v-for="(item,index) in majorList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <!-- <el-input placeholder="请输入专业" v-model="userMessage.major"></el-input> -->
      </el-form-item>

      <el-form-item
        v-if="userMessage.isteacher == '1'"
        prop="jobTitle"
        :label="$t('profile.jobTitle')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.jobTitleMess'), trigger: 'blur' },
        ]"
      >
        <el-select :placeholder="$t('profile.jobTitleMess')" v-model="userMessage.jobTitle">
          <el-option v-for="(item) in jobTitles" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="userMessage.isteacher == '0'"
        prop="degree"
        :label="$t('profile.degree')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.degreeMess'), trigger: 'blur' },
        ]"
      >
        <el-select :placeholder="$t('profile.degreeMess')" v-model="userMessage.degree">
          <el-option v-for="(item,index) in educations" :key="item" :label="item" :value="index+1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="userMessage.isteacher === '1'"
        prop="teacherId"
        :label="$t('profile.teacherId')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.teacherIdMess'), trigger: 'blur' },
        ]"
      >
        <el-input :placeholder="$t('profile.teacherIdMess')" v-model="userMessage.teacherId"></el-input>
      </el-form-item>
      <el-form-item
        v-if="userMessage.isteacher === '0'"
        prop="studentId"
        :label="$t('profile.studentId')"
        label-width="120px"
        :rules="[
          { required: true, message: $t('profile.studentIdMess'), trigger: 'blur' },
        ]"
      >
        <el-input :placeholder="$t('profile.studentIdMess')" v-model="userMessage.studentId"></el-input>
      </el-form-item>

      <el-form-item
        prop="email"
        :label="$t('profile.email')"
        label-width="120px"
        :rules="[{ required: true, validator: checkEmails, trigger: 'blur'}]"
      >
        <el-input :placeholder="$t('profile.emailMess')" v-model="userMessage.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="grade"
        :label="$t('profile.grade')"
        label-width="120px"
        v-if="userMessage.isteacher==0"
        :rules="[{ required: true, message: $t('profile.gradeMess'), trigger: 'blur'},
        { max: 50, message: $t('profile.gradeMess'), trigger: 'blur' },]"
      >
        <el-select v-model="userMessage.grade" :placeholder="$t('profile.gradeMess')">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="business"
        :label="$t('profile.business')"
        label-width="120px"
        :rules="[
          { required: userMessage.isteacher == '1', message: $t('profile.businessMess'), trigger: 'blur'},
          { max: 50, message: $t('profile.businessMess'), trigger: 'blur' },
        ]"
      >
        <el-input :placeholder="$t('profile.businessMess')" v-model="userMessage.business"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-if="!isSkin"
          style="width:96px;font-size:12.8px;margin-left:80px"
          @click="submitForm()"
        >{{$t('profile.save')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import network from "@@/api/jxapi/index";
import Org from '@@/components/OrgInput'
import { getUserInfo, selectGroup } from "@@/utils/commons";
import { checkEmail } from "@@/utils/util";
import { getToken } from "../../../../utils/oauth";
import constData from "@@/mock/const";
import OSS from '@@/components/fileUpload/ossUpload';
import moment from 'moment'
export default {
  name: "shezhi",
  components: {
    Org
  },
  props: {
    //msg_edit_show: Boolean
    isSkin: Boolean,
    setUser: Function
  },
  data() {
    return {
       tagform:{
               saveSearchLabel :[]
            },
       options: [{
          value: 'PPT制作',
        }, {
          value: '演讲',
        }, {
          value: '方案编写',
        }, {
          value: '视频拍摄',
        }, {
          value: '视频制作',
        }, {
          value: '配音',
        }, {
          value: '项目管理',
        }, {
          value: '程序编写',
        }, {
          value: '媒体宣传',
        }, {
          value: '机械制作',
        }, {
          value: '美术设计',
        }],
      addTageName: "",
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
      },
      edit: {
        show: true,
        width: 180,
        height: 180
      },
      jobTitles: [
        "教授",
        "研究员",
        "副教授",
        "副研究员",
        "讲师",
        "助教",
        "其他"
      ],
      heardShow: false,
      uuidCode: "", //uuid唯一的状态码
      headers: {
        Authorization: "Bearer " + getToken()
      },
      schoolList: [],
      companyList: [],
      gradeList: [],
      headImg: "https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png", // 头像
      userMessage: {
        tags:[{
        labelName: '123',
        checked: 0
      }],
        jobTitle: "", //职称
        nickname: "", // 真实姓名
        icon: "https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png", // 头像
        gender: "1", // 性别 123
        signature: "", // 签名
        idcardNumber: "", // 身份证号码
        idcardName: "", // 姓名(真实姓名，身份证上的）
        school: "", // 学校
        academy: "", // 院系
        degree: "", // 学历
        major: "", // 专业
        studentId: "", // 学号
        teacherId: "", //教师编号
        grade: "", // 年级
        business: "", // 职务
        read: false,
        isteacher: "0",
        addr: "",
        age: "",
        birthDay: '',
        nationality: "",
        companyName: ""
      }, // 手机号注册表单
      phoneBindForm: { mobile: "", smsCode: "" }, // 手机号绑定表单
      educations: [], // 学历
      seconds: 0, // 获取验证码倒计时
      // msg_edit_show: false, // 个人信息修改

      phone_edit_show: false, // 手机号修改
      account_edit_show: false, // 绑定账号修改
      mName: "", //个人信息处的姓名
      contactPhone: "", //手机号码
      isWechat: 0, //是否绑定过微信
      wechatActive: false, //绑定微信的弹出框
      loading: false,
      userMessagemajor: "",
      academyList: [],
      tagPitch: "",
      majorList: [],
      idarr:[]
    };
  },
  created() {
    this._getDegreeInfo(); //获取学历
    this.setGradeList();
    //获取个人信息
    this.getlocalUserInfo();
    network.getowntag().then(res => {
      
      res.forEach(item => {
         this.idarr.push(item.id)
         item.checked = 0
       })
       console.log(this.idarr);
       this.tagform.saveSearchLabel = res
    })
  },

  methods: {
    //标签切换
    closeTag(index) {
      this.tagform.saveSearchLabel.splice(index, 1);
    },
     addTag() {
      if (!this.addTageName) {
        return this.$message.warning("请输入新增标签内容！");
      }
      this.tagform.saveSearchLabel.push({
        labelName: this.addTageName,
        checked: 0
      });
      this.pitchTags(this.tagform.saveSearchLabel.length-1)
      this.addTageName = "";
    },
         /**
     * @Description: 选中的标签
     */
    pitchTags(index) {
      this.tagform.saveSearchLabel[index].checked = this.tagform.saveSearchLabel[index].checked ? 0 : 1;
    },
    OssUpload(_file){
        let file = _file.file
        OSS.upload(file,(res,ret)=>{
           this.$set(this.userMessage, 'icon', ret.location)
        })
    },
    beforeUpload(file){
      const isLt2M = file.size / 1024  < 30;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 30k!');
      }
      return isLt2M;
    },
    querySearch(queryString, cb) {
        var restaurants = constData.cityName.map(item=>({value:item.label}));
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        // console.log(results)
        cb(results);
      },
      citySelect(item){
        this.userMessage.addr= item.value
      },
       createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    checkEmails(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('profile.emailMess')));
      }
      setTimeout(() => {
        if (checkEmail(value)) {
          callback();
        } else {
          callback(new Error(this.$t('profile.emailMessRight')));
        }
      }, 100);
    },
    toTrim() {
      this.userMessage.idcardName = this.userMessage.idcardName.trim();
    },
    //查询专业
    async getMajorBySchool(school){
          let res = await network.getMajorBySchool({
          data:{
            schoolName: school,
            limit: 999
          }
      })
      if (res == "error") return  this.majorList = [];
      this.majorList = res
    },
    
    //自动补充默认专业 只能选择2020-9.18
    async querySearchAsync(val, cb) {
      let res = await network.getMajor({
        data: {
          majorName: val,
          limit: 10
        }
      });
      
      if (res == "error") return;
      let arr = [];
      for (let i in res) {
        arr.push({
          value: res[i].majorName,
          majorCode: res[i].majorCode
        });
      }
      cb(arr);
    },
    handleSelect(val) {
      this.userMessage.majorCode = val.majorCode;
    },
    toggleShow() {
      this.heardShow = !this.heardShow;
    },
    setGradeList() {
      let year = new Date().getFullYear();
      let grade = [];
      for (let i = 0; i < 9; i++) {
        let value = year - i + this.$t('profile.year');
        grade.push({
          value: value,
          label: value
        });
      }
      this.gradeList = grade;
    },
    async getlocalUserInfo() {
      let result = getUserInfo();
      if (!result) {
        result = await network.getUserInfo();
        if (result == "error") return;
      }
      this.setUser1(result);
      if(!result.schoolcolCodeID) return
      this.getAcademy(result.schoolcolCodeID)
      this.getMajorBySchool(result.school)
    },
    async getAcademy(code){
      let res = await network.getAcademy({data:{code:code}});
      if(res=='error') return this.academyList = [];
      this.academyList = res
    },
    setUser1(result) {
      this.mName = result.nickname;
      this.contactPhone = result.contactPhone;
      this.userMessage = result;
      this.userMessage.gender = result.gender && result.gender + "";
      this.userMessage.isteacher = result.isteacher + "";
      this.userMessage.icon = result.icon;
      this.isWechat = result.isWechat;
      // 有年月日时计算年龄
      if(result.birthDay){
        this.userMessage.birthDay = moment(result.birthDay).format('YYYY-MM-DD')
        this.getAge(this.userMessage.birthDay)
      }
    },
    submitForm(cb) {
      let user = getUserInfo();
       
      this.$refs["userMessage"].validate(async (valid, obj) => {
        if (valid) {
          let addarr = []
       let hasarr = []
       let delarr = []
         this.tagform.saveSearchLabel.forEach(item => {
          if(item.id){
            hasarr.push(item.id)
          }else {
            addarr.push(item.labelName)
          }
        })
        delarr = this.idarr.filter(item=>!hasarr.includes(item))
         let param = {
           delSearchLabel:delarr,
          saveSearchLabel:addarr,
          groupId:this.groupId
        }
        network.updataowntag({ data: param }).then(res => {
          console.log(res);
          // this.setTabdialog = false
        })
          //将学历转化为对应的序号
          let params = null
          if (this.userMessage.isteacher == 2) {
            let company = this.userMessage.companyName&&this.userMessage.companyName.split("@")||['个体户'];
            params = {
              ...this.userMessage,
              studentId: '',
              teacherId: '',
              school: '',
              schoolcolCodeID: '',
              companyName: company[0],
              groupId: company[1] || 10031934//this.userMessage.groupId
            }
            
          } else {
            let school = this.userMessage.school.split("@");
            if (this.userMessage.isteacher == 1){
              params = {
                ...this.userMessage,
                studentId: '',
                school: school[0],
                schoolcolCodeID: school[1]
              }
            }else{
              params = {
                ...this.userMessage,
                teacherId: '',
                school: school[0],
                schoolcolCodeID: school[1]
              }
            }
          }

          const list = await network.setUserInfo({ data: params });
          if (list == "error") return; //this.$message.error("修改失败");
          let user = await network.getUserInfo();
          if (user == "error") return this.$message(this.$t('profile.setSuccessButNoMess'));
          localStorage.setItem("userInfo", JSON.stringify(user));
          this.setUser && this.setUser(user)
          //await selectGroup(user.groupId)
          this.$message.success(this.$t('profile.saveSuccess'));
          // 请先完善个人信息 跳转过来保存后再返回进行报名
          if(this.$route.query.backid){
            this.$router.go(-1)
          }
          cb && cb();
        } else {
          cb && cb(obj);
          for (var o in obj) {
            return this.$message.error(obj[o][0].message);
          }
          return false;
        }
      });
    },
    //获取学历列表
    async _getDegreeInfo() {
      const list = await network.getDegreeInfo();
      if (list == "error") return;
      var arr = [];
      for (let i in list) {
        arr.push(list[i]); //属性
      }
      this.educations = arr;
    },
    //抽取了学校选择输入框10.29
    // remoteMethod(q) {
    //   if (q !== "") {
    //     this.loading = true;
    //     this.querySchool({ q });
    //   } else {
    //     this.schoolList = [];
    //   }
    // },
    // async querySchool(param) {
    //   this.loading = false;
    //   param.limit = 10;

    //   const data = await network.schools({ data: param });
    //   if (data == "error") return;
    //   if (!data) {
    //     this.schoolList = [];
    //     return;
    //   }
    //   this.schoolList = data.map(r => {
    //     return {
    //       value: r.schoolcolName + "@" + r.schoolcolCodeID,
    //       label: r.schoolcolName
    //     };
    //   });
    // },
    remoteMethodcompany(q) {
      if (q !== "") {
        this.loading = true;
        this.queryCompany({ q });
      } else {
        this.companyList = [];
      }
    },
    async queryCompany(param) {
      this.loading = false;
      param.limit = 10;

      const data = await network.getCompanys({ data: param });
      if (data == "error") return;
      if (data && !data.list || data.list.length==0) {
        return this.companyList = [{
          value: param.q + "@10031934",
          label: param.q
        }];
      }
      this.companyList = data && data.list.map(r => {
        return {
          value: r.groupName + "@" + r.id,
          label: r.groupName
        };
      });
    },
    async shoolChange(e){
      let code = e.split('@')[1]
      let name = e.split('@')[0]
      this.getMajorBySchool(name)
      this.userMessage.major = ""
      let res = await network.getAcademy({data:{code:code}});
      if(res=='error') return this.academyList = [];
      this.academyList = res
      if(this.academyList.length>0){
        this.userMessage.academy = ''
      }
    },
    getAge(str){
      if(!str) return this.$set(this.userMessage, 'age', '');
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
        if (r == null) return false;

        var d = new Date(r[1], r[3] - 1, r[4]);
        var returnStr = "输入的日期格式错误！";

        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {

            var date = new Date();
            var yearNow = date.getFullYear();
            var monthNow = date.getMonth() + 1;
            var dayNow = date.getDate();

            var largeMonths = [1, 3, 5, 7, 8, 10, 12], //大月， 用于计算天，只在年月都为零时，天数有效
                lastMonth = monthNow - 1 > 0 ? monthNow - 1 : 12,  // 上一个月的月份
                isLeapYear = false, // 是否是闰年
                daysOFMonth = 0;    // 当前日期的上一个月多少天

            if ((yearNow % 4 === 0 && yearNow % 100 !== 0) || yearNow % 400 === 0) {  // 是否闰年， 用于计算天，只在年月都为零时，天数有效
                isLeapYear = true;
            }
            var Y = yearNow - parseInt(r[1]);
            var M = monthNow - parseInt(r[3]);
            var D = dayNow - parseInt(r[4]);
            if (D < 0) {
                M--;
            }
            if (M < 0) {  // 借一年 12个月
                Y--;
            }
            if (Y < 0) {
              this.$message.warning('出生日期有误！')
              return this.$set(this.userMessage, 'birthDay', '')
              
            } else {
                returnStr = Y ;
            }

        }
        this.$set(this.userMessage, 'age', returnStr)

    }
  },
  mounted() {
    //this.msg_edit_show = !!this.$route.query.msg_edit_show;
  }
};
</script>


<style lang="less" scoped>
.msg_edit {
  border-top: 1px solid #dedede;
  // margin-top:0.7rem;
  padding: 0 16px;
  font-size: 12.8px;
  .head {
    text-align: center;
    padding-top: 16px;
    position: relative;
    .head_img {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      cursor: pointer;
    }
    .change_head_bg {
      width: 97.6px;
      height: 28.8px;
      position: absolute;
      left: 50%;
      margin-left: -48.8px;
      bottom: 28.8px;
      cursor: pointer;
    }
  }
  .head_px {
    text-align: center;
    margin-top: 8px;
    margin-bottom: 32px;
  }
  .change_head {
    text-align: center;
    color: #fff;
    margin-top: -32px;
  }
  label {
    text-align: right;
    font-size: 12.8px;
    color: #787d81;
    span {
      font-size: 12.8px;
    }
  }
  input {
    font-size: 12.8px;
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
      height: 31px;
      line-height: 20px;
      margin-top: 0px;
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
      height: 31px;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      // margin-top: 10px;
      /deep/.el-input--suffix .el-input__inner{
            width: 115px;
    height: 31px;
        padding: 6px 33px 6px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    border: 0;
    border-radius: 98px;
    background-color: transparent;
      }
      /deep/.el-select>.el-input{
        line-height: 31px;
        height: 31px;
      }
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
    height: 31px;
    margin-top: 0;
    line-height: 20px;
    }
    .title {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
  }
em {
  font-style: normal;
}
/deep/ .el-form-item__label {
  color: #787d81;
}
/deep/ .el-select,
.el-autocomplete {
  width: 100%;
}
</style>
