<template>
    <div class="expertExcel">
        <el-dropdown :size='size||"medium"' @command="handleCommand" type="primary" >
            <el-button type="primary" :size='size||"medium"'>
                导出
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='a'>原表导出</el-dropdown-item>
                <el-dropdown-item command='b'>选择导出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dialog
            title="导出"
            :visible.sync="show"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            width="850px"
            >
            <el-table class="table" ref="multipleTable" :data="tableData" border @selection-change='selectionChange'>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="可选的字段" min-width="165">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="字段重命名" min-width="165">
                    <template slot-scope="scope">
                        <div class="editName">
                            <p v-if="!scope.row.realNameEdit" @click="editTable('realNameEdit', scope.$index, true)">
                                {{scope.row.realName}}
                                <i class="el-icon-edit-outline"></i>
                            </p>
                            <el-input v-else v-model="scope.row.realName" @blur="editTable('realNameEdit', scope.$index, false)"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <i class="iconfont"
                            v-if="scope.$index!=0"
                            style="font-size:18px;cursor: pointer;" 
                            @click="up(scope.row,scope.$index)">
                            &#xe633;
                        </i>
                        <i class="iconfont" 
                            v-if="scope.$index!=tableData.length-1"
                            style="font-size:18px;cursor: pointer;" 
                            @click="down(scope.row,scope.$index)">
                            &#xe632;
                        </i>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取消</el-button>
                <el-button type="primary" @click="downloadPersonal">导出</el-button>
            </span>
        </el-dialog>


        <!-- 导出提示框 -->
        <el-dialog
            title="正在导出，整个过程可能需要1－3分钟，请耐心等待。。。"
            :visible.sync="downShow"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            style="padding-top:50px;"
            center
            >
            <div v-loading="downShow"></div>
        </el-dialog>


    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    props:[
        'size', //控制按钮的大小
        'url', //请求的地址，必传
        'params', //请求的参数，可以不传
        'beforeExpert', //导出前的条件判断，return true时进行拦截，不进行下一步
    ],
    data(){
        return{
            downShow: false, //导出提示框
            show: false, //选择字段的弹窗
            tableData: [], //
            fields: [], // 选择的导出字段

        }
    },
    methods:{
        async handleCommand(type){
            // 导出前的条件判断 start
            let flag = false
            if(this.beforeExpert){
                flag = await this.beforeExpert && this.beforeExpert()
            }
            if(flag) return;
            // end
            
            if(type=='b'){
                let res = await network.getExportFields({data:{
                    key: this.url
                }});
                if(res=='error') return;
                for(let i in res){
                    res[i].realName = res[i].name
                }
                this.tableData = res
                this.show = true
            }else if(type=='a'){
                this.download()
            }
        },
        async download(){
            this.downShow = true;
            let res = await network.expertExcelPost({
                url: this.url,
                data: this.params,
                config: { responseType: "arraybuffer" },
            });
            this.downShow = false;
            if(res=='error') return;
        },
        async downloadPersonal(){
            if(this.fields.length<=0){
                return this.$message.warning('请选择要导出的字段')
            }

            // 遍历table和选中的无序数组，获得有序选中数组
            let fields = []
            for(let i in this.tableData){
                if(this.fields.includes(this.tableData[i])){
                    fields.push({
                        name: this.tableData[i].realName,
                        method: this.tableData[i].method,
                    })
                }
            }
            
            this.downShow = true;
            let res = await network.expertExcelPost({
                url: this.url,
                data: {
                    ...this.params,
                    fields: fields
                },
                config: { responseType: "arraybuffer" },
            });
            this.show = false;
            this.downShow = false;
            if(res=='error') return;
        },
        selectionChange(item){
            this.fields = item
        },
        up(row, i){
            let a = this.tableData[i-1]
            this.$set(this.tableData,i-1,this.tableData[i])
            this.$set(this.tableData,i,a)
        },
        down(row, i){
            let a = this.tableData[i+1]
            this.$set(this.tableData,i+1,this.tableData[i])
            this.$set(this.tableData,i,a)
        },
        editTable(name, i, flag){
            this.$set(this.tableData[i], name, flag)
        }
    }
}
</script>

<style lang='less' scoped>
.expertExcel{
    display: inline-block;
    vertical-align: middle;
    .table{
        width: 720px;
        margin: 0 auto;
    }
}
</style>