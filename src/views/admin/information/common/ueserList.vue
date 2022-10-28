<template>
    <div>
        <el-dialog title="用户列表" :visible.sync="addtabdialog" :append-to-body='true'>
           <div class="mi">
                <div>
                标签名称：{{userlittab.label}}
            </div>
            <div>
                标签属性：<span v-if="userlittab.competitionName">{{userlittab.competitionName}},</span>
                    <span v-if="userlittab.competitionChildName">{{userlittab.competitionChildName}},</span>
                    <span>{{userlittab.promote}}</span>
                
            </div>
            <div class="last">
                <div>备注：{{userlittab.remark}}</div>
                <div>用户数：{{userlittab.peopleNum}}</div>
            </div>
           </div>
           <el-table :lazy= true border v-loading="firstTableLoading" :data="tabsList" >
               <el-table-column prop="idcardName" label="姓名"></el-table-column>
               <!-- <el-table-column prop="shenfen" label="身份"></el-table-column> -->
               <el-table-column prop="loginPhoneNumber" label="手机号码"></el-table-column>
               <el-table-column prop="email" label="邮箱"></el-table-column>
               <el-table-column prop="school" label="学校"></el-table-column>
           </el-table>
            <el-pagination
            :page-size="pageSize"
            v-if="total > 0"
                :current-page.sync='pageNum'
                style="    text-align-last: center;"
                layout="prev, pager, next"
                @current-change='currentChange'
                :total="total">
            </el-pagination>
           <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addtabdialog = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>



<script>
import util from '@@/utils/util'
import network from '@@/api/jxapi'
import { getUserInfo } from "Lib/commons";
export default {
    props:['close','userlistid','userlittab'],
    data(){
        return{
            total:0,
            firstTableLoading:false,
            addtabdialog: true,
            pageNum:1,
            pageSize:5,
            tabsList:[]
        }
    },
    created(){
        this.getList()
    },
    methods:{
         currentChange(page){
            this.pageNum = page
            this.getList()
        },
        async getList(){
            let params = {
                id:this.userlistid,
                pageNum : this.pageNum,
                pageSize : this.pageSize
            }
            let res = await network.getUserList({data:params})
            if(res=='error') return;
            this.tabsList = res.list
            this.total = res.total
        }
    },
    watch:{
        addtabdialog(val){
            if(!val){
                return this.close && this.close();
            }
        }
    }
}
</script>
<style scoped>
.mi{
    font-size: 18px;
    line-height: 34px;
}
.im>div{
    height: 34px;
}
.last{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
