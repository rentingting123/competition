<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='top' label-width="100px" class="demo-ruleForm" v-if="id">
            <div class="three">
                <el-form-item label="联系人" prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="竞赛名称" prop="competitionName">
                <el-input v-model="ruleForm.competitionName" placeholder="请输入竞赛名称"></el-input>
            </el-form-item>

            <el-form-item label="竞赛类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择竞赛类型">
                    <el-option label="电子信息" :value="1"></el-option>
                    <el-option label="理工" :value="2"></el-option>
                    <el-option label="人文社科" :value="3"></el-option>
                    <el-option label="综合" :value="4"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="竞赛LOGO" prop="logo">
                <label slot="label">竞赛LOGO <small style='color: #909090;font-size: 14px;margin-left:10px'>建议尺寸500x500以上的图片格式或源文件</small ></label>
                <upload accept=".jpg, .png, .gif, .jpeg" :onSuccess="successLogo" :showlist="false" class="upload">
                    <img :src="ruleForm.logo" v-if="ruleForm.logo" width="120px" height="120px">
                    <div v-else class="add">+</div>
                </upload>
            </el-form-item>

            <el-form-item label="竞赛宣传语" prop="slogan">
                <el-input v-model="ruleForm.slogan" placeholder="请输入一句话宣传语"></el-input>
            </el-form-item>
            <el-form-item label="主办单位" prop="sponsor">
                <el-input v-model="ruleForm.sponsor" placeholder="请输入主办单位"></el-input>
            </el-form-item>
            <el-form-item label="承办单位" prop="undertake">
                <el-input v-model="ruleForm.undertake" placeholder="请输入承办单位"></el-input>
            </el-form-item>
            <el-form-item label="竞赛简介" prop="competitionInfo">
                <label slot="label">竞赛简介 <small style='color: #6283FF;font-size: 14px;float:right;' @click="showDetail('competitionInfo')">查看例文</small ></label>
                <el-input  v-model="ruleForm.competitionInfo" :autosize="{minRows:4}" type="textarea" placeholder="简要介绍竞赛发展历史，竞赛特点">
                </el-input>
            </el-form-item>
            <el-form-item label="竞赛影响力" prop="influence">
                <label slot="label">竞赛影响力 <small style='color: #6283FF;font-size: 14px;float:right;'  @click="showDetail('influence')">查看例文</small ></label>
                <el-input v-model="ruleForm.influence" :autosize="{minRows:4}" type="textarea" placeholder="简要介绍竞赛影响力"></el-input>
            </el-form-item>
            <el-form-item label="竞赛赛程" prop="schedule">
                <label slot="label">竞赛赛程 <small style='color: #6283FF;font-size: 14px;float:right;'  @click="showDetail('schedule')">查看例文</small ></label>
                <el-input v-model="ruleForm.schedule" :autosize="{minRows:4}" type="textarea" placeholder="内容包括2021年竞赛启动、初赛、复赛、决赛、颁奖等重要活动时间节点及地点"></el-input>
            </el-form-item>
            <div class="two">
                <el-form-item label="竞赛网站" prop="competitionUrl">
                    <el-input v-model="ruleForm.competitionUrl" placeholder="请输入竞赛网址"></el-input>
                </el-form-item>
                <el-form-item label="秘书处单位" prop="secretary">
                    <el-input v-model="ruleForm.secretary" placeholder="请输入秘书处单位"></el-input>
                </el-form-item>
            </div>
            <div class="two">
                <el-form-item label="秘书处单位地址" prop="secretaryAddress">
                    <el-input v-model="ruleForm.secretaryAddress" placeholder="请输入秘书处单位地址"></el-input>
                </el-form-item>
                <el-form-item label="秘书处联系电话" prop="secretaryPhone">
                    <el-input v-model="ruleForm.secretaryPhone" placeholder="请输入秘书处联系电话"></el-input>
                </el-form-item>
            </div>
            <div class="two">
                <el-form-item label="秘书处邮箱" prop="secretaryEmail">
                    <el-input v-model="ruleForm.secretaryEmail" placeholder="请输入秘书处邮箱"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="相关照片" prop="photoInfo">
                <label slot="label">相关照片 <small style='color: #909090;font-size: 14px;margin-left:10px'>照片数量：3-5张</small ></label>
                <ul class="photoInfo">
                    <li>
                        <upload accept=".jpg, .png, .gif, .jpeg" :onSuccess="success" :showlist="false" class="upload">
                            <div class="add">+</div>
                        </upload>
                    </li>
                    <li v-for="item,i in ruleForm.photoInfo" :key="i">
                        <div class="img">
                            <img :src="item.url" alt="">
                            <div class="button">
                                <upload accept=".jpg, .png, .gif, .jpeg" :onSuccess="(file, filelist)=>{edit(file,i)}" :showlist="false" class="upload">
                                   <el-button type="primary" >修改</el-button>
                                </upload>
                                
                                <el-button type="primary" @click="del(i)">删除</el-button>
                            </div>
                        </div>
                        <el-input v-model="item.name" placeholder="请输入照片简介（1句话）"></el-input>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import upload from '@@/components/fileUpload/index'
import network from '@@/api/jxapi'
export default {
    props: ['id'],
    components:{
        upload
    },
    data(){
        return{
            ruleForm: {
                userName: "",
                phone: "",
                email: "",
                competitionName: "",
                logo: "",
                slogan: "",
                sponsor: "",
                undertake: "",
                competitionInfo: "",
                influence: "",
                schedule: "",
                competitionUrl: "",
                secretary: "",
                secretaryAddress: "",
                secretaryPhone: "",
                secretaryEmail: "",
                photoInfo: ''
            },
            rules:{
                userName: [{ required: true, message: "请输入联系人", trigger: "blur" }],
                phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
                email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
                competitionName: [{ required: true, message: "请输入竞赛名称", trigger: "blur" }],
                type: [{ required: true, message: "请选择竞赛类型", trigger: "blur" }],
                logo: [{ required: true, message: "请上传竞赛LOGO", trigger: "blur" }],
                slogan: [{ required: true, message: "请输入一句话宣传语", trigger: "blur" }],
                sponsor: [{ required: true, message: "请输入主办单位", trigger: "blur" }],
                undertake: [{ required: true, message: "请输入承办单位", trigger: "blur" }],
                competitionInfo: [{ required: true, message: "请输入竞赛简介", trigger: "blur" }],
                influence: [{ required: true, message: "请输入竞赛影响力", trigger: "blur" }],
                schedule: [{ required: true, message: "请输入竞赛赛程", trigger: "blur" }],
                competitionUrl: [{ required: false, message: "请输入竞赛网站网址", trigger: "blur" }],
                secretary: [{ required: true, message: "请输入秘书处单位", trigger: "blur" }],
                secretaryAddress: [{ required: true, message: "请输入秘书处单位地址", trigger: "blur" }],
                secretaryPhone: [{ required: true, message: "请输入秘书处联系电话", trigger: "blur" }],
                secretaryEmail: [{ required: true, message: "请输入秘书处邮箱", trigger: "blur" }],
                photoInfo: [{ required: true, message: "请上传相关照片", trigger: "blur" }],
            }
        }
    },
    methods:{
        async init(){
            let res = await network.selectCompetitionEnergize({data:{
                competitionId: this.id
            }})
            if(res=='error') return;
            this.ruleForm = res || {
                userName: "",
                phone: "",
                email: "",
                competitionName: "",
                logo: "",
                slogan: "",
                sponsor: "",
                undertake: "",
                competitionInfo: "",
                influence: "",
                schedule: "",
                competitionUrl: "",
                secretary: "",
                secretaryAddress: "",
                secretaryPhone: "",
                secretaryEmail: "",
                photoInfo: ''
            }
            if(this.ruleForm.photoInfo){
                this.ruleForm.photoInfo = JSON.parse(this.ruleForm.photoInfo)
            }
        },
        successLogo(file){
            this.$set(this.ruleForm,'logo',file.location)
        },
        success(file){
            if(this.ruleForm.photoInfo && this.ruleForm.photoInfo.length>0){
                this.ruleForm.photoInfo.push({
                    name: '',
                    url: file.location
                })
            }else{
                this.$set(this.ruleForm, 'photoInfo', [{
                    name: '',
                    url: file.location
                }])
            }
        },
        del(i){
            this.ruleForm.photoInfo.splice(i, 1)
            if(this.ruleForm.photoInfo.length<1){
                this.ruleForm.photoInfo = ''
            }
        },
        edit(file, i){
            this.$set(this.ruleForm.photoInfo[i], 'url', file.location)
        },
        showDetail(name){
            let str = ""
            if(name=='competitionInfo'){
                str = `举例：****竞赛由中国化工学会、中国化工教育协会。2018年全国总决赛由***大学承办；东北赛区决赛由****大学承办、华北赛区决赛由****承办、华东赛区决赛由****承办、华南赛区决赛由****承办、华中赛区决赛由****承办、西南赛区决赛由****承办、西北赛区决赛由****承办。
****竞赛面向全日制本科生，专注于化工领域实现先进制造所需人才的培养，通过虚拟化工厂设计的实战模式，提升大学生对先进制造技术和工具的自主学习和实际运用能力，强化创新意识、合作精神和工程设计与实践能力。本竞赛为高等学校开展创新教育和实践教学改革、加强高校与企业之间联系、推动学科创新活动起到积极示范作用。竞赛命题立足于我国存在巨大市场缺口的化工产品，或急需有效利用的原料资源，或紧迫的环境治理需求，设计一座虚拟化工厂。工作内容包括资源和产品市场分析、技术方案选择、工艺过程设计、生产设备和装置设计、工厂布置、技术经济分析。作品包括生产过程仿真模型、计算说明书和结果、工程图纸、可行性报告、设计说明书、装置三维模型。通过专项评审和公开答辩进行作品评价。`
            }else if(name=='influence'){
                str = `举例：全国设有化学工程专业的高校共361所，报名参加化工设计竞赛的已有333所。本竞赛对专业教育和工程实践教育效果的促进和提升作用已经得到化工高等教育界的普遍认可，在高校化工类院系的专业评估和工程教育认证环节，本科生参加本竞赛的参赛率已经入选评价指标。获奖学生更是受到专业领域就业市场的普遍欢迎（如列入中石化等企业的优才招聘范围）。`
            }else if(name=='schedule'){
                str = `举例：2月公布竞赛题目，3月组队报名，4月初公布合格参赛队名单，7月20日提交参赛作品，7月底前完成省级赛，8月上旬完成赛区决赛，8月下旬进行全国总决赛。`
            }
            this.$set(this.ruleForm, name, str)
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return;
                let res = await network.saveCompetitionEnergize({data:{
                    ...this.ruleForm,
                    photoInfo: JSON.stringify(this.ruleForm.photoInfo),
                    competitionId: this.id
                }})
                if(res=='error') return;
                this.$message.success('提交成功！')
            })
        }
    },
    watch:{
        id:{
            immediate: true,
            handler(val){
                if(!val) return;
                this.init()
            }
        }
    }
}
</script>

<style lang='less' scoped>
.demo-ruleForm{
    width: 615px;
    text-align: left;
    /deep/.el-form-item__label{
        width: 100%;
    }
    .three{
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
            margin-right: 20px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
    .two{
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
            margin-right: 20px;
            width: 380px;
            &:last-child{
                width: 200px;
                margin-right: 0;
            }
        }
    }
    .add{
        width: 120px;
        height: 120px;
        line-height: 120px;
        background: #F0F2F4;
        border-radius: 5px;
        text-align: center;
        font-size: 50px;
        color: #787D81;
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
    }
    .photoInfo{
        display: inline-block;
        vertical-align: top;
        li{
            width: 213px;
            height: 166px;
            display: inline-block;
            vertical-align: top;
            margin-left: 20px;
            margin-bottom: 20px;
            .img{
                width: 213px;
                height: 120px;
                margin-bottom: 10px;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                .button{
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    >div:first-child{
                        width: 70px !important;
                        margin-top: 0;
                        margin-right: 20px;
                    }
                }
                &:hover{
                    .button{
                        display: flex;
                    }
                }

            }
            &:first-child{
                width: 120px;
                height: 120px;
            }
        }
    }
}
</style>