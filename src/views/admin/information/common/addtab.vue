<template>
    <div>
        <el-dialog :title="title" :visible.sync="addtabdialog" :append-to-body='true'>
           <el-form :rules="rulestab" ref="formchild" :model="form" label-width="80px" class="demo-ruleForm">
                <el-form-item label="标签名称" prop="label" >
                  <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="标签备注">
                  <el-input v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="竞赛属性" prop="competitionId" 
                >
                 <el-select v-model="form.competitionId"
                 clearable
                 @change="getChilds()"
                  placeholder="竞赛名称">
                     <el-option
                        v-for="item in comoptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="" prop="competitionChildId"
                 >
                      <el-select v-model="form.competitionChildId"  @change="getraceSchedule" clearable filterable placeholder="赛项">
                        <el-option
                          v-for="item in pointsData"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                </el-form-item>
                 <el-form-item v-if="form.competitionChildId" label="" prop="rowId"
                 >
                      <el-select v-model="form.rowId"  clearable filterable placeholder="赛程">
                        <el-option
                          v-for="item in raceScheduleList"
                          :key="item.rowId"
                          :label="item.names"
                          :value="item.rowId">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="" prop="isPromote">
                    <!-- 1已晋级 2获奖 3未晋级 -->
                   <el-select v-model="form.isPromote" placeholder="状态" >
                      <el-option label="已晋级" :value="1"></el-option>
                      <el-option label="获奖" :value="2"></el-option>
                      <el-option label="未晋级" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                   <!-- 预估人数111 -->
                </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
                <el-button @click="addtabdialog = false">取 消</el-button>
                <el-button type="primary" @click="toaddtabs('formchild')">
                    <span v-if="!updataid">确 定</span>
                    <span v-else>确认修改</span>
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>



<script>
import util from '@@/utils/util'
import network from '@@/api/jxapi'
import jxApi from '@/api/jxapi/index'
import { getUserInfo } from "Lib/commons";
export default {
    props:['close','updataid','row'],
    created(){
        this.getcom()
        if(this.updataid){
            // 调用获取详情接口
            this.title = '标签详情'
            this.gettab()
            this.getChilds(this.row.competitionId)
        }else{
            this.title = '添加标签'
        }
    },
    data(){
        return{
            raceScheduleList:[],
            title:'',
            comoptions:[],
            pointsData:[],
            comloading:false,
            addtabdialog: true,
            options:[],
             rulestab:{
                label: [
                    { required: true, message: '请输入标签名称', trigger: 'blur' }
                ],
                remark: [],
                competitionId: [
                    { required: true,  message: '请输入竞赛名称', trigger: "blur",},
                ],
                isPromote: [
                    { required: true, message: '请选择状态', trigger: 'blur' },
                ],
            },
            form:{
                rowId:''
            }
        }
    },
    methods:{
        async getraceSchedule(type){
             if(type !== 1){
                 this.form.rowId = ''
             }
           if(this.form.competitionChildId){
                let res = await network.getSchedule({data:{
                competitionId : this.form.competitionChildId
            }})
            if(res == 'error') return
            res.competitionTimes.forEach(item => {
                let obj = item.competition_times[0]
                item.names = obj.name
            })
            this.raceScheduleList = res.competitionTimes
           }else{
               this.raceScheduleList = []
           }
        },
        async gettab(){
            let res = await network.getMessageLabelDetail({data:{id:this.updataid}})
            if(res=='error') return;
            this.form = res
            if(this.form.competitionChildId){
                this.getraceSchedule(1)
            }
            console.log(this.form);
       },
         // 获取赛项
        async getChilds(id){
            if(id){
                const res = await jxApi.getChild({competitionId: id}); 
                if(res=='error') return
                this.pointsData = res;    
            }else{
                if(this.form.competitionId != ''){
                const res = await jxApi.getChild({competitionId: this.form.competitionId}); 
                if(res=='error') return
                this.pointsData = res;    
            }
            }
            
        },
        async getcom(){
                this.comloading = true
                 let res = await network.queryCompetitionList({
                data: {
                    groupId:localStorage.getItem('groupId')
                }
              });
               if (res == "error") return;
               this.comoptions = res
               this.comloading = false
        },
         toaddtabs(formName){
            this.$refs[formName].validate( (valid) => {
                if(!valid) return;
                this.addtab()
            })
        },
        async addtab(){
            if(!this.updataid){
                // 添加
                let res = await network.addMessageLabel({data:this.form})
                if(res=='error') return;
                this.$emit('shuaxin')
                this.addtabdialog = false;
                this.$message.success('添加成功')
            }else{
                // 修改
                this.form.id = this.updataid
                let res = await network.updateMessageLabel({data:this.form})
                if(res=='error') return;
                this.$emit('shuaxin')
                this.addtabdialog = false;
                this.$message.success('修改成功')
            }
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
