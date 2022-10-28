<template>
    <div>
        <h3 style="margin: 20px 0">设置默认的搜索竞赛</h3>
        <ul class="competitionList">
            <li v-for="(list,index) in competitionList" :key="list.id">
                <p>
                    {{list.value}}
                    <span>
                        <i class="el-icon-delete" @click="del(index)"></i>
                    </span>
                </p>
            </li>
            <li class="add" @click="add"> <p>+</p> </li>
        </ul>

        <div>
            <el-button type="primary" @click="save" class="submit">保存</el-button>
        </div>

        <!-- 查询竞赛 -->
        <el-dialog :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="show">
			<div>
                <el-autocomplete v-model="name" :fetch-suggestions="querySearchAsync" 
                    placeholder="搜索竞赛" @select="handleSelect" >
                    <i class="el-icon-search el-input__icon" slot="suffix" style="color:blue;"> </i>
                </el-autocomplete>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="submit" >确认</el-button>
                <el-button type="primary" @click="show = false" >取消</el-button>
            </div>
		</el-dialog>

    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import { getGroupId } from '@@/utils/commons'
import detailss from './detail'
export default {
    components:{
        detailss,
    },
    data(){
        return{
            competitionList: [],
            obj: {},
            show: false,
            name: '',
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            this.competitionList = data && data.searchCompetitionList || []
        },
        async save(){
            let param = {
                objectId : this.groupId,
                searchCompetitionList: this.competitionList,
            }
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
        },
        add(){
            this.obj = {};
            this.name = '';
            this.show = true;
        },
        submit(){
            if(this.obj == {}) return this.$message.warning('请选择竞赛')
            this.competitionList.push(this.obj)
            this.show = false
        },
        del(index){
            this.competitionList.splice(index, 1);
        },
        handleSelect(item){
            this.obj = item
        },
        async querySearchAsync(q, cb){
            if(!q.trim()) return cb([]);
            let res = await network.selectCompetitions({
            data: {
                name: q,
                limit: 10
            }
            });
            if (res == "error") return;
            let arr = [];
            for (let i in res) {
            arr.push({
                value: res[i].name + '(' + res[i].year + ')',
                name: res[i].name,
                year: res[i].year,
                id: res[i].id
            });
            }
            cb(arr);
        },
    }
}
</script>

<style lang='less' scoped>
.competitionList{
    
    li{
        margin-bottom: 10px;
        span{
            display: inline-block;
            text-align: left;
            i{
                cursor: pointer;
                margin: 0 10px;
            }
        }
        &.add{
            display: block;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 24px;
            color: #ffffff;
            background: #999999;
            cursor: pointer;
        }
    }
}
.submit{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
}
/deep/.el-autocomplete{
    width: 100%;
    border-radius: 5px;
}

</style>