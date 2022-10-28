<template>
    <div class="reviewset">
        <span class="title" @click="getpings">
            <i class="iconfont">&#xe655;</i>
            评审设置
        </span>
        <el-dialog
            title="评审设置"
            :append-to-body="true"
            :modal-append-to-body="false"
            :visible.sync="show"
            :close-on-click-modal="false"
            width="800px"
            height="1849px"
            style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
            >
            <div style="width:520px;margin:0 auto;padding-left:20px;text-align:left;">
                <el-form ref="form" :model="form"  label-width="140px">

                    <el-form-item label="评分方式: " prop="pattern"
                    :rules="{required: true, message: '请选择评分方式', trigger: 'change'}"
                        >
                        <el-radio-group v-model="form.pattern" @change="patternChange">
                            <el-radio :label="0" >按作品评审</el-radio>
                            <el-radio :label="1" >按附件评审</el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item label="作品抽签时间: " prop=""
                    :rules="{required: true, message: '请选择作品抽签时间', trigger: 'change'}"
                        >
                        <el-date-picker
                          v-model="timesa"
                          type="datetimerange"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="评分标准: " v-if="form.pattern==0" style="margin-bottom:0;background: #fafafa;">
                        <p style="margin-left:210px;">分值</p>
                    </el-form-item>

                    

                    <div class="rules" v-if="form.pattern==0">
                        <div v-for="(items,index) in form.reviewStandardListDto.reviewStandardList" :key="index">

                            <div v-for="(item,i) in items.reviewScores" :key="i">
                                <el-input placeholder="请输入评分项，如创意分、技术分" style="width:270px;margin-right:8px;" v-model="item.title"></el-input>
                                <el-input placeholder="请输入分值" style="width:91px;margin-bottom:8px;" v-model="item.weight"  @blur="checkSorce(index,i)"></el-input> %
                                <img src="https://web.moocollege.com/mooc/hzq/competition/competition/删除.svg" class="delreview" @click="delReview(index,i)">
                                <el-input placeholder="请输入评分标准说明" :rows="2" type="textarea" style="width:400px;" v-model="item.info"/>
                                <div class="score" >
                                    <div class="scoreDetail" v-for="(option,j) in item.options" :key="j">
                                        <span class="num" style="">{{j+1}}.</span>
                                        <el-input placeholder="请输入等级:如ABC,优良及" style="width:215px;" v-model="option.lever"></el-input>
                                        <el-input placeholder="请输入分数" style="width:91px;margin:0 5px 0 8px;" v-model="option.score"></el-input>
                                        分
                                        <i class="el-icon-delete" @click="delNorm(index,i,j)"></i>
                                    </div>
                                    <div class="add_button" @click="addNorm(index,i)">
                                        <i class="iconfont">&#xe62d;</i>
                                        <span>增加快捷评分模版</span>
                                    </div>
                                </div>
                            </div>

                            <div class="add_button review" @click="addReview(index)">
                                <i class="iconfont">&#xe62d;</i>
                                <span>增加1项评分标准</span>
                            </div>

                            <div class="temp" >
                                <p class="totalscore">总分 <span style="margin-left:10px;">{{allsorce}}</span> / 100分</p>
                                <div class="tempDateil" v-for="(item,i) in items.reviewComments" :key="i" >
                                    <p><span>＊</span>分数区间: </p>
                                    <el-input style="width:106px;" placeholder="请输入起始分" v-model="item.minScore"></el-input>
                                    ~
                                    <el-input style="width:106px;" placeholder="请输入截止分" v-model="item.maxScore"></el-input>
                                    <el-tooltip class="question" content="当总分在该区间分数时，供评分人选择的预设点评。如填写[0,60]代表大于等于0，小于等于60，显示该分段的评语模板。" placement="top">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <i class="el-icon-delete" @click="delTag(index,i)"></i>
                                    <p><span>＊</span>点评模板: </p>
                                    <div v-for="(mess,j) in item.comments" :key="j">
                                        <el-input style="width:340px;margin-bottom:10px;" placeholder="请输入点评" v-model="mess.context"></el-input>
                                        <i class="el-icon-delete" @click="delComment(index,i,j)"></i>
                                    </div>
                                    <div class="add_button" @click="addComment(index,i)">
                                        <i class="iconfont" >&#xe62d;</i>
                                        <span>增加1个点评</span>
                                    </div>
                                </div>

                                <div class="add_button" @click="addTag(index)">
                                    <i class="iconfont">&#xe62d;</i>
                                    <span>新增点评模板</span>
                                </div>
                            </div>

                        </div>

                    </div>

                    <el-form-item v-if="form.pattern==1" label="参与评分附件: " style="background: #FAFAFA;" prop="attach" :rules="{require:true, message:'请选择评分附件'}">

                        <el-checkbox-group v-model="attach">
                            <el-checkbox style="max-width:318px;overflow: hidden;" v-for="att in fromAttach"  :key="att.attachId" :label="att.attachId" :title="att.attachName" >{{att.attachName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <div  v-if="form.pattern==1" >

                        <div class="rules" v-for="(items,index) in form.reviewStandardListDto.reviewStandardList" :key="index" style="margin-top:20px;" v-if="attach.includes(items.attachId)">
                            <p class="title">
                                <span>*</span>{{ items.attachName }}
                                <!-- <i class="el-icon-arrow-up"></i>
                                <i class="el-icon-arrow-down"></i> -->
                            </p>

                            <div class="top">
                                <p>权重 <el-input placeholder="请输入权重" v-model="items.weight" @blur="checkTotalSorce(index)"> </el-input>% </p>
                                <!-- <p class="fr">评审次数 <el-input placeholder="请输入次数" v-model="items.total"> </el-input>次 </p> -->
                            </div>

                            <div style="margin-top:20px;">
                                <div class="mintop">
                                    <p >评分标准：</p>
                                    <p>分值：</p>
                                </div>
                                <div >
                                    <div v-for="(item,i) in items.reviewScores" :key="i">
                                        <el-input placeholder="请输入评分项，如创意分、技术分" style="width:270px;margin-right:8px;" v-model="item.title"></el-input>
                                        <el-input placeholder="请输入分值" style="width:91px;margin-bottom:8px;" v-model="item.weight"  @blur="checkSorce(index,i)"></el-input> %
                                        <img src="https://web.moocollege.com/mooc/hzq/competition/competition/删除.svg" class="delreview" @click="delReview(index,i)">
                                        <el-input placeholder="请输入评分标准说明" :rows="2" type="textarea" style="width:400px;" v-model="item.info"/>
                                        <div class="score" >
                                            <div class="scoreDetail" v-for="(option,j) in item.options" :key="j">
                                                <span class="num" style="">{{j+1}}.</span>
                                                <el-input placeholder="请输入等级:如ABC,优良及" style="width:215px;" v-model="option.lever"></el-input>
                                                <el-input placeholder="请输入分数" style="width:91px;margin:0 5px 0 8px;" v-model="option.score"></el-input>
                                                分
                                                <i class="el-icon-delete" @click="delNorm(index,i,j)"></i>
                                            </div>
                                            <div class="add_button" @click="addNorm(index,i)">
                                                <i class="iconfont">&#xe62d;</i>
                                                <span>增加快捷评分模版</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="add_button review" @click="addReview(index)">
                                        <i class="iconfont">&#xe62d;</i>
                                        <span>增加1项评分标准</span>
                                    </div>

                                    <div class="temp" >
                                        <p class="totalscore">总分 <span style="margin-left:10px;">{{allsorce}}</span> / 100分</p>
                                        <div class="tempDateil" v-for="(item,i) in items.reviewComments" :key="i" >
                                            <p><span>＊</span>分数区间: </p>
                                            <el-input style="width:106px;" placeholder="请输入起始分" v-model="item.minScore"></el-input>
                                            ~
                                            <el-input style="width:106px;" placeholder="请输入截止分" v-model="item.maxScore"></el-input>
                                            <el-tooltip class="question" content="当总分在该区间分数时，供评分人选择的预设点评。如填写[0,60]代表大于等于0，小于等于60，显示该分段的评语模板。" placement="top">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <i class="el-icon-delete" @click="delTag(index,i)"></i>
                                            <p><span>＊</span>点评模板: </p>
                                            <div v-for="(mess,j) in item.comments" :key="j">
                                                <el-input style="width:340px;margin-bottom:10px;" placeholder="请输入点评" v-model="mess.context"></el-input>
                                                <i class="el-icon-delete" @click="delComment(index,i,j)"></i>
                                            </div>
                                            <div class="add_button" @click="addComment(index,i)">
                                                <i class="iconfont" >&#xe62d;</i>
                                                <span>增加1个点评</span>
                                            </div>
                                        </div>

                                        <div class="add_button" @click="addTag(index)">
                                            <i class="iconfont">&#xe62d;</i>
                                            <span>新增点评模板</span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>



                    <el-form-item label="评审次数: " prop="scoreType"
                        :rules="{ required: true, message: '请选择评审次数', trigger: 'change'}"
                        >
                        <el-radio-group v-model="form.scoreType">
                            <el-radio :label="0" >每个作品被评次数</el-radio>
                            <el-radio :label="1" >互评</el-radio>
                        </el-radio-group>
                        <p v-if="form.scoreType==0">
                            <el-form-item prop="scoreNum"  :rules="{required: true, message: '请填写评审次数', trigger: 'blur'}">
                                <el-input v-model="form.scoreNum" size="small" style="width:53px;margin:0 11px;"></el-input>次
                                <el-tooltip content="系统默认次数为参赛作品/评审人员数" placement="top">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </el-form-item>
                        </p>
                    </el-form-item>

                    <el-form-item label="分数计算: " prop="countType"
                        :rules="{required: true, message: '请选择分数计算方式', trigger: 'change'}"
                        >
                        <el-radio-group v-model="form.countType" class="countType">
                            <el-radio :label="1" >全部均值</el-radio>
                            <el-radio :label="0" >去掉最高分和最低分的均值</el-radio>
                            <el-radio :label="2" >去掉最低分</el-radio>
                            <el-radio :label="3" >离散算法</el-radio>
                            <el-radio :label="4" >排名加权</el-radio>
                        </el-radio-group>
                        <div v-if="form.countType==3" class="inputNum">
                            <span>偏离值：
                                <el-input-number style="width:100px" v-model="form.deviation" controls-position="right" :step="0.01" size="mini"></el-input-number>
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>默认均值：
                                <el-input-number style="width:80px" v-model="form.means" controls-position="right" :step="1" size="mini"></el-input-number> 分
                            </span>
                        </div>

                    </el-form-item>

                    <!-- <el-form-item label="评审权限: " class="reviewUser" prop="reviewUserDto"
                        :rules="{required: true, message: '请选择评审权限', trigger: 'change'}"
                        >
                        <el-radio-group v-model="form.reviewUserDto.reviewType">
                            <el-radio :label="0" class="block">参赛者</el-radio>
                            <el-radio :label="1" >特定专家
                                <el-tooltip content="指定专家进行评审" placement="top">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                                >
                            </el-radio>
                            <el-radio :label="2" >专家组
                                <el-tooltip content="指定专家组进行评审" placement="top">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                                >
                            </el-radio>
                        </el-radio-group>
                    </el-form-item> -->

                    <el-form-item label="评审次数: " prop="reviewCount"
                        :rules="{required: false, message: '请填写评审次数', trigger: 'blur'}"
                        >
                        <span>专家评审次数上限<el-input v-model="form.reviewCount" size="small" style="width:53px;margin:0 11px;"></el-input>次</span>
                        <el-tooltip content="无限制则填写1000" placement="top">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="评分限制【下限-上限）" style="margin-bottom:10px;" prop="reviewCount" label-width="200px"
                        :rules="{required: false, message: '请填写评审次数', trigger: 'blur'}"
                        >
                        <el-tooltip content="设置每位专家能在规定分数段评分的次数" placement="top">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-form-item>
                    <div class="limiTable">
                        <p>
                            <span>下限(含)</span>
                            <span>上限</span>
                            <span>最小比例</span>
                            <span>最大比例</span>
                        </p>
                        <li v-for="(item,index) in scoreLimit"  :key="index">
                            <span><el-input class="limitInput" size="small" type="number" v-model="item.minScore" ></el-input>分</span>&nbsp; -
                            <span><el-input class="limitInput" size="small" type="number" v-model="item.maxScore" ></el-input>分</span>
                            <span><el-input class="limitInput" size="small" type="number" v-model="item.minNum" ></el-input>%</span>&nbsp;-
                            <span><el-input class="limitInput" size="small" type="number" v-model="item.maxNum" ></el-input>%</span>
                            <i class="iconfont" style="cursor: pointer;" @click="delLimit(index)">&#xe61e;</i>
                        </li>
                        <div class="add_button" @click="addLimit">
                            <i class="iconfont">&#xe62d;</i>
                            <span>增加评分限制</span>
                        </div>
                    </div>

                    <el-form-item label="专家须知：" prop="pdfUrl">
                        <el-input v-model="form.pdfUrl" :disabled="disabledPdfInput" autocomplete="off"></el-input>
                        <div class="pdfUrl">
                            <upload :limit=1
                                :onPreview="onPreview"
                                accept=".pdf"
                                :onRemove="onRemove"
                                :on-exceed="onExceed"
                                :onSuccess="(res)=>(this.success(res,'pdfUrl'))">
                                <el-button>上传pdf</el-button>
                            </upload>
                            <!-- <el-button type="primary" style="margin-top:10px" @click="toPdfNotice">查看专家须知</el-button> -->
                        </div>
                    </el-form-item>
                 <el-form-item label="评语是否必填" prop="remarkMustFillIn">
                         <el-radio-group v-model="form.remarkMustFillIn">
                            <el-radio :label="1" >必填</el-radio>
                            <el-radio :label="0" >选填</el-radio>
                        </el-radio-group>
                        
                    </el-form-item>
                    <el-form-item v-if="form.remarkMustFillIn == 1" 
                    label="评语字数最少需输入"
                      :rules='form.remarkMustFillIn == 1 ?[{ required: true, message: "请输入评语字数", trigger: "blur" }]:[ {required: false,}]'
                     prop="remark">
                        <el-input v-model="form.remark"  placeholder="请输入字数，最大999" maxlength="3"  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" >
                            <template slot="append">字</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="评审回避: " prop="avoidType">
                        <el-checkbox-group v-model="form.avoidType">
                            <el-checkbox :label="0" >同省回避</el-checkbox>
                            <el-checkbox :label="1" >同校回避</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <!-- <el-form-item label="回避白名单: ">
                        <el-radio-group v-model="form.avoidUserDto.avoidReviewType">

                            <el-radio :label="0" >特定专家
                                <el-tooltip content="设置专家白名单，则不会被回避" placement="top">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                                >
                            </el-radio>
                            <el-radio :label="1" >专家组
                                <el-tooltip content="指定专家组进行评审" placement="top">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                                >
                            </el-radio>
                        </el-radio-group>
                    </el-form-item> -->

                    <el-form-item label="评审隐私: ">
                        <el-checkbox-group v-model="form.reviewConceal">
                            <el-checkbox :label="0" >参赛作品匿名</el-checkbox>
                            <el-checkbox :label="1" >点评展示</el-checkbox>
                            <el-checkbox :label="2" >得分展示</el-checkbox>
                            <el-checkbox :label="4" >学校</el-checkbox>
                            <el-checkbox :label="5" >团队</el-checkbox>
                            <!-- <el-checkbox :label="2" class="block">分数保密</el-checkbox>
                            <el-checkbox :label="3" class="block">该时间段不公开参赛作品</el-checkbox> -->
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="历史评分显示: ">
                        <el-radio-group v-model="form.allowHistory">
                            <el-radio :label="1" >是</el-radio>
                            <el-radio :label="0" >否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="作品下载: ">
                        <el-radio-group v-model="form.downPerm">
                            <!-- <el-radio :label="0" >评审人员
                                <el-tooltip content="包括评审专家、选择了海选互评的参赛选手" placement="top">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </el-radio>
                            <el-radio :label="1" >任何人</el-radio> -->
                            <el-radio :label="1" >可下载</el-radio>
                            <el-radio :label="2" >不可下载</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>

                <div class="group_btn">
                    <el-button size="small" :disabled='loading' @click="show=false">取消</el-button>
                    <el-button size="small" :disabled='loading' type="primary" @click="submitsetPS('form')">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import network from '@@/api/jxapi/index'
import util from '@/utils/util'
import {cloneDeep} from 'lodash'
import upload from "@@/components/fileUpload/index";
export default {
    props:{
        rowId:String,
        competitionId:Number
    },
    components:{
        upload,
    },
    data(){
        return{
            timesa:[],
            show: false,
            allsorce:0,  //评审设置的总分值
            form:{reviewConceal:[],avoidType:[]},
            fromAttach:[],
            attach:[],
            temp_:[],
            disabledPdfInput: false,
            scoreLimit:[
            ],
            loading: false,
        }
    },
    methods:{
        onRemove() {
            this.form.pdfUrl = '';
            this.disabledPdfInput = false;
        },
        onPreview() {
            if(this.form.pdfUrl){
                window.open(this.form.pdfUrl)
            }
        },
        onExceed() {
            this.$message.warning('请先删除当前报名表')
        },
        // toPdfNotice(){
        //     if(this.form.pdfUrl){
        //         window.open(this.form.pdfUrl)
        //     }
        // },
        success(file, name){
            this.$set(this.form, name, file.location)
            this.disabledPdfInput = true;
        },
        delLimit(index){
            this.scoreLimit.splice(index,1)
        },
        addLimit(){
            this.scoreLimit.push({
                "minScore":0,
                "maxScore":0,
                "minNum":0,
                "maxNum":0
            })
        },
        initFrom(){
            this.fromAttach = [
                {
                    "attachId": "1111",
                    "attach": true,
                    "attachName": "123",
                    "attachType": [
                    1,
                    2,
                    3,
                    4,
                    5
                    ],
                    "fileList": null
                },
                {
                    "attachId": "2222",
                    "attach": true,
                    "attachName": "321",
                    "attachType": [
                    1,
                    2,
                    3,
                    4,
                    5
                    ],
                    "fileList": null
                }
            ]
            this.form = {
                "competitionId": this.competitionId,
                "rowId": this.rowId,
                "deviation": 0.05,
                "means": 80,
                "remarkMustFillIn":0,
                "remark":"",
                "reviewStandardListDto": {
                    "reviewStandardList": [
                    {
                        "attachId": "",
                        "attachName":'',
                        "sort": '',
                        "total": 100,
                        "weight": 100,
                        "reviewScores": [
                        {
                            "itemId": util.randomChar(12),
                            "title": "",
                            "weight": '',
                            "info": "",
                            "score": '',
                            "options": []
                        }
                        ],
                        "reviewComments": [

                        ]
                    }
                    ]
                },
                "pattern": 0,
                "scoreType": 0,
                "scoreNum": 10,
                "countType": 0,
                "allowType": null,
                "reviewUserDto": {
                    "reviewType": 1,
                    "reviewUserIds": []
                },
                "reviewConceal": [],
                "downPerm": '',
                "avoidUserDto": {
                    "avoidReviewType": 0,
                    "avoidUserIds": [  ]
                },
                "avoidType": [],
                "reviewCount": 1000,
                "userId": null
                }
        },
        patternChange(type){
            if(type==0 && this.temp_.length<1){
                this.temp_ = [{
                    "attachId": '',
                    "sort": '',
                    "attachName": '',
                    "total": 100,
                    "weight": '',
                    "reviewScores": [
                    {
                        "itemId": util.randomChar(12),
                        "title": "",
                        "weight": '',
                        "info": "",
                        "score": '',
                        "options": [ ]
                    }
                    ],
                    "reviewComments": [ ]
                }]
            }
            let arr = cloneDeep(this.form.reviewStandardListDto.reviewStandardList)
            this.form.reviewStandardListDto.reviewStandardList = this.temp_?cloneDeep(this.temp_):[]
            this.temp_ = cloneDeep(arr)
            this.getAllScore();
            // if(this.temp_)this.form.reviewStandardListDto.reviewStandardList = deepClone(this.temp_)
        },
        getAllScore(){
            if(this.form.pattern==0){
                var tem = this.form.reviewStandardListDto.reviewStandardList[0].reviewScores
                var arr = 0;
                for(var m=0; m<tem.length; m++){
                    arr += parseInt(tem[m].weight)?parseInt(tem[m].weight):0;
                }
                this.allsorce = arr
            }else{

                var tem = this.form.reviewStandardListDto.reviewStandardList;
                var arr = 0;
                for(var m=0; m<tem.length; m++){
                    arr += parseInt(tem[m].weight)?parseInt(tem[m].weight):0;
                }
                this.allsorce = arr
            }
        },
        setreviewStandardList(){
            if(this.form.pattern==0) return;
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                let flag = true;
                for(let j in this.fromAttach){
                    if(this.form.reviewStandardListDto.reviewStandardList[i].attachId == this.fromAttach[j].attachId){
                        flag = false
                    }
                }
                if(flag){
                    this.form.reviewStandardListDto.reviewStandardList.splice(i,1)
                }
            }

            let arr = []
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                if(this.form.reviewStandardListDto.reviewStandardList[i].attachId){
                    arr.push(this.form.reviewStandardListDto.reviewStandardList[i].attachId)
                }
            }
            this.attach = arr

            this.getAllScore();


        },
        async getpings(){
            this.loading = false
            const res = await network.getReviewRuleCopy({data:{competitionId:this.competitionId,rowId:this.rowId}});
            if(res=='error') return;
            this.show = true
            if(res){
                // 设置默认值
                if(!res.means&&res.means!=0) res.means = 80
                if(!res.deviation&&res.deviation!=0) res.deviation = 0.05
                 if(!res.remarkMustFillIn){
                    res.remarkMustFillIn = 0
                }
                if(res.drawStartTime && res.drawEndTime){
                    this.timesa = [res.drawStartTime, res.drawEndTime]
                }else{
                    this.timesa = []
                }
                
                this.form = res
                this.scoreLimit = res.scoreLimits||this.scoreLimit
            }else{
                this.initFrom()
            }

            const attach = await network.getPoolGetPool({data:{competitionId:this.competitionId,rowId:this.rowId}});
            if(attach=='error') return;
            this.fromAttach = attach;

            this.setreviewStandardList();
            this.getAllScore()



        },
        /**
       * 评审设置确定提交
       */
        async submitsetPS(formname) {
            this.$refs[formname].validate(async (valid)=>{
                if(!valid) return;
                this.loading = true
                if(this.attach.length<1 && this.form.pattern==1){
                    this.loading = false
                    return this.$message.warning('请选择参与评分附件')
                }

                if(this.allsorce!=100){
                    this.loading = false
                    return this.$message.warning('总分必须为100')
                }

                if(
                    this.form.countType==3 &&
                    (
                        (this.form.deviation!=0 && !this.form.deviation) ||
                        (this.form.means!=0 && !this.form.means)
                    )
                  ){
                      this.loading = false
                    return this.$message.warning('离散算法计算时，请填写偏离值和默认均值')
                }

                let arr = this.form.reviewStandardListDto.reviewStandardList
                for(let i in arr){
                    // if(!arr[i].total && this.form.pattern==1){
                    //     this.$message.warning('请填写评审次数') ;
                    //     return;
                    // }

                    let score = 0;
                    for(let j in arr[i].reviewScores){
                        if(!arr[i].reviewScores[j].title ||!arr[i].reviewScores[j].weight ||!arr[i].reviewScores[j].info ){
                             this.loading = false 
                             return this.$message.warning("请填写评分标准")
                        }
                        score += parseInt(arr[i].reviewScores[j].weight)
                        arr[i].reviewScores[j].score = 100
                    }

                    if(score!=100){
                        this.loading = false
                        return this.$message.warning('各权重总分必须为100')
                    }
                    arr[i].total = 100
                }
                let maxNums = 0
                let scoreArr = []
                let count = 0
                for(let i = 0;i<this.scoreLimit.length;i++){
                    if(String(this.scoreLimit[i].maxNum).split('.').length>1||Number(this.scoreLimit[i].maxNum) <0){
                        this.$message.info('评分比例必须正为整数')
                        count++
                        this.loading = false
                        return
                    }
                    if(String(this.scoreLimit[i].minNum).split('.').length>1||Number(this.scoreLimit[i].minNum) <0){
                        count++
                        this.$message.info('评分比例必须正为整数')
                        this.loading = false
                        return
                    }
                    // 要求区间上下包含整数，实际区间下包涵上不包含可以达到连续，所以打开小数点使 区间在整数段实现上下包含2022-5-31
                    // if(String(this.scoreLimit[i].minScore).split('.').length>1||Number(this.scoreLimit[i].minScore) <0){
                    //     count++
                    //     this.$message.info('评分必须正为整数')
                    //     this.loading = false
                    //     return
                    // }
                    // if(String(this.scoreLimit[i].maxScore).split('.').length>1||Number(this.scoreLimit[i].maxScore) <0){
                    //     count++
                    //     this.$message.info('评分必须正为整数')
                    //     this.loading = false
                    //     return
                    // }
                    if(this.scoreLimit[i].maxScore >= 0 && this.scoreLimit[i].minScore >= 0){
                        if(this.scoreLimit[i].minNum >= 0 || this.scoreLimit[i].maxNum >= 0){
                            
                        }else{
                            count++
                            this.$message.info('最小比例/最大比例必须填写一个')
                            this.loading = false
                            return
                        }
                    }else{
                        count++
                        this.$message.info('评分上限/评分下限必填')
                        this.loading = false
                        return

                    }


                    maxNums += Number(this.scoreLimit[i].maxNum)
                    scoreArr.push([
                        this.scoreLimit[i].minScore,
                        this.scoreLimit[i].maxScore
                    ])
                }

                if(count>0){
                    this.loading = false
                    return
                }
                if(maxNums>this.form.reviewCount){
                    this.$message.info('专家评审次数大于专家评审次数上限')
                    this.loading = false
                    return
                }

                // 而为数组，通过比对前后数据判断评分限制，只写了从大到小，从小到大两种，乱序的没有处理
                let flag1=true,flag2=true
                for(let i in scoreArr){
                    if(parseInt(scoreArr[i][0]) >  parseInt(scoreArr[i][1])){
                        this.loading = false
                        return this.$message.info('评分限制填写错误')
                    }
                    if(i>0){
                        // 从大到小
                        if(parseInt(scoreArr[i-1][0])<parseInt(scoreArr[i][1])){
                            flag1 = false
                        }
                        // 从小到大
                        if(parseInt(scoreArr[i-1][1])>parseInt(scoreArr[i][0])){
                            flag2 = false
                        }
                    }
                }
                if(!(flag1||flag2)){
                    this.loading = false
                    return this.$message.info('评分限制填写错误')
                }

                // 通过放入object中判断是否重复来检查错误
                // let scoresAll = []
                // scoreArr.forEach(ele =>{
                //     for(let i = Number(ele[0]) ;i<Number(ele[1])+1 ;i++){
                //         scoresAll.push(i)
                //     }
                // })
                // console.log(scoreArr);

                // let hash = {}
                // for(let i in scoresAll){

                //     if(hash[scoresAll[i]] && scoresAll[i]!=scoresAll[i-1]){
                //         this.$message.info('评分限制填写错误')
                //         return
                //     }
                //     hash[scoresAll[i]] = true
                // }
                this.form.scoreLimits = this.scoreLimit
                this.form.remark = this.form.remark*1
                if(this.timesa.length !== 2){
                    this.$message.error('请填写作品抽签时间')
                    this.loading = false;
                    return
                }else{
                    this.form.drawStartTime = this.timesa[0]
                this.form.drawEndTime = this.timesa[1]
                this.loading = false;
                }
                
                let save = await network.saveReviewRuleCopy( {data: this.form} )
                if(save=='error') return this.loading = false;
                return this.show = false
            })

        },

         /**
         * 判断总百分比分数是否超过一百分
         */
        checkSorce(index,i){
            var tem = this.form.reviewStandardListDto.reviewStandardList[index].reviewScores;
            var arr = 0;
            for(var m=0; m<tem.length; m++){
                arr += parseInt(tem[m].weight)?parseInt(tem[m].weight):0;
            }
            if(arr > 100){
                this.$message({
                    message: '分值百分比总和不能超过100%！',
                    type: 'error'
                });
                tem[i].weight = 0;
                return;
            }
            if(this.form.pattern==0){
                this.allsorce = arr
            }
        },
        checkTotalSorce(i){
            var tem = this.form.reviewStandardListDto.reviewStandardList;
            var arr = 0;
            for(var m=0; m<tem.length; m++){
                arr += parseInt(tem[m].weight)?parseInt(tem[m].weight):0;
            }
            if(arr > 100){
                this.$message({
                    message: '分值百分比总和不能超过100%！',
                    type: 'error'
                });
                tem[i].weight = 0;
            }else{
                this.allsorce = arr
            }
        },
        delReview(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores.splice(i,1)
        },
        addReview(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores.push({
                itemId:util.randomChar(12),
                title:'',
                weight:'',
                info:'',
                score:'',
                options:[
                    {
                        lever:'',
                        score:''
                    }
                ]
            })
        },
        delNorm(index,i,j){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores[i].options.splice(j,1)
        },
        addNorm(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores[i].options.push({
                lever:'',
                score:''
            })
        },
        delTag(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments.splice(i,1)
        },
        addTag(index){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments.push({
                minScore: null,
                maxScore: null,
                comments: [
                    {
                        context:''
                    }
                ]
            })
        },
        delComment(index,i,j){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments[i].comments.splice(j,1)
        },
        addComment(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments[i].comments.push({
                name:''
            })
        },
        addId(id){
            let flag = true

            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                if(this.form.reviewStandardListDto.reviewStandardList[i].attachId==id){
                    flag = false
                }
            }
            if(!flag) return;

            let name = ""
            for(let i in this.fromAttach){
                if(this.fromAttach[i].attachId==id){
                    name = this.fromAttach[i].attachName
                }
            }
            this.form.reviewStandardListDto.reviewStandardList.push({
                "attachId": id,
                "sort": '',
                "attachName": name,
                "total": 100,
                "weight": '',
                "reviewScores": [
                {
                    "itemId":util.randomChar(12),
                    "title": "",
                    "weight": '',
                    "info": "",
                    "score": '',
                    "options": [ ]
                }
                ],
                "reviewComments": [ ]
            })

        },
        delId(id){
            let index = '';
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                if(this.form.reviewStandardListDto.reviewStandardList[i].attachId==id){
                    index = i;
                }
            }
            if(!index) return;
            this.form.reviewStandardListDto.reviewStandardList.splice(index,1);
        }
    },
    watch:{
        attach(val,oldval){
            if(this.form.pattern==0) return;
            let attId = '';
            console.log(val.length-oldval.length)
            if(val.length-oldval.length==1){
                attId = val[val.length-1];
                this.addId(attId)
            }else if(val.length-oldval.length==-1){

                for(let i in oldval){
                    if(!val.includes(oldval[i])){
                        attId = oldval[i];
                    }
                }
                this.delId(attId)
            }else{

            }
        }
    }
}
</script>


<style lang="less" scoped>
.countType{
    vertical-align: top;
    .el-radio{
        line-height: 40px;
    }
}
.block{
    display: block;
}
.reviewUser{
    .el-radio{
        line-height: 40px;
    }
}
.rules{
    width: 440px;
    margin: 0 auto;
    padding: 16px 20px 16px 40px;
    background: #fafafa;
    .delreview{
        position: relative;
        right:-30px;
    }
    .add_button{
        font-size: 12px;
        color: #1D86FF;
        padding-left: 5px;
        margin: 5px 0;
        cursor: pointer;
    }
    // .line{
    //     border-bottom: 1px solid #ccc;
    // }
    .score{
        width: 400px;
        background: #ECEAEA;
        margin: 10px 0;
        padding: 8px 0;
        line-height: 40px;
        .scoreDetail{
            margin-top: 8px;
            .num{
                display:inline-block;
                margin:0 0 0 5px;
                width: 10px;
            }
            i{
                font-size: 18px;
            }
        }
    }
    .review{
        border-bottom: 1px solid #ccc;
        padding: 14px 0;
    }
    .temp{
        width: 400px;

        padding: 0 5px 14px;

        .totalscore{
            text-align: right;
            line-height: 37px;
        }
        .tempDateil{
            background: #ECEAEA;
            padding: 10px;
            p{
                font-size: 14px;
                color: #4A4A4A;
                margin: 5px 0;
                span{
                    color: red;
                }
            }

            .question{
                margin: 0 81px 0 5px;
                font-size: 20px;
            }
        }
    }
    .title{
        padding: 10px 0;
        word-wrap: break-word;
        span{
            color:red;
            margin-right: 5px;
        }
        i{
            float: right;
            margin-right: 10px;
            cursor: pointer;
        }
    }
    .top{
        padding-bottom: 20px;
        border-bottom: 1px solid #DEDEDE;
        p{
            display: inline-block;
            width: 49%;
        }
        .el-input{
            width: 91px;
            margin: 0 7px 0 12px;
        }
    }
    .mintop{
        p{
            line-height: 40px;
            display: inline-block;
        }
        :first-child{
            margin-right: 215px;
        }
    }
}
.group_btn{
    text-align: right;
}
.limiTable{
    margin-left: 54px;
    background: #FAFAFA;
    padding: 20px 18px;
    p{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
        margin-bottom: 10px;
        span{
            &:nth-child(1){
                margin-left: 8px;
            }
            &:nth-child(2){
                margin-left: 65px;
            }
            &:nth-child(3){
                margin-left: 54px;
            }
            &:nth-child(4){
                margin-left: 38px;
            }
        }
    }
    li{
        list-style: none;
        margin-top: 10px;
        span{
            &:nth-child(1){}
            &:nth-child(2){
                // margin-left: 10px;
            }
            &:nth-child(3){
                margin-left: 16px;
            }
            &:nth-child(4){
                margin-left: 10px;
            }
        }
        .limitInput{
            width: 60px;
            margin-right: 5px;
            /deep/.el-input__inner{
                padding: 0 0 0 15px
            }
        }

    }
    .add_button{
        font-size: 12px;
        color: #1D86FF;
        padding-left: 5px;
        margin: 5px 0;
        cursor: pointer;
        background: #ECEAEA;
        padding: 8px 0;
        padding-left: 8px;
        margin-top: 10px;
    }
}
.inputNum{
    /deep/.el-input-number.is-controls-right .el-input__inner{
        padding-left: 10px;
        padding-right: 40px;
    }
}
.reviewset{
    display: inline-block;
    vertical-align: middle;
    .title{
        cursor: pointer;
    }
}
.pdfUrl{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>
