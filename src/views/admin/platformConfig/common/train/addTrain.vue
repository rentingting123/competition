<template>
    <div class="addTrain">
        <div class="connent">
            <div class="cont">
                <div class="addTitles">
                    <p class="everTitle">
                        <span>*</span>
                        <span>添加标题</span>
                        <span>最大40个字符</span>
                    </p>
                    <div class="titleInput">
                        <input type="text" maxlength="40" v-model="trainTitle" name="">
                    </div>
                </div>
                <div v-if="false" class="addTitles" style="margin-top:60px;">
                    <p class="everTitle">
                        <span>*</span>
                        <span>培训省份</span>
                    </p>
                    <div class="labelTag" style="margin-left:12px;margin-top:5px;">
                        <el-select :disabled="groupType==7" v-model="provinceValue" @change="selectProce" placeholder="请选择">
                            <el-option
                            v-for="item in provinceList"
                            :key="item.provinceId"
                            :label="item.province"
                            :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="addLabel">
                    <p class="everTitle">
                        <span></span>
                        <span>培训标签</span>
                        <span>最多选择3个</span>
                    </p>
                    <div class="labelTag" style="margin-top:8px;">
                        <tags v-if="basicTags"   @transTags="homeObtainTags"  :titleTags="basicTags" :tagsNumber='tagsNumber' />
                    </div>
                </div>
                <div class="up">
                    <p>上传封面图</p>
                    <div class="noticeup" @mouseenter="changeMark" @mouseleave="mark=false">
                        <notice
                        :showlist="false"
                        drag
                        accept=".jpg,.png,.gif"
                        :onSuccess='upSuccess'
                        >

                            <div class="upImg" v-if="coverChart">
                                <img :src="coverChart" alt="">
                            </div>
                            <div class="avatar" v-else>
                                <p class="iconfont icon-icon-uploadExcel"><i class="el-icon-upload"></i></p>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                            <div class="noticeMark" v-if="mark">
                                <p>+</p>
                                <p>替换图片</p>
                            </div>
                            
                        </notice>
                        
                        
                    </div>
                    <p class="upType">1024kb以下，尺寸不得低于480*270Px，jpg/png/gif格式文件</p>
                </div>
                <div class="signTime">
                    <p class="everTitle">
                        <span>*</span>
                        <span>报名时间</span>
                        <span>请精确到分钟</span>
                    </p>
                    <div class="startTime">
                        <el-date-picker
                            v-model="signValue1"
                            type="datetime"
                            value-format='yyyy-MM-dd HH:mm:ss'
                            placeholder="开始时间">
                        </el-date-picker>
                    </div>
                    <div class="endTime">
                        <el-date-picker
                            v-model="signValue2"
                            type="datetime"
                            value-format='yyyy-MM-dd HH:mm:ss'
                            placeholder="结束时间">
                        </el-date-picker>
                    </div>

                </div>
                <div class="signTime">
                    <p class="everTitle">
                        <span>*</span>
                        <span>培训时间</span>
                        <span>请精确到分钟</span>
                    </p>
                    <div class="startTime">
                        <el-date-picker
                            @change='changStatime'
                            v-model="signValue3"
                            type="datetime"
                            value-format='yyyy-MM-dd HH:mm:ss'
                            placeholder="开始时间">
                        </el-date-picker>
                    </div>
                    <div class="endTime">
                        <el-date-picker
                            v-model="signValue4"
                            type="datetime"
                            value-format='yyyy-MM-dd HH:mm:ss'
                            placeholder="结束时间">
                        </el-date-picker>
                    </div>

                </div>
                <div class="trainAdress">
                    <p class="everTitle">
                        <span>*</span>
                        <span>培训地点</span>
                    </p>
                    <div class="titleInput">
                        <input type="text" placeholder="请填写地址" v-model="trainAddress" name="">
                    </div>
                </div>
                <div class="Meeting">
                    <p class="everTitle">
                        <span>*</span>
                        <span>会议规模</span>
                        <span>请输入会议最大规模人数，报名至上限后将截止报名</span>
                    </p>
                    <div class="nubInpur">
                        <div><input type="number" placeholder="请填写数字" v-model="meetNum"></div>
                        <span>人</span>
                    </div>
                </div>
                <div class="trainAdress">
                    <p class="everTitle">
                        <span>*</span>
                        <span>主办单位</span>
                    </p>
                    <div class="titleInput">
                        <input type="text" v-model="organizerName"  placeholder="请填写主办单位" name=""> 
                    </div>
                    <i class="iconfont" @click="addOrgan">&#xe661;</i>
                    <div v-for="(item,index) in organizers" :key="`${index}+'organizers'`">
                        <div class="titleInput">
                            <input type="text" v-model="item.organizerName" placeholder="请填写主办单位" name=""> 
                        </div><i class="iconfont" @click="delOrgan(index)" style="margin-left:16px;">&#xe635;</i>
                    </div>
                    
                    <div class="organizerItem">
                        <div class="titleInput">
                            <input type="text" v-model="organizerTitle" maxlength="6" placeholder="请填写标题" name=""> 
                        </div><i class="iconfont" @click="addOrganTitle">&#xe661;</i>
                        <div class="titleInput">
                            <input type="text" v-model="organizerConnet" placeholder="请填写内容" name=""> 
                        </div>
                    </div>
                    <div class="organizerItem" v-for="(item,index) in organizerList" :key="index">
                        <div class="titleInput">
                            <input type="text" v-model="item.title" maxlength="6" placeholder="请填写标题" name=""> 
                        </div><i @click="delOrganTitle(index)" class="iconfont">&#xe635;</i>
                        <div class="titleInput">
                            <input type="text" v-model="item.info" placeholder="请填写内容" name=""> 
                        </div>
                    </div>
                </div>
                <div class="Meeting">
                    <p class="everTitle">
                        <span>*</span>
                        <span>价格</span>
                        <span>填写0元则为免费</span>
                    </p>
                    
                    <div class="nubInpur">
                        <div><input type="number" v-model="trainPrice" placeholder="请填写数字"></div>
                        <span>元</span>
                    </div>
                </div>
                <div class="registerFrom">
                    <p class="everTitle">
                        <span>*</span>
                        <span>设置报名表</span>
                    </p>
                    <registerFrom @transmitTableData="transmitTableData" :getData='signupFieldList'/>
                </div>
                <div class="registerPay">
                    <p class="everTitle">
                        <span>*</span>
                        <span>设置报名交费</span>
                    </p>
                    <div class="sett" @click="trainPayShow=true">设置</div>
                </div>
                <div class="expert">
                    <p class="exTitle">行业专家</p>
                    <div class="exConnent">
                        <div class="left">
                            <div class="addicon" @click="train_dialog=true">+</div>
                        </div>
                        <div class="right">
                            <ul>
                                <li v-for="(item,index) in expertDtos" :key="item.expertPhone">
                                    <div @mouseenter="selectIndex=item.expertPhone" @mouseleave="selectIndex=''">
                                        <img :src="item.heardUrl" alt="">
                                        <div v-if="selectIndex==item.expertPhone" @click="delExpert(index)">
                                            删除
                                        </div>
                                    </div>
                                    
                                    <p class="name">{{item.expertName}}</p>
                                    <p class="school">{{item.expertSchool}}</p>
                                </li>
                                
                                
                            </ul>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div class="noticeFile">
                    <p>通知文件</p>
                    <div class="notfup">
                        <notice
                        accept=".doc, .docx, .pdf, .jpg, .png, .gif"
                        drag
                        :onSuccess='upSuccess2'
                        :onRemove ='onRemove2'
                        :fileList="noticeFileUrl"
                        >

                            
                            <div class="avatar">
                                <p class="iconfont icon-icon-uploadExcel"><i class="el-icon-upload"></i></p>
                                <p>点击或将文件拖拽到这里上传</p>
                                <span>支持扩展名：doc .docx .pdf .jpg.png.gif</span>
                            </div>
                        </notice>
                    </div>
                    
                </div>
                <div class="noticeFile">
                    <p>会议资料</p>
                    <div class="notfup">
                        <notice
                        accept=".doc, .docx, .pdf, .jpg, .png, .gif"
                        drag
                        :onSuccess='upSuccess3'
                        :onRemove ='onRemove3'
                        :fileList="meetingFileUrl"
                        >

                            
                            <div class="avatar">
                                <p class="iconfont icon-icon-uploadExcel"><i class="el-icon-upload"></i></p>
                                <p>点击或将文件拖拽到这里上传</p>
                                <span>支持扩展名：doc .docx .pdf .jpg.png.gif</span>
                            </div>
                        </notice>
                    </div>
                    
                </div>
                <div class="noticeFile">
                    <p>会议回顾</p>
                    <div class="banNotice">
                        <div class="banNoticeBack" @click="meetings_dialog=true">+</div>
                        <!-- <notice
                        :showlist="false"
                        accept=".jpg,.png,.gif"
                        :onSuccess='cagenUpSuccess'>
                        
                        </notice> -->
                    </div>
                    <div class="banList" v-for="(item,index) in meetList" :key="`${item.url+item.title}`"  @mouseenter="changecagenMark(index)" @mouseleave="cAgenMarkIndex=''">
                        <img :src="item.url" alt="">
                        <div class="banMark" v-if="cAgenMarkIndex===index" >
                            <p>
                                <span @click="delmeet(index)">删除</span>
                                <span @click="modifymeet(index,item)">修改</span>
                            </p>
                            
                        </div>
                        <p class="pover" >{{item.title}}</p>

                    </div>
                    <div style="clear:both"></div>
                    
                </div>
                
                <div class="btn">
                    <div class="sub" @click="submitTrain">发 布</div>
                    <preTrain v-if="false" :message='preData' @getData ='getData'></preTrain>
                </div>
            </div>
            <el-dialog
            class="perDialog"
            :append-to-body='true'
            :show-close = false
            :visible.sync="train_dialog"
            :close-on-click-modal= false
            width="800px">
                <div class="title">
                    <p>添加专家</p>
                </div>
                <div class="ups">
                    <p>上传专家头像</p>
                    <div class="noticeup" @mouseenter="changeMark2" @mouseleave="mark2=false">
                        <notice
                        :showlist="false"
                        accept=".jpg,.png,.gif"
                        :onSuccess='upSuccess4'
                        >

                            <div class="upImg" v-if="heardUrl">
                                <img :src="heardUrl" alt="">
                            </div>
                            <div class="avatars" v-else>
                                <p>+</p>
                            </div>
                            <div class="noticeMark" v-if="mark2">
                                <p>+</p>
                                <p>替换头像</p>
                            </div>
                            
                        </notice>
                        
                        
                    </div>
                    <p class="upType">180x180像素以上</p>
                    <div class="inputAll">
                        <div class="inputLine">
                            <p class="everTitles">
                                <span>*</span>
                                <span>专家姓名</span>
                            </p>
                            <div class="addExpertInput">
                                <input type="text" v-model="expertName" placeholder="请输入专家姓名">
                            </div>
                        </div>
                        <div class="inputLine">
                            <p class="everTitles">
                                <span>*</span>
                                <span>院校</span>
                            </p>
                            <div class="addExpertInput">
                                <input type="text"  v-model="expertSchool" placeholder="请输入专家院校">
                            </div>
                        </div>
                        <div class="inputLine">
                            <p class="everTitles">
                                <span>*</span>
                                <span>职称</span>
                            </p>
                            <div class="inputTag">
                                <tags @transTags="obtainTags"  :titleTags="expertList"/>
                            </div>
                        </div>
                        <div class="inputLine">
                            <p class="everTitles">
                                <span>*</span>
                                <span>手机号</span>
                            </p>
                            <div class="addExpertInput">
                                <input type="text" v-model="expertPhone" placeholder="请输入专家手机号">
                            </div>
                        </div>
                    </div>
                    
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="train_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="subExpert" >确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
            :show-close = false
            :append-to-body='true'
            :visible.sync="meetings_dialog"
            :close-on-click-modal= false
            class="mettings"
            width="800px">
                <div class="title">
                    <p>会议回顾</p>
                </div>
                <div class="mettContent">
                    <div class="addTitle">
                        <p class="everTitle">
                            <span>*</span>
                            <span>添加标题</span>
                            <span>最大40个字符</span>
                        </p>
                        <div class="titleInput">
                            <input type="text" maxlength="40" v-model="meetTitle" name="">
                        </div>
                    </div>
                    <div class="up">
                        <p style="padding-left:14px;">上传封面图</p>
                        <div class="noticeup" @mouseenter="changeMark4" @mouseleave="mark4=false">
                            <notice
                            :showlist="false"
                            drag
                            accept=".jpg,.png,.gif"
                            :onSuccess='meetUpSuccess'
                            >

                                <div class="upImg" v-if="meetFile">
                                    <img :src="meetFile" alt="">
                                </div>
                                <div class="avatar" v-else>
                                    <p class="iconfont icon-icon-uploadExcel"><i class="el-icon-upload"></i></p>
                                    <p>点击或将文件拖拽到这里上传</p>
                                </div>
                                <div class="noticeMark" v-if="mark4">
                                    <p>+</p>
                                    <p>替换图片</p>
                                </div>
                                
                            </notice>
                            
                            
                        </div>
                        <p class="upType">200kb以下，jpg/png/gif格式文件</p>
                    </div>
                    <div class="addcontent">
                        <p>
                            <span></span>
                            <span style="padding-left:14px;">添加内容</span>
                        </p>
                        <div class="addeditor">
                            <Editors class="i-text" :setDate="setStateData" :stateData="stateData.news"></Editors>
                        </div>
                        
                    </div>
                </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="passMeet">取 消</el-button>
                    <el-button type="primary" @click="subExpert2" >确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
            class="trainPayAll"
            :show-close = false
            :visible.sync="trainPayShow"
            :append-to-body='true'
            :close-on-click-modal= false
            width="800px">
                <div class="title">
                    <p>报名交费设置</p>
                </div>
                <div class="trainPay">
                    <p>
                        <span style="float:left">在线报名费支付功能：</span>
                        <el-switch
                        style="float:right"
                            v-model="payValue1"
                            >
                        </el-switch>
                        
                    </p>
                    <div style="clear:both"></div>
                    <div class="payRule" style="display:none">
                        <p>
                            <span>*</span>
                            <span>收费规则：</span>
                            <span>每人</span>
                            <span>
                                <input type="number" v-model="payNum" placeholder="请输入单价">
                            </span>
                            <span>元</span>
                            
                        </p>
                    </div>
                    <p style="margin-top:30px;">
                        <span style="float:left">线下报名费支付功能：</span>
                        <el-switch
                        style="float:right"
                            v-model="payValue2"
                            >
                        </el-switch>
                    </p>
                    <div style="clear:both"></div>
                    <div class="payRule">
                        <p>
                            <span>*</span>
                            <span>户名：</span>
                            <span></span>
                            <span>
                                <input type="text" v-model="accName" placeholder="请输入户名">
                                <!-- <input type="text" v-model="payNum" placeholder="请输入户名"> -->
                            </span>
                        </p>
                        <p>
                            <span>*</span>
                            <span>账号：</span>
                            <span></span>
                            <span>
                                <input type="text" v-model="accNumber" placeholder="请输入账号">
                                <!-- <input type="text" v-model="payNum" placeholder="请输入账号"> -->
                            </span>
                        </p>
                        <p>
                            <span>*</span>
                            <span style="margin-right:12px;">开户行：</span>
                            <span></span>
                            <span>
                                <input type="text" v-model="bankAdress" placeholder="请输入开户行">
                                <!-- <input type="text" v-model="payNum" placeholder="请输入开户行"> -->
                            </span>
                        </p>
                        
                    </div>
                    
                </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="trainPayShow = false">取 消</el-button>
                    <el-button type="primary"  @click="trainPayShow = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        
        
        
    </div>
</template>
<script>
import notice from '@@/components/fileUpload/notice.vue'
import Editors from '@@/components/editor/index.vue'
import tags from '../tags.vue'
import registerFrom from './common/regFrom'
import preTrain from './common/preTrain'
import network from "@/api/jxapi/index";
import {checkPhone} from '@@/utils/util'
import moment from 'moment'
// import api from '~src/api/api.js'
// import webapi from '~src/api/webapi.js'
export default {
    props:['trainId'],
    data() {
        
        return {
            meetingIndex:null,
            province:{},
            provinceValue:null,
            provinceObj:{
                province:'',
                provinceId:''
            },
            provinceList: [
            ],
            tagsNumber:3, //标签个数
            province:null,
            basicTags:[], //标签
            coverChart:'', //封面图
            trainAddress:'', //培训地点
            meetNum:Number, //会议规模人数
            trainPrice:'', //培训价格
            expertList:[], //添加专家tag
            heardUrl:'', //专家头像
            expertDtos:[], //专家列表
            noticeFileUrl:[], // 通知文件
            meetingFileUrl:[], //会议资料
            meetings_dialog:false, //会议回顾弹窗
            trainTitle:'',
            payValue1:true,
            payValue2:true,
            payNum:Number,
            accName:'',
            accNumber:'',
            bankAdress:'',
            trainPayShow:false,
            selectIndex:'',
            signValue1:'',
            signValue2:'',
            signValue3:'',
            signValue4:'',
            mark:false,
            mark2:false,
            train_dialog:false,
            notfup:{},
            
            titleTags:[],
            expertName:'',
            expertSchool:'',
            expertPhone:'',
           
            organizerList:[],
            organizerListto:[],
            organizers:[],
            organizersto:[],
            organizerName:'',
            organizerTitle:'',
            organizerConnet:'',
            meetList:[], //会议回顾
            cAgenMarkIndex:'', //会议回顾下标
            meetTitle:'', //会议回顾标签
            mark4:false,
            itemMeet:{},
            meetFile:'',
            stateData: {
                icon: '',
                
            },
            preData:{}, //预览数据
            signupFieldList:[], //报名表
            //默认图片
            defaultUrl:[
                'https://web.moocollege.com/webFile/2019828/55072c3e76ad11e9bb8a00163e040299/ybC6T9DK_1566954809715.jpg',
                'https://web.moocollege.com/webFile/2019828/55072c3e76ad11e9bb8a00163e040299/vlsHIAl8_1566954822541.jpg',
                'https://web.moocollege.com/webFile/2019828/55072c3e76ad11e9bb8a00163e040299/hPPBmIi7_1566954834834.jpg',
                'https://web.moocollege.com/webFile/2019828/55072c3e76ad11e9bb8a00163e040299/KrlKYJT1_1566954850095.jpg',
                'https://web.moocollege.com/webFile/2019828/55072c3e76ad11e9bb8a00163e040299/8ApymjFG_1566954863489.jpg'
            ],
            groupType:'',
            competitionId:null,
            detaileData:null,
            delFlag:false
        }
    },
    components: {
        notice,
        tags,
        registerFrom,
        Editors,
        preTrain
      
    },
    async created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.groupType = localStorage.getItem('groupType')
        this.competitionId = JSON.parse(localStorage.getItem('competitionId'))
        // this.getProvinceList()
        this.getData()
        
    
    },
    mounted() {
        // console.log(this.trainId)
        
    },
    computed:{

    },
    methods:{
        getDetailes(){
            let data = {
                id:this.trainId,
                
            }
            let obj = network.selectTrainingDetail({data})
            if(obj=='error') return
            obj.then(res =>{
                this.detaileData = res
                this.trainTitle = this.detaileData.name
                this.basicTags = this.detaileData.tags
                this.coverChart = this.detaileData.bannerUrl
                this.signValue1 = this.getTimes(this.detaileData.signupBeginTime)
                this.signValue2 = this.getTimes(this.detaileData.signupEndTime) 
                this.signValue3 = this.getTimes(this.detaileData.trainingBeginTime) 
                this.signValue4 = this.getTimes(this.detaileData.trainingEndTime)
                this.trainAddress = this.detaileData.trainingAddr
                this.meetNum = this.detaileData.maxNum
                this.organizerName = this.detaileData.sponsorDtos[0]
                let arr = []
                this.detaileData.sponsorDtos.splice(1).forEach(ele =>{
                    arr.push({organizerName:ele})
                })
                this.organizers = arr
                this.organizerTitle = this.detaileData.descrption[0].title
                this.organizerConnet = this.detaileData.descrption[0].info
                
                this.organizerList = this.detaileData.descrption.splice(1)
                this.trainPrice = this.detaileData.price
                this.expertDtos = this.detaileData.expertDtos
                this.noticeFileUrl = this.detaileData.noticeFileUrl==null?[]:this.detaileData.noticeFileUrl
                this.meetList = this.detaileData.mettingList
                this.meetingFileUrl = this.detaileData.meetingFileUrl==null?[]:this.detaileData.meetingFileUrl
                this.accName = this.detaileData.payAccount
                this.bankAdress = this.detaileData.payAddress
                this.accNumber = this.detaileData.payNumber
                this.payValue1 = this.detaileData.outlinePay.indexOf(1)!=-1
                this.payValue2 = this.detaileData.outlinePay.indexOf(2)!=-1
                this.signupFieldList = this.detaileData.signupFieldList
                let obj = {
                    province:this.detaileData.province,
                    provinceId:this.detaileData.provinceId
                }
                this.provinceObj = obj
                this.provinceValue = res.province

            })
            // api.get('Api/training/selectTrainingDetail',data).then(res =>{
            //     this.trainTitle = res.name
            //     this.basicTags = res.tags
            //     this.coverChart = res.bannerUrl
            //     this.signValue1 = this.getTimes(res.signupBeginTime)
            //     this.signValue2 = this.getTimes(res.signupEndTime) 
            //     this.signValue3 = this.getTimes(res.trainingBeginTime) 
            //     this.signValue4 = this.getTimes(res.trainingEndTime)
            //     this.trainAddress = res.trainingAddr
            //     this.meetNum = res.maxNum
            //     this.organizerName = res.sponsorDtos[0]
            //     let arr = []
            //     res.sponsorDtos.splice(1).forEach(ele =>{
            //         arr.push({organizerName:ele})
            //     })
            //     this.organizers = arr
            //     this.organizerTitle = res.descrption[0].title
            //     this.organizerConnet = res.descrption[0].info
                
            //     this.organizerList = res.descrption.splice(1)
            //     this.trainPrice = res.price
            //     this.expertDtos = res.expertDtos
            //     this.noticeFileUrl = res.noticeFileUrl==null?[]:res.noticeFileUrl
            //     this.meetList = res.mettingList
            //     this.meetingFileUrl = res.meetingFileUrl==null?[]:res.meetingFileUrl
            //     this.accName = res.payAccount
            //     this.bankAdress = res.payAddress
            //     this.accNumber = res.payNumber
            //     this.payValue1 = res.outlinePay.indexOf(1)!=-1
            //     this.payValue2 = res.outlinePay.indexOf(2)!=-1
            //     this.signupFieldList = res.signupFieldList
            //     let obj = {
            //         province:res.province,
            //         provinceId:res.provinceId
            //     }
            //     this.provinceObj = obj
            //     this.provinceValue = res.province
                

                
            // })
        },
        getProvinceList(){
            api.get('Api/Admin/dataCenter/getProvinceList').then(res =>{
                    this.provinceList = res
                })
        },
        selectProce(value,label){
            this.provinceValue = value.province
            this.provinceObj = value
        },
        getData(){
            
            if(this.organizersto.indexOf(this.organizerName)<0){
                if(this.organizerName){
                    this.organizersto.push(this.organizerName)
                }
                
            }else{}
            
            if(this.organizers.length > 0){
                this.organizers.forEach(ele =>{
                    if(!ele.organizerName){
                        this.$message.info('主办单位为必填项')
                        return
                    }else{
                        if(this.organizersto.indexOf(ele.organizerName)<0){
                            this.organizers.forEach(ele =>{
                                this.organizersto.push(ele.organizerName)
                            })
                        }
                    }
                })
                
            }else{
                
            }
            this.preData = {
                id:this.$route.query.id?this.$route.query.id:'',
                competitionId:this.competitionId,
                name:this.trainTitle,
                tags:this.basicTags,
                bannerUrl:this.coverChart,
                signupBeginTime:this.signValue1,
                signupEndTime:this.signValue2,
                trainingBeginTime:this.signValue3,
                trainingEndTime:this.signValue4,
                trainingAddr:this.trainAddress,
                maxNum:this.meetNum,
                sponsors:this.organizersto,
                descrptions:this.organizerListto,
                price:this.trainPrice,
                expertDtos:this.expertDtos,
                noticeFileUrl:this.noticeFileUrl,
                mettingList: this.meetList,
                meetingFileUrl:this.meetingFileUrl,
                payAccount:this.accName?this.accName:null,
                payNumber:this.accNumber?this.accNumber:null,
                payAddress:this.bankAdress?this.bankAdress:null,
                
            }
        },
        getTimes(time = +new Date()){
            if(!time) return;
            return moment(time).format('YYYY-MM-DD HH:mm:ss')
        },
        changecagenMark(index){
            this.cAgenMarkIndex = index
        },
        delmeet(index){
            this.meetList.splice(index,1)
        },
        modifymeet(index,item){
            this.meetingIndex = index
            this.meetings_dialog = true
            this.meetFile = this.meetList[index].url
            this.meetTitle = this.meetList[index].title
            this.stateData.news = this.meetList[index].descrption
        },
        setStateData(val){
            this.$set(this.stateData,'news',val);
        },
        unique(arr) {
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.info) && res.set(arr.info, 1))
        },
        homeObtainTags(tags){
            this.basicTags = tags
        },
        transmitTableData(data){
            this.signupFieldList = data
        },
        async submitTrain(){
            this.detaileData = null
            if(!this.trainTitle){
                this.$message.info('标题为必填项')
                return
            }
            // if(!this.provinceValue){
            //     this.$message.info('培训省份为必选项')
            //     return
            // }
            // if(!this.basicTags){
            //     this.$message.info('培训标签为必填项')
            //     return
            // }
            // if(!this.coverChart){
            //     this.$message.info('封面图为必填项')
            //     return
            // }
            if(!this.signValue1||!this.signValue2){
                this.$message.info('报名时间为必填项')
                return
            }
            if(!this.signValue3||!this.signValue4){
                this.$message.info('培训时间为必填项')
                return
            }
            if(!this.trainAddress){
                this.$message.info('培训地点为必填项')
                return
            }
            if(!this.meetNum){
                this.$message.info('会议规模为必填项')
                return
            }
            if(!this.organizerName){
                this.$message.info('主办单位为必填项')
                return
            }
            if(this.organizersto.indexOf(this.organizerName)<0){
                this.organizersto.push(this.organizerName)
            }
            
            if(this.organizers.length > 0){
                this.organizers.forEach(ele =>{
                    if(!ele.organizerName){
                        this.$message.info('主办单位为必填项')
                        return
                    }else{
                        if(this.organizersto.indexOf(ele.organizerName)<0){
                            this.organizers.forEach(ele =>{
                                this.organizersto.push(ele.organizerName)
                            })
                        }
                    }
                })
                
            }else{
                
            }

           
            if(!this.trainPrice&&this.trainPrice!=0){
                this.$message.info('培训价格为必填项')
                return
                
            }else{
                if(this.trainPrice<0){
                    this.$message.info('培训价格必须大于等于零')
                    return
                }
            }
            
            
            this.organizerListto.push({
                title:this.organizerTitle,
                info:this.organizerConnet
            })
            
            if(this.organizerList.length>0){
                this.organizerListto=[...this.organizerListto,...this.organizerList]
            }else{
                if(this.delFlag){
                    this.organizerListto=[...this.organizerList]
                }
                // if(this.organizerListto[0].title){}else{
                //     this.organizerListto=[...this.organizerList]
                // }
                
            }
            
            
            this.organizerListto=this.unique(this.organizerListto)
            let outlinePay = [
                this.payValue1?1:'',
                this.payValue2?2:''
            ]
            let data = {
                id:this.trainId,
                competitionId:this.competitionId,
                name:this.trainTitle,
                tags:this.basicTags,
                bannerUrl:this.coverChart?this.coverChart:this.defaultUrl[Math.floor(Math.random()*5)],
                signupBeginTime:this.signValue1,
                signupEndTime:this.signValue2,
                trainingBeginTime:this.signValue3,
                trainingEndTime:this.signValue4,
                trainingAddr:this.trainAddress,
                maxNum:this.meetNum,
                sponsors:this.organizersto,
                descrptions:this.organizerListto,
                price:this.trainPrice,
                expertDtos:this.expertDtos,
                noticeFileUrl:this.noticeFileUrl,
                mettingList: this.meetList,
                meetingFileUrl:this.meetingFileUrl,
                payAccount:this.accName?this.accName:null,
                payNumber:this.accNumber?this.accNumber:null,
                payAddress:this.bankAdress?this.bankAdress:null,
                // province:'330000',
                // provinceId:this.provinceObj.provinceId,
                // province:this.provinceObj.province,
                outlinePay:outlinePay,
                signupFieldList:this.signupFieldList
            }
            if(this.trainId){
                // let obj = await network.getSelectTraining({data})
                let obj = await network.updateTraining({data})
                if(obj=='error') return;
                this.$emit('refresh')
                
            }else{
                let obj = await network.publishTraining({data})
                if(obj=='error') return;
                this.$emit('refresh')
               
            }
            

        },
        addOrgan(){
            this.organizers.push({
                organizerName:'',
            })
        },
        delOrgan(index){
            this.organizers.splice(index,1)
        },
        addOrganTitle(){
            this.organizerList.push({
                title:'',
                info:''
            })
        },
        delOrganTitle(index){
            this.delFlag = true
            this.organizerList.splice(index,1)
        },
        changStatime(e){
            // console.log(e)
        },
        upSuccess(file,flieList){
            this.coverChart=file.location

        },
        upSuccess2(ret,file,flieList){
            this.noticeFileUrl=[]
            flieList.forEach(ele =>{
                let files = {
                    name:ele.name,
                    url:ele.url
                }
                this.noticeFileUrl.push(files)
            })
        },
        onRemove2(ret,file,flieList){
            this.noticeFileUrl=[]
            flieList.forEach(ele =>{
                let files = {
                    name:ele.name,
                    url:ele.url
                }
                this.noticeFileUrl.push(files)
            })
        },
        upSuccess3(ret,file,flieList){
            this.meetingFileUrl=[]
            flieList.forEach(ele =>{
                let files = {
                    name:ele.name,
                    url:ele.url
                }
                this.meetingFileUrl.push(files)
            })
        },
        onRemove3(ret,file,flieList){
            this.meetingFileUrl=[]
            flieList.forEach(ele =>{
                let files = {
                    name:ele.name,
                    url:ele.url
                }
                this.meetingFileUrl.push(files)
            })
        },
        upSuccess4(file,flieList){
            this.heardUrl = file.location
            // this.stateData.icon=file.location

        },
        
        changeMark(){
            if(this.coverChart){
                this.mark = true
            }
        },
        changeMark2(){
            if(this.heardUrl){
                this.mark2 = true
            }
        },
        changeMark4(){
            if(this.meetFile){
                this.mark4 = true
            }
        },
        subExpert(){
            if(!this.heardUrl){
                this.$message.info('请上传专家头像')
                return
            }
            if(!this.expertName){
                this.$message.info('请输入专家姓名')
                return
            }
            if(!this.expertSchool){
                this.$message.info('请输入专家院校')
                return
            }
            if(this.expertList.length<1){
                this.$message.info('请输入专家职称')
                return
            }
            if(!this.expertPhone){
                this.$message.info('请输入专家手机号')
                return 
            }else{
                if(!checkPhone(this.expertPhone)){
                    return this.$message.info('请检查专家手机号是否正确')
                }
            }
            let params = {
                heardUrl:this.heardUrl,
                expertName:this.expertName,
                expertSchool:this.expertSchool,
                expertList:this.expertList,
                expertPhone:this.expertPhone,
            }
            this.expertDtos.push(params)
            this.train_dialog = false
            this.init()
        },
        //会议回顾取消修改
        passMeet(){
            this.meetTitle = ''
            this.meetFile = ''
            this.stateData.news = ''
            this.meetings_dialog = false
            this.meetingIndex = null
        },
        subExpert2(){
            if(!this.meetTitle){
                this.$message.info('会议回顾标题是必填项')
                return
            }
            // if(!this.meetFile){
            //     this.$message.info('会议回顾封面图是必填项')
            //     return
            // }
            // if(!this.stateData.news){
            //     this.$message.info('会议回顾内容是必填项')
            //     return
            // }
            if(this.meetingIndex!=null){
                this.meetList.splice(this.meetingIndex,1)
            }
            this.meetList.push({
                title:this.meetTitle,
                url:this.meetFile?this.meetFile:this.defaultUrl[Math.floor(Math.random()*5)],
                descrption:this.stateData.news
            })
            // let result = []
            // let obj = {}
            // for(let i of this.meetList){
            //     if(!obj[i.title]&&!obj[i.url]&&!obj[i.descrption]){

            //         result.push(i)
            //         obj[i.title] = 1
            //     }
            // }
            // this.meetList = result
            this.meetTitle = ''
            this.meetFile = ''
            this.stateData.news = ''
            this.meetings_dialog = false
            this.meetingIndex = null
        },
        meetUpSuccess(ret,file,flieList){
            if(!ret.location){
                this.$message.info('上传失败')
                return
            }
            this.meetFile = ret.location
            this.itemMeet = flieList[flieList.length-1]
        },
        delExpert(index){
            this.expertDtos.splice(index,1)
        },

        obtainTags(tags){
            this.expertList = tags 
        },
        init(){
            this.heardUrl = ''
            this.expertName = ''
            this.expertSchool = ''
            this.expertList = []
            this.expertPhone = ''
        }
    },
    metaInfo: {
        title: '数据服务平台'
    }
}
</script>

<style lang="less">
.addTrain{
    input::-webkit-input-placeholder{
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 1px;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 1px;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 1px;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 1px;
    }
    // width: 1050px;
    margin: 0 auto;
    .goback{
        span{
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #787D81;
            letter-spacing: 0;
            cursor: pointer;
        }
    }
    .connent{
        margin-top: 12px;
        background: #fff;
        .title{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #FAFAFA;
            border-bottom: 1px solid #E1E1E1;
            p{
                font-family: PingFang-SC-Bold;
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 0;
                padding: 0 30px;
                font-weight: 500;
            }
        }
        .cont{
            background: #fff;
            padding: 0 120px;
            padding-top: 50px;
            margin-bottom: 60px;
            // padding-bottom: 80px;
            
            .addTitles{
               
                .titleInput{
                    margin-left: 12px;
                    width: 416px;
                    height: 36px;
                    background: #FFFFFF;
                    border: 1px solid #DEDEDE;
                    border-radius: 2px;
                    input{
                        width: 90%;
                        height: 34px;
                        border: none;
                        outline: none;
                    }
                }
            }
            .addLabel{
                margin-top: 60px;
                padding-left: 12px;
                
                
            }
            .up{
                margin-top: 60px;
                padding-left: 12px;
                p{
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 1px;
                }
                .upType{
                    font-family: PingFang-SC-Medium;
                    font-size: 12px;
                    color: #9B9B9B;
                    letter-spacing: 0.86px;
                }
                .noticeup{
                    position: relative;
                    margin-top: 12px;
                    width: 180px;
                    height: 120px;
                    border: 1px solid #DEDEDE;
                    border-radius: 5px;
                    .el-el-upload{
                        width: 100%;
                        height: 100%;
                        margin-top: 0;
                        .el-upload{
                            height: 118px;
                            width: 178px;
                            .el-upload-dragger{
                                width: 100%;
                                height: 100%;
                                border: none;
                                .el-icon-upload{
                                    color: #1890FF;
                                    margin: 0;
                                    font-size: 48px;
                                }
                            }
                        }
                    }
                    .noticeMark{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background:rgba(0,0,0,0.3);
                        color:#fff;
                        p{
                            color: #fff;
                            text-align: center;
                            &:first-child{
                                font-size: 40px;
                                margin-top: 36px;
                            }
                            &:nth-child(2){
                                font-size: 12px;
                            }
                        }
                    }
                }
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
                    // margin-bottom: 12px;
                    margin-top: 30px;
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
            .signTime{
                margin-top: 50px;
                
                .startTime{
                    margin-top: 5px;
                    display: inline-block;
                    margin-right: 12px;
                    margin-left: 12px;
                }
                .endTime{
                    display: inline-block;
                }
                .el-date-editor.el-input{
                    width: 200px;
                    .el-input__icon{
                        line-height: 34px;
                    }
                    .el-input__inner{
                        height: 34px;
                        line-height: 34px;
                    }
                }

            }
            .Meeting{
                margin-top: 50px;
                .titleInput{
                    input{
                        width: 100px;
                    }
                }
            }
            .registerFrom{
                margin-top: 50px;
            }
            .registerPay{
                margin-top: 50px;
            }
            .sett{
                background: #18C34D;
                border-radius: 5px;
                width: 75px;
                height: 30px;
                line-height: 30px;
                font-family: PingFang-SC-Medium;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
                margin-top: 10px;
                margin-left: 12px;
                cursor: pointer;
            }
            .trainAdress{
                margin-top: 50px;
                i{
                    cursor: pointer;
                    margin-left: 10px;
                }
                .titleInput{
                    display: inline-block;
                    input{
                        width: 90%;
                    }
                }
                .organizerItem{
                    margin-top: 28px;
                    .titleInput:first-child{
                        width: 170px;
                        input{
                            width: 150px;
                        }
                    }
                    i{
                        margin-left: 14px;
                    }
                }
            }
            .expert{
                margin-top: 60px;
                min-height: 200px;
                .exTitle{
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 1px;
                    padding-left: 12px;
                    margin-bottom: 12px;
                }
                .exConnent{
                    width: 100%;
                    position: relative;
                    .left{
                        width: 25%;
                        display: inline-block;
                        position: absolute;
                        .addicon{
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            text-align: center;
                            background: #F0F2F4;
                            border-radius: 100px;
                            color: #787D81;
                            font-size: 30px;
                            cursor: pointer;
                        }
                    }
                    .right{
                        width: 73%;
                        display: inline-block;
                        float: right;
                        ul{
                            
                            li{
                                display: inline-block;
                                margin-right: 45px;
                                margin-bottom: 40px;
                                position: relative;
                                div{
                                    position: relative;
                                    &:first-child{
                                        width: 100px;
                                        height: 100px;
                                        cursor: pointer;
                                        
                                        img{
                                            width: 100%;
                                            height: 100%;
                                            border-radius: 100px;
                                        }
                                        div{
                                            position: absolute;
                                            top: 0;
                                            width: 100px;
                                            height: 100px;
                                            cursor: pointer;
                                            background: rgba(0,0,0,0.5);
                                            border-radius: 100px;
                                            text-align: center;
                                            line-height: 100px;
                                            font-family: PingFang-SC-Medium;
                                            font-size: 12px;
                                            color: #FFFFFF;
                                            letter-spacing: 0.86px;
                                        }
                                    }
                                    
                                    
                                }
                                
                                .name{
                                    margin-top: 12px;
                                    width: 100px;
                                    font-family: SourceHanSansCN-Bold;
                                    font-size: 20px;
                                    color: #4A4A4A;
                                    letter-spacing: 3px;
                                    text-align: center;
                                }
                                .school{
                                    width: 100px;
                                    font-family: SourceHanSansCN-Normal;
                                    font-size: 14px;
                                    color: #4A4A4A;
                                    letter-spacing: 0.88px;
                                    text-align: center;
                                    text-overflow: -o-ellipsis-lastline;
                                    overflow: hidden;
                                    
                                    -webkit-box-orient: vertical;
                                }
                            }
                        }
                    }
                }
            }
            .noticeFile{
                margin-top: 50px;
                p{
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }
                .notfup{
                    margin-top: 12px;
                    
                    .el-el-upload{
                        width: 100%;
                        .el-upload{
                            display: inline-block;
                            cursor: pointer;
                            outline: 0;
                            width: 455px;
                            height: 148px;
                            background: rgba(0,0,0,0.02);
                            border: 1px dashed rgba(0,0,0,0.15);
                            border-radius: 4px;
                            text-align: center;
                            .el-upload-dragger{
                                width: 100%;
                                height: 100%;
                                border: none;
                                background-color: rgba(0, 0, 0, 0.02);
                                .el-icon-upload{
                                    
                                    margin: 0;
                                    margin-top: 20px;
                                }
                            }
                        }
                        i{
                            font-size: 48px;
                            color: #1890FF;
                        }
                        ul{
                            i{
                                font-size: 16px;
                            }
                        }
                    }
                    p{
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: rgba(0,0,0,0.85);
                        text-align: center;
                        line-height: 24px;
                        margin-bottom: 0;
                        :first-child{
                            margin-bottom: 20px;
                        }
                    }
                    span{
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: rgba(0,0,0,0.43);
                        text-align: center;
                        line-height: 22px;
                    }
                }
                .banNotice{
                    display: inline-block;
                    float: left;
                    margin-right: 20px;
                    margin-top: 10px;
                    .el-el-upload{
                        width: 180px;
                    }
                    .banNoticeBack{
                        background: #F0F2F4;
                        border-radius: 5px;
                        height: 120px;
                        width: 180px;
                        text-align: center;
                        line-height: 120px;
                        font-size: 36px;
                        color: #787D81;
                        cursor: pointer;
                        margin-top: 10px;
                        
                    }
                }
                .banList{
                    width: 180px;
                    height: 120px;
                    border-radius: 5px;
                    margin-right: 20px;
                    display: inline-block;
                    float: left;
                    margin-top: 20px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                    .banMark{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background:rgba(0,0,0,0.3);
                        color:#fff;
                        border-radius: 5px;
                        p{
                            color: #fff;
                            text-align: center;
                            font-family: PingFang-SC-Medium;
                            font-size: 16px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                            line-height: 120px;
                            span{
                                cursor: pointer;
                            }
                            
                        }
                    }
                    .pover{
                        text-align:center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            
            .btn{
                margin-top: 40px; 
                .sub{
                    width: 100px;
                    height: 40px;
                    font-family: PingFang-SC-Medium;
                    font-size: 16px;
                    color: #787D81;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 40px;
                    display: inline-block;
                    margin-right: 30px;
                    border: 1px solid #787D81;
                    border-radius: 5px;
                    cursor: pointer;
                    &:hover{
                        background-image: linear-gradient(-90deg, #3EBBFF 0%, #1D86FF 100%);
                        border-radius: 5px;
                        color: #fff;
                        border: none
                    }
                    
                }
            }
        }
        .el-dialog__header{
            padding: 0;
        }
        
        .el-dialog__body{
            padding: 0 !important;
            .title{
                background: #fff;
                p{
                    font-family: PingFang-SC-Bold;
                    font-size: 16px;
                    color: #4A4A4A;
                    letter-spacing: 0;
                }
            }
            
        }
    }
    
}
.perDialog {
            .ups{
                margin-top: 60px;
                padding: 0 115px;
                p{
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 1px;
                }
                .upType{
                    font-family: PingFang-SC-Medium;
                    font-size: 12px;
                    color: #9B9B9B;
                    letter-spacing: 0.86px;
                    text-align: center;
                    margin-top: 12px;
                    margin-bottom: 28px;

                }
                .noticeup{
                    position: relative;
                    margin-top: 19px;
                    width: 130px;
                    height: 130px;
                    background: #F0F2F4;
                    border: 1px solid #DEDEDE;
                    border-radius: 130px;
                    margin: 0 auto;
                    .el-el-upload{
                        width: 100%;
                        height: 100%;
                        margin-top: 0;
                        .el-upload{
                            height: 130px;
                            width: 130px;
                        }
                    }
                    .avatars{
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        line-height: 130px;
                        p{
                            font-size: 42px;
                            color: #787D81;;
                        }
                    }
                   
                    .noticeMark{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background:rgba(0,0,0,0.3);
                        color:#fff;
                        border-radius: 50%;
                        p{
                            color: #fff;
                            text-align: center;
                            &:first-child{
                                font-size: 40px;
                                margin-top: 36px;
                            }
                            &:nth-child(2){
                                font-size: 12px;
                            }
                        }
                    }
                }
                
                
                .upImg{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
            }
        }
.i-text{
    // min-height: 200px;
    .ql-container.ql-snow{
        background-color: #fff;
        min-height: 200px;
    }
}
.titleInput{
    margin-top: 5px;
    margin-left: 12px;
    width: 416px;
    height: 36px;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 2px;
    input{
        height: 34px;
        border: none;
        outline: none;
        padding-left: 12px;
    }
}
.everTitle{
    span:first-child{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #D0021B;
        letter-spacing: 1px;
    }
    span:nth-child(2){
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
    }
    span:nth-child(3){
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #9B9B9B;
        letter-spacing: 0.86px;
    }
}
.everTitles{
    display: inline-block;
    width: 15%;
    text-align: left;
    span:first-child{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #D0021B;
        letter-spacing: 1px;
    }
    span:nth-child(2){
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
    }
    
}
.inputAll{
    text-align: right;
    .inputLine{
        margin-bottom: 16px;
    }
}
.inputTag{
    display: inline-block;
    width: 80%;
    text-align: left;
    margin-left: 12px;
}
.addExpertInput{
    margin-left: 12px;
    width: 80%;
    height: 36px;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 2px;
    display: inline-block;
    text-align: left;
    input{
        height: 32px;
        border: none;
        outline: none;
        width: 80%;
        padding-left: 12px;
    }
}
.nubInpur{
    width: 200px;
    margin-left: 12px;
    margin-top: 5px;
    div{
        width: 120px;
        border: 1px solid #DEDEDE;
        border-radius: 2px;
        height: 34px;
        display: inline-block;
    }
    input{
        border: none;
        outline: none;
        padding-left: 12px;
        width: 100px;
        height: 30px;
    }
    span{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
        padding-left: 12px;
    }
}
.trainPay{
    padding: 42px 167px 0 137px;
    .payRule{
        width: 100%;
        padding: 0 11px;
        // height: 59px;
        margin-top: 10px;
        background: #FAFAFA;
        padding-left: 69px;
        line-height: 59px;
        p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 1px;
            span:first-child{
                color: #CB3A4C;
            }
            span:nth-child(2){
                margin-right:26px;
            }
            span:nth-child(3){
                margin-right:12px;
            }
            span:nth-child(4){
                display: inline-block;
                height: 36px;
                width: 200px;
                border: 1px solid #DEDEDE;
                line-height: 31px;
                border-radius: 5px;
                background: #fff;
            }
            input{
                border: none;
                outline: none;
                height: 34px;
                width: 186px;
                margin-left: 12px;
                border-radius: 5px;
            }
        }
    }
}
.trainPayAll{
    .el-dialog__footer{
        margin-top: 100px;
        border-top: 1px solid rgba(0, 0, 0, 0.09);
    }
}
.mettings{
    .mettContent{
        padding-left: 120px;
        padding-right: 140px;
        .addTitle{
            margin-top: 50px;
            .titleInput{
                input{
                    width: 90%;
                }
            }
        }
        .up{
            margin-top: 60px;
            p{
                font-family: PingFang-SC-Bold;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 1px;
            }
            .upType{
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                color: #9B9B9B;
                letter-spacing: 0.86px;
                padding-left: 12px;
                margin-top: 12px;
            }
            .noticeup{
                position: relative;
                margin-top: 12px;
                width: 180px;
                height: 120px;
                border: 1px solid #DEDEDE;
                border-radius: 5px;
                margin-left: 12px;
                .el-el-upload{
                    width: 100%;
                    height: 100%;
                    margin-top: 0;
                    .el-upload{
                        height: 100%;
                        width:100%;
                        .el-upload-dragger{
                            width: 100%;
                            height: 100%;
                            border: none;
                            .el-icon-upload{
                                color: #1890FF;
                                margin: 0;
                                font-size: 48px;
                            }
                        }
                    }
                }
                .noticeMark{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background:rgba(0,0,0,0.3);
                    color:#fff;

                    p{
                        color: #fff;
                        text-align: center;
                        &:first-child{
                            font-size: 40px;
                            margin-top: 36px;
                        }
                        &:nth-child(2){
                            font-size: 12px;
                        }
                    }
                }
            }
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
                height: 118px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .addcontent{
            margin-top: 60px;
            // min-height: 470px;
            p{
                span:first-child{
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #D0021B;
                    letter-spacing: 1px;
                }
                span:nth-child(2){
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 1px;
                }
                
            }
            .addeditor{
                width: 540px;
            }
        }
    }

   
}
#trainPre{
    .el-dialog__footer{
        margin-top: 0;
    }
    .el-dialog__body{
        background: #EEF2F7 !important;
    }
}
</style>
