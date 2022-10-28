<template>
    <div id="competition">
        <div style="min-height:calc(100vh - 5rem - 266px - 6.25rem);">
            
        <div class="competi_sel_tag">
            <div class="competi_tag">
                <div class="div-cla">
                    <span v-bind:key="index" v-for="(tag,index) of regiontions">
                        <el-tooltip class="item" :disabled='true'>
                            <el-button v-if= "index == 0" class="aa" style="padding-left: 14px;padding-right: 14px;margin-right:34px;height: 30px;line-height: 5px; fontSize:14px;padding: 12px 10px;"  :class="{red:changeRed4 == index}" @click="tagRegion(tag, index, tag)">
                                {{$t(tag.name)}}
                            </el-button>
                            <el-button v-else  :class="{red:changeRed4 == index}" @click="tagRegion(tag, index, tag)" style="margin-right:36px;height: 30px;line-height: 5px;fontSize:14px;padding: 12px 10px;">
                                <i class="iconfont icon-remen" v-if="$t(tag.name)===$t('competition.International')" >&#xe671;</i>
                                <i class="iconfont icon-remen" v-if="$t(tag.name)===$t('competition.Nations')" >&#xe675;</i>
                                <i class="iconfont icon-remen" v-if="$t(tag.name)===$t('competition.Region')" >&#xe673;</i>
                                <i class="iconfont icon-remen" v-if="$t(tag.name)==$t('competition.Provincial')" >&#xe69f;</i>
                                <!-- <i class="iconfont icon-remen" v-if="tag.name==='校赛'" >&#xe6a0;</i> -->
                                <!-- <i class="iconfont icon-remen" v-if="tag.name==='政府'" >&#xe674;</i> -->
                                <i class="iconfont icon-remen" v-if="$t(tag.name)===$t('competition.company')" >&#xe672;</i>
                                <i class="iconfont icon-remen" v-if="$t(tag.name)===$t('competition.other')" >&#xe6a1;</i>
                                {{$t(tag.name)}}
                            </el-button>
                        </el-tooltip>
                    </span>
                </div>
                <!-- 20201126省厅试用，要求隐藏 -->
                <!-- <div class="div-cla">
                    <span v-bind:key="index" v-for="(tag,index) of classification">
                        <el-tooltip class="item" effect="dark" :content="$t(tag.title)" placement="bottom-start">
                            <el-button v-if= "index == 0" class="aa" style="padding-left: 14px;padding-right: 14px;margin-right:34px;height: 30px;line-height: 5px; fontSize:14px;padding: 12px 10px;"  :class="{red:changeRed2 == index}" @click="tagHandle(tag, index, tag)">
                                {{$t(tag.name)}}
                            </el-button>
                            <el-button v-else  :class="{red:changeRed2 == index}" @click="tagHandle(tag, index, tag)" style="margin-right:36px;height: 30px;line-height: 5px;fontSize:14px;padding: 12px 10px;">
                                {{$t(tag.name)}}
                            </el-button>
                        </el-tooltip>
                    </span>
                </div> -->
            </div>
            
        </div>
        <div class="stateHot">
            <div class="competi_state">
                <div class="div-cla">
                    <span class="cla-span" v-bind:key="index" v-for="(state,index) in states" >
                        <em  style="padding-left: 15px;padding-right: 15px;" v-if= "index == 0" class="aa"   :class="{red:changeRed == index}" @click="stateHandle(state,index)">
                            {{$t(state.name)}}
                        </em>
                        <em v-if= "index != 0">|</em>
                        <em  v-if= "index != 0" class="aa"  :class="{red:changeRed == index}" @click="stateHandle(state,index)">
                            {{$t(state.name)}}
                        </em>
                        <i class="iconfont icon-remen" v-if="state.hot"></i>
                    </span>
                </div>
            </div>
            <div class="hot_new_tag">
                <span v-show="titleShow" @click="Lifting">
                    <i :class="sSelection?'Selection':''"  class="el-icon-sort-down"></i>
                    <i :class="!sSelection?'Selection' : ''" style="margin-left: -10px;" class="el-icon-sort-up"></i>
                </span>
                <span style="margin-right:20px" :class="{tag_sel:changeRed3 == 1}"  @click="handleType(1)">
                    {{$t('competition.hottest')}}
                </span>
                
                <span v-show="!titleShow" @click="Newest">
                    <i :class="sSelection?'Selection':''"  class="el-icon-sort-down"></i>
                    <i :class="!sSelection?'Selection' : ''" style="margin-left: -10px;" class="el-icon-sort-up"></i>
                </span>
                <span  :class="{tag_sel:changeRed3 == 0}" @click="handleType(0)">
                    {{$t('competition.latest')}}
                </span>
                <div class="search">
                    <input :placeholder="$t('competition.search')" v-model="searchName" @keyup.enter="toSearch" type="text">
                    <i style="display:inline-block" class="iconfont icon-remen" @click="toSearch">&#xe626;</i>
                </div>
            </div>

        </div>
        
        <div class="competition">
            <div v-bind:key="index" v-for="(competition,index) in competitionData" :class="{marginRight:index%2==0?true:false}">
                <Competition :data="competition"></Competition>
            </div>
        </div>
        
        <div class="bg" v-show="$store.state.bgVisible" @click="hideBgVisible()">

        </div>
        <loadmore :more='scroll' :type="loadType"></loadmore>
        </div>
    </div>
    
</template>

<script>
    import Competition from '@@/components/competition';
    import loadmore from '@@/components/scrollAdd';
    import network from '@/api/jxapi/index'
    import moment from 'moment'
    export default {
        data(){
            return {
                changeRed : 0,
                changeRed2: 0,
                changeRed3: 1,
                changeRed4: 0,
                sSelection:true,
                list: [],
                page: 0, 
                tags: [], // 竞赛标签
                regiontions:[
                    {name:"competition.all"},
                    {name:"competition.International"},
                    {name:"competition.Nations"},
                    {name:"competition.Region"},
                    {name:"competition.Provincial"},
                    // {name:"校赛"},
                    
                    {name:"competition.company"},
                    // {name:"政府"},
                    {name:"competition.other"},
                    // "全部","A类竞赛","B类竞赛","C类竞赛","D类竞赛","E类竞赛","其他"
                ],
                classification:[
                    {name:"competition.all",type:'全部',title:'competition.all'},
                    {name:"competition.A",type:'A',title:'competition.AMessage'},
                    {name:"competition.B",type:'B',title:'competition.BMessage'},
                    {name:"competition.C",type:'C',title:'competition.CMessage'},
                    {name:"competition.D",type:'D',title:'competition.DMessage'},
                    {name:"competition.E",type:'E',title:'competition.EMessage'},
                    {name:"competition.other",type:'Z',title:'competition.other'},
                    // "全部","A类竞赛","B类竞赛","C类竞赛","D类竞赛","E类竞赛","其他"
                ],
                states: [
                    { 'name': 'competition.all', 'hot': false, code: 'all',type : "" },
                    { 'name': 'competition.Preparation', 'hot': false, code: 'coming',type : 3 },
                    { 'name': 'competition.Hot', 'hot': false, code: 'end',type : 2 },
                    { 'name': 'competition.processing', 'hot': false, code: 'start',type : 1 },
                    { 'name': 'competition.over', 'hot': false, code: 'end',type : 0 }
                    
                ], // 竞赛状态
                competitionData: [], // 竞赛
                pageSize: 8,     
                currentPage: 1, 
                loadType: 'canload',

                isfinish: '', //null:全部，1:已开始，0:已结束
                type: 1, //0:最新 1:最热
                tag: '', //当前标签，
                titleShow:true,
                competitionRange:'',
                searchName:''  //搜索竞赛名
            }
        },
    
        created() {
          this.getHomeTags()
          this.getHomeCompetition()
            //      document.getElementsByTagName('body').onscroll = function() {
            //  console.log("scrolling");
      //};
        },
        components:{
            Competition,
            loadmore
        },
        methods:{
            //最热升降
            Lifting(){
                this.searchName=''
                this.currentPage = 1;
                this.competitionData = [];
                let type = this.sSelection?2:1
                this.sSelection=!this.sSelection
                this.getHomeCompetition(type)
            },
            //最新升降
            Newest(){
                this.searchName=''
                this.currentPage = 1;
                this.competitionData = [];
                let type = !this.sSelection?0:3
                this.sSelection=!this.sSelection
                this.getHomeCompetition(type)
            },
            scroll(e){
                    this.currentPage++;
                    this.getHomeCompetition('',this.searchName); 
            },
            async getHomeTags () {
                let indexTags = await network.getIndexTags();
                if(indexTags=='error') return;
                this.tags = indexTags.tags;
            },
            async getHomeCompetition (type,name) {
                if(this.loadType=='loading') return;
                this.loadType='loading' 
                const obj = {
                    name,
                    tagName: '', // 标签
                    page: this.currentPage,
                    pageSize: this.pageSize, 
                    isfinish: this.isfinish, // 状态
                    type: type?type:this.type, 
                    competitionLevel:this.tag,
                    competitionRange:this.competitionRange
                     // 最新最热
                }
                let indexCompetition = await network.getIndexCompetition({data:obj});
                
                if(indexCompetition=='error') return;
                
                this.list = indexCompetition.list
                if(indexCompetition.pageNum>=indexCompetition.pages)this.loadType = 'nomore'
                else this.loadType = 'canload'

                // console.log(this.loadType)
                this.competitionData=this.competitionData.concat( indexCompetition.list.map(val => {
                    //拆分数据
                    //return moment(this.data.createTime).format('YYYY.MM.DD')
                    const startTime = val.startTime ? moment(val.startTime).format('YYYY.MM.DD') : ''
                    const endTime = val.endTime ? moment(val.endTime).format('YYYY.MM.DD') : ''
                    let orgStr=''
                    if(val.orgs){
                        for(let i=0;i<val.orgs.competitionOrganizations[0].units.length;i++){
                            if(i<2){
                                if(val.orgs.competitionOrganizations[0].units[i].name){
                                    // orgStr+= val.orgs.competitionOrganizations[0].units[i].name
                                    if(val.orgs.competitionOrganizations[0].units.length>2){
                                        orgStr+= val.orgs.competitionOrganizations[0].units[i].name + '、'
                                    }else{
                                        orgStr+= val.orgs.competitionOrganizations[0].units[i].name
                                    }
                                }
                            }
                        }
                        if(orgStr.lastIndexOf('、')==orgStr.length-1){
                            orgStr=orgStr.slice(0,orgStr.length-1)
                        }
                    }else{
                        orgStr = ''
                    }

                    let params = {
                        competitionRange:val.competitionRange?val.competitionRange:'',
                        year:val.year,
                        orgs:orgStr,
                        schoolNum:val.groupNumVo.schoolNum,
                        personNum:val.groupNumVo.personNum,
                        competitionLevel:val.competitionLevel,
                        img: val.bannerUrl,
                        info: val.name,
                        state: val.isfinish,
                        id: val.id,
                        time: (startTime + ' - ' + endTime),
                        tags: val.tags || '编程技术',
                        competitionRound: val.competitionRound,
                        endTime:val.endTime?val.endTime:''
                        // hotels: val.hotels
                        //其他的详细数据也要在这里设置好，这样跳转详情的时候才能把信息都传过去啊
                    }
                    if(params.tags != '编程技术'){
                        params.tags = params.tags[0];
                    }
                    return params
                    // this.competitionData.push(params)
                }))  
                   
                
            },
            //区域切换
            tagRegion(tag, index, code){
                this.searchName=''
                this.currentPage = 1;
                this.changeRed4 = index;
                // this.tag = code.type === '全部' ? '' : code.type;
                
                let name = this.getName(tag.name)
                this.competitionRange= name==='区赛'?'区赛':name==='全部'?'':name
                this.competitionData = [];
                this.getHomeCompetition()
            },
            getName(name){
                if(name=='competition.all'){
                    return '全部'
                }else if(name=='competition.International'){
                    return '国际'
                }else if(name=='competition.Nations'){
                    return '国赛'
                }else if(name=='competition.Region'){
                    return '区赛'
                }else if(name=='competition.Provincial'){
                    return '省赛'
                }else if(name=='competition.company'){
                    return '企业'
                }else if(name=='competition.other'){
                    return '其他'
                }else{
                    return name
                }
            },
            // 标签名字切换
            tagHandle(tag, index, code) {
                this.searchName=''
                this.currentPage = 1;
                this.changeRed2 = index;
                this.tag = code.type === '全部' ? '' : code.type;
                this.competitionData = [];
                this.getHomeCompetition()
            },
            //竞赛搜索
            toSearch(){
                this.competitionData = [];
                this.currentPage = 1;
                this.getHomeCompetition('',this.searchName)

            },
            // 报名状态切换
            stateHandle(tag, index) {
                this.searchName=''
                this.currentPage = 1;
                this.changeRed = index;
                // 0结束 1已开始 ‘’全部
                this.isfinish = tag.type
                this.competitionData = []
                this.getHomeCompetition()
            },
            handleType(type) {
                this.searchName=''
                if(this.changeRed3 !== type){
                    this.titleShow=!this.titleShow
                }
                this.sSelection=true
                this.currentPage = 1;
                this.changeRed3 = type;
                this.type = type
                this.competitionData = [];
                this.getHomeCompetition()
            },
        }
    }
</script>

<style lang="less" scoped>
    #competition{
        background: linear-gradient(to bottom, #E4E6E8 0%,#F4F6F9 5%,#F8FAFC 100%);
    }
   /* 竞赛模块 */
    .competi_sel_tag{
        padding-top: 2rem;
        box-sizing: border-box;
        }
    .competi_tag{
        padding-left: 7px;
        padding-right: 0.5rem;
        width: 60rem;
        margin: 0 auto;
        box-sizing: border-box;
        background: #fff;
        border-radius: 0.3rem;

    }
    
    .competi_state{
        // padding-left: 3.1rem;
        padding-right: 0.5rem;
        // width: 60rem;
        // margin: 0 auto;
        float: left;
        box-sizing: border-box;
        // background: #fff;
        border-radius: 0.3rem;

    }
    .div-cla{
        box-sizing: border-box;
        height:3.6rem;
        line-height:3.6rem;
        font-size:0.8rem;
        text-align:left;
        // border-bottom:1px solid #F6F6F6;
    }
    .title{
        font-weight: bold;
        margin-right: 16px;
        padding-left: 0.2rem;
        font-size: 0.8rem;
        line-height: 3.6rem;
        border: none;
    }

    em{
        font-style: normal;
        border-radius:4px;
        padding:0.4rem;
        cursor:pointer;
        margin-right: 36px;
        border: 1px solid #E2E2E2;
        &:hover{
            // color:#1D86FF;
            &.tag_selected{
                color:#fff;
            }
        } 
    }
    .sel_state{
        background: linear-gradient(to right, #61B3FF 0%,#298CFF 100%);
        color: #fff;
    }
   


    .hot_new_tag{
        font-size:0.8rem;
        height:4rem;
        line-height:4rem;
        text-align: left;
        // width:60rem;
        // margin:0 auto;
        float: right;
        padding-left:1.6rem;
        box-sizing: border-box;
        i{
            font-weight: bold;
        }
       
    }
    span{
        cursor:pointer;
        color: #7B7F88;;
        // margin-right: 20px;
        &:hover{
            // color:#D0021B ;
        }
    }
    // em{
    //     margin:0 1rem;
    // }
    .hotest{
        color:#D0021B ;
    }
    span.tag_sel{
        color:#D0021B ;
    }
    .separate_line
    {
        color: #dedede;
        margin: 0 0.25rem;
        display: inline-block;
        font-size: 0.8rem;
        vertical-align: middle;
        margin-top: -0.1rem;
        margin: 0 1rem;
    }
/*竞赛*/
.competition{
    width:60rem;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom:2rem;
    clear: both;
    justify-content: space-between;
}
.aa{    
    // background: #fff;
    // margin-right: 30px;
    margin: 0 20px;
}
.red{ 
    background: #1D86FF;
    color: #fff;
    border: 1px solid #1D86FF;
}
.cc{ 
    background: #1D86FF;
    color: #fff;
}
.stateHot{
    margin: 0 auto;
    width: 60rem;
    padding-top:10px;
    padding-bottom:27px;

}
.cla-span{
        em{
            margin: 0;
            border:none;
        }
    }
    .cla-span:first-child{
        margin-right: 25px;
        margin-left: 25px;
    }
    .Selection{
        color:#D0021B
    }
    .search{
        display: inline-block;
        width: 210px;
        height: 36px;
        border-radius: 5px;
        margin-left: 30px;
        line-height: 36px;
        position: relative;
        input{
            width: 80%;
            height: 100%;
            border:none;
            background: #ECF0F4;
            padding-left: 10px;
            border-radius:  5px 0 0 5px;
            color: #7B7F88;;
        }
        input:focus{outline:none;}
        i{
            width: 30px;
            background: #ECF0F4;
            font-size: 22px;
            color: #ccc;
            font-weight: 400;
            position: absolute;
            top: 1px;
            cursor: pointer;
            border-radius: 0 5px 5px 0;

        }
    }
</style>

