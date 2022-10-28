<template>
    <div class="setBonus">
        <p class="setcore" @click="init"><i class="el-icon-setting"></i>设置奖金及学分</p>

        <el-dialog :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="show" width="1200px" >
            <span slot="title">
                设置{{message.arear}}奖金及学分
            </span>

           <el-table :data="tableData3" style="width: 100%" :header-cell-style="{background:'#F0F2F4',color:'#787D81'}">
                <el-table-column label="奖项" align="right" width="150">
                    <el-table-column prop="level" label="等级" width="150"> </el-table-column>
                </el-table-column>
                <el-table-column v-for="(item,index) of bonus" :label="item" align="center" :key="item" >
                    <el-table-column label="奖金" align="center" min-width="100">
                        <template slot-scope="scope">
                            <div v-if="!scope.row.bonus[index].moneyshow" class="tableon">
                                {{scope.row.bonus[index].money}}元 <i class="el-icon-edit-outline" @click="edit(scope.$index,index,1)"/>
                            </div>
                            <el-input v-else size="mini" v-model="scope.row.bonus[index].money" @blur="edited(scope.$index,index,1)"/>
                        </template>
                    </el-table-column>

                    <el-table-column label="学分" align="center" min-width="80">
                        <template slot-scope="scope">
                            <div v-if="!scope.row.bonus[index].scoreshow" class="tableon">
                                {{scope.row.bonus[index].score}}分 <i class="el-icon-edit-outline" @click="edit(scope.$index,index,0)"/>
                            </div>
                            <el-input v-else size="mini" v-model="scope.row.bonus[index].score" @blur="edited(scope.$index,index,0)"/>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancal">取 消</el-button>
                <el-button type="primary" @click="subSym">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {data} from './mock'
import {cloneDeep} from 'lodash'
export default {
    props:['message','year'],
    data(){
        return{
            show: false,
            bonus: [],
            tableData3: [],
            oldlists: [],
        }
    },
    created(){
    },
    methods:{
        init(){
            this.show = true
            this.$api.get('/Admin/schoolCompetition/selectSchoolBonus',{
                competitionRang: this.message.arear,
                year : this.year || new Date().getFullYear(),
            }).then((res)=>{
                this.getDate(res && res.bonusInfos || data);
            }).catch((err)=>{
                this.getDate();
            })

        },
        getDate(data=data){
            this.oldlists = data;
            this.tableData3 = cloneDeep(data)
            let arr = []
            this.tableData3[0].bonus.map((list)=>{
                arr.push(list.awardName)
            })
            this.bonus = arr
        },
        cancal(){
            let _this = this;
            if(this.equal(this.tableData3,this.oldlists)){
                this.show = false
            }else{
                this.$confirm('取消后，修改的数据将丢失，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(function () {
                    _this.show = false
                }).catch(()=>{})
            }
        },
        subSym(){
            if(this.equal(this.tableData3,this.oldlists)){
                this.show = false
            }else{
                this.save()
            }
        },
        equal(a,b){
            if(JSON.stringify(a)==JSON.stringify(b)){
                return true
            }else{
                return false
            }
        },
        save(){
            this.$api.post('/Admin/schoolCompetition/saveSchoolBonus',{
                competitionRang: this.message.arear,
                year : this.year || new Date().getFullYear(),
                bonusInfos: this.tableData3
            }).then((res)=>{
                this.$message.success('保存成功');
                this.show = false
            })
        },
        edit(i,j,type){
            if(type==0){
                this.$set(this.tableData3[i].bonus[j],'scoreshow',true)
            }else{
                this.$set(this.tableData3[i].bonus[j],'moneyshow',true)
            }
        },
        edited(i,j,type){
            if(type==0){
                this.$set(this.tableData3[i].bonus[j],'scoreshow',false)
            }else{
                this.$set(this.tableData3[i].bonus[j],'moneyshow',false)
            }
        }

    },
    watch:{
        show(val){
            if(!val){
                this.tableData3 = [];
                this.bonus = [];
            }
        }
    }
}
</script>

<style lang="less" scoped>
.el-row{
    text-align: center;
    font-size:14px;
    font-weight:500;
    color:rgba(74,74,74,1);
    line-height:60px;
    .el-col{
        border: 1px solid red;

    }
}
.doubletitle{
    width: 100%;
    height: 60px;
    line-height: 30px;
    background: linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);
    span:first-child{
        float: left;
    }
    span:last-child{
        float: right;
    }
}
.setcoremain{
    margin: 30px 0;
}
.setcore{
    font-size:14px;
    font-weight:400;
    color:rgba(88,113,169,1);
    line-height:20px;
    letter-spacing:3px;
    cursor: pointer;
    i{
    margin-right: 8px;
    }
}
.tableon{
    &:hover{
        i{
            display: inline-block;
        }
    }
    i{
        display: none;
    }
}
</style>

<style lang="less">
.setBonus{
    .el-table thead.is-group th {
        background: none;
      }
      .el-table thead.is-group tr:first-of-type th:first-of-type {
        border-bottom: none;
      }
      .el-table thead.is-group tr:first-of-type th:first-of-type:before {
        content: '';
        position: absolute;
        width: 1px;
        height: 120px; /*这里需要自己调整，根据td的宽度和高度*/
        top: 0;
        left: 0;
        background-color: grey;
        opacity: 0.3;
        display: block;
        transform: rotate(-56deg); /*这里需要自己调整，根据线的位置*/
        transform-origin: top;
      }
      .el-table thead.is-group tr:last-of-type th:first-of-type:before {
        content: '';
        position: absolute;
        width: 1px;
        height: 120px; /*这里需要自己调整，根据td的宽度和高度*/
        bottom: 0;
        right: 0;
        background-color: grey;
        opacity: 0.3;
        display: block;
        transform: rotate(-57deg); /*这里需要自己调整，根据线的位置*/
        transform-origin: bottom;
        // background:red;
      }
}

</style>
