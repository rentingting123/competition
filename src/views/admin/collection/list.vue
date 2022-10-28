<template>
    <div style="background:#fff;">
        <div class="search">
            <el-input  placeholder="搜索问卷名称" @keyup.enter.native="getLists"  v-model="searchName">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="toCreate" type="primary" size="small" @click="create=true">创建问卷</el-button>
        </div>
        <div class="listmain">
            <el-table :data="tableData" border style="width: 90%;margin:0 auto;">
                <el-table-column  label="序号" type="index" align="center" width="55"> </el-table-column>
                <el-table-column  prop="name" label="问卷名称" align="center" min-width="180">
                    <template slot-scope="scope">
                        <div class="name" @click="showDetail(scope.row)">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column  prop="enable" label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <div v-if="scope.row.enable==1">
                            进行中
                        </div>
                        <div v-else>
                            已暂停
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="count" label="问卷份数" align="center" min-width="180">
                    <template slot-scope="scope">
                        {{scope.row.count || 0}}
                    </template>
                </el-table-column>
                <el-table-column  prop="createTime" label="创建时间" align="center" min-width="180">
                    <template slot-scope="scope">
                        {{scope.row.createTime | date}}
                    </template>
                </el-table-column>
                <!-- <el-table-column  prop="remark" label="问卷说明" align="center" min-width="180"> </el-table-column> -->
                <el-table-column  label="操作" min-width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-if="scope.row.enable==1" @click="edit(scope.row,0)">暂停</el-button>
                        <el-button size="mini" type="primary" v-else @click="edit(scope.row,1)">运行</el-button>
                        <el-button size="mini" type="primary" @click="share(scope.row)">分享</el-button>
                        <el-button size="mini" type="primary" @click="getForrankexport(scope.row)">导出</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="cha-pagination">
                <el-pagination
                        class="cha-page"
                        background
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 创建采集 -->
        <create v-if="create" :close="close"/>
        <!-- 显示采集信息 -->
        <show v-if="show" :lists="lists" :close="closeShow"/>

        <el-dialog title="分享问卷" width="500px" :visible.sync="codeshow" :append-to-body='true' class="codeshow">
            <div class="code" style="width:328px;height:328px;margin:0 auto;">
                <img class="codeurl" v-if="codeurl" :src="codeurl" width="100%">
            </div>
            <el-button size="mini" type="primary" @click="download()">下载二维码</el-button>
            <p>
                链接：<span >{{codehref}}</span>
            </p>
            <el-button size="mini" type="primary" class="copy" @click="copy()">复制链接</el-button>
        </el-dialog>


    </div>
</template>

<script>
import { getUserInfo } from "Lib/commons";
import network from '@@/api/jxapi'
import create from './common/create'
import show from './common/show'
import utils from '@@/utils/util'
import moment from 'moment'
import ClipboardJS from "clipboard";

export default {
    components:{
        create,
        show,
    },
    data(){
        return{
            searchName:'',
            tableData:[],
            create: false,
            lists:{},
            show: false,
            codeshow: false,
            codehref: '',
            codeurl: '',
            page: 1,
            total: 1,
            pagesize: 20,

        }
    },
    created(){
        this.user = getUserInfo()
        this.getLists()
    },
    methods:{
        closeShow(){
            this.show = false
        },
        handleCurrentChange(){
            this.getLists()
        },
        showDetail(row){
            this.show = true;
            this.lists = row;
        },
        async getLists(){
            let res = await network.getForrankList({data:{
                userId: this.user&&this.user.id,
                searchName: this.searchName,
                current: this.page,
                pageSize: this.pagesize
            }})
            if(res=='error') return;
            this.tableData = res.data
            this.total = res.total
        },
        close(){
            this.create = false;
            this.getLists()
        },
        async edit(row,index){

            row.enable= index
            let res = await network.getForrankSubmit({data:row});
            if(res=='error') return;
            this.getLists();
        },
        share(row){
            this.codeshow = true;
            this.codehref = location.href
            this.codehref = "http://"+location.host+"#/admin/collection/"+row.formId + '/' + row.userId
            utils.getQRcode(this.codehref,{width:1024,height:1024}).then(url=>{
                this.codeurl = url;
            })
        },
        copy(){
            let _this = this
            new ClipboardJS(".copy", {
                text: function(trigger) {
                    _this.$message.info("已复制到剪贴板");
                    return _this.codehref;
                }
            });
        },
        async getForrankexport(row){
            window.open('/nodeapi/nodeforrank/competition/data/export?formId='+row.formId)
        },
        download(){
            utils.downloadFile(this.codeurl,"二维码.png")
        }
    },
    filters:{
        date(val){
           return moment(val).format('YYYY-MM-DD');
        }
    }
}
</script>

<style lang="less" scoped>
.search{
    width: 90%;
    margin: 0 auto;
    padding: 30px 0 20px;
    text-align: left;
    .el-input{
        width: 300px;
    }
    .toCreate{
        float: right;
    }
}
.codeshow{
    padding: 0 10%;
    .el-button{
        margin: 10px 0;
    }
    p{
        margin: 20px 0;
    }
}
.name{
    cursor: pointer;
    color: #409EFF;
}
</style>
