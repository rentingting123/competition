<template>
    <div id="contestInfo">
        <!-- 竞赛信息 -->
        <div class="tag_content">
            <div class="message_content">
                <div class="editor">
                    <div class="tag_name">
                        <span></span>
                        <div class="title">
                            <h1>{{tabsName}}</h1>
                            <i class="el-icon-edit-outline" @click="getInfoFn" v-if="finish!=0 && isEdit"></i>
                        </div>
                    </div>
                    <div class="tag_content" v-if="competitionId">
                        <div class="tag_content_title" v-if="ruleForm.info">
                            {{$t('contestInfo.competitionbackground')}}
                        </div>
                        <div class="tag_content_txt" v-html="ruleForm.info" style="white-space:pre-wrap"></div>
                        <div class="tag_content_title">
                            {{$t('contestInfo.competitionMess')}}
                        </div>
                        <div class="tag_content_txt" v-if="ruleForm.competitionRange">
                            <span>{{$t('contestInfo.competitionRange')}}{{ruleForm.competitionRange}}</span>
                        </div>
                        <div class="tag_content_txt" v-if="ruleForm.holderCity">
                            <span>{{$t('contestInfo.city')}}{{ruleForm.holderCity}}</span>
                        </div>
                        <div class="tag_content_txt" v-if="ruleForm.holderAddr">
                            <span>{{$t('contestInfo.address')}}{{ruleForm.holderAddr}}</span>
                        </div>
                        <div class="tag_content_title" v-if="ruleForm.orgs">
                            {{$t('contestInfo.orgs')}}
                        </div>
                        <div class="tag_content_txt" v-for="(item, index) in ruleForm.orgs" v-if="item.units[0].name">
                            <span>{{item.organization}}：</span>
                            <div>
                                <!--<p v-for="(obj,idx) in item.units" v-if="!obj.organization_web_url">
                                    {{obj.name}}
                                    <el-tooltip content="已授权认证">
                                        <i class="tag_content_attestation"><img src="https://web.moocollege.com/mooc/hzq/competition/competition/认证.svg" alt=""></i>
                                    </el-tooltip>
                                </p>-->
                                <p v-for="(obj,idx) in item.units">
                                    <span v-if="!obj.organization_web_url">{{obj.name}}</span>
                                    <a :href="obj.organization_web_url" class="tag_content_txt_link" v-else>
                                        {{obj.name}}
                                        <i><img src="https://web.moocollege.com/mooc/hzq/competition/competition/链接.svg" alt=""></i>
                                    </a>
                                    <el-tooltip :content="$t('contestInfo.isAuthen')" v-if="obj.isAuthen">
                                        <i class="tag_content_attestation"><img src="https://web.moocollege.com/mooc/hzq/competition/competition/认证.svg" alt=""></i>
                                    </el-tooltip>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--竞赛信息弹框-->
        <el-dialog title="竞赛信息" :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="contestInfo_dialog" width="50rem">
            <div class="g-content">
                <p class="m-head">竞赛背景：</p>
                <!--富文本编辑器-->
                
                <editor class="m-text" :setDate="setDaterule" :stateData="richText"/>

                <el-form :model="ruleForm" ref="ruleForm" label-width="0" class="ruleForm">
                    <div class="m-area">
                        <div class="j-city">
                            <p style="font-weight:600;">
                                <span class="color-red">*</span>举办城市:
                            </p>
                            <el-cascader :options="areaData" :show-all-levels="false" v-model="cityArr" @change="areaFun"></el-cascader>
                        </div>
                        <div class="j-site">
                            <p style="font-weight:600;">举办地址:</p>
                            <el-input placeholder="请输入举办地址" v-model="ruleForm.holderAddr"></el-input>
                        </div>
                    </div>
                    <div class="m-class">
                        <p class="j-title">组织结构:</p>
                        <ul class="j-class">
                            <li v-for="(item,index) in ruleForm.orgs" :key="index">
                                <p class="li-title">
                                    <template v-if="index<7">{{item.organization}}</template>
                                    <template v-else>
                                        <el-input class="z-name" placeholder="请输入组织名" v-model="item.organization"></el-input>
                                        <i class="el-icon-delete" @click="delFun(index)"></i>
                                    </template>
                                </p>
                                <div class="li-http" v-for="(obj,j) in item.units" :key="j">
                                    <el-input class="z-name" placeholder="请输入单位名" v-model="obj.name"></el-input>
                                    <el-input class="z-http" placeholder="请输入单位链接" v-model="obj.organization_web_url">
                                        <template slot="prepend">http://</template>
                                    </el-input>
                                    <i v-if="!j"></i>
                                    <!--<i class="iconfont icon-del" @click="delUnit(index,j)" v-else>&#xe61e;</i>-->
                                    <i class="el-icon-delete icon-del" @click="delUnit(index,j)" v-else></i>
                                </div>
                                <span class="add-color" @click="addClassFun(index)">
                                    <i class="iconfont icon-zengjia">&#xe62d;</i>
                                    <em>增加单位</em>
                                </span>
                            </li>
                        </ul>
                        <span class="add-color add-class-margin" @click="addFun">
                            <i class="iconfont icon-zengjia"></i>
                            <em>增加自定义组织机构</em>
                        </span>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="group_btn">
                <el-button size="small" @click="contestInfo_dialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="editFinish">完 成</el-button>
            </div>
            <!--<span slot="footer" class="dialog-footer">
                    <el-button @click="contestInfo_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="contestInfo_dialog = false">确 定</el-button>
                </span>-->
        </el-dialog>
    </div>
</template>


<script>
import area from '@@/assets/json/area.json'
import network from '@@/api/jxapi/index'
import editor from '@@/components/editor/index'
import { getTabsName } from '@@/utils/commons'
export default {
    name: 'contestInfo',
    props: ['tabs'],
    components:{
        editor
    },
    data() {
        return {
            isEdit: false,//是否可修改
            contestInfo_dialog: false,  //弹框竞赛信息
            areaData: area.provinces,    //城市数据
            cityArr: [], //城市
            richText: "", //富文本编辑框model
            title: { name: '竞赛信息', status: 5 },
            competitionId: '',
            ruleForm: {
                id: '', // 竞赛id
                info: '',   //竞赛背景
                holderProvence: '', //省
                holderCity: '',      //市
                holderAddr: '',      //详细地址
                orgs: [
                    {
                        organization: '主办方', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '承办方', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '秘书处', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '协办方', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '组委会', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '赞助商', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '冠名商', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    },
                    {
                        organization: '媒体', //组织名
                        units: [
                            {
                                name: '',    //单位名
                                organization_web_url: ''    //单位连接
                            }
                        ]
                    }
                ]
            },
            tabsName: '',
            finish: 0, // 竞赛是否结束 0结束 1未结束
        }
    },
    created() {
        this.tabsName = getTabsName(this.tabs, 0) || '竞赛信息'
        let path = this.$route.path;
        let isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
        if(path.indexOf('details') === -1){
            this.isEdit = true;
        }
        const id = localStorage.getItem('competitionId')
        if (id) {
            this.competitionId = parseInt(id, 10);
            this.getContentInfo();
        }
    },
    mounted () {
        
    },
    methods: {
        setDaterule(val){
            this.richText = val;
        },
        handleClose() { },
        /**
         * 选中的城市
         **/
        areaFun(e) {
            if(e.length==1){
                this.ruleForm.holderCity = this.cityArr[0];
                this.ruleForm.holderProvence = this.cityArr[0]
            }else{
                this.ruleForm.holderCity = this.cityArr[1];
                this.ruleForm.holderProvence = this.cityArr[0]
            }
        },
        /**
         * 增加单位
         * @param idx 下标
         **/
        addClassFun(idx){
            this.ruleForm.orgs[idx].units.push({
                name: '',    //单位名
                organization_web_url: '',   //单位连接
                logo_url:"",
                isAuthen: false,
            });
        },

        /**
         * 删除单位
         * @param index 组织机构下标, j 当前要删除的下标
         **/
        delUnit(index,j){
            this.ruleForm.orgs[index].units.splice(j,1);
            // alert(index + "--" + j);
        },

        /**
         * 增加自定义组织机构
         * @param idx 下标
         **/
        addFun() {
            this.ruleForm.orgs.push({
                organization: '', //组织名
                units: [
                    {
                        name: '',    //单位名
                        organization_web_url: ''    //单位连接
                    }
                ]
            });
        },

        /**
         * 删除自定义组织机构
         * @param idx 下标
         **/
        delFun(idx) {
            this.ruleForm.orgs.splice(idx, 1);
            // alert(idx);
        },

        /**
         * 完成
         * @param 
         **/
        async editFinish(){
            if(this.cityArr.length<1) return this.$message.error(this.$t('contestInfo.chooseCity'));
            var that = this;
            var hasInfo = false;
            var baseInfo = JSON.parse(localStorage.getItem('baseInfo'));
            // console.log(this.ruleForm)
            this.ruleForm.info = this.richText;
            this.ruleForm['id'] = this.competitionId;
            // console.log(this.ruleForm)
            let params = {competitionInfos: baseInfo.competitionInfos};
            if(!params.competitionInfos){
                params.competitionInfos = {
                    competition_infos: []
                };
            }
            for(let i = 0; i < params.competitionInfos.competition_infos.length;i++){
                let item = params.competitionInfos.competition_infos[i];
                if(item.name == '竞赛背景'){
                    item.intro = this.richText;
                    hasInfo = true;
                }
            }
            if(!hasInfo){
                params.competitionInfos.competition_infos.push({
                    name: '竞赛背景',
                    intro: this.richText
                })
            }
            params['id'] = this.competitionId;
            let obj = Object.assign({},this.ruleForm, {orgs: {competitionOrganizations: this.ruleForm.orgs}});
            const res = await network.saveInfoApi({data:obj});
            if(res=='error') return;
            const save = await network.saveCompetitionInfos({data:params});
            if(save=='error') return;
             this.contestInfo_dialog = false;          
            
        },
        /**
         * 点击编辑请求数据
         * @param 
         **/
        getInfoFn(){
            // console.log(this.competitionId,'this.competitionId')
            this.competitionId = parseInt(localStorage.getItem('competitionId'));
            if(!this.competitionId) return;
            this.getContentInfo();
            this.contestInfo_dialog = true
        },
        async renderContentInfo(baseInfo){
            var info = '';
            let infos = await network.getCompetitionInfos({data:{competitionId:this.competitionId}});
            if(infos=='error') return

            if(infos){
                for(let i =0;i< infos.competition_infos.length;i++){
                    let item = infos.competition_infos[i];
                    if(item.name == '竞赛背景'){
                        info = item.intro;
                    }
                }
                this.richText = info;
            }
            Object.assign(this.ruleForm,{
                id: baseInfo.id, // 竞赛id
                info: info,   //竞赛背景
                holderProvence: baseInfo.holderProvence, //省
                holderCity: baseInfo.holderCity,      //市
                holderAddr: baseInfo.holderAddr,     //详细地址
                competitionRange: baseInfo.competitionRange//竞赛范围
            });
            this.cityArr = [baseInfo.holderProvence,baseInfo.holderCity];
            if(baseInfo.orgs){
                // console.log(baseInfo.orgs.competitionOrganizations);
                // this.ruleForm['orgs'] = baseInfo.orgs.competitionOrganizations;
                this.$set(this.ruleForm,'orgs', baseInfo.orgs.competitionOrganizations);
                // console.log(this.ruleForm);
            }
            // this.contestInfo_dialog = true;
            // console.log(res);
            this.finish = baseInfo.finish
        },
        /**
         * 发送请求
         **/
        async getContentInfo() {
            let data = await network.getCompetitionDetail({id:this.competitionId});
            if(data=='error') return;
            let baseInfo = data;
            localStorage.setItem('baseInfo',JSON.stringify(data));
            this.renderContentInfo(baseInfo);
        }  
    },
    watch:{
        '$route': function(to, from){
            this.competitionId = parseInt(localStorage.getItem('competitionId'));
            this.getContentInfo();
        }
    }
}
</script>


<style lang="less" scoped>
#contestInfo {
    width: 1040px;
    margin: auto;
    background-color: #fff;
    padding: 30px 60px;
    box-sizing: border-box;
}

// 竞赛信息
.tag_content {
    text-align: left;
    .title {
        display: flex;
        align-items: center;
        h1 {
            font-size: 30px;
            border-left: 4px solid #1D86FF;
            padding-left: 16px;
            font-weight: 500;
        }
        i {
            cursor: pointer;
            margin-left: 10px;
        }
    }
    .tag_content_title {
        margin-top: 16px;
        color: #4a4a4a;
        font-size: 18px;
        font-weight: bold;
        line-height: 28px;
    }
    .tag_content_txt {
        color: #4a4a4a;
        font-size: 14px;
        line-height: 28px;
        .tag_content_txt_link {
            color: #4a90e2;
            cursor: pointer;
        }
        .tag_content_attestation {
            margin-left: 5px; // cursor: pointer;
        }
        .iconfont {
            margin-left: 5px;
        }
        .tag_content_link {}
        .tag_content_v {
            color: #f5a623;
            font-size: 10px;
        }
    }
}

// 竞赛信息弹框
/deep/ .el-dialog__headerbtn .el-dialog__close {
    display: none;
}

.g-content {
    height: 500px;
    overflow-y: auto;
    padding-top: 30px;
    .m-head {
        width: 462px;
        margin: 0 auto 8px;
        font-size: 14px;
        color: #4a4a4a;
        text-align: start;
        font-weight: 600;
    }
    .m-text {
        width: 462px;
        margin: 0 auto;
    }
    .ruleForm {
        width: 462px;
        margin: 0 auto;
        .m-area {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #4a4a4a;
            .j-city {
                width: 120px;
                .color-red {
                    color: #d0021b;
                    margin-right: 5px;
                }
            }
            .j-site {
                width: 317px;
            }
            p {
                margin-bottom: 8px;
                text-align: start;
            }
        }
        .m-class {
            margin-top: 30px;
            font-size: 14px;
            color: #4a4a4a;
            .j-title {
                margin-bottom: 10px;
                text-align: start;
                font-weight: 600;
            }
            .j-class {
                li {
                    width: 100%;
                    background-color: rgba(251, 251, 251, 1);
                    padding: 9px 18px;
                    margin-bottom: 8px;
                    .li-title {
                        margin-bottom: 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .z-name {
                            width: 120px;
                            height: 36px;
                        }
                        .z-name+i{
                            cursor: pointer;
                            &:hover{
                                color:red;
                            }
                        }
                        .el-icon-delete {
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            text-align: right;
                        }
                    }
                    .li-http {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-bottom: 10px;
                        .icon-del{
                            margin-left: 8px;
                            cursor: pointer;
                            &:hover{
                                color: red;
                            }
                        }
                    }
                    & /deep/ input {
                        height: 36px;
                    }
                    .z-name {
                        width: 120px;
                        margin-right: 10px;
                    }
                    .z-http {
                        flex: 1;
                        // width: 400px;
                    }
                }
            }
            .add-color {
                display: block;
                color: #1D86FF;
                cursor: pointer;
                text-align: start;
                em {
                    margin-left: 8px;
                    font-style: normal;
                }
            }
            .add-class-margin {
                margin-left: 18px;
                margin-bottom: 50px;
            }
        }
    }
}

.group_btn {
    border-top: 1px solid #DEDEDE;
    text-align: right;
    padding: 10px 10px 0px 0;
    box-sizing: border-box;
}

/deep/ .el-dialog__body {
    padding: 30px 20px 10px 20px;
}

/deep/ .el-dialog__footer {
    padding: 0 0 10px 0;
}

// 富文本编辑框最小高度
/deep/ .ql-editor {
    min-height: 200px;
}
</style>

<style>
.tag_content_txt img{
    max-width: 100%;
}
</style>
