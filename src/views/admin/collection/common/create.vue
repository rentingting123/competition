<template>
    <div>
        <el-dialog title="创建问卷" :visible.sync="create" :append-to-body='true'>
            <el-form :model="form" ref='form' :rules="rules" label-width="120px">
                <el-form-item label="问卷名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="问卷说明" prop="remark">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="问卷份数" prop="numbers">
                    <el-input v-model.number="form.numbers"></el-input>
                </el-form-item> -->
                <el-form-item label="问卷内容" style="text-align:left;" required>
                    <el-table  label-position="left" :data="formtableData" border class="table">
                        <el-table-column prop="name" label="内容" min-width="200">
                            <template slot-scope="scope">
                            <el-input v-model="scope.row.name" ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="require" label="是否必填" min-width="80">
                            <template slot-scope="scope">
                            <el-switch  v-model="scope.row.require" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="edit" label="编辑" min-width="80">
                            <template slot-scope="scope">
                            <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button size="mini"  type="success"  @click="handleadd()">添加</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="create = false">取 消</el-button>
                <el-button type="primary" @click="tocreate('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>



<script>
import util from '@@/utils/util'
import network from '@@/api/jxapi'
import { getUserInfo } from "Lib/commons";
export default {
    props:['close'],
    data(){
        return{
            create: true,
            form:{},
            formtableData:[],
            rules:{
                name: [
                    { required: true, message: '请输入问卷名称', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入问卷份数', trigger: 'blur' }
                ],
                numbers: [
                    { required: true, message: '请输入问卷内容', trigger: 'blur' },
                    { type: 'number', message:'请输入数字', trigger:'blur' }
                ],
            },
            user:''
        }
    },
    created(){
        this.user = getUserInfo()
    },
    methods:{
        handleDelete(index,row){
            // todo 删除
            this.formtableData.splice(index,1)
        },
        handleadd(){
            this.formtableData.push({
                name: '',
                key:util.randomChar(6),
                require: false
            })
        },
        tocreate(formName){
            this.$refs[formName].validate(async (valid) => {
                if(!valid) return;
                if(this.formtableData.length<1){
                    return this.$message('请填写问卷内容');
                }
                for(let i in this.formtableData){
                    if(!this.formtableData[i].name){
                        return this.$message('请填写完整问卷内容');
                    }
                }
                let param = {
                    ...this.form,
                    html: this.formtableData,
                    userId: this.user && this.user.id,
                    formId: util.randomChar(16),
                    enable:1, //创建时为1，运行中
                }
                let res = await network.getForrankSubmit({data:param});
                if(res=='error') return;
                this.create = false;
            })
        }
    },
    watch:{
        create(val){
            if(!val){
                return this.close && this.close();
            }
        }
    }
}
</script>
