<template>
    <div class="trainCert">
        <div class="top">
            <div class="topBotton" v-show="type==0"  v-if="!nextShow">
                <span @click="setCert(0)">保存</span>
                <span @click="preview">预览</span>
            </div>
            <div class="topBotton" v-show="type==0"  v-else>
                <span @click="nextShow=false">上一步</span>
                <span @click="setCert(1)">发布</span>
            </div>
            <div class="setState" v-show="type==0" v-if="!nextShow">
                <span>1</span>
                <span>证书设置</span>
                <span><i class="el-icon-arrow-right"></i></span>
                
                <span>2</span>
                <span>证书预览</span>
            </div>
            <div class="setState"  v-show="type==0" :class="{'changeColor':nextShow}" v-else>
                <!-- <span :class="{'changeColor':nextShow}">1</span> -->
                <i class="el-icon-circle-check"></i>
                <span :class="{'changeColor':nextShow}">选择模版</span>
                <span><i class="el-icon-arrow-right"></i></span>
                
                <span :class="{'fontColor':nextShow}">2</span>
                <span :class="{'fontColor':nextShow}">证书预览</span>
            </div>

        </div>
        
        <div class="connent">
            <p class="rule" v-show="type==0" v-if="!nextShow">
                <span>*</span>
                <span>编号规则：</span>
                <span @click="setrules=true">设置</span>
                <span>设置证书编号生成规则</span>
            </p>
            <div class="upCert" v-show="type==0" v-if="!nextShow">
                <p class="bacImg">背景图片:</p>
                
                <div class="upCertRight" @mouseenter="changeMark" @mouseleave="mark=false">
                    <upload
                        :drag='true'
                        class="logouploader"
                        :showlist="false"
                        accept=".jpg"
                        :onSuccess="handleAvatarSuccess"
                        :beforeUpload="beforeAvatarUpload">
                        <!-- <div class="logoimg" v-if="backUrl">
                            <img :src="backUrl" class="avatar">
                            <i class="iconfont detail" @click.stop="backUrl=''" >&#xe61e;</i>
                        </div>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        <div class="upImg" v-if="backUrl">
                            <img :src="backUrl" alt="">
                        </div>
                        <div class="avatar" v-else>
                            <p class="iconfont icon-icon-uploadExcel"><i class="el-icon-upload"></i></p>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                        <div class="noticeMark" v-if="mark">
                            <p>+</p>
                            <p>替换图片</p>
                        </div>
                    </upload>
                    <p class="standard">尺寸3508*2480PX（横版）</p>
                    <p class="upBottom">上传背景图可自定义背景，
                        &nbsp;   &nbsp;     &nbsp;   &nbsp;        
                        为保证印刷效果，请按照尺寸上传</p>
                    
                </div>
                
            </div>
            <div class="certBacImg" v-if="type==0">
                
                <img :src='backUrl'  v-if="nextShow" alt="">
                <img :src='certImg' v-else alt="">
                <p class="school">
                    <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;校:</span><span>&nbsp;&nbsp;(组织名称)</span>
                </p>
                <p class="teacher">
                    <span>指导老师:</span><span>&nbsp;&nbsp;(指导老师)</span>
                </p>
                <div class="Qcode">
                    <div></div>
                    <p>证书编号</p>
                    <p>{{certNum}}XXXX</p>
                </div>
            </div>
            <div class="certBacImg" v-else>
                
                <img :src='certImg' alt="">
                <p class="school">
                    <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;校:</span><span>&nbsp;&nbsp;(组织名称)</span>
                </p>
                <p class="teacher">
                    <span>指导老师:</span><span>&nbsp;&nbsp;(指导老师)</span>
                </p>
                <div class="Qcode">
                    <div></div>
                    <p>证书编号</p>
                    <p>{{certNum}}XXXX</p>
                </div>
            </div>
        </div>
        <el-dialog  title="设置证书编号规则"  :append-to-body='true' :visible.sync="setrules"  width="30%"  >
           <div class="setrules">
               <p>添加自定义字段<span></span></p>
               <el-input v-model="certNum" maxlength="8" autocomplete="off"></el-input>
               <p>预览编号：<span>{{ certNum }}XXXX</span></p>
           </div>
           <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setrules = false">确 定</el-button>
            </div>
        </el-dialog>
        
        
    </div>
</template>
<script>

// import api from '~src/api/api.js'
import upload from '@@/components/fileUpload'
import network from "@/api/jxapi/index";
export default {
    props:['trainId','type'],
    data() {
        
        return {
            setrules:false,
            backUrl:'',
            mark:false,
            certImg:'https://web.moocollege.com/template/%E5%A5%96%E7%8A%B6%E6%A8%A1%E6%9D%BF3.jpg',
            certNum:'',
            nextShow:false,
            
        }
    },
    components: {
        upload
      
    },
    async created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.groupType = localStorage.getItem('groupType')
        
        //  this.getData()
        
        
    
    },
    mounted() {
        
    },
    computed:{

    },
    methods:{
        getData(){
            let data = {
                trainingId:this.trainId,
            }
            
            let res = network.getTrainCert({data})
            if(res=='error') return;
            // console.log(res)
            res.then(data =>{
                this.backUrl = data.backGroundUrl
                this.certNum = data.prefix

            })
            
            // api.get('Api/web/training/get',data).then(res =>{
            //     if(res){
            //         this.backUrl = res.backGroundUrl
            //         this.certNum = res.prefix
            //     }
                
            // })
        },
        setCert(certificateStatus){
            if(!this.certNum){
                this.$message.info('请设置证书编号')
                return
            }
            if(!this.backUrl){
                this.$message.info('请上传证书背景图')
                return
            }
            if(certificateStatus==1){
                this.$confirm('请确认是否发布证书，证书发布后不可修改。证书下载功能将在培训结束后对用户开放。', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    let data = {
                        trainingId:this.trainId,
                        backGroundUrl:this.backUrl,
                        domain:document.domain.split('.').splice(1).join('.'),
                        prefix:this.certNum,
                        certificateStatus:certificateStatus==1?'1':'0'
                    }
                    let res = network.setTrainCert({data})
                    if(res=='error') return;
                    this.$message.success('证书发布成功')
                    this.$emit('closeCert')
                    // api.post('Api/web/training/set',data).then(res =>{
                    //     console.log(res)
                    //     this.$message.success('证书发布成功')
                    //     this.$router.back()
                    // })
                    
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }else{
                let data = {
                    trainingId:this.trainId,
                    backGroundUrl:this.backUrl,
                    domain:document.domain.split('.').splice(1).join('.'),
                    prefix:this.certNum,
                    certificateStatus:certificateStatus==1?'1':'0'
                }
                let res = network.setTrainCert({data})
                    if(res=='error') return;
                    this.$message.success('证书保存成功')
                    this.$emit('closeCert')
                // api.post('Api/web/training/set',data).then(res =>{
                //         this.$message.success('证书保存成功')
                //         this.$router.back()
                    
                // })
            }
            
            
        },
        //预览
        preview(){
            if(!this.certNum){
                this.$message.info('请设置证书编号')
                return
            }
            if(!this.backUrl){
                this.$message.info('请上传证书背景图')
                return
            }
            this.nextShow = true
            
        },
        changeMark(){
            if(this.backUrl){
                this.mark = true
            }
        },
        beforeAvatarUpload(file){
            let _this = this
            const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';

            if (!isPNG) {
                this.$message.error('上传图片的格式只能是 jpg或png 格式!');
            }
            const isSize = new Promise(function(resolve, reject) {
                let width = 2480;
                let height = 3508;
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.onload = function() {
                        if(_this.templateId==5 || _this.templateId==6){
                            let valid = img.width == width && img.height == height;
                            valid ? resolve() : reject();
                        }else{
                            let valid = img.width == height && img.height == width;
                            valid ? resolve() : reject();
                        }
                }
                img.src = _URL.createObjectURL(file);
            }).then(() => {
                    return file;
            }, () => {
                    this.$message.error('上传的图片宽高必须是2480*3508或3508＊2480!');
                    return Promise.reject();
            });
            return isPNG && isSize;
        },
        handleAvatarSuccess(res){
            this.backUrl = res.location;
        }
        
        
       
        
        
    },
    // metaInfo: {
    // }
}
</script>

<style lang="less">
.trainCert{
    // width: 110%;
    padding-left: 50px;
    padding-right: 35px;
    background: #fff;
    padding-bottom: 50px;
    
    .top{
        border-bottom: 1px solid #EAEAEA;
        .goBack{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #4A4A4A;
            letter-spacing: 1.5px;
            cursor: pointer;
            padding-top: 30px;
            padding-bottom: 30px;
            display: inline-block;
        }
        .changeColor{
            color: #5CB87A;
        }
        .topBotton{
            display: inline;
            padding: 30px;
            
            span{
                width: 65px;
                height: 32px;
                display: inline-block;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4A4A4A;
                letter-spacing: 1.5px;
                border: 1px solid #D9D9D9;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                line-height: 32px;
                &:hover{
                    background: #1890FF;
                    color: #fff;
                    border: none;
                }
            }
        }
        .setState{
            margin-top: 15px;
            margin-bottom: 25px;
            display: inline-block;
            background: #F5F7FA;
            border-radius: 4px;
            margin-left: 180px;
            padding-left: 80px;
            height: 54px;
            line-height: 54px;
            .changeColor{
                color: #5CB87A;
            }
            .fontColor{
                color: #303133 !important;
            }
            i{
                // font-size: 24px;
            }
            span{
                display: inline-block;
                font-family: Helvetica;
                font-size: 16px;
                color: #303133;
                letter-spacing: 0;
                text-align: center;
                
                &:first-child{
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    line-height: 24px;
                    border: 1px solid #303133;
                    margin-right: 15px;
                }
                &:nth-child(3){
                    margin-left: 55px;
                    color: #909399;

                }
                &:nth-child(4){
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    line-height: 24px;
                    border: 1px solid #909399;
                    margin-right: 15px;
                    color: #909399;
                    margin-left: 80px;
                }
                &:nth-child(5){
                    // margin-left: 15px;
                    color: #909399;
                    margin-right: 60px;
                }
            }
        }
    }
    .connent{
        margin-top: 30px;
        .rule{
            margin-bottom: 20px;
            span{
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                &:first-child{
                    font-family: SourceHanSansCN-Regular;
                    font-size: 14px;
                    color: #CB3A4C;
                    letter-spacing: 0;
                }
                &:nth-child(2){
                    color: #4A4A4A;
                }
                &:nth-child(3){
                    cursor: pointer;
                    color: #4A4A4A;
                    display: inline-block;
                    width: 65px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid #D9D9D9;
                    border-radius: 4px;
                    margin-left: 10px;
                    margin-right: 10px;
                }
                &:nth-child(4){
                    color: #9B9B9B;
                }
            }
        }
        .upCert{
            position: relative;
            .bacImg{
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0;
                display: inline-block;
                float: left;
                margin-left: 12px;
            }
            .upCertRight{
                width: 240px;
                height: 100px;
                display: inline-block;
                margin-left: 12px;
                .el-el-upload{
                    width: 100%;
                    height: 100%;
                    margin-top: 0;
                    .el-upload{
                        height: 98px;
                        width: 238px;
                        .el-upload-dragger{
                            width: 100%;
                            height: 100%;
                            // border: none;
                            .el-icon-upload{
                                color: #1890FF;
                                margin: 0;
                                font-size: 48px;
                            }
                        }
                    }
                }
                .logouploader{
                    .avatar{
                        font-size: 16px;
                        color: rgba(0,0,0,0.85);
                        line-height: 24px;
                        p:nth-child(2){
                            font-size: 12px;
                        }
                    }
                    .avatar .iconfont{
                        font-size: 48px;
                        color: #1890FF;
                        line-height: 48px;
                        margin-top: 20px;
                    }
                    .upImg{
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    
                }
            }
            .standard{
                width: 238px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                background: #F0F0F0;
                border-radius: 5px;
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 1px;
                margin-top: 10px;
            }
            .upBottom{
                width: 225px;
                height: 66px;
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                color: #9B9B9B;
                letter-spacing: 1px;
                line-height: 22px;
            }
        }
        .certBacImg{
            // width: 1069px;
            height: 647px;
            // margin-left: 80px;
            margin-top: 30px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            p{
                font-family: AlibabaPuHuiTiM;
                font-size: 24px;
                color: #4A4A4A;
                letter-spacing: 0;
            }
            .school{
                position: absolute;
                left: 183px;
                top: 230px;
                letter-spacing: 0.33px;
            }
            .teacher{
                position: absolute;
                left: 183px;
                top: 291px;
            }
            .Qcode{
                position: absolute;
                top: 78px;
                right: 78px;
                div{
                    width: 114px;
                    height: 114px;
                    background: #fff;
                }
                p{
                    font-family: AlibabaPuHuiTiR;
                    font-size: 14.25px;
                    color: #4A4A4A;
                    letter-spacing: 0;
                }
            }
        }
    }
}
.setrules{
    p{
        font-size: 14px;
        color: #4A4A4A;
        line-height: 20px;
        margin: 20px 0;
        span{
            font-size: 12px;
        }
    }
}
</style>
