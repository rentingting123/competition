<template>
    <div class="train">
        
        <div class="top">
            <el-select v-model="competitionId" @change="seachTrains" style="float: left;margin-right:10px;" placeholder="请选择竞赛">
                    <el-option v-for="competition in competitions" :key="competition.competitionId" 
                    :label="competition.name" 
                    :value="competition.competitionId"
                    >
                    </el-option>
                </el-select>
            <div class="seach">
                
                <div class="inputs">
                    <input type="text" v-model="trainName" @keyup.enter="seachTrains" placeholder="搜索">
                    
                </div>
                <div class="icons">
                    <i class="iconfont" style="color:#9b9b9b;fontSize:24px;" @click="seachTrains">&#xe626;</i>
                </div>
            </div>
            <div class="addNews" @click="toAddTrain">
                +发布培训
            </div>
        </div>
        <div style="clear:both;"></div>
        <div class="trainTab">
            <el-table
                :lazy= true
                v-loading="firstTableLoading"
                :data="roles"
                style="width:100%">
                <el-table-column
                    type="index"
                    label="序号"
                    width="50"
                    >
                    
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="培训名称"
                    width="490">
                    <template slot-scope="scope">
                        <!-- <router-link :to="{path:'/createProduce'}" tag="li"> -->
                            {{scope.row.name}}
                        <!-- </router-link> -->
                   </template>
                </el-table-column>

                <el-table-column
                    prop="signupBeginTime"
                    label="发布日期"
                    width="300">
                    <template slot-scope="scope">
                        <!-- <router-link :to="{path:'/createProduce'}" tag="li"> -->
                            {{getTimes(scope.row.signupBeginTime)}}
                        <!-- </router-link> -->
                   </template>
                </el-table-column>

                

                <el-table-column
                    prop=""
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <p class="permis_span">
                            <i class="iconfont" @click="toDeatiles(scope.row.id)">&#xe634;</i>
                            <!-- <i class="iconfont" @click="toTrainTable(scope.row.id)">&#xe6b5;</i> -->
                            <!-- <i class="iconfont" @click="ccc(scope.row.id,scope.row.certificateStatus)">&#xe6b4;</i> -->
                            <i class="iconfont" v-if="groupType!=7||scope.row.isAdmin" @click="delTrain(scope.row.id)">&#xe635;</i>
                           <el-switch
                                :class="{'marLft':!scope.row.isAdmin}"
                                v-if="groupType==7"
                                v-model="scope.row.isShow"
                                @change="changSwitch(scope.row.id,scope.row.isShow)"
                            ></el-switch>
                            <span v-if="scope.row.isShow&& groupType=='7'" >显示</span>
                            <span v-if="!scope.row.isShow&& groupType=='7'">不显示</span>
                        </p>
                    
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    :page-size="pagesize"
                    :pager-count="5"
                    :current-page.sync='currentPage'
                    layout="prev, pager, next"
                    @current-change='currentChange'
                    :hide-on-single-page='true'
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="发布培训" :visible.sync="dialogVisible" width="60%" :append-to-body='true'>
            <addTrain v-if="dialogVisible" @refresh='getTrainList' :trainId="trainId" ref="myAddTrain"></addTrain>
        </el-dialog>
        <el-dialog :visible.sync="trainTableDialogVisible" width="60%" :append-to-body='true'>
            <trainTable v-if="trainTableDialogVisible" :trainId="trainId" ref="trainTable" ></trainTable>
        </el-dialog>
        <el-dialog :visible.sync="trainCertDialogVisible" width="60%" :append-to-body='true'>
            <trainCert v-if="trainCertDialogVisible" :trainId="trainId" @closeCert="closeCert" :type="type" ref="trainCert" ></trainCert>
        </el-dialog>
        
    </div>
</template>
<script>
// import api from '~src/api/api.js'
// import webapi from '~src/api/webapi.js'
import network from "@/api/jxapi/index";
import addTrain from './addTrain'
import trainTable from './common/trainTable'
import trainCert from './common/trainCert'
import moment from 'moment'
export default {
    data() {
        
        return {
            dialogVisible:false,
            trainTableDialogVisible:false,
            trainCertDialogVisible:false,
            type:null,
            total:null,
            competitions:[],
            currentPage:1,
            pagesize: 12,
            firstTableLoading:false,
            trainName:'',
            select:3,
            roles:[
                
            ],
            namefilters:[
                {
                value:'0',
                text:'赛事资讯'
                },
                {
                value:'1',
                text:'政策文件'
                },
                {
                value:'2',
                text:'竞赛评估'
                },
                {
                value:'3',
                text:'教发指数'
                }
            ],
            userInfo:{},
            competitionId:null,
            groupType:'',
            trainId:null
        }
    },
    components: {
        addTrain,
        trainTable,
        trainCert
      
    },
    async created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.groupType = localStorage.getItem('groupType')
        let res = await network.getCompetitionss();
        if(res=='error') return;
        this.competitions = res || [] 
    },
    methods:{
        async getTrains(){
            if(!this.competitionId) return this.$message.warning('请选择竞赛');
            localStorage.setItem('competitionId', this.competitionId);
            this.firstTableLoading = true
            this.total = null
            this.roles = []
            let obj = await network.getSelectTraining({data:{
                competitionId:this.competitionId,
                status:'0',
                pageNum: this.currentPage,
                pageSize: this.pagesize,
                trainingName:this.trainName
            }})
            this.firstTableLoading = false
            if(obj=='error'||!obj) return;
            
            this.total = obj.total
            this.roles = obj.list

        },
        currentChange(page){
            this.getTrains()
        },
        //查找培训
        seachTrains(){
            this.currentPage = 1
            this.getTrains()
        },
        getTrainList(){
            if(this.dialogVisible){
                this.dialogVisible=false
            }
            this.getTrains()
        },
        changSwitch(id,isShow){
            let fromData = new FormData()
            
            fromData.append("id", id)
            fromData.append("isShow", isShow)
            // let data = {
            //     id:id,
            //     isShow:isShow?1:0
            // }
            api.post('Api/training/updateTrainingShow',fromData).then(res =>{
                // console.log(res)
            })
        },
        getTimes(time){
            if(!time) return;
            return moment(time).format('YYYY-MM-DD HH:mm:ss')
        },
        toAddTrain(){
            if(!this.competitionId) return this.$message.warning('请选择竞赛');
            localStorage.setItem('competitionId', this.competitionId);
            this.trainId = null
            this.dialogVisible = true
            // this.$router.push('/admin/skin/addTrain')
        },
        
        filterName(value, row) {
            // if (value === '') return true
            return row.competition_type === value;
        },
        toDeatiles(id){
            this.trainId = id
            this.dialogVisible = true
            setTimeout(() =>{
                this.$refs.myAddTrain.getDetailes()
            },0)
            
        },
        toTrainTable(id){
            this.trainId = id
            this.trainTableDialogVisible = true
            setTimeout(() =>{
                this.$refs.trainTable.getList()
            },0)
        },
        ccc(id,type){
            this.trainId = id
            this.trainCertDialogVisible = true
            this.type=type?type:0
            setTimeout(() =>{
                this.$refs.trainCert.getData()
            },0)
            //type   null 未设置   0 已经设置   1 已生成
            // this.$router.push({path:'/trainCert',query:{id:id,type:type}})
            // console.log(id)
        },
        closeCert(){
            this.trainCertDialogVisible=false
        },
        async delTrain(id){
            this.$confirm('此操作将永久删除该培训, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(async () => {
                let data = {
                    id:id
                }
                let obj = await network.delTraining({data})
                if(obj=='error') return;
                this.getTrainList()
                
                }).catch(() => {
                this.$message.info('已取消删除');
            });
        }
    },
}
</script>

<style lang="less">
.train{
    width: 100%;
    height: 100%;
    background: #fff;
    // padding: 0 26px;
    .top{
        padding: 0 26px;
        margin-top: 16px;
        width: 80%;
        .seach{
            display: inline-block;
            // width: 256px;
            border: 1px solid #DEDEDE;
            border-radius: 5px;
            float: left;
            .inputs{
                width: 200px;
                height: 36px;
                line-height: 36px;
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
.trainTab{
    padding: 0 26px;
    margin-top: 11px;
    margin-bottom: 50px;
    width: 80%;
    .el-table tr {
        height: 50px;
    }
    .marLft{
        margin-left: 41px;
    }
}
.trainTab .el-table th {
    background: #f0f2f4;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #787D81;
    letter-spacing: 0;
    font-weight: 500;
    padding: 12px 0;
}
.trainTab .el-table td{
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
        margin-right: 21px;
        color: #9B9B9B;
    }
}
.pagination{
    margin-top: 20px;
    text-align: right;
}

</style>
