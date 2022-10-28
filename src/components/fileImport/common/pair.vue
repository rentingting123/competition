<template>
    <div>
        <div class="table">
            <el-table border :data="tableData" :cell-style="rowStyle"  style="width: 100%">
                <el-table-column prop="sysFiled"  label="系统字段"	width="180"></el-table-column>
                <el-table-column label="匹配字段">
                    <template slot-scope="scope" >
                        <div >
                            <div style="display:inline-block;margin-right:20px;" v-for="(item,index) in scope.row.matchFiledList" :key="index">
                                {{item.exFiledName}}({{item.usedNum}}) <i @click="edit(scope.row,index)" class="iconfont icon-jingsai-bianji"></i>
                            </div>
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column width="40">
                    <template slot-scope="scope" >
                        <i @click="edit(scope.row)" class="iconfont icon-jingsai-zengjia"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="dialogVisible">
			<el-form ref="form" :model="form" label-width="80">
				<el-form-item label="匹配字段">
					<el-input v-model="form.exFiledName"></el-input>
				</el-form-item>
				<el-form-item label="权重" :rules="[{require:false,message:''},{type: 'number',max:10, message: '权重必须为数字值'}]">
					<el-input v-model="form.usedNum"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button v-if="form.id"  @click="onDel">删除</el-button>
					<el-button type="primary" @click="onSubmit">确定</el-button>
					<el-button @click="dialogVisible=false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

    </div>
</template>

<script>
import jxapi from '@@/api/jxapi/index'
export default {
    data(){
        return{
            form:{},
            dialogVisible:false,
            tableData:[],
        }
    },
    created(){
        this.initActive();
    },
    methods:{
        rowStyle({row, column, rowIndex, columnIndex}){
            if(columnIndex===1){
                return 'background:#dedede;'
            }
            if(rowIndex===1){
                return 'background:#999999;'
            }
            return ""
        },
        async initActive(){
            //1 竞赛结果 2 竞赛报名 3 竞赛  不传代表查全部type

            let result =  await jxapi.getMatchSysNumList({data:{pageSize:10,pageNum:1,type:''}});
            if(result=='error') return;
            this.tableData = result;
        },
        async onDel(){
            let result = await jxapi.delMatchSysNumList({data:this.form});
            if(result=='error') return;
            this.$message.success('删除成功')
            this.dialogVisible = false;
            this.initActive()
        },
        async onSubmit(){
            let result = await jxapi.setMatchSysNumList({data:this.form});
            if(result=='error') return;
            if(this.form.id){
                this.$message.success('修改成功')
            }else{
                this.$message.success('添加成功')
            }
            this.dialogVisible = false;
            this.initActive()
        },
        edit(row,index){
            this.dialogVisible = true;
            if(index.length<1){
                return this.form = {
                    sysFiledNum:row.sysNum,
                    exFiledName:'',
                    usedNum:1,
                    id:''
                }
            }
            this.form = row.matchFiledList[index]
            
        },
    }
}
</script>

<style lang="less" scoped>
	.table{
		padding: 20px;
		.rowStyle{
			background-color: #dedede;
		}
	}
</style>
