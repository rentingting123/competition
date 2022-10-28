<template>
    <div class="addCompetition">
        <div class="title">
            <img src="https://web.moocollege.com/mooc/hzq/competition/newbieGuide/again.gif" class="againGuide" @click="guideshow=true"/>
            <!-- <el-button type="primary"  size="small" @click="copy" :loading='loading'>再次举办</el-button> -->
            <el-button type="primary" v-if="haveCompetition" size="small" @click="copy" :loading='loading'>再次举办</el-button>
            <el-button type="primary"  size="small" @click="showEdit(1)">创建竞赛</el-button>
            <!-- v-else -->
            <!-- v-else -->
            <!-- <el-button type="primary"  size="small" @click="showEdit(1)">创建竞赛</el-button> -->
        </div>
        <el-dialog title="创建竞赛" :modal-append-to-body="false" :append-to-body='true'
            :close-on-click-modal= false :visible.sync="show" v-loading = 'loadingdialog'>
                    <div class="cc">
                        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="140px" class="form">
                        <el-form-item label="竞赛名称: " prop="name">
                            <el-input v-model.trim="form.name" @keyup.enter.native="copyCompetitionByCid"/>
                        </el-form-item >
                        <el-form-item label="竞赛封面: "  prop="bannerUrl">
                            <upload
                                width='300px'
                                height='170px'
                                class="avatar-uploader"
                                accept=".jpg, .png, .jpeg, .gif"
                                name="attach"
                                drag
                                :showlist="false"
                                :onSuccess="handTeacher"
                                >
                                <div class="default_img" v-if="!form.bannerUrl">
                                  <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg">
                                  <img class="upload_img" src="https://web.moocollege.com/mooc/hzq/competition/user_center/uploadImg.png">
                                </div>
                                <div v-else class="default_img">
                                  <img :src="form.bannerUrl">
                                  <img class="upload_img" src="https://web.moocollege.com/mooc/hzq/competition/user_center/uploadImg.png">
                                </div>
                            </upload>
                        </el-form-item>
                        <el-form-item label="竞赛年份: " prop="competitionYear">
                            <el-date-picker prop="competitionYear" v-model="form.competitionYear" type="year" placeholder="请选择年" value-format='yyyy'></el-date-picker>
                        </el-form-item>
                        <el-form-item label="竞赛届数: " prop="competitionRound">
                            <el-input-number v-model="form.competitionRound" :min='1' label="请输入竞赛届数"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="competitionRange" ref="clevel" label="竞赛范围: ">
                            <range :competitionLevel='form.competitionLevel' :competitionRange='form.competitionRange' :setDate='setRang'/>
                        </el-form-item>
                        <el-form-item label="竞赛类型: "  prop="applyType">
                             <el-radio-group v-model="form.applyType">
                              <el-radio :label="1">个人</el-radio>
                              <el-radio :label="2">团队</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="form.applyType == 2">
                              <el-col :span="11">
                               <div class="title">团队参赛者人数下限</div>
                                 <el-input-number
                                   v-model="form.teamMinMember"
                                   :min="1"
                                   :max="999"
                                   label="团队参赛者人数下限"
                                 ></el-input-number>
                              </el-col>
                              <el-col class="line" :span="2">-</el-col>
                              <el-col :span="11">
                                 <div class="title">团队参赛者人数上限</div>
                                 <el-input-number
                                   v-model="form.teamMaxMember"
                                   :min="1"
                                   :max="999"
                                   label="团队参赛者人数上限"
                                 ></el-input-number>
                              </el-col>
                        </el-form-item>
                         <el-form-item label="初赛时间: " prop="saiduanbegintime">
                             <div class="scheduleShow">
                            <span class="inputWidth">
                               <el-date-picker
                                      size="small"
                                      v-model="form.saiduanbegintime"
                                      type="datetime"
                                      @blur="checkStartTime('chusai', 0, 0)"
                                      value-format="yyyy-MM-dd HH:mm:ss"
                                      placeholder="开始时间"
                                      >
                                    </el-date-picker>
                             </span>
                             <span class="inputWidth">
                               <el-date-picker
                                      size="small"
                                      v-model="form.saiduanendtime"
                                      type="datetime"
                                      value-format="yyyy-MM-dd HH:mm:ss"
                                      placeholder="结束时间"
                                      @blur="checkEndTime('chusai', 0, 0)"
                                      >
                                    </el-date-picker>
                             </span>
                             </div>
                        </el-form-item>
                        <el-form-item label="报名时间: " prop="baomingbegintime">
                            <div class="scheduleShow">
                                <span class="inputWidth">
                                   <!-- :rules='form.sendType == 2 ?[{ required: true, message: "请选择推送时间", trigger: "blur" }]:[ {required: false,}]' -->
                                   <el-date-picker
                                      size="small"
                                      v-model="form.baomingbegintime"
                                      type="datetime"
                                      value-format="yyyy-MM-dd HH:mm:ss"
                                      placeholder="开始时间"
                                      @blur="checkStartTime('baoming', 0, 1)"
                                      >
                                    </el-date-picker>
                                 </span>
                                 <span class="inputWidth">
                                     <el-date-picker
                                      size="small"
                                      v-model="form.baomingendtime"
                                      type="datetime"
                                      value-format="yyyy-MM-dd HH:mm:ss"
                                      placeholder="结束时间"
                                      @blur="checkEndTime('baoming', 0, 1)"
                                      >
                                    </el-date-picker>
                             </span>
                            </div>
                        </el-form-item>
                    </el-form>
                    </div>
            
            <div slot="footer" class="dialogFooter">
                <el-button size="small" @click="show=false">取消</el-button>
                <el-button type="primary" @click="onSubmit" size="small">保存竞赛，完善更多信息</el-button>
                <el-button type="primary" @click="onSubmit(1)" size="small">立即发布竞赛</el-button>
            </div>
        </el-dialog>
        <noviceGuide v-if="guideshow" :close='closeGuide' :lists='guideList' type='3' id='65'/>
    </div>
</template>

<script>
import range from '@@/components/competitionRange'
import moment from 'moment'
import network from '@@/api/jxapi'
import noviceGuide from '../noviceGuide'
  import upload from "@@/components/fileUpload/index";
import { setNoviceGuide, getNoviceGuide } from '@@/utils/commons'
export default {
    props: ['close'],
    components:{
        range,
        noviceGuide,
        upload
    },
    data(){
        return{
            loadingdialog:false,
            rules: {
                competitionRange:[{ required: true, message: '请选择竞赛范围', trigger: 'change' },],
                baomingbegintime: [
                    { required: true, message: '报名时间不能为空', trigger: 'blur' },
                ],
                saiduanbegintime: [
                    { required: true, message: '初赛时间不能为空', trigger: 'blur' },
                ],
                applyType: [
                    { required: true, message: '竞赛类型不能为空', trigger: 'blur' }
                ],
                competitionRound: [
                    { required: true, message: '竞赛届数不能为空', trigger: 'blur' }
                ],
                competitionYear: [
                    { required: true, message: '竞赛年份不能为空', trigger: 'blur' }
                ],
                bannerUrl: [
                    { required: true, message: '竞赛封面不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '竞赛名称不能为空', trigger: 'blur' }
                ],
            },
            loading: false,
            haveCompetition: false,
            show: false,
            form: {
                baomingendtime:'',
                baomingbegintime:'',
                saiduanendtime:'',
                saiduanbegintime:'',
                teamMaxMember:1,
                teamMinMember:1,
                applyType:1,
                bannerUrl: "",//上传封面
                name: '',
                competitionYear: '',
                competitionRound: '',
                competitionLevel: '',
                range: '',
            },
            guideshow: false, //新手指南弹窗显示
            guideList:[
                {
                    url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/1.png',
                    width: '294px',
                    id: 0,
                },
                {
                    url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/2.png',
                    width: '281px',
                    id: 1,
                },
                {
                    url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/3.png',
                    width: '920px',
                    id: 2,
                },
                {
                    url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/4.png',
                    width: '347px',
                    id: 3,
                },
                {
                    url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/5.png',
                    width: '1170px',
                    id: 4,
                },
                {
                    url: 'https://web.moocollege.com/mooc/hzq/competition/newbieGuide/6.png',
                    width: '347px',
                    id: 5,
                },
            ],//新手引导图片集合
        }
    },
    created(){
        this.init();
        // 判断是否进过新手引导
        if(getNoviceGuide('create_competition')){
            this.guideshow = true
        }else{
            this.guideshow = false
        }
    },
    methods:{
    handleClevel(v){
        console.log('clevel',v)
        },
    async closeGuide(){
      this.guideshow=false
      setNoviceGuide('schedule_set')
    },
    // 检测开始时间
    checkStartTime(item, i, j){
      // i 赛段  j进度0赛段1报名2提交作品3评审作品4结果发布
     let startTime
     let endTime
      if(item == 'chusai'){
          startTime = this.form.saiduanbegintime
           endTime = this.form.saiduanendtime
      }else{
           startTime = this.form.baomingbegintime
           endTime = this.form.baomingendtime
      }
    //   if(!startTime) return;
      // 本身时间判断
      if(endTime && moment(startTime) > moment(endTime)){
          if(j == 0){
              this.$set(this.form,'saiduanbegintime','')
          }else{
              this.$set(this.form,'baomingbegintime','')
          }
        return this.$message.warning('开始时间应该小于结束时间')
      } 
      // 修改赛段总体时间
      if(j==0){
        let time1 = this.form.saiduanbegintime
        let time2 = this.form.baomingbegintime
        if((time1 && moment(startTime)>moment(time1)) || 
           (time2 && moment(startTime)>moment(time2))){
               if(j == 0){
                   this.$set(this.form,'saiduanbegintime','')
               }else{
                    this.$set(this.form,'baomingbegintime','')
               }
          
          return this.$message.warning('竞赛开始时间应该小于其他开始时间')
        }
      }else{ //修改报名作品等其他时间
        let start = this.form.saiduanbegintime
        let end = this.form.saiduanendtime
        if((start&&moment(startTime)<moment(start)) || (end&&moment(startTime)>moment(end))){
            if(j == 0){
                this.$set(this.form,'saiduanbegintime','')
            }else{
                this.$set(this.form,'baomingbegintime','')
            }
          
          return this.$message.warning('开始时间应该在竞赛的时间范围内')
        }
      }
    },
    // 检测结束时间
    checkEndTime(item, i, j){
      // i 赛段  j进度0赛段1报名2提交作品3评审作品4结果发布
       let startTime
       let endTime 
       if(item == 'chusai'){
          startTime = this.form.saiduanbegintime
          endTime = this.form.saiduanendtime
      }else{
           startTime = this.form.baomingbegintime
           endTime = this.form.baomingendtime
      }
      if(!endTime) return;
      // 本身时间判断
      if(endTime && moment(startTime) > moment(endTime)){
           if(j == 0){
                this.$set(this.form,'saiduanendtime','')
            }else{
                this.$set(this.form,'baomingendtime','')
            }
        return this.$message.warning('开始时间应该小于结束时间')
      }

      // 修改赛段总体时间
      if(j==0){
        let time1 = this.form.saiduanendtime
        let time2 = this.form.saiduanendtime
        if((time1 && moment(endTime)<moment(time1)) || 
           (time2 && moment(endTime)<moment(time2))){
           if(j == 0){
                this.$set(this.form,'saiduanendtime','')
            }else{
                this.$set(this.form,'baomingendtime','')
            }
          return this.$message.warning('竞赛开始时间应该小于其他开始时间')
        }
      }else{ //修改报名作品等其他时间
        let start = this.form.saiduanbegintime
        let end = this.form.saiduanendtime
        if((start&&moment(endTime)<moment(start)) || (end&&moment(endTime)>moment(end))){
          if(j == 0){
                this.$set(this.form,'saiduanendtime','')
            }else{
                this.$set(this.form,'baomingendtime','')
            }
          return this.$message.warning('结束时间应该在竞赛的时间范围内')
        }
      }

    },
      //封面上传
      handTeacher(res,file) {
        this.form.bannerUrl = res.location;
      },
        copyCompetitionByCid(){
            // 20210430 此处添加特殊操作，为晓霞快捷复制其他竞赛
            if(this.form.name = '晓霞8658'){
                this.$prompt('请输入要复制的竞赛id', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async ({ value }) => {
                    let res =  await network.copyCompetitionByCid({data:{
                        competitionId: value,
                    }})
                    if(res=='error') return;
                    this.$message.success('创建成功');
                    this.close && this.close();
                    this.haveCompetition = true;
                    this.show = false;
                })
            }
        },
        // 关闭新手指南弹窗
        async closeGuide(){
            this.guideshow=false
            setNoviceGuide('create_competition')
        },
        async init(){
            let res = await network.havaCompetition();
            if(res=='error') return;
            this.haveCompetition = res || false
        },
        showEdit(){
            this.form.competitionYear = moment().format('yyyy')
            this.show = true;
        },
        async copy(){
            this.loading = true
            let res = await network.copyNewCompetition();
            this.loading = false
            if(res=='error') return;
            this.$message.success('创建成功')
            this.close && this.close();

        },
        async onSubmit(type){
            if(!this.form.name){
                return this.$message.warning('请输入竞赛名称')
            }
            if(!this.form.competitionYear){
                return this.$message.warning('请选择竞赛年份')
            }
            if(this.form.competitionRound<=0){
                return this.$message.warning('请输入竞赛届数')
            }
            if(!this.form.competitionRange){
                return this.$message.warning('请选择竞赛范围')
            }
            let params = {
                // id:localStorage.getItem("competitionId"),
                competitionYear:this.form.competitionYear,
                competitionRound:this.form.competitionRound,
                name:this.form.name,
                competitionRange:this.form.competitionRange,
                bannerUrl:this.form.bannerUrl,
                applyType:this.form.applyType,
                teamMaxMember:this.form.teamMaxMember,
                teamMinMember:this.form.teamMinMember,
                scheduleStr:[
                        {
                            name: "初赛",
                            startTime: this.form.saiduanbegintime,
                            endTime: this.form.saiduanendtime,
                            type: 0,
                            timeTypeValue: null,
                            display: false,
                            signup: null,
                            edit: null,
                            upload: null,
                            isNeed: true
                        },
                        {
                            name: "初赛-报名",
                            startTime: this.form.baomingbegintime,
                            endTime: this.form.baomingendtime,
                            type: 1,
                            timeTypeValue: 1,
                            display: true,
                            signup: true,
                            edit: true,
                            upload: null,
                            isNeed: true
                        },
                        {
                            name: "初赛-提交作品",
                            startTime: null,
                            endTime: null,
                            type: 2,
                            timeTypeValue: 1,
                            display: true,
                            signup: true,
                            edit: true,
                            upload: null,
                            isNeed: true
                        },
                        {
                            name: "初赛-评审作品",
                            startTime: null,
                            endTime: null,
                            type: 3,
                            timeTypeValue: 1,
                            display: true,
                            signup: true,
                            edit: true,
                            upload: null,
                            isNeed: true
                        },
                        {
                            name: "初赛-结果发布",
                            startTime: null,
                            endTime: null,
                            type: 4,
                            timeTypeValue: null,
                            display: true,
                            signup: null,
                            edit: null,
                            upload: null,
                            isNeed: true
                        }
                    ],
            }
             this.$refs.form.validate(async (valid) => {
                 if(!valid) return
                 this.loadingdialog = true
                    let res = await network.directCreateNewCompetition({data:params})
                    this.loadingdialog = false
                    if(res=='error') return;
                    if(type == 1){
                        this.loadingdialog = true
                        let res1 = await network.competitionPublish({data:{
                            competitionId: res.id
                        }});
                        this.loadingdialog = false
                        if(res=="error") return;
                        this.$message.success('发布成功');
                        this.close && this.close();
                        this.haveCompetition = true;
                        this.show = false;
                    }else{
                        this.$message.success('保存成功');
                        
                        this.close && this.close();
                        this.haveCompetition = true;
                        this.show = false;
                    }
                   
             })
            
            // let res = await network.saveNewCompetition({data:this.form})
            // if(res=='error') return;
            // this.$message.success('创建成功');
            // this.close && this.close();
            // this.haveCompetition = true;
            // this.show = false;

        },
        setRang(obj){
            this.$set(this.form,'competitionLevel',obj.competitionLevel)
            this.$set(this.form,'competitionRange',obj.competitionRange)
            // console.log(this.form)
            // this.$refs.clevel.$emit('el.form.change',obj.competitionRange)
        }
    }
}
</script>

<style lang='less' scoped>
.addCompetition{
    display: inline-block;
    vertical-align: middle;
    .title{
        display: inline-block;
        vertical-align: middle;
        .againGuide{
            vertical-align: middle;
            cursor: pointer;
            height: 32px;
        }
    }
    
}
.title{
    height: 35px;
    font-size: 16px;
    font-weight: 800;
}
.cc {
/deep/.el-upload-dragger{
    width: 300px !important;
    height: 170px;
}
}
  .scheduleShow{
    display: inline-block;
    .inputWidth{
      width: 185px;
      display: inline-block;
      margin-right: 10px;
      ::v-deep .el-input--small .el-input__inner{
          width: 185px;
      }
      ::v-deep .el-date-picker__editor-wrap .el-input--small .el-input__inner {
          width: 147px;
      }
    }
  }
    .editShow{
    margin: 10px 0;
    margin-left: 130px;
    p{
      margin: 10px 0;
    }
  }
 .default_img {
          width: 300px;
          height: 170px;
          position: relative;
          img {
            font-size: 1rem;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            vertical-align: middle;
          }
          .upload_img {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(95, 95, 95, 0.1);
          }}
.form{
    width: 550px;
    margin: 0 auto;
}

.dialogFooter{
    padding-top: 10px;
    border-top: 1px solid #dedede;
}
</style>