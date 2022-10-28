<template>
    <div>
        <h3 style="margin: 20px 0">设置推荐文章</h3>
        <ul class="newsList">
            <li v-for="(list,index) in newsList" :key="list.id">
                <p class="newsTitle textOverflow" :title="list.newsTitle">{{list.newsTitle}}</p>
                <span>
                    <i class="iconfont" @click="up(index)">&#xe633;</i>
                    <i class="iconfont" @click="down(index)">&#xe632;</i>
                    <i class="iconfont" @click="del(index)">&#xe635;</i>
                </span>
            </li>
            <li class="add" @click="add" v-if="newsList.length<6"> <p>+</p> </li>
        </ul>

        <div>
            <el-button type="primary" @click="save" class="submit">保存</el-button>
        </div>

        <!-- 查询并设置动态 -->
        <el-dialog :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="show">
			<div>
                <div style="width: 379px;margin:0 auto;display:block;">
                    <el-input placeholder="请输入文章名称" @keyup.enter.native="search" v-model="name">
                        <template slot="append">
                            <p @click="search">查询</p>
                        </template>
                    </el-input>
                </div>

                <el-table class="searchList" ref="multipleTable"
                    :data="searchList" tooltip-effect="dark"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="文章名称" prop="newsTitle" min-width="120"></el-table-column>
                    <el-table-column prop="newsTime" label="日期" width="110">
                        <template slot-scope="scope">
                            {{scope.row.newsTime | date}}
                        </template>
                    </el-table-column>
                </el-table>
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
import moment, { months } from 'moment'
export default {
    data(){
        return{
            newsList: [],
            name: '',
            searchList: [],
            addList: [],
            show: false,
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            this.newsList = data && data.newsList || []
        },
        add(){
            this.show = true;
            this.searchList = [];
        },
        up(i){
            if(i==0){
                return this.$message.warning('已经是第一个了')
            }
            let a = this.newsList[i-1],
                b = this.newsList[i]
            this.newsList.splice(i, 1, a)
            this.newsList.splice(i-1, 1, b)
        },
        down(i){
            if(i==this.newsList.length-1){
                return this.$message.warning('已经是最后一个了')
            }
            let a = this.newsList[i+1],
                b = this.newsList[i]
            this.newsList.splice(i, 1, a)
            this.newsList.splice(i+1, 1, b)
        },
        del(index){
            this.newsList.splice(index, 1);
        },
        async search(){
            if(!this.name) return;
            let res = await network.getNewsListFirst({data:{
                title: this.name,
                pageNum: 1,
                pageSize: 20,
            }});
            if(res=='error') return;
            this.searchList = res && res.pageData || []
        },
        handleSelectionChange(val){
            this.addList = val;
        },
        submit(){
            if(this.addList.length==0){
                return this.$message.warning('请选择文章或点击取消')
            }
            if(this.newsList.length+this.addList.length>6){
                return this.$message.warning('推荐文章最多只能有6个')
            }
            this.newsList.push(...this.addList)
            this.cancel();
        },
        cancel(){
            this.show = false;
            this.addList = [];
            this.searchList = [];
        },
        async save(){
            let param = {
                objectId : this.groupId,
                newsList: this.newsList,
            }
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
            this.$message.success('保存成功')
        },
        
    },
    filters:{
        date(val){
            if(!val) return ''
            return moment(parseInt(val)).format('YYYY-MM-DD')
        }
    }
}
</script>

<style lang='less' scoped>
.newsList{
    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 22px;
        padding: 10px 0;
        border-bottom: 1px solid #eeeeee;
        .newsTitle{
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.65);
            height: 22px;
            letter-spacing: 1px;
            width: 500px;
        }
        i{
            font-size: 16px;
            margin: 0 5px;
            cursor: pointer;
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
            padding: 0;
            margin-top: 20px;
        }
    }
}
.submit{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
}
.searchList{
    width: 550px;
    margin: 20px auto 0;
    li{
        font-size: 12px;
        color: #4a4a4a;
        line-height: 1.5;
        margin-bottom: 10px;

    }
}
</style>