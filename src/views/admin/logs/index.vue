<template>
    <div class="verify">
        <div class="search">
            <el-select v-model="type" placeholder="请选择" @change="getLists">
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>

            <el-input  placeholder="搜索" @keyup.enter.native="getLists" style="width: 200px" v-model="search">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>

        </div>
        <div class="listmain">
            <el-table :data="tableData" border style="width: 100%;margin:0 auto 20px;" >
                <el-table-column  type="index" label="#" align="center" width="55"> </el-table-column>
                <el-table-column  prop="loginName" label="操作账号" width="150"></el-table-column>
                <el-table-column  prop="phone" label="手机号" width="150"></el-table-column>
                <el-table-column  prop="userName" label="操作人" min-width="120"></el-table-column>
                <el-table-column  prop="type" label="操作详情" min-width="100">
                    <template slot-scope="{row}">
                        <p>
                            {{row.type | typeFilter}}
                            <span style="font-size: 12px;">({{row.name}})</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column  prop="time" label="操作时间" width="180">
                    <template slot-scope="{row}">
                        <span>{{row.time | date}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-footer style=" margin: 0 auto;">

            <el-pagination
                background
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :current-page.sync="pageNum"
                :total="total"
                @current-change="getLists"
            ></el-pagination>
        </el-footer>

        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            type: null,
            types: [
                {
                    value: null,
                    label: '全部',
                },
                {
                    value: 1,
                    label: '删除团队',
                },
                {
                    value: 2,
                    label: '删除竞赛',
                },
                {
                    value: 3,
                    label: '删除作品',
                },
                {
                    value: 4,
                    label: '修改日程',
                },
                // {
                //     value: 5,
                //     label: '修改密码',
                // },
                {
                    value: 6,
                    label: '专家打分',
                },
                {
                    value: 7,
                    label: '修改作品',
                },
                {
                    value: 8,
                    label: '结果发布',
                },
                {
                    value: 9,
                    label: '团队编辑',
                },
                {
                    value: 10,
                    label: '退出团队',
                }
            ],
            search: '',
            tableData: [],
            pageNum: 1,
            pageSize: 20,
            total: 0,
        }
    },
    computed:{
        ...mapState({
            authority:state => state.authorityManagement,
        })
    },
    created(){
        if(!this.authority.managePlatform){
            this.$message.error('无权限访问该页面')
            location.href = location.origin
        }
        this.getLists();
    },
    methods:{
        async getLists(){
            let params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            if(this.type){
                params.type = this.type
            }
            if(this.search){
                params.search = this.search
            }
            let res = await network.queryLogList({data:params});
            if(res=='error' || !res) return;
            this.total = res && res.total || 0
            this.tableData = res && res.list || []
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
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
        .search{
            text-align: left;
            margin-bottom: 44px;
            .el-select{
                margin-right: 20px;
            }
        }

    }
</style>
