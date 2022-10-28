<template>
    <div id="jingsai">
        <div class="jingsai">
            <div class="title">
                <el-select v-model="cid" placeholder="请选择" style="width: 300px" @change="getList">
                    <el-option v-for="item in options" :key="item.id"
                        :label="item.groupName" :value="item.id">
                    </el-option>
                </el-select>
                <!-- 创建竞赛 -->
                <create v-if="authority.manageCompetition" ref="createChild" :close='getList' class="right"/>

            </div>
            <div class="jingsaiMain" v-loading='loading'>
                <mytable :data="competys"/>
            </div>
        </div>
    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import { mapState } from 'vuex'
import { getUserInfo } from '@/utils/commons.js'
import create from './create'
import mytable from './common/table'

export default {
    data(){
        return{
            options: [],
            cid: '',
            loading: false,
            competys: [],
            pageNum:1,
            pageSize:100,

        }
    },
    components:{
        create,
        mytable,
    },
    computed: mapState({
        authority: state => state.authorityManagement,
    }),
    async created(){
        if(!this.authority.manageCompetitionList){
            this.$message.error('无权限访问该页面')
            location.href = location.origin
        }

        this.$store.dispatch('AuthorityPersonal')
        await this.getCompetition();
        this.getList();
    },
    methods:{
        async getCompetition(){
            let res = await network.queryDowmGroup();
            if(res=='error') return;
            this.options = res || []
            this.cid = res && res.length>0 && res[0].id || ''
        },
        async getList(val) {
            // 处理删除全部竞赛后，刷新 再次举办
            if(val=='del'){
                this.getCompetition();
                this.$refs.createChild && this.$refs.createChild.init();
            }
            this.loading = true;
            let param = {}
            if(this.cid) param.groupId = this.cid
            this.competys = []
            const res = await network.queryCompetitionList({data:param});
            this.loading = false;
            if (res == "error") return;
            this.competys = res || []
        },
    }
}
</script>

<style lang='less' scoped>
#jingsai{
    .jingsai{
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .jingsaiMain{
            margin-top: 10px;
            width: 100%;
            min-height: 50px;
        }

    }
}
</style>
