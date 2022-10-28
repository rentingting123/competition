<template>
    <div id="submitWork">
        <!--固定头部-->
        <div class="header_fixed">
            <div class="header_content">
                <router-link :to="{path:'/details?id='+cId}">{{$t('submitWork.back')}}</router-link>
                <div class="header_right">
                    <el-button type="primary" v-loading="loading"  size="mini" @click="submitWorks">{{$t('submitWork.submit')}}</el-button>
                </div>
            </div>
        </div>
        <div class="content">
            <!-- 作品提交须知 -->
            <div class="content_top" v-if="showAgreement">
                    <div class="content_top_txt">
                        <div>
                            <p v-bind:style = "{margin: '20px 0 10px',fontWeight:'700',color: 'red'}">
                                {{$t('submitWork.submitMess')}}:
                                <span v-bind:style = "{fontSize: '16px',fontWeight:'400'}">&nbsp;</span>
                            </p>
                            <el-input type="textarea" class="redTextarea" autosize disabled v-model="showAgreement"></el-input>
                        </div>
                    </div>
            </div>
            <!--中间内容-->
            <div v-if="workRule || workRule == null" class="content_top">
                <upload
                 class="avatar-uploader"
                v-if="workRule.content && workRule.content.includes(1) || workRule == null"
                :showlist="false"
                :onError="handleFileError"
                :drag='true'
                :onSuccess = "coverSuccess"
                :limit='1'
                :beforeUpload = "coverBeforerUpload"
                :config="{fileType:6,folder:gId}"
                >
                    <img v-if="thunbnail" :src="thunbnail" class="avatar">
                    <div class="cover" v-else>
                        <i class="iconfont">&#xe654;</i>
                        <p>{{$t('submitWork.pic')}}</p>
                        <p>{{$t('submitWork.picsize')}}</p>
                    </div>
                </upload>
                <div class="content_top_txt">
                    <div v-if="workRule.content && workRule.content.includes(2) ||  workRule == null">
                        <p v-if="workTitle" style="font-weight:700;">
                            <span style="color:red">*</span>
                            <i style="font-style: normal;"> {{themeTitle?themeTitle:$t('submitWork.workName')}}</i>: 
                            <el-input style="margin-bottom:10px; font-size:14px;min-width:200px;max-width:300px;margin-left:20px;" @blur="checkTitle" maxlength="50" v-model="title" ></el-input>
                        </p>
                        <p v-if="workTitle" style="font-weight:700;">
                            <span style="color:#fff">*</span>
                            <i style="font-style: normal;">英文名称</i>: 
                            <el-input style="margin-bottom:10px; font-size:14px;min-width:200px;max-width:300px;margin-left:20px;" maxlength="255" v-model="titleEn" ></el-input>
                        </p>
                        <!-- <p v-if="workTitle" style="font-weight:700;">
                            <span style="color:red">*</span>
                            <i style="font-style: normal;" @click="themeShow = !themeShow"> {{themeTitle?themeTitle:ThemeTitle}}</i>: 
                            <el-input v-show="themeShow" @blur="themeShow = !themeShow" style="margin-bottom:10px; font-size:14px;max-width:100px;" v-model="themeTitle" ></el-input> 
                            <el-input style="margin-bottom:10px; font-size:14px;min-width:200px;max-width:500px;margin-left:20px;" v-model="title" ></el-input>
                        </p> -->
                    </div>
                    <div v-if="workRule.content && workRule.content.includes(3) ||  workRule == null">
                        <p v-if="workContent">{{description ? description : $t('submitWork.description')}}<i class="iconfont iconfont-blurgreen" @click="workContent = !workContent">&#xe634;</i></p>
                        <el-input
                          type="textarea"
                          v-model="description"
                          :rows="4"
                          :placeholder="$t('submitWork.enter')"
                          @blur="workContent = !workContent"
                          v-else>
                        </el-input>
                    </div>
                </div>
            </div>

            <!-- 赛题 -->
            <div class="content_top" v-if="isTopic">
                <div class="content_top_txt">
                    <div style="display: flex;align-items: center;">
                        <p v-bind:style = "{margin: '10px 20px 10px 0',fontWeight:'700'}">
                            <span style="color:red">*</span>{{$t('submitWork.topic')}}:
                            <span v-bind:style = "{fontSize: '16px',fontWeight:'400'}">&nbsp;</span>
                        </p>
                        <el-select 
                            v-model="topicName" 
                            filterable
                            :allow-create='custom'
                            @blur="blurValue"
                            default-first-option>
                            <el-option v-for="item in topicList" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>

            <div class="content_center">
                <div class="wrapper_center">
                    <div v-if="workRule.content && workRule.content.includes(4)  || workRule == null">
                        <p v-bind:style = "{marginTop: '20px',fontWeight:'700'}">
                            <span style="color:red">*</span>{{$t('submitWork.workShow')}}:
                            <span v-bind:style = "{fontSize: '16px',fontWeight:'400'}">(1000字以内)</span>
                        </p>
                        <el-input
                          v-bind:style = "{marginTop: '20px'}"
                          type="textarea"
                          :rows="4"
                          
                          autosize
                          :placeholder="$t('submitWork.enter')"
                          @input="contentChange"
                          v-model="content">
                        </el-input>
                    </div>
                    <dl style="margin-left:20px;" v-if="workRule.content && workRule.content.includes(5)  || workRule == null">
                        <dt><span style="color:red">*</span> {{workKeyword}}</dt>
                        <el-select 
                            v-model="keywordName" 
                            filterable
                            :allow-create='customKeyword'
                            :multiple="multiple"
                            @blur="keywordblur"
                            default-first-option>
                            <el-option v-for="item in keywordList" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <!--动态编辑标签-->
                        <!-- <el-tag
                            :key="tagIndex"
                            v-for="(tag, tagIndex) in categoryTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            :placeholder="$t('submitWork.tags')"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm">
                        </el-input> -->
                        <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
                    </dl>
                </div>
                <div class="wrapper_bottom" v-if="!workRule || workRule && workRule.attachList">
                    <h2>{{$t('submitWork.attach')}}:</h2>
                    <ul>
                        <li
                          v-for="(attach, index) in workRule.attachList"
                          :key="index"
                        >
                            <p class="emphasis">
                                <span v-if="attach.attach">*</span>
                                <em v-if="!attach.attach">【{{$t('submitWork.maybe')}}】</em> 
                                <em v-if="attach.attach">【{{$t('submitWork.must')}}】</em>
                                {{attach.attachName}}
                                <el-tooltip 
                                    v-if="attach.attachType.includes(2)"
                                    class="item" 
                                    effect="dark" 
                                    :content="$t('submitWork.canplay')" 
                                    placement="top-start">
                                    <i class="el-icon-warning"></i>
                                </el-tooltip>
                            </p>
                            <!-- <div class="type">
                                <p>作品附件格式：</p>
                                <div>
                                    <p v-for="(item, itemIndex) in attach.attachType" :key="itemIndex">{{typeList[item-1].name}}</p>
                                </div>
                            </div>    -->
                            
                            <upload
                            v-if='attach.type'
                            :showlist="false"
                            :drag='true'
                            :limit='1'
                            :onError="handleFileError"
                            :onSuccess = "function success(response, file, fileList) {
                                  handleFileSuccess(response, file, index)
                                }"
                            :fileList="attach.fileList || []"
                            :disabled="attach.fileList && attach.fileList.length>=1 || attach.fileList.length>0 && attach.attachType.length==1 "
                            
                           :accept='attach.type'
                            :beforeUpload="function fun(file) {
                                  return beforeUpload(file, attach.type)
                                }"
                            :config="{fileType:6,folder:gId}"

                            >
                               <div>
                                    <i class="iconfont top">&#xe614;</i>
                                    <div class="el-upload__text">{{$t('submitWork.upload1')}}<em>{{$t('submitWork.upload2')}}</em>

                                     <div v-if="attach.notice" class="el-upload__tip" slot="tip" style="color:red;">{{attach.notice}}</div>
                                     <div v-else class="el-upload__tip" slot="tip" style="color:#000000;">{{$t('submitWork.upload3')}}{{attach.type}}
                                        <p>{{$t('submitWork.upload4')}}</p>
                                        </div>
                                    </div>
                               </div>
                            </upload>
                           
                            <div class="file-list">
                                <div
                                  v-if="item.type!==4"
                                  :style="{marginBottom: '10px', width: '360px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}"
                                  v-for="(item, j) in attach.fileList"
                                  :key="j"
                                  
                                >
                                    <div>
                                        <el-input :style="{width: '200px'}" v-model="item.name"></el-input>
                                        <a :style="{color: '#1D86FF'}" :href="item.url" target="_blank" :download="item.url">{{$t('submitWork.download')}}</a>
                                        <span :style="{margin: '0 10px'}">{{item.extensionName}}</span>
                                    </div>
                                    <span :style="{cursor: 'pointer',marginBottom:'20px'}" @click="delFileFun(index, j)" >
                                        <el-icon class="el-icon-close"></el-icon>
                                    </span>
                                </div>
                            </div>
                            <div class="link-container">
                                <div class="link-item">
                                    <div class="link" v-for="(item, j) in attach.fileList" :key='j'>
                                        <el-input
                                          v-if="item.type==4"
                                          :style="{marginRight: '10px', width: '150px'}"
                                          :placeholder="$t('submitWork.enterMess')"
                                          v-model="item.name" />
                                        <el-input
                                          v-if="item.type==4"
                                          :style="{width: '400px'}"
                                          :placeholder="$t('submitWork.links')"
                                          v-model="item.url">
                                            <template slot="prepend">Http(s)://</template>
                                        </el-input>
                                        <i @click="delFileFun(index, j)" v-if="item.type==4" class="el-icon-delete"></i>
                                    </div>
                                    <span class="add-color" v-if="attach.attachType.includes(4)" @click="addClassFun(index)">
                                        <i class="iconfont icon-zengjia"></i>
                                        <em>{{$t('submitWork.addLink')}}</em>
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <Footer></Footer>
    </div>
</template>


<script>
import upload from '@/components/fileUpload/index'
import { strLength } from "@/utils/util";
import network from '@/api/jxapi/index'
    export default {
        name: 'submitWork',
        components: {
            upload
        },
        data(){
            return {
                showAgreement: '', //作品提交须知
                themeTitle:'',//作品主题标签
                themeShow:false,
                gId: null,
                competitionId:'',
                fileList: [], //作品介绍列表
                thunbnail: '', // 上传封面图片
                workTitle: true, // 作品标题
                title:'', //作品名称
                titleEn: '', //英文名
                workContent: true, // 作品简介
                description:'',
                content: '', // 富文本内容
                oldContent: '', //监控长度时使用
                categoryTags: [], // 动态编辑标签
                inputValue: '', // 动态编辑标签
                workRule: {},
                typeList: [
                    {name: '文档类（pdf）',type: '.pdf'},
                    {name: '媒体类（mp4,mp3）',type: '.mp4,.mp3'},
                    {name: '图片类（jpg、gif、png）',type: '.jpeg,.jpg,.gif,.png'},
                    {name: '作品外链',type: ''},
                    {name: '其他文件（仅限zip、office软件)',type: '.zip,.doc,.docx,.ppt,.pptx,.xls,.xlsx'}
                ],
                rowId:'',
                loading:false,
                topicName: '', //赛题名称
                topicList: [], //赛题列表
                isTopic: false, //是否显示赛题
                custom: false, // 赛题是否自定义
                keywordList: [], // 关键词列表
                customKeyword: false, // 关键词是否自定义
                multiple: false, // 关键词多选
                workKeyword: '作品关键词',
                keywordName: '', //关键词

            }
        },
        methods: {
            blurValue(e){
                if(!this.custom) return;
                let name = e.target.value
                if(!name) return;
                if(!this.topicList.includes(name)){
                    this.topicList.push(name)
                }
                this.topicName = name
            },
            keywordblur(e){
                console.log("动态编辑",e)
                if(!this.customKeyword) return;
                let name = e.target.value
                if(!name) return;
                if(!this.keywordList.includes(name)){
                    this.keywordList.push(name)
                }
                this.keywordName = name
            },
            //自定义需要回车才触发 不友好 故舍弃
            // keywordChange(val){
            //     console.log(val,"categoryTags")
            //     console.log(this.keywordName,this.multiple)
            //     if(this.multiple){
            //         this.categoryTags = val
            //     }else{
            //         this.categoryTags = [ val ]
            //     }
            // },
            // 控制主题输入框的显示隐藏
            // changTheme(){
            //     this.themeShow = !this.themeShow
            // },
            //获取作品详情
            async getDetail(ruleData) {
                let res = await network.getWorkRuleByCompetitionId({id:this.id});
                if(res=='error') return;
                this.thunbnail = res.thunbnail

                // this.cId = res.competitionId
                this.gId = res.objectId
                this.title = res.title
                this.titleEn = res.titleEn
                this.description = res.description
                this.content = res.infoObj ? res.infoObj.content : ''
                this.oldContent = this.content
                res.infoObj.content = ruleData.content
                this.workRule = this.filterAttach(res.infoObj)
                this.rowId = res.rowId
                // 赛题部分赋值
                this.topicList = res && res.topicList || []
                this.isTopic = res && res.isTopic ? true : false
                this.custom = res && res.custom ? true : false
                this.topicName = res && res.topicName || ''
                // 关键词
                let arr = []
                if (res.tagsList) {
                    for (let i=0; i< res.tagsList.length; i++) {
                        arr.push(res.tagsList[i].tagname)
                    }
                }
                this.categoryTags = arr

                this.keywordList = res && res.keywordList || []
                this.customKeyword = res && res.customKeyword ? true : false
                this.multiple = res && res.multiple ? true : false
                this.workKeyword = res && res.workKeyword || '作品关键词'
                
                
                if(this.multiple){
                    this.keywordName = this.categoryTags
                }else{
                    this.keywordName = this.categoryTags.length>0 ? this.categoryTags[0] : ''
                }
                
            },
            //获取作品规则
            async getWorkRule() {
                if (this.id == 0) {
                    let res = await network.getWorkRuleByCompetitionIdApi({data:{competitionId:this.cId,rowId:this.rowId}});
                    if(res=='error') return;
                    this.showAgreement = res && res.agreement || ''
                    this.workRule = this.filterAttach(res)
                    // 赛题部分赋值
                    this.topicList = res && res.topicList || []
                    this.keywordList = res && res.keywordList || []
                    this.isTopic = res && res.isTopic ? true : false
                    this.custom = res && res.custom ? true : false
                    this.multiple = res && res.multiple ? true : false
                    this.workKeyword = res && res.workKeyword || '作品关键词'
                    this.customKeyword = res && res.customKeyword ? true : false

                } else {
                    let res = await network.getWorkRuleApiCopy({data:{poolId:this.id}})
                    if(res=='error') return;
                    this.showAgreement = res && res.agreement || ''
                    this.getDetail(res)
                }
                
            },
            filterAttach (data) {
                if ( !data.attachList) {
                    return data
                } else {
                    for (let i=0; i<data.attachList.length; i++) {
                        data.attachList[i].type = ''
                        if (this.id==0) {
                            data.attachList[i].fileList = []
                        }
                        if (data.attachList[i].attachType) {
                            for (let j=0; j<data.attachList[i].attachType.length; j++) {
                                if (this.typeList[data.attachList[i].attachType[j]-1].type) {
                                    data.attachList[i].type += (this.typeList[data.attachList[i].attachType[j]-1].type + ',')
                                }
                            }
                            data.attachList[i].type = data.attachList[i].type.substring(0, data.attachList[i].type.length - 1)

                        }
                    }
                    return data
                }
            },
            //增加外链
            addClassFun (i) {

                if(this.workRule.attachList[i].fileList.length > 0 ){
                    var arr = []
                    for(let j = 0;j <this.workRule.attachList[i].fileList.length;j++){
                        arr.push(this.workRule.attachList[i].fileList[j].type)
                    }
                    if(arr.indexOf(4) !== -1){
                            this.$message.warning(this.$t('submitWork.linkOneMess'))
                        }else{
                            this.workRule.attachList[i].fileList.push({
                                name: '',
                                url: '',
                                type: 4
                            })
                        }
                }else{
                        this.workRule.attachList[i].fileList.push({
                        name: '',
                        url: '',
                        type: 4
                    })

                }
            },
            //删除附件
            delFileFun (i, j) {
                let arr = this.workRule.attachList[i].fileList.slice(0)
                arr.splice(j, 1)
                this.workRule.attachList[i].fileList = arr
            },
            // 封面上传
            coverSuccess(res, file) {
                // console.log(res,file) 
                this.thunbnail = res.location;
            },
            beforeUpload(file,type){
                // 20210507 accept中添加，这边不需要判断
                const index = file.name.lastIndexOf('.')
                if (index === -1) {
                    this.$message.warning(this.$t('submitWork.noSupport'))
                    return false
                }
                const filename = file.name.substring(index).toLocaleLowerCase()
                if (type&&!type.includes(filename)) {
                    this.$message.warning(this.$t('submitWork.noSupport'))
                    return false
                }

                // 20201127限制作品图片最大值为20M
                if(file.type.indexOf('image') != -1){
                    const size = file.size / 1024 / 1024 < 20;
                    if (!size) {
                        this.$message.warning(this.$t('submitWork.jpgSize20'));
                    }
                    return size;
                }

                //2021上传的文件名只能为中英和数字
                //2021.4.19文件名切换回hash
                // let fileKey = file.name.substr(0,index)
                // let reg = /^[\u4E00-\u9FA5A-Za-z0-9 ]+$/
                // if(!reg.test(fileKey)){
                //     this.$message.warning('文件名称仅支持中文、英文、空格和数字')
                //     return false
                // }
            },
            coverBeforerUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.warning(this.$t('submitWork.jpgImage'));
                }
                if (!isLt2M) {
                this.$message.warning(this.$t('submitWork.jpgSize'));
                }
                return isJPG && isLt2M;
            },
            // 动态编辑标签
            // handleClose(tag) {
            //     this.categoryTags.splice(this.categoryTags.indexOf(tag), 1);
            // },

            showInput() {
                // this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            // handleInputConfirm() {
            //     let inputValue = this.inputValue;
            //     if (inputValue) {
            //     this.categoryTags.push(inputValue);
            //     }
            //     // this.inputVisible = false;
            //     this.inputValue = '';
            // },
            handleFileError (res) {
                this.$message.warning(this.$t('submitWork.fileError'))
            },
            handleFileSuccess(res, file, i) {
                if(file.name && file.name.indexOf('.') > -1){
                    let arr = file.name.split(".");
                    this.workRule.attachList[i].fileList.push({
                        name: file.name,
                        type: this.filterType(arr[arr.length-1]),
                        url: res.location,
                        extensionName: arr[arr.length-1],
                        fileKey:res.name
                    })
                }
            },
            // handleRemove(file, files,i){
            // this.workRule.attachList[i].fileList = files
            // },
            filterType(type) {
                let filterType = ''
                let _type = type.toLocaleLowerCase()
                for (let i=0; i<this.typeList.length; i++) {
                    if (this.typeList[i].type.includes(_type)) {
                        filterType = i+1
                        break
                    }
                }
                return filterType
            },
            // 作品名称检查 20201027 暂时只支持中英文和数字 1111加上空格/20215.4工商法律赛要求可以输入特殊字符
            checkTitle(){
                // //replace 允许存在的
                // let allowReg = /\+|——|：|，|“|”/g
                // let _chackTitle = this.title.replace(allowReg,"")
                // //检查去除允许后的字符
                // let reg = /^[\u4E00-\u9FA5A-Za-z0-9 ]+$/
                // if(!reg.test(_chackTitle)&&this.workRule.content.includes(2)){
                //     this.$message.warning('作品名称仅支持中文、英文、和数字(包括中文状态的“” + —— ：)')
                //     return false
                // }
                let unreg=/\//
                if(unreg.test(this.title)&&this.workRule.content.includes(2)){
                    this.$message.warning('作品名称不允许包含“/”')
                    return false
                }
                return true
            },
            async submitWorks(){
                if(this.loading) return;
                if(!this.checkTitle()) return;

                if(!this.title&&this.workRule.content.includes(2) ){
                    this.$message.warning(this.$t('submitWork.titleRequired'))
                }else if(!this.content&&this.workRule.content.includes(4) ){
                    this.$message.warning(this.$t('submitWork.introduceRequired'))
                }else if(!this.keywordName&&this.workRule.content.includes(5) ){
                    this.$message.warning(this.$t('submitWork.keyworkRequired'))
                }else{

                for(let i = 0;i < this.workRule.attachList.length;i++){
                    let item = this.workRule.attachList[i];
                    if (item.attach && !item.fileList.length) {
                        this.$message.warning(`${item.attachName}为必填项`)
                        return
                    }
                    if (item.fileList.length) {
                        for(let j = 0;j < item.fileList.length; j++) {
                            if (item.fileList[j].type == 4) {
                                if ( item.fileList[j].name.trim(' ')=='' && !item.fileList[j].url.trim(' ')=='') {
                                    item.fileList.splice(j, i)
                                } else if(!item.fileList[j].name.trim(' ')) {
                                    this.$message.warning('外链描述不能为空')
                                    return
                                } else if (!item.fileList[j].url.trim(' ')) {
                                    this.$message.warning('外链链接不能为空')
                                    return
                                }
                            } else {
                               if(!item.fileList[j].name.trim(' ')) {
                                    this.$message.warning('附件名称不能为空')
                                    return
                                }
                            }
                        }
                    }
                }
                var params = {
                    "thunbnail": this.thunbnail,
                    "attachList": this.workRule.attachList,
                   //"categoryTags": this.categoryTags onchange方法选择不触发所以直接使用v-model,
                    "categoryTags": this.multiple?this.keywordName:[this.keywordName],
                    "content": this.content,
                    "description": this.description,
                    "title": this.title,
                    "titleEn": this.titleEn,
                    'type': 4,
                    "rowId": this.rowId,
                };
                // 赛题
                if(this.isTopic){
                    if(!this.topicName){
                        return this.$message.warning('请选择赛题')
                    }else{
                        params.topicName = this.topicName
                    }
                }

                this.loading=true
                if (this.id != 0) {
                    //todo提醒用户保存会清空作品评审成绩
                    params.id = this.id
                }
                params.competitionId = this.cId
                params.groupId = this.gId
                let savework = await network.saveWorkApi({data:params});
                this.loading=false
                if(savework=='error') return;
                this.$message.success(this.$t('submitWork.submitSuccess'));
                this.$router.push('/details/worksShow?id='+this.cId)

                }
                

            },
            // 监控2000个字节
            contentChange(val){
                if(strLength(val)<2000){
                    this.content = val
                    this.oldContent=val
                }else{
                    this.content = this.oldContent
                }
                
            }
        },
        created(){
            this.id = this.$route.params.workId
            this.cId = this.$route.params.cId || parseInt(localStorage.getItem('competitionId'));
            this.gId = this.$route.params.gId || ''
            this.rowId = this.$route.query.id
            
            this.getWorkRule()
            
            // 20200730 关键词使用tagsList,此处多余，暂时隐藏
            // let baseInfo = JSON.parse(localStorage.getItem('baseInfo'))
            // if(baseInfo.tags && baseInfo.tags.tags) {
            //     for(let i=0; i<baseInfo.tags.tags.length; i++) {
            //         if(baseInfo.tags.tags[i].tagtype == '作品分类')
            //         this.categoryTags.push(baseInfo.tags.tags[i].tagname)
            //     }
            // }
            
        }
    }
</script>


<style lang="less" scoped>
#submitWork{
    text-align: start;
    // 固定头部
    .top{
        font-size: 35px;
        line-height: 60px;
    }
    .header_fixed{
        width: 100%;
        height: 52px;
        display: flex;
        align-items: center;
        background: #FDF6D0;
        position: sticky;
        top: 0px;
        z-index: 2;
        text-align: start;
        .header_content{
            width: 1040px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            a{
                color: #4A4A4A;
                font-size: 14px;
                margin-top: 4px;
            }
            .iconfont-green{
                color: #52C41A;
            }
            .iconfont-green+span{
                font-size: 14px;
                color: rgba(0,0,0,0.65);
            }
        }
    }
    // 中间内容
    .content{
        width: 1040px;
        margin: auto;
        padding-bottom: 40px;
        // 上传封面开始
        .avatar-uploader{
            width: 360px;
            height: auto;
            margin-right: 10px;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar {
            width: 360px;
            height: auto;
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        .cover{
            width: 360px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #fff;
            background:rgba(0,0,0,0.5);
            i{
                font-size: 40px;
                margin-bottom: 8px;
            }
            p{
                font-size: 14px;
                margin-bottom: 4px;
            }
            p+p{
                font-size: 12px;
            }
        }
        // 上传封面结束

        >a{
            display: inline-block;
            margin-top: 20px;
            margin-bottom: 30px;
            color:#4A4A4A;
        }
        .content_top{
            width: 100%;
            min-height: 80px;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 25px;
            display: flex;
            align-items: flex-start;
            padding: 30px 55px;
            box-sizing: border-box;
            >img{
                width: 300px;
                height: 170px;
            }
            .content_top_txt{
                width: 100%;
                min-height: 50px;
                // margin-left: 15px;
                // font-size: 14px;
                line-height: 20px;
                h2{
                    margin-bottom: 30px;
                }
                h4{
                    font-size: 18px;
                    margin-bottom: 12px;

                }

            }
        }
        .content_center{
            width: 100%;
            margin-bottom: 35px;
            background-color: #fff;
            padding: 0px 55px;
            box-sizing: border-box;
            overflow: hidden;
            .wrapper_center{
                margin-bottom: 40px;
                >h2{
                    border-left: 4px solid #1D86FF;
                    padding-left: 15px;
                    font-size: 26px;
                    margin-bottom: 30px;
                    margin-top: 20px;
                }
                dl{
                    overflow: hidden;
                    dt{
                        margin-top: 35px;
                        margin-bottom: 14px;
                    }
                    dd{
                        padding: 6px 12px;
                        background-color: #1D86FF;
                        float: left;
                        font-size: 14px;
                        border-radius: 14px;
                        color:#fff;
                        margin-bottom: 14px;
                        margin-right: 10px;
                    }
                }
            }
            .wrapper_bottom{
                margin-bottom: 40px;
                >h2{
                    // border-left: 4px solid #1D86FF;
                    padding-left: 15px;
                    font-size: 16px;
                }
                p{
                    font-size: 14px;
                    margin-top: 12px;
                }
                li{
                    padding-left: 20px;
                    border-top: 1px solid #DEDEDE;
                    padding-bottom: 40px;
                }
                li:nth-child(1){
                    border-top: none;
                }
                .emphasis{
                    margin-top: 35px;
                    position: relative;
                    span{
                        position: absolute;
                        left:-10px;
                        top:0;
                        color:red;
                    }
                    em{
                        font-style:normal
                    }
                }
            }
        }
    }

    .el-tag{
        background-color: #1D86FF;
        border-radius: 16px;
        color:#fff;
        /deep/ .el-icon-close{
            color:#fff;
        }
    }
    .el-tag + .el-tag {
        margin-left: 10px;
        margin-bottom: 14px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 120px;
        margin-left: 10px;
        vertical-align: top;
        position: relative;
        /deep/ .el-input__inner{
            border-radius: 16px;
            border-color: #1D86FF;
            padding: 0 10px;
        }
    }
    .input-new-tag::before{
        content: "+";
        width: 32px;
        height: 32px;
        background: #1D86FF;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        padding-top: 2px;
        box-sizing: border-box;
    }
    .iconfont-blurgreen{
        color:#bababa;
        font-size: 16px;
        font-weight: normal;
        margin-left: 5px;
        cursor: pointer;
    }
    .upload-demo{
        margin-top:10px;
        .iconfont{
            margin: 50px 0 20px 0;
            display: block;
        }
    }
    .type {
        display: flex;
    }
    .link-container {
        margin-top: 10px;
    }
    .link-item {
        .add-color {
            display: block;
            color: #1D86FF;
            cursor: pointer;
            text-align: start;
            margin-top: 10px;
            em {
                margin-left: 8px;
                font-style: normal;
            }
        }
    }
    .link {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .el-icon-delete {
            font-size: 20px;
            margin-left: 10px;
        }
    }
}
</style>

<style lang="less">
#submitWork{
    .redTextarea{
        .el-textarea__inner{
            color: red;
        }
    }
}
</style>
