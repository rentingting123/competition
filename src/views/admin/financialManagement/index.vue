<template>
  <div class="roles-wrapper">
    <!-- <div class="header_fixed">
        <div class="header_content">
          <router-link :to="back()">返回</router-link>
        </div>
      </div> -->
      <invoice-detail :groupId="invoGroupId" v-if="invoShow" :close="close"/>
      <outline-pay-detail :payDetail="payDetail" v-if="outlinepayshow" :close="close"/>
    <el-container>
      <el-main>
        <div class="search-wrapper">
            <div class="detail">
                <div class="detailMain">
                    <div class="minDetail" style="text-align:left;">
                        <el-select v-model="competitionsStatu" filterable remote :remote-method="getpersonalCompetition"  @change="competitionsChange" size='large' placeholder="请选择竞赛">
                            <el-option
                                v-for="item in competitions"
                                :key="item.id"
                                :label="item.competitionName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <el-input v-model="groupName" class="searchName" placeholder="团队名称／团队码" prefix-icon="el-icon-search" ></el-input>
                    <div class="minDetail">
                        <span>学校</span>
                            <el-select
                            filterable
                            v-model="schoolName"
                            reserve-keyword
                            remote
                            :remote-method="remoteMethod"
                            :loading="loading"
                            placeholder="请输入学校"
                            >
                            <el-option
                                v-for="item in schoolList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>赛项</span>
                        <el-select v-model="cid">
                            <el-option v-for="item in matchItemData" :key="item.key" :label="item.label" :value="item.key"></el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>线上付款</span>
                        <el-select v-model="onlinepayValue">
                            <el-option label="已付款" value="1">已付款</el-option>
                            <el-option label="未付款" value="0">未付款</el-option>
                            <el-option label="全部" value="">全部</el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>线下付款</span>
                        <el-select v-model="offlineStatusValue">
                            <el-option label="已付款" value="1">已付款</el-option>
                            <el-option label="未付款" value="0">未付款</el-option>
                            <el-option label="审核中" value="2">审核中</el-option>
                            <el-option label="全部" value="">全部</el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>开票</span>
                        <el-select v-model="invoiceStatusValue">
                            <el-option label="已开票" value="1">已开票</el-option>
                            <el-option label="未开票" value="0">未开票</el-option>
                            <el-option label="审核中" value="2">开票中</el-option>
                            <el-option label="全部" value="">全部</el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>晋级状态</span>
                        <el-select v-model="promotionStatusValue">
                            <el-option label="已晋级" value="1">已晋级</el-option>
                            <el-option label="未晋级" value="2">未晋级</el-option>
                            <el-option label="全部" value="">全部</el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>日期范围</span>
                        <el-date-picker v-model="dateValue" value-format="yyyy-MM-dd"  type="daterange"  range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期"></el-date-picker>
                    </div>
                    <div class="minDetail">
                        <el-button type="primary" justify='start'   @click="sourch" :loading="sourchloading">搜索</el-button>
                        <el-button  @click="resetData">重置</el-button>
                        <el-button type="primary" :disabled="!authority.exportFinance" @click="exportTable">导出财务表</el-button>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>

        <div>
          <p style="text-align:left;">
            <span>学校 <span class="numColor">{{schoolNum}}</span>所</span><span> / 团队 <span class="numColor">{{groupNum}}</span>组</span><span> / 人数 <span class="numColor">{{personNum}}</span>名</span>
            <!-- <el-button type="primary" size="small" :disabled="!authority.confirmPayment" @click="somecheck()">批量确认</el-button> -->
            <el-button type="primary" size="small" :disabled="!authority.confirmInvoice" @click="somepiao()">批量开票</el-button>
            <!-- " -->
          </p>
        </div>
        <div class="table-wrapper">
          <el-table :header-cell-style="{background:'#f3f3f3'}"
            v-loading="loading"
            @cell-mouse-leave="cellMouseLeave"
            @cell-mouse-enter="cellMouseEnter"
            @expand-change="serachGroupInfo"
            :data="tableData"
            style="max-width:1611px;"
            border
            :span-method="objectSpanMethod"
            :row-class-name="isCell ? setCellClass : ''"
             @selection-change="handleSelectionChange"
            >
            <template slot="empty">
              <p v-if="loading" >数据加载中......</p>
            </template>
             <el-table-column
                type="selection"
                width="55" :selectable="selectedDisabled"></el-table-column>
            <el-table-column type="expand" prop="expand" label="详情" width="80"  > 
              <template slot-scope="scope">
                <el-form label-position="left" label-width="120px" class="demo-table-expand">
                  <el-form-item label="团队信息">
                    <el-table
                      border
                      :data="groupDetails[scope.row.groupId]"
                      style="width: 700px"
                      :header-cell-style="{background:'#f3f3f3'}"
                    >
                      <el-table-column prop="userName" label="姓名" min-width="100"></el-table-column>
                      <el-table-column prop="roleName" label="身份" min-width="80"></el-table-column>
                      <el-table-column prop="contactPhone" label="手机号" min-width="140"></el-table-column>
                      <el-table-column prop="stuNum" label="学号" width="190" v-if="isSchoolCom"></el-table-column>
                      <el-table-column prop="academy" label="学院" width="190" v-if="isSchoolCom"></el-table-column>
                      <el-table-column prop="schoolName" label="学校" v-else min-width="190"></el-table-column>
                    </el-table>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column header-align="center" prop="groupName" label="团队名" fixed min-width="150"></el-table-column>
            <el-table-column header-align="center" prop="code" label="团队码" min-width="150"></el-table-column>
            <el-table-column header-align="center" prop="matchItem"  label="赛项" min-width="310"></el-table-column>
            <el-table-column header-align="center" align="center" prop="payStatus" label="线上付款" min-width="80">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.payStatus==-1">
                            已退款
                        </span>
                        <span v-else-if="scope.row.payStatus">
                            {{scope.row.payStatus}}
                            <el-button type="button"  size="mini" @click="payrRefund(scope.row,0)">退款</el-button>
                        </span>
                        <span v-else>
                            未支付
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column header-align="center" prop="offlineStatus" label="线下付款" min-width="160" column-key="offlineStatus">
                <template slot-scope="scope">
                    <div >
                        <p class="check" @click="checkOutline(scope.row)">查看</p>
                        <div style="text-align:center;" v-if="scope.row.offlineStatus==1">
                            <p >已转账</p>
                            <el-button type="button" :disabled="!authority.resetPayment"  size="mini" @click="resetpayStatus(scope.row,0)">重置</el-button>
                        </div>
                        <div style="text-align:center;" v-else-if="scope.row.offlineStatus==2">
                            <p>已反馈</p>
                            <el-button type="button" :disabled="!authority.resetPayment"  size="mini" @click="resetpayStatus(scope.row,0)">重置</el-button>
                        </div>
                        <div v-else>
                            <el-button style="float:left" :disabled="!authority.confirmPayment" v-if="scope.row.offlineStatus==0"  type="primary" size="mini" @click="outline(scope.row,true)">审核</el-button>
                            <el-button style="float:left" :disabled="!authority.confirmPayment" v-else type="primary" size="mini" @click="outline(scope.row,true)">确认</el-button>
                            <el-button style="float:left" :disabled="!authority.feedbackPayment" type="button" size="mini" @click="outline(scope.row,false)">反馈</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column header-align="center" prop="invoiceStatus" label="开票" min-width="160" column-key="invoiceStatus">
                <template slot-scope="scope">
                    <!-- null：未操作  0：待审核    1：已审核（确认） 2：已反馈 -->
                    <div>
                        <p class="check"  @click="checkFile(scope.row)">查看</p>
                        <div style="text-align:center;" v-if="scope.row.invoiceStatus==1">
                            <p >已开票</p>
                            <el-button type="button" :disabled="!authority.resetInvoice" size="mini" @click="resetpayStatus(scope.row,1)">重置</el-button>
                        </div>
                        <div style="text-align:center;" v-else-if="scope.row.invoiceStatus==2">
                            <p>已反馈</p>
                            <el-button type="button" :disabled="!authority.resetInvoice" size="mini" @click="resetpayStatus(scope.row,1)">重置</el-button>
                        </div>
                        <div v-else>
                            <el-button style="float:left" :disabled="!authority.confirmInvoice" v-if="scope.row.invoiceStatus==0"  type="primary" size="mini" @click="invoiceStatus(scope.row,true)">审核</el-button>
                            <el-button style="float:left" :disabled="!authority.confirmInvoice" v-else type="primary" size="mini" @click="invoiceStatus(scope.row,true)">开票</el-button>
                            <el-button style="float:left" :disabled="!authority.feedbackInvoice" type="button" size="mini" @click="invoiceStatus(scope.row,false)">拒绝</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column header-align="center" prop="payTime" label="支付时间" min-width="170"></el-table-column>
            <el-table-column header-align="center" align="center" prop="promotionStatus" label="晋级状态" min-width="170">
                <template slot-scope="scope">
                    <!-- 0：默认状态 1：晋级  2：淘汰 -->
                    <p v-if="scope.row.promotionStatus==0">－</p>
                    <p v-if="scope.row.promotionStatus==1">晋级</p>
                    <p v-if="scope.row.promotionStatus==2">淘汰</p>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
        <el-footer style=" margin: 0 auto;">
             <el-pagination
       @size-change="handleSizeChange"
      @current-change="currentPage"
      :current-page="pageCurrent"
      :page-sizes="arrPageSize"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
            <!-- <el-pagination background layout="total, prev, pager, next" :total="totalCount"
             :current-page.sync="pageCurrent" @current-change="currentPage"></el-pagination>-->
        </el-footer> 
    </el-container>

    <el-dialog
      title="正在导出，整个过程可能需要1－3分钟，请耐心等待。。。"
      :visible.sync="downShow"
      :show-close="false"
      :modal-append-to-body="false"
      :close-on-click-modal = false
      :close-on-press-escape = false
      style="padding-top:50px;"
      center>
      <div v-loading="downShow"></div>
   </el-dialog>
  </div>
</template>

<script>
import { getGroupId,getCompetitionId,getUserInfo } from "@@/utils/commons";
import jxapi from "@/api/jxapi/index";
import invoiceDetail from '@@/components/invoice/common/detail'
import outlinePayDetail from './outlineshow'
import moment from 'moment'
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
    name: "regManagement",
    components: {
        invoiceDetail,
        outlinePayDetail
    },
    data() {
        return {
            schoolList:[],
            groupDetails:{},
            groupName:'',
            schoolName:'',
            onlinepayValue:'',
            offlineStatusValue:'',
            invoiceStatusValue:'',
            promotionStatusValue:'',
            dateValue:'',
            show:false,
            invoGroupId:'',//团队GroupId
            invoShow:false,//发票展示
            outlinepayshow:false, //线下支付展示
            payDetail:{},
            isCell:'true',
            loading:false,
            sourchloading:false,
            matchItemData:[],
            cid:'',
            groupId:'',//登录用户信息
            competitionId:'',//登录用户信息
            tableData: [],
            //分页数
            arrPageSize:[10,20,50,100,200],
            //分页大小
            pagesize:10,
            //总分页数
            pageCount:1,
            //当前页面
            pageCurrent:1,
            //总数
            totalCount:10,
            groupids:[],
            rowIndex: '-1',
            OrderIndexArr: [],
            hoverOrderArr: [],
            schoolNum:0,//学校统计
            groupNum:0,//团队统计
            personNum:0,//人数统计
            downShow:false,
            user:{},
            competitions:[],
            competitionsStatu:'',
        };
    },
    created(){
        if(!this.authority.manageFinance){
            this.$message.error('无权限访问该页面')
            location.href = location.origin;
        }
    },
    mounted(){
        
        //this.groupId = getGroupId()
        this.user = getUserInfo()
         this.groupId = this.user.groupId//getGroupId()
        this.getpersonalCompetition()
    },
    methods: {
        // 批量开票
        async somepiao(){
            this.loading = true
            let res = await jxapi.auditGroupInvoiceList({
                data:this.groupids
            })
            this.loading = false
            if(res=='error')return
            this.groupids = []
            this.$message.success('操作成功')
        },
        selectedDisabled(row, index) {
        	if (row.invoiceStatus == 1 || !this.authority.confirmInvoice) {
        		return false //不可勾选
        	} else {
        		return true; //可勾选
        	}
        },
         handleSelectionChange(selection) {
             this.groupids = []
             selection.forEach(item => {
                 let obj = {
                     groupId:item.groupId,
                     type:true
                 }
                 this.groupids.push(obj)
             })
    },
          handleSizeChange(val) {
        this.pagesize = val
        this.countData();
      },
    async serachGroupInfo({competitionId,groupId}){
      if(this.groupDetails[groupId]) return
      let info = await jxapi.usercenterGroupInfo({
        data:{
          competitionId,groupId
        }
      })
      if(info=='error')return
      this.$set(this.groupDetails,groupId,info)
    },
        async getpersonalCompetition(q){
            let res = await jxapi.getpersonalCompetition({data:{
                competitionName: q
            }});
            if(res=='error' || !res) return;
            this.competitions = res

        },
        init(){
            this.countData();
            this.getCompetitionChildList();
            this.$store.dispatch('AuthorityFinancial')
        },
        competitionsChange(val){
            this.competitionId = val;
            this.init();
        },
        remoteMethod(q) {
            if (q !== "") {
                this.loading = true;
                this.querySchool({ q });
            } else {
                this.schoolList = [];
            }
        },
        async querySchool(param) {
            this.loading = false;
            param.limit = 10;

            const data = await jxapi.schools({ data: param });
            if (data == "error") return;
            if (!data) {
                this.schoolList = [];
                return;
            }
            this.schoolList = data.map(r => {
                return { value: r.schoolcolName, label: r.schoolcolName };
            });
        },
        resetData(){
            this.groupName = '',
            this.schoolName = '',
            this.onlinepayValue = '',
            this.offlineStatusValue = '',
            this.invoiceStatusValue = '',
            this.promotionStatusValue = '',
            this.dateValue = '',
            this.cid = ''
        },
        getCompetitionChildList(){
            jxapi.getCompetitionChildList({data:{competitionId: this.competitionId} }).then((res)=>{
                if (res == "error") return this.$message.error("获取竞赛列表失败");
                let data = []
                for(let i = 0;i < res.childs.length; i++){
                    data.push({
                    value: res.childs[i].name,
                    label: res.childs[i].name,
                    key: res.childs[i].id
                    })
                }
                data.push({
                    value: '全部',
                    label: '全部',
                    key: this.competitionId,
                })
                this.matchItemData = data
            })

        },
        back() {
            return { path: "/details" , query: {id:this.competitionId}};
        },
        // 获取报名列表
        async list(status){
            this.loading = true;
            let params = {
                pageNum:this.pageCurrent,
                pageSize:this.pagesize,
                competitionId: this.cid?this.cid:this.competitionId,
                selfGroupId:this.groupId,
                groupName:this.groupName,
                schoolName:this.schoolName || null,
                onlinePayType:this.onlinepayValue,
                offlinePayType:this.offlineStatusValue,
                invoiceType:this.invoiceStatusValue,
                promotionStatus:this.promotionStatusValue,
            }
            if(this.dateValue.length>1){
                params.startPayTime = this.dateValue[0]
                params.endPayTime = this.dateValue[1]
            }

            await jxapi.applyList({data:params}).then((res)=>{
                this.sourchloading = false
                this.tableData=res.list;
                this.pageCount=res.pages//总页数
                this.totalCount=res.total//总条数
                this.pageCurrent=res.pageNum//当前页
                this.pagesize=res.pageSize
                this.loading = false;

                // 需要合并的项
                let OrderObj = {}
                this.OrderIndexArr=[]
                this.tableData.forEach((ele,index)=>{
                    ele.rowIndex = index
                    if (OrderObj[ele.groupId]) {
                    OrderObj[ele.groupId].push(index)
                    } else {
                    OrderObj[ele.groupId] = []
                    OrderObj[ele.groupId].push(index)
                    }
                })
                for (let k in OrderObj) {
                    if (OrderObj[k].length > 1) {
                    this.OrderIndexArr.push(OrderObj[k])
                    }
                }
            })
        },
        // 获取报名统计数据
        async countData(){
            if(!this.cid && !this.competitionId){
                return this.$message.warning('请选择竞赛')
            }
            let params = {
                competitionId:this.cid?this.cid:this.competitionId,
                selfGroupId:this.groupId
            }
            this.sourchloading = true
            await jxapi.getCompetitionGroupNum({data:params}).then((res)=>{
                if(res=='error') {
                    this.sourchloading = false
                    return this.$router.push('/details?id='+this.competitionId);
                }
                this.schoolNum=res.schoolNum
                this.groupNum=res.groupNum
                this.personNum=res.personNum
                this.list();
            });
        },
        // 合并行
        objectSpanMethod({ row, column, rowIndex, columnIndex }){
            if (columnIndex === 0||columnIndex === 1||columnIndex === 6||columnIndex === 7||columnIndex === 8||columnIndex === 9||columnIndex === 10||columnIndex === 11) {
            for (let i = 0; i < this.OrderIndexArr.length; i++) {
                let element = this.OrderIndexArr[i]
                for (let j = 0; j < element.length; j++) {
                let item = element[j]
                if (rowIndex == item) {
                    if (j == 0) {
                    return {
                        rowspan: element.length,
                        colspan: 1
                    }
                    } else if (j != 0) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                    }
                }
                }
            }
            }
        },
        // 鼠标划入，划出效果
        cellMouseEnter(row, column, cell, event) {
            this.rowIndex = row.rowIndex;
            this.hoverOrderArr = [];
            this.OrderIndexArr.forEach(element => {
                if (element.indexOf(this.rowIndex) >= 0) {
                    this.hoverOrderArr = element
                    this.isCell = true
                }
            })
        },

        cellMouseLeave(row, column, cell, event) {
            this.rowIndex = '-1'
            this.hoverOrderArr = [];
            this.isCell = false
        },
        setCellClass ({row, column, rowIndex, columnIndex}) {
            for(let i =0;i < this.hoverOrderArr.length;i++){
                if (row.rowIndex === this.hoverOrderArr[i]) {
                return 'cellClass'
                }
            }

        },
        async exportTable(){
            if(!this.authority.exportFinance) return this.$message.warning('请联系财物管理员进行操作');

            let params = {
                competitionId:this.cid?this.cid:this.competitionId,
                selfGroupId:this.groupId,
                groupName:this.groupName,
                schoolName:this.schoolName || null,
                onlinePayType:this.onlinepayValue,
                offlinePayType:this.offlineStatusValue,
                invoiceType:this.invoiceStatusValue,
                promotionStatus:this.promotionStatusValue,
            }
            if(this.dateValue.length>1){
                params.startPayTime = this.dateValue[0]
                params.endPayTime = this.dateValue[1]
            }

            this.downShow = true
            let downtable = await jxapi.exportTable({data:params,config:{responseType:'arraybuffer'}})
            this.downShow = false
            if(downtable=='error') return;
        },
        // 页码改变
        currentPage(e){
            this.pageCurrent=e;
            this.countData();
        },
        sourch(){
            this.pageCurrent = 1
            this.countData();
        },
        async checkOutline(data){
            let params = {
                groupId:data.groupId
            }
            let payDetail = await jxapi.queryOfflineStatus({data:params});
            if(payDetail=='error') return;
            if(!payDetail) return this.$message.warning('未上传支付凭证');
            this.payDetail = payDetail
            this.outlinepayshow = true;
        },
        async checkFile(data){
            this.invoShow=true
            this.invoGroupId=data.groupId
        },
        async resetpayStatus(row,index){
            // 0 支付重置  1 开票重置
            if(!this.authority.resetPayment&&!this.authority.resetPayment) return this.$message.warning('请联系财物管理员进行操作');
            let res = await jxapi.resetpayStatus({data:{
                groupId:row.groupId,
                type:index
            }})
            if(res=='error') return;
            this.countData();
        },
        async payrRefund(row){
            // 0 支付重置
            if(!this.authority.editRefund) return this.$message.warning('请联系财物管理员进行操作');
            let res = await jxapi.payrRefund({data:{
                groupId:row.groupId
            }})
            if(res=='error') return;
            this.countData();
        },
        async invoiceStatus(data,flag){
            if(!this.authority.confirmInvoice&&!this.authority.feedbackInvoice) return this.$message.warning('请联系财物管理员进行操作');
            // flag true已审核 false反馈
            if(!flag){
                this.$prompt('反馈将以短信的形式通知参赛队伍', '反馈', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    let res = await jxapi.auditGroupInvoice({data:{
                        groupId:data.groupId,
                        type:flag,
                        message:value
                    }});
                    if(res=='error') return;
                    this.countData();
                }).catch(() => {
                    this.$message.info('取消反馈');
                });
            }else{
                let res = await jxapi.auditGroupInvoice({data:{
                    groupId:data.groupId,
                    type:flag
                }});
                if(res=='error') return;
                this.countData();
            }
        },
        async outline(data,flag){
            if(!this.authority.feedbackPayment&&!this.authority.confirmPayment) return this.$message.warning('请联系财物管理员进行操作');
            // flag true已审核 false反馈
            if(!flag){
                this.$prompt('反馈将以短信的形式通知参赛队伍', '反馈', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    let res = await jxapi.auditGroupPay({data:{
                        groupId:data.groupId,
                        type:flag,
                        message:value
                    }});
                    if(res=='error') return;
                    this.countData();
                }).catch(() => {
                    this.$message.info('取消反馈');
                });
            }else{
                let res = await jxapi.auditGroupPay({data:{
                    groupId:data.groupId,
                    type:flag
                }});
                if(res=='error') return;
                this.countData();
            }

        },
        close(){
            this.invoShow = false
            this.outlinepayshow = false
        }
    },
    computed:{
        ...mapState({
        authority:state => state.authorityManagement,
        })

    },
    filters:{
        date(val){
        return moment(val).format('YYYY.MM.DD')
        }
    }
};
</script>

<style lang='less' scoped>
.check{
    text-align:center;
    color:#409eff;
    cursor: pointer;
}
.numColor{
  color:#469CFF;
}
.roles-wrapper {
//   padding:15px 30px;
  .header_fixed {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    background: #fdf6d0;
    position: sticky;
    top: 0px;
    z-index: 5;
    text-align: start;
    .header_content {
      width: 1040px;
      // margin: auto;
      display: flex;
      justify-content: space-between;
      a {
        color: #4a4a4a;
        font-size: 14px;
        margin-top: 4px;
        margin-left: 20px;
      }
      .iconfont-green {
        color: #52c41a;
      }
      .iconfont-green + span {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
}
.detail{
    position: relative;
    .detailMain{
        border-radius: 4px 0 4px 4px;
        padding: 20px 20px 0;
        .minDetail{
            display: inline-block;
            margin-right: 27px;
            margin-bottom: 20px;
            float: left;
        }
    }

    .detailMain.hidden{
        display: none;
    }
}
.countData{
    float: right;
}
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }
  .el-container {
    background: #fff;

    .el-main {
      background: #fff;

      .search-wrapper {
        overflow: hidden;

        .input-with-select {
          width: 400px;
          float: left;
        }

        .search-btn {
          float: right;
        }
      }

      .table-wrapper {
        width: 100%;
        margin-top: 20px;
      }
    }

    .el-footer {
      text-align: right;
    }
  }

  .dialog1 {
    .access_form_item {
      .access_change {
        display: inline-block;
        vertical-align: middle;
      }

      .access_item {
        display: inline-block;
        vertical-align: middle;
        width: 200px;
        border: 1px solid #EBEEF5;
        border-radius: 3px;
        padding: 10px;

        .show_checkbox {
          height: 100px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background-color: #f5f5f5;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background-color: #dbdbdb;
          }

          .el-checkbox {
            width: 100%;
            margin: 0;
          }
        }
      }
    }
  }
}
.btnAuth{
    width: 50px;
    display: inline-block;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
}
.feedbackDiaog{
  margin-bottom: 10px;
  display: inline-block;
  text-align: left;
  width: 100%;
}
.resultImport{
  margin: 30px 0 10px 0;
  h3{
    margin: 10px 0;
  }
  list{
    line-height: 24px;
  }
}
</style>
<style lang="less">
.searchName{
    width: 234px;
    margin-right: 27px;
    margin-bottom: 20px;
    float: left;
}
.sendMes .top .el-checkbox{
    margin-right: 15px;
}
</style>
