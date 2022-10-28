<template>
    <div class="protocol">
        <div class="main">
            <div class="mainMessage">
                <div class="logo">
                    <img src="./common/logo.png" alt="">
                </div>
                <h1>欢迎{{userInfo.idcardName}}入驻校级数据平台</h1>
                <p class="fontMess">请填写您的基本信息后，<br>下载模板文件填写完毕后上传，即可申请入驻</p>
                <p class="downMess">1.填写个人信息</p>
                <el-form :model="userMessage" :rules="rules" ref="userMessage" :label-position="labelPosition">
                    <el-form-item prop="tel" label="手机号" label-width="80px">
                        <el-input placeholder="请输入手机号" maxlength="11" @blur="init" v-model="userMessage.tel"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="姓名" label-width="80px">
                        <el-input placeholder="请输入姓名" v-model="userMessage.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="邮箱" label-width="80px">
                        <el-input placeholder="请输入邮箱" v-model="userMessage.email"></el-input>
                    </el-form-item>
                    <el-form-item prop="school" label="学校" label-width="80px">
                        <el-input placeholder="请输入学校" v-model="userMessage.school"></el-input>
                    </el-form-item>
                    <el-form-item prop="department" label="部门" label-width="80px">
                        <el-input placeholder="请输入部门" v-model="userMessage.department"></el-input>
                    </el-form-item>
                    <el-form-item prop="business" label="职务" label-width="80px">
                        <el-input placeholder="请输入职务" v-model="userMessage.business"></el-input>
                    </el-form-item>
                </el-form>
                <p class="downMess">2.下载模板文件并进行填写</p>
                <a class="a" download="" href="https://web.moocollege.com/template/%E7%AB%9E%E8%B5%9B%E9%A1%B9%E7%9B%AE%E6%B8%85%E5%8D%95-%E6%A8%A1%E7%89%881104.xls">下载</a>
                <p class="downMess uploadMess">3.上传填写完毕的文件</p>
                <upload
                    class="avatar-uploader"
                    :showlist="false"
                    :drag='true'
                    accept='.xls,.xlsx'
                    :onSuccess = "coverSuccess"
                    :config= "{fileType:2,temp:true}"
                    >
                        <div class="avatar">
                            <p class="iconfont">&#xe614;</p>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                </upload>
                <span class="file-list">
                    <div
                        :style="{marginBottom: '10px', width: '360px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}"
                        v-for="(item, j) in dataList"
                        :key="j"
                        >
                        <div>
                            <el-input :style="{width: '200px'}" v-model="item.name"></el-input>
                        </div>
                        <span :style="{cursor: 'pointer'}" @click="remove(j)" >
                            <el-icon class="el-icon-close"></el-icon>
                        </span>
                    </div>
                </span>

                <span class="a" v-if="this.dataList.length>0" @click="submit('userMessage')" v-loading="loading">提交</span>
            </div>
        </div>
        <!-- 成功的弹窗 -->
        <ok :show='show' v-if="show" :close='close'/>
    </div>
</template>

<script>
import upload from '@@/components/fileUpload'
import ok from './ok.vue'
import {getUserInfo} from '@@/utils/commons.js'
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            userInfo: {
                idcardName: ''
            },
            userMessage:{},
            labelPosition:'left',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
                ],
                school: [
                    { required: true, message: '请输入学校', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请输入部门', trigger: 'blur' }
                ],
                business: [
                    { required: true, message: '请输入职务', trigger: 'blur' }
                ],
            },
            dataList:[],
            show: false,
            loading: false
        }
    },
    created(){
            this.userInfo = getUserInfo() || {idcardName:'管理员'}
    },
    components:{
        upload,
        ok,
    },
    methods:{
        async init(){
            if(this.userMessage.tel.length!=11) return;
            let res = await network.getSchoolApply({data:{
                type: 6,
                id: 0,
                userId: this.userMessage.tel
            }});
            if(res=='error') return;
            this.userMessage = res.userMessage
            this.dataList = res.dataList
        },
        remove(j){
            this.dataList.splice(j, 1);
        },
        coverSuccess(file,fileList){
            this.dataList.push({
                name:fileList.name,
                info:file.location
            })
        },
        submit(formName){
            this.show = true;
            this.$refs[formName].validate(async (valid, obj) => {
                if(!valid) return;
                this.loading = true
                let data ={
                    userMessage: this.userMessage,
                    dataList: this.dataList
                }

                let res = await network.setSchoolApply({data:{
                    competitionId: 0,
                    id: 0,
                    type:6,
                    userId: this.userMessage.tel,
                    html: data
                }})
                this.loading = false;
                if(res=='error') return;
                this.show = true;
            })
        },
        close(){
            this.show = false
        }
    }
}
</script>



<style scoped>
.protocol{
    width: 100%;
    height: 100%;
    min-width: 1600px;
    color: #000;
    background-image: url(./common/bg_left.png),url(./common/bg_right.png);
    background-repeat: no-repeat, no-repeat;
    background-position:left 165px,right top;
    background-color: #ffffff;
    padding-bottom: 100px;
}
.main{
    width:1200px;
    margin: 0 auto; 
}
.mainMessage{
    width: 477px;
    height: auto;
    text-align: left;
    overflow: hidden;
}
.logo{
    margin: 45px 0 13px;
    height: 78px;
    width: 100%;
}
.logo img{
    height: 100%;
    width: auto;
}
h1{
    font-size: 32px;
    color: #4A4A4A;
    letter-spacing: 3.56px;
}
.fontMess{
    font-size: 16px;
    color: #818181;
    letter-spacing: 3px;
    line-height: 29px;
    margin: 20px 0 94px;
}
.downMess{
    font-size: 16px;
    color: #1890FF;
    letter-spacing: 3px;
}
.a{
    display: block;
    width: 105px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background: #1890FF;
    border-radius: 17px;
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 18px;
    cursor: pointer;
}
.a:hover{
    color: #ffffff;
}
.uploadMess{
    margin: 65px 0 16px;
}
.avatar{
    margin-top: 35px;
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    line-height: 24px;
}
.avatar .iconfont{
    font-size: 48px;
    color: #1890FF;
    line-height: 48px;
    margin-bottom: 20px;
}
.el-form{
    margin: 13px 0 32px;
}
</style>
<style>
.protocol .el-upload-dragger{
    background-color: rgba(0,0,0,0.02) !important;
}
</style>


