<template>
    <div class="news" v-loading="loading">
        
        <div class="top">
            <div>
                <el-select v-model="competitionId" @change="getNews(1)" style="float: left;margin-right:10px;" placeholder="请选择竞赛">
                    <el-option v-for="competition in competitions" :key="competition.competitionId" 
                    :label="competition.name+competition.competitionYear" 
                    :value="competition.id"
                    >
                    </el-option>
                </el-select>
                <div class="seach">
                    <div class="inputs">
                        <input type="text" @keyup.enter="getNews" v-model="seachTxt" placeholder="搜索"/>
                    </div>
                    <div class="icons" @click="getNews">
                        <i class="iconfont" style="color:#9b9b9b;fontSize:24px;">&#xe626;</i>
                    </div>
                </div>

            </div>
          
            <div @click="toAddnews" class="addNews">
                +发布新闻
            </div>
              <div v-if="changenewsshow" @click="isnewsShow" class="addNews">
                官网新闻显示设置
            </div>
        </div>
        <div style="clear:both;"></div>
        <div class="newTab">
            <el-table :lazy= true border v-loading="firstTableLoading" :data="newsList" style="width:100%"
                @cell-mouse-enter='handleMouseEnter' @cell-mouse-leave='handleMouseLeave' @filter-change="filterChange" >
                <el-table-column type="index" label="序号" width="50" ></el-table-column>
                <el-table-column prop="newsTitle" label="新闻名称" width="350"></el-table-column>
                <el-table-column prop="type" label="新闻类型" min-width="100"
                    :column-key="'newType'"  :filters="namefilters" :filter-multiple="false">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type">
                            <div v-for="(list,index) in scope.row.type.split(',')" :key="index" style="display:inline-block;margin-right:5px;">
                            {{list | newstypeshow}}
                        </div>
                        </div>
                   </template>
                </el-table-column>

                <el-table-column  prop="newsTime" label="发布日期" min-width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.newsTime | date}}</p>
                    </template>
                </el-table-column>

                <el-table-column prop="clickCount" label="点击量" min-width="100"></el-table-column>
                <el-table-column prop="clickCount" label="详情" min-width="100">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="toDetail(row.id)">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" min-width="180">
                    <template slot-scope="scope">
                        <div class="permis_span"> 
                            <template v-if="scope.row.isShow===0">
                                <template v-if="scope.row.auditStatus===1">
                                    <span style="color:red">审核拒绝</span>
                                </template>
                                <template v-else>
                                    <el-button type="text" @click="checkNews(scope.row.id, 2)">通过</el-button>
                                    <el-button type="text" @click="checkNews(scope.row.id, 1)">拒绝</el-button>
                                </template>
                            </template>
                            <template v-else>
                                <div v-if="scope.row.sourceType==0" >
                                    <i class="iconfont" @click="editNews(scope.row.id)">&#xe634;</i>
                                    <i class="iconfont" :class="{'addPend':scope.row.type==1}" @click="delNews(scope.row.id)">&#xe635;</i>
                                </div>
                                <div v-else-if="scope.row.sourceType==1">
                                     <el-radio-group v-model="scope.row.newsShowStatus" @change="changeNewsst(scope.row)">
                                          <el-radio :label="2">显示</el-radio>
                                          <el-radio :label="1">隐藏</el-radio>
                                          <el-radio :label="0">跟随总开关</el-radio>
                                    </el-radio-group>
                                </div>
                                 <!-- <el-switch
                                   v-model="scope.row.isShow"
                                   active-value="0"
                                   inactive-value="1"
                                   @change="handleStatusChange(scope.row)"
                                 ></el-switch> -->
                                <!-- <i class="iconfont" style="float:right;" @click="selectId(scope.row.id,scope.row.starLevel)" v-if="enterId==scope.row.id&&scope.row.starLevel!=1">&#xe639;</i>
                                <i :class="{'iconfont':true,'gold':true}" style="float:right;" v-if="scope.row.starLevel==1" @click="selectId(scope.row.id,scope.row.starLevel)">&#xe62c;</i> -->
                            </template>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" v-if="selectShow">
                <el-pagination :page-size="pageSize" :current-page.sync='pageNum' layout="prev, pager, next" @current-change='getNews' :total="total"></el-pagination>
            </div>
        </div>


         <!-- 新闻显示弹窗 -->
        <el-dialog title="官网新闻显示设置"   width="500px" :visible.sync="newsshowdialog" :modal-append-to-body='false'>
            <el-form  ref="newsShowForm" :model="newsShowForm" label-width="200px">
                  <el-form-item label="是否展示上级发布的新闻" prop="status">
                   <el-radio-group v-model="newsShowForm.status">
                     <el-radio label="1">是</el-radio>
                     <el-radio label="0">否</el-radio>
                   </el-radio-group>
                 </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="newsshowdialog = false">取 消</el-button>
              <el-button type="primary" @click="firstcheck()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹窗 -->
        <el-dialog :visible.sync="dialogVisible" width="80%" :modal-append-to-body='false'>
            <addNew v-if="dialogVisible" :close="close" :cid='competitionId' :id='updateid'></addNew>
        </el-dialog>

        <!-- 查看详情 -->
        <el-dialog :visible.sync="show" width="1100px" :modal-append-to-body='false'>
            <showNew v-if="show" :newsid='updateid'></showNew>
            <div slot="footer">
                <el-button @click="show=false">确认</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
import addNew from '@@/views/issue/index'
import showNew from '@@/views/issue/detail'
import network from '@/api/jxapi/index.js'
import moment from 'moment'
import { getGroupId } from '@/utils/commons'
export default {
    data() {
        return {
            radio:1,
            newsShowForm:{
                status:0
            },
            newsshowdialog:false,
            dialogVisible:false,
            selectShow:true,
            firstTableLoading:false,
            total:null,
            pageShow:false,
            pageNum:1,
            pageSize:12,
            select:2,
            newsList:[],
            roles:[ 
            ],
            seachTxt:'',
            clickCount:[
                {
                value:1,
                text:'升序'
                },
                {
                value:2,
                text:'降序'
                },
            ],
            namefilters:[
                {
                        text:'通知动态',
                        id:1,
                        value:'0'
                    },
                    {
                        text:'新闻动态',
                        id:2,
                        value:'1'
                    },
                    {
                        text:'活动动态',
                        id:3,
                        value:'2'
                    },
                    {
                        text:'大赛回顾',
                        id:4,
                        value:'3'
                    },
                    {
                        text:'制度文件',
                        id:5,
                        value:'20'
                    },
                    {
                        text:'组织机构',
                        id:6,
                        value:'21'
                    },
                    {
                        text:'赛事动态',
                        id:7,
                        value:'22'
                    },
                    {
                        text:'竞赛回顾',
                        id:9,
                        value:'24'
                    },
                    {
                        text:'往届作品',
                        id:10,
                        value:'25'
                    },
                    {
                        text:'成果展示',
                        id:11,
                        value:'26'
                    },
                    {
                        text:'媒体社评',
                        id:12,
                        value:'27'
                    },
                    {
                        text:'寄语',
                        id:13,
                        value:'28'
                    },
                    {
                        text:'章程细则',
                        id:14,
                        value:'29'
                    },
                    {
                        text:'文件通知',
                        id:15,
                        value:'30'
                    },           
                    {
                    name: "赛事简讯",
                    id: 16,
                    type: "31"
                    },
                    {
                    name: "创新成果集",
                    id: 17,
                    type: "32"
                    },
                    {
                    name: "竞赛通讯",
                    id: 18,
                    type: "33"
                    },
                    {
                    name: "竞赛成果奖",
                    id: 19,
                    type: "34"
                    }
            ],
            loading:false,
            enterId:'',
            starLevelength:0,
            starNum:null,
            newType:null,
            competitions:[],
            competitionId: '',
            updateid: '',
            changenewsshow:false,
            show: false
        }
    },
    components: {
        addNew,
        showNew
    },
    async created(){
         this.getcomlist()
            // console.log(res1,123);
        // let res = await network.getCompetitionss();
        // if(res=='error') return;
        // this.competitions = res || []
        // console.log(this.competitions,456);

    },
    methods:{
        async getcomlist(){
            this.loading = true
            let groupId = getGroupId()
        if(!groupId) return ; 
             let res1 = await network.queryCompetitionList({ data:{
                groupId: groupId
            }});
            if(res1=='error') return;
            
            if(this.competitionId !== ''){
                 res1.forEach(item => {
                if(item.id == this.competitionId && item.newsShowMenuStatus == 1){
                    this.$set(this.newsShowForm,'status',item.newsShowStatus+'')
                }
            })
            }
            this.competitions = res1
            this.loading = false
            
        },
        async changeNewsst(row){
            let res = await network.changeNewsStatus({ data:{
                newsId: row.id,
                newsShowStatus:parseInt(row.newsShowStatus)
            }});
            if(res=='error') return;
            this.getNews()
        },
        async firstcheck(){
              let res = await network.changeCompetitionNewsShowStatus({ data:{
                competitionId: this.competitionId,
                newsShowStatus:parseInt(this.newsShowForm.status)
            }});
             if(res=='error') return;
            
            
             this.getcomlist()
              
             this.getNews()
            this.newsshowdialog = false
        },
        handleStatusChange(row){
            // console.log(row);
        },
        isnewsShow(){
            this.newsshowdialog = true
        },
        filterChange(filters){
            this.newType = filters.newType[0]?filters.newType[0]:null
            this.pageNum = 1
            this.getNews()
        },
        async getNews(type){
            if(type == 1){
                this.newType = null
            }
            this.firstTableLoading = true
            this.competitions.forEach(item => {
                if(item.id == this.competitionId && item.newsShowMenuStatus == 1){
                    this.changenewsshow = true
                    this.$set(this.newsShowForm,'status',item.newsShowStatus+'')
                }
            })
            
            let param = {
                competitionId:this.competitionId,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                search: this.seachTxt,
                type: this.newType
            }
            localStorage.setItem('competitionId', this.competitionId);
            let res = await network.getNewsList({data:param})
            this.firstTableLoading = false
            if(res=='error') return;
            this.total = res.total
            this.newsList = res.pageData || []
            this.firstTableLoading = false
        },
        close(){
            this.dialogVisible = false;
            this.getNews();
        },
        toDetail(id){
            this.updateid = id;
            this.show = true
        },
        //编辑新闻
        editNews(id,type){
            this.updateid = id;
            this.dialogVisible = true
        },
        //删除新闻
        delNews(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(async () => {
                let res = await network.saveNews({data:{id:id,delStatus:0}});
                if(res=='error') return;
                this.$message.success('删除成功');
                this.getNews()
                
                }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        async checkNews(id, flag){
            if(flag==1){
                this.$confirm('拒绝后无法撤回，请确认是否继续', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: "warning"
                }).then(async () => {
                    this.auditSkinNews(id, flag);
                })
            }else{
                this.auditSkinNews(id, flag);
            }
            
        },
        async auditSkinNews(id, flag){
            let params = {
                newsIds: [id],
                auditStatus: flag
            }
            let res = await network.auditSkinNews({data:params})
            if(res=='error') return;
            this.getNews();
        },
        toAddnews(){
            if(!this.competitionId) return this.$message.warning('请选择竞赛');
            localStorage.setItem('competitionId', this.competitionId);
            this.updateid = ''
            this.dialogVisible = true;
        },
        handleMouseEnter(row, column, cell, event){
            this.enterId = row.id
        },
        handleMouseLeave(){
            this.enterId = ''
        },
        async selectId(id,starLevel){
            this.selectShow = false
            if(starLevel==1){
                let data = {
                    id:id,
                    starLevel:0
                }
                await api.post('Admin/rankingNews/starLevel',data).then(res =>{
                    this.getNews()
                    
                })

            }else{
                if(this.starNum>2){
                    this.$message.info('头条新闻最多设置3条')
                        return
                }
                let data = {
                    id:id,
                    starLevel:1
                }
                await api.post('Admin/rankingNews/starLevel',data).then(res =>{
                    this.getNews()
                })
            }
                
            

        }
    },
    filters:{
        date(val){
            if(!val) return
            let value = parseInt(val)
            return moment(value).format('YYYY-MM-DD');
        },
        newstypeshow(val){
            if(val==0){
                return '通知动态'
            }else if(val==1){
                return '新闻动态'
            }else if(val==2){
                return '活动动态'
            }else if(val==3){
                return '大赛回顾'
            }else if(val==20){
                return '制度文件'
            }else if(val==21){
                return '组织机构'
            }else if(val==22){
                return '赛事动态'
            }else if(val==23){
                return '竞赛简讯'
            }else if(val==24){
                return '竞赛回顾'
            }else if(val==25){
                return '往届作品'
            }else if(val==26){
                return '成果展示'
            }else if(val==27){
                return '媒体社评'
            }else if(val==28){
                return '寄语'
            }else if(val==29){
                return '章程细则'
            }else if(val==30){
                return '文件通知'
            }
        }
    }
}
</script>

<style lang="less">
a{
    text-decoration:none;
}
.news{
    width: 100%;
    height: 100%;
    background: #fff;
    // padding: 0 26px;
    .top{
        padding: 0 26px;
        margin-top: 16px;
        width: 95%;
        .seach{
            display: inline-block;
            width: 256px;
            border: 1px solid #DEDEDE;
            border-radius: 5px;
            float: left;
            .inputs{
                width: 200px;
                height: 36px;
                
                display: inline-block;
                padding-left: 10px;
                float: left;
                input{
                    width: 100%;
                    height: 34px;
                    border: none;
                    outline: none;
                }
            }
            .icons{
                width: 40px;
                height: 36px;
                border: 1px solid #DEDEDE;
                background: #DEDEDE;
                display: inline-block;
                float: right;
                line-height: 36px;
                text-align: center;
                cursor: pointer;
            }
        }
        .addNews{
            float: right;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            color: #1380FF;
            letter-spacing: 0;
            line-height: 28px;
            padding-right: 26px;
            cursor: pointer;
        }
    }
    // .title{
    //     width: 100%;
        
    //     height: 48px;
    //     line-height: 48px;
    //     background: #F0F2F4;
    //     margin-top: 11px;
    // }
}
.newTab{
    padding: 0 26px;
    margin-top: 11px;
    margin-bottom: 60px;
    width:95%;
    .el-table tr {
        height: 50px;
    }
}
.newTab .el-table th {
    background: #f0f2f4;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #787D81;
    letter-spacing: 0;
    font-weight: 500;
    padding: 7px 0;
}
.newTab .el-table td{
    padding: 1px 0;
}
.tab{
    width: 100%;
    height: 50px;
    background: #FAFAFA;
    line-height: 50px;
    padding: 0 15px;
    div{
        width: 64px;
        display: inline-block;
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        height: 48px;
        cursor: pointer;
    }
    .select{
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #1380FF;
        border-bottom: 2px solid #1380FF;
    }
}
.permis_span{
    
    i{
        cursor: pointer;
        margin-right: 16px;
        color: #9B9B9B;
    }
    .gold{
        color: #FFD700;

    }
}
.addPend{
    padding-left: 38px;
}
.pagination{
    margin-top: 20px;
    text-align: center;
}

</style>