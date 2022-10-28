<template>
    <div class="verify">
        <div class="listmain">
            <el-table :data="tableData" border style="width: 100%;margin:0 auto 20px;" >
                <el-table-column  type="index" label="#" align="center" width="55"> </el-table-column>
                <el-table-column  prop="loginName" label="操作账号" width="150"></el-table-column>
                <!-- <el-table-column  prop="phone" label="手机号" width="150"></el-table-column> -->
                <el-table-column  prop="userName" label="操作人" min-width="120"></el-table-column>
                <el-table-column  prop="type" label="操作类型" min-width="100">
                    <template slot-scope="{row}">
                        <p>{{row.type | typeFilter}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="type" label="操作详情" min-width="100">
                    <template slot-scope="{row}">
                        <p>{{row.info | info}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="time" label="操作时间" width="180">
                    <template slot-scope="{row}">
                        <span>{{row.time | date}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import moment from 'moment'
export default {
    data(){
        return{
            tableData: [],
        }
    },
    created(){
        this.getLists();
    },
    methods:{
        async getLists(){
            let params = {
                pageNum: 1,
                pageSize: 100,
                type: null, //不传为全部
                teamId: this.$route.params.teamId
            }
            let res = await network.queryGroupLogList({data:params});
            if(res=='error') return;
            this.tableData = res && res.list || []
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        },
        info(val){
            if(!val) return;
            let obj = JSON.parse(val)
            return obj && obj.description || ''
        },
        typeFilter(val){
            switch (val) {
                case 1:
                    return '删除团队';
                case 2:
                    return '删除竞赛';
                case 3:
                    return '删除作品';
                case 4:
                    return '修改日程';
                case 5:
                    return '修改密码';
                case 6:
                    return '专家打分';
                case 7:
                    return '修改作品';
                case 8:
                    return '结果发布';
                case 9:
                    return '团队编辑';
                case 10:
                    return '退出团队';
                default:
                    return ''
            }
        }
    }
}
</script>

<style lang='less' scoped>
    .verify{
        background: #ffffff;
        box-shadow:0px 1px 2px 0px rgba(210,207,207,0.5);
        padding: 27px 21px;
    }
</style>
