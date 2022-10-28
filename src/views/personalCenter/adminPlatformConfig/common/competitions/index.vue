<template>
    <div>
        <h3 style="margin: 20px 0">设置显示竞赛</h3>
        <ul class="competitionList">
            <li v-for="(list,index) in competitionList" :key="list.id">
                <img :src="list.logo" >
                <span>
                    <i class="el-icon-edit-outline" @click="edit(list, index)"></i>
                    <i class="el-icon-delete" @click="del(index)"></i>
                </span>
            </li>
            <li class="add" @click="add"> <p>+</p> </li>
        </ul>

        <div>
            <el-button type="primary" @click="save" class="submit">保存</el-button>
        </div>

        <!-- 查询竞赛 -->
        <el-dialog :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="show">
			<div>
                <div style="width: 379px;margin:0 auto;display:block;">
                    <el-select v-model="id" filterable remote reserve-keyword
                        @change="change" placeholder="请输入竞赛名称" :remote-method="search">
                        <el-option v-for="(item,index) in options" :key="item.id" :label="item.name" :value="index">
                        </el-option>
                    </el-select>
                </div>

                <detailss style="display:block;margin:20px auto;" :edit='true' :obj='obj' />
                
                <el-input v-model="obj.url" style="width: 379px;margin:0 auto;display:block;" placeholder="请输入跳转网址"></el-input>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="submit" >确认</el-button>
                <el-button type="primary" @click="cancel" >取消</el-button>
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
            index: '',
            show: false,
            id: '',
            isEdit: false,
            options: [],
        }
    },
    created(){
        this.init();
    },
    methods:{
        async save(){
            let param = {
                objectId : this.groupId,
                competitionList: this.competitionList,
            }
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
        },
        edit(list, index){
            this.obj = list;
            this.index = index;
            this.show = true;
            this.id = '';
            this.isEdit = true;
        },
        add(){
            this.obj = {};
            this.index = '';
            this.show = true;
            this.id = '';
            this.isEdit = false;
        },
        cancel(){
            this.obj = {};
            this.index = '';
            this.show = false;
        },
        submit(){
            if(!this.obj.id) return this.$message.warning('请选择竞赛')
            if(!this.obj.message) return this.$message.warning('请输入竞赛类型')
            if(this.isEdit){
                this.competitionList.splice(this.index, 1, this.obj)
                this.show = false
            }else{
                this.competitionList.push(this.obj)
                this.show = false
            }
        },
        del(index){
            this.competitionList.splice(index, 1);
        },
        async init(){
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            this.competitionList = data && data.competitionList || []
        },
        async search(q){
            if(q !== ''){
                let res = await network.getIndexCompetition({data:{
                    name: q,
                    pageSize: 999,
                }})
                if(res=='error') return;
                this.options = res && res.list
            }else{
                this.options = []
            }
        },
        change(i){
            let res = this.options[i]
            this.$set(this.obj, 'id', res.id)
            this.$set(this.obj, 'logo', res.bannerUrl)
            this.$set(this.obj, 'name', res.name)
            this.$set(this.obj, 'descrption', res.descrption)
            this.$set(this.obj, 'personNum', res.groupNumVo&&res.groupNumVo.personNum||0)
            this.$set(this.obj, 'schoolNum', res.groupNumVo&&res.groupNumVo.schoolNum||0)
        },
    }
}
</script>

<style lang='less' scoped>
.competitionList{
    li{
        display: inline-block;
        vertical-align: top;
        width: 345px;
        height: 147px;
        line-height: 147px;
        overflow: hidden;
        position: relative;
        margin-bottom: 10px;
        margin-right: 10px;
        &:nth-child(2n){
            margin-right: 0;
        }
        img{
            width: 100%;
            height: 100%;
        }
        span{
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            text-align: center;
            i{
                font-size: 24px;
                color: #ffffff;
                cursor: pointer;
                margin: 0 10px;
            }
        }
        &:hover{
            span{
                display: block;
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

</style>