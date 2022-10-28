<template>
    <div>
        <span class="toolbar" @click="init"><span><i class="el-icon-setting"></i>设置本年度获奖学生信息</span></span>

        <el-dialog :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="show" width="1000px" >
            <span slot="title" class="messageTitle">
                <span>设置{{year}}年度获奖学生信息<small> (学号/编号,学院,手机号为必填)</small></span>
                <el-input placeholder="搜索" v-model="search" style="width:300px;">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </span>

           <el-table
                :data="tableData3.filter(data => !search || data.name.includes(search))"
                border height="450" style="width: 100%" :header-cell-style="{background:'#F0F2F4',color:'#787D81'}"
                v-loading="loading">
                <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                <el-table-column prop="isteacher" label="身份" min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.isteacher==1 ? '教师' : '学生'}}
                    </template>
                </el-table-column>
                <el-table-column prop="studentId" label="学号/编号" min-width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isteacher==0">
                            <p v-if="!scope.row.studentIdEdit" class="editshow" :class="{'no': !scope.row.studentId}">{{scope.row.studentId}} <i @click="toEdit(scope.$index,'studentIdEdit')" class="el-icon-edit"></i></p>
                            <el-input v-else v-model="scope.row.studentId" :ref="scope.$index+'studentIdEdit'" @blur="edit(scope.$index,'studentIdEdit',scope.row)"/>
                        </div>
                        <div v-else>
                            <p v-if="!scope.row.teacherIdEdit" class="editshow" :class="{'no': !scope.row.teacherId}">{{scope.row.teacherId}} <i @click="toEdit(scope.$index,'teacherIdEdit')" class="el-icon-edit"></i></p>
                            <el-input v-else v-model="scope.row.teacherId" :ref="scope.$index+'teacherIdEdit'" @blur="edit(scope.$index,'teacherIdEdit',scope.row)"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="academy" label="学院" min-width="180">
                    <template slot-scope="scope">
                       <p v-if="!scope.row.academyEdit" class="editshow" :class="{'no': !scope.row.academy}">{{scope.row.academy}} <i @click="toEdit(scope.$index,'academyEdit')" class="el-icon-edit"></i></p>
                        <el-input v-else v-model="scope.row.academy" :ref="scope.$index+'academyEdit'" @blur="edit(scope.$index,'academyEdit',scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column prop="major" label="专业" min-width="180">
                    <template slot-scope="scope">
                       <p v-if="!scope.row.majorEdit" class="editshow" :class="{'no': !scope.row.major}">{{scope.row.major}} <i @click="toEdit(scope.$index,'majorEdit')" class="el-icon-edit"></i></p>
                        <el-input v-else v-model="scope.row.major" :ref="scope.$index+'majorEdit'" @blur="edit(scope.$index,'majorEdit',scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column prop="contactPhone" label="手机" min-width="140">
                     <template slot-scope="scope">
                       <p v-if="!scope.row.contactPhoneEdit" class="editshow" :class="{'no': !scope.row.contactPhone}">{{scope.row.contactPhone}} <i @click="toEdit(scope.$index,'contactPhoneEdit')" class="el-icon-edit"></i></p>
                        <el-input v-else v-model="scope.row.contactPhone" :ref="scope.$index+'contactPhoneEdit'" @blur="edit(scope.$index,'contactPhoneEdit',scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="120">
                    <template slot-scope="scope">
                       <p v-if="!scope.row.emailEdit" class="editshow" :class="{'no': !scope.row.email}">{{scope.row.email}} <i @click="toEdit(scope.$index,'emailEdit')" class="el-icon-edit"></i></p>
                        <el-input v-else v-model="scope.row.email" :ref="scope.$index+'emailEdit'" @blur="edit(scope.$index,'emailEdit',scope.row)"/>
                    </template>
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancal">取 消</el-button>
                <!-- <el-button type="primary" @click="subSym">确 定</el-button> -->
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    props:['year'],
    data(){
        return{
            show: false,
            tableData3: [],
            search: '',
            loading: false,
        }
    },
    created(){
    },
    methods:{
        init(){
            this.show = true
            this.loading = true
            this.$api.get('/Admin/schoolCompetition/selectSchoolAwardMember',{
                year : this.year || new Date().getFullYear(),
                search: this.search || null,
            }).then((res)=>{
                this.loading = false
                this.tableData3 = res || [];
            }).catch((err)=>{
                this.loading = false
            })
        },
        toEdit(index, name){
            this.$set(this.tableData3[index], name, true)
            this.$nextTick(()=>{
                this.$refs[index+name].focus();
            })
        },
        edit(index, name, data){
            if(name=="contactPhoneEdit"){
                if(data.contactPhone && data.contactPhone.length!=11){
                    this.$message.warning('请输入正确手机号')
                    this.$refs[index+name].focus();
                }else{
                    this.$set(this.tableData3[index], name, false)
                    this.$api.post(`/Api/Admin/CompetitionResult/updateAwardStudent `,data).then(res=>{})
                }
            }else{
                this.$set(this.tableData3[index], name, false)
                this.$api.post(`/Api/Admin/CompetitionResult/updateAwardStudent `,data).then(res=>{})
            }
        },
        cancal(){
            this.show = false
        },
    },
    watch:{
        show(val){
            if(!val){
                this.tableData3 = [];
                this.search = '';
            }
        }
    }
}
</script>

<style lang="less" scoped>
.messageTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 19px 0;
    border-bottom: 1px solid #D4D4D4;
}

.editshow{
    i{
        display: none;
        margin-left: 5px;
    }
    &:hover{
        i{
            display: inline-block;
        }
    }
    &.no{
        i{
            display: inline-block;
        }
    }
}

</style>
