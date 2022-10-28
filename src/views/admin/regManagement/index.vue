<template>
  <div class="roles-wrapper">
    <invoice-detail :groupId="invoGroupId" v-if="invoShow" :close="close" />
    <el-container>
      <el-main>
        <div class="search-wrapper">
          <el-form ref="form" :model="form">
            <el-row style="padding:10px 0;text-align:left;"></el-row>
            <el-row :gutter="15" justify="center">
              <el-col :span="4">
                <el-cascader @change="competitionsChange" :props="compets"></el-cascader>
              </el-col>
              <el-col :span="4">
                <el-form-item label>
                  <el-input v-model="form.name" placeholder="搜索关键字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label>
                  <el-date-picker
                    type="date"
                    placeholder="更新起始时间"
                    v-model="form.startTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label>
                  <el-date-picker
                    type="date"
                    placeholder="更新截止时间"
                    v-model="form.endTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4" :pull="1">
                <el-form-item label>
                  <el-button type="primary" justify="start" size="mini" @click="sourch">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item style="text-align:left;" label>
                  <!-- 导出报名表 -->
                  <expertExcel size='mini' :beforeExpert='beforeExpert' :params="exportData" url='web/report/export' />
                  <el-button type="primary" size="mini" @click="importTable">导入报名表</el-button>
                  <el-button type="primary" size="mini" @click="importSelect">查询导入</el-button>
                  <!-- 20210602 删掉两个不常用的按钮 -->
                  <!-- <el-button type="primary" :disabled="!authority.preEnrole" size="mini" @click="downloadpre(4)">导出预报名</el-button>
                  <el-button type="primary" size="mini" @click="downloadpre(3)">导出培训报名</el-button> -->
                  <el-button type="primary" :disabled="!authority.manageShortMessage" size="mini" @click="toSend">消息发送</el-button>

                  <selectExpert v-if="authority.selectExpert"/>

                  <!-- 上传报名表 不能上传时不显示，接口控制 -->
                  <importForm :competitionId='competitionId' v-if="competitionId && authority.uploadSignUpFile"/>
                  <!-- 下载报名表 -->
                  <downloadForm :competitionId='competitionId' v-if="!authority.selectExpert && authority.manageRegistration"/>

                  <el-button type="primary" size="mini" @click="expertWorkPool" v-if="authority.expertPool">导出作品汇总表</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <p style="text-align:left;">
            <span>
              学校
              <span class="numColor">{{schoolNum}}</span>所
            </span>
            <span v-if="academyNum!=null">
              / 学院
              <span class="numColor">{{academyNum}}</span>个
            </span>
            <span>
              / 团队
              <span class="numColor">{{groupNum}}</span>组
            </span>
            <span>
              / 人数
              <span class="numColor">{{personNum}}</span>名
            </span>
          </p>
        </div>
        <div class="table-wrapper">
          <el-table
            :header-cell-style="{background:'#f3f3f3'}"
            v-loading="loading"
            @expand-change="serachGroupInfo"
            :data="tableData"
            style="max-width:1611px;"
            border
          >
            <template slot="empty">
              <p v-if="loading">数据加载中......</p>
            </template>

            <el-table-column type="expand" key="expand" prop="expand" label="详情" width="80">
              <template slot-scope="scope">
                <el-form label-position="left" label-width="120px" class="demo-table-expand">
                  <el-form-item label="团队信息">
                    <el-table
                      border
                      :data="groupDetails[scope.row.groupId]"
                      :header-cell-style="{background:'#f3f3f3'}"
                    >
                      <el-table-column prop="userName" label="姓名" min-width="100"></el-table-column>
                      <el-table-column prop="roleName" label="身份" min-width="80"></el-table-column>
                      <el-table-column prop="contactPhone" label="手机号" min-width="140"></el-table-column>
                      <el-table-column prop="email" label="邮箱" min-width="140"></el-table-column>
                      <el-table-column prop="stuNum" label="学号/工号" width="190" v-if="isSchoolCom">
                        <template slot-scope="{row}">
                          {{row.stuNum||row.teacherId}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="academy" label="学院" width="190" v-if="isSchoolCom"></el-table-column>
                      <el-table-column prop="schoolName" label="学校" v-else min-width="190"></el-table-column>
                      <el-table-column prop="full" label="信息状态" min-width="140"></el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item label="更新时间">
                    <span>{{ scope.row.updateTime }}</span>
                  </el-form-item>
                  <el-form-item label="发票信息" v-if="!isSchoolCom">
                    <div>
                      <el-button
                        v-if="scope.row.invoice"
                        :data="scope.row"
                        type="button"
                        size="mini"
                        @click="checkFile(scope.row)"
                      >查看</el-button>
                      <span v-else>未上传支付凭证</span>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column prop="groupName" key="groupName" label="团队名" min-width="120"></el-table-column>

            <el-table-column
              v-if="isApplyFile"
              prop="poolStatus"
              rowspan
              label="补交材料状态"
              min-width="150"
              align="center"
            >
              <template slot="header">
                <el-select
                  v-model="poolStatus"
                  @change="statusChang"
                  size="medium"
                  placeholder="补交材料状态"
                >
                  <el-option
                    v-for="item in poolStatusList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                <div>
                  <a
                    style="color:#409EFF;display:block;"
                    v-for="(item,index) in scope.row.authInfoFiles"
                    :key="index"
                    :href="item.url"
                    target="_Blank"
                  >{{item.name}}</a>
                </div>
                <el-alert
                  :closable="false"
                  v-if="scope.row.ban==1"
                  title="已禁赛"
                  type="error"
                  show-icon
                ></el-alert>
                <el-alert
                  :closable="false"
                  v-else-if="scope.row.poolStatus===0"
                  title="未提交"
                  type="info"
                  show-icon
                ></el-alert>
                <div v-else-if="scope.row.poolStatus===7">
                  <div class="btnAuth">
                    <el-button
                      :data="scope.row"
                      type="primary"
                      size="mini"
                      @click="pass(scope.row,'8')"
                    >通过</el-button>
                  </div>
                  <div class="btnAuth">
                    <el-button
                      :data="scope.row"
                      type="ghost"
                      size="mini"
                      @click="feedBack(scope.row)"
                    >反馈</el-button>
                  </div>
                </div>
                <el-alert
                  :closable="false"
                  v-else-if="scope.row.poolStatus===8"
                  title="已通过"
                  type="success"
                  show-icon
                ></el-alert>
                <el-alert :closable="false" v-else title="已反馈" type="warning" show-icon></el-alert>
                <!-- 添加撤回按钮 -->
                <el-button
                  type="primary"
                  v-if="scope.row.poolStatus===8||scope.row.poolStatus===10"
                  size="mini"
                  @click="pass(scope.row,'7')"
                >撤回</el-button>
                <!-- </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="matchItem" key="matchItem" label="赛项" min-width="200">
              <template slot="header">
                <el-select v-model="value" @change="change" size="medium" placeholder="赛项">
                  <el-option
                    v-for="item in matchItemData"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="teamStatus" key="teamStatus" label="团队状态" min-width="220">
              <template slot-scope="scope">
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-if="scope.row.teamStatus==0"
                  title="报名未完成-队员信息未完善"
                  type="info"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==1"
                  title="报名未完成-认证表未提交"
                  type="info"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==2"
                  title="报名未完成-认证表审核中"
                  type="warning"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==3"
                  title="报名未完成-认证表审核失败"
                  type="error"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==4"
                  title="报名成功"
                  type="success"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==5"
                  title="报名未完成-团队被禁赛"
                  type="error"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==6"
                  title="报名未完成-团队审核中"
                  type="error"
                  show-icon
                ></el-alert>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="scope.row.teamStatus==7"
                  title="报名未完成-团队审核失败"
                  type="error"
                  show-icon
                ></el-alert>
              </template>
            </el-table-column>

            <el-table-column prop="poolCheckStatus" key="poolCheckStatus" v-if="isPoolCheck" label="作品状态" min-width="105">
              <template slot="header">
                <el-select
                  v-model="poolCheckStatus"
                  @change="poolCheckStatusChange"
                  size="medium"
                  placeholder="作品状态"
                >
                  <el-option
                    v-for="item in poolCheckStatusList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
              <template slot-scope="scope">
                <!--  poolCheckStatus//null 未提交 0 审核中 1 审核通过 2 已反馈  3 晋级  4 淘汰  5 违规 -->
                <span
                  style="color:#409EFF;cursor: pointer;"
                  @click="showWorks(scope.row)"
                >{{scope.row.resourceName}}</span>
                <div>
                  <div v-if="scope.row.poolCheckStatus==0">
                    <el-button type="primary" size="mini" @click="passWork(scope.row.groupId,1)">通过</el-button>
                    <el-button type="ghost" size="mini" @click="reWork(scope.row)">驳回</el-button>
                  </div>
                  <el-alert
                    v-if="scope.row.poolCheckStatus==1"
                    :closable="false"
                    title="审核通过"
                    type="success"
                    show-icon
                  ></el-alert>
                  <el-alert
                    v-if="scope.row.poolCheckStatus==3"
                    :closable="false"
                    title="作品已晋级"
                    type="success"
                    show-icon
                  ></el-alert>
                  <el-alert
                    v-if="scope.row.poolCheckStatus==4"
                    :closable="false"
                    title="作品已淘汰"
                    type="error"
                    show-icon
                  ></el-alert>
                  <!-- 2021-5-17 针对工商报名管理员不能看到违规状态的处理 -->
                  <el-alert
                    v-if="scope.row.poolCheckStatus==5 && !authority.selectExpert"
                    :closable="false"
                    title="作品违规"
                    type="error"
                    show-icon
                  ></el-alert>
                  <el-alert
                    v-if="scope.row.poolCheckStatus==2"
                    :closable="false"
                    :title="scope.row.poolBack"
                    type="error"
                    show-icon
                  ></el-alert>
                  <el-alert v-if="scope.row.poolCheckStatus==-1" :closable="false" title="未提交作品" type="info" show-icon></el-alert>
                  <!-- 撤回 -->
                  <el-button
                    type="primary"
                    v-if="scope.row.poolCheckStatus==1||scope.row.poolCheckStatus==2"
                    size="mini"
                    @click="passWork(scope.row.groupId,0)"
                  >撤回</el-button>
                </div>

                <!-- <span>{{scope.row | resourceType }}</span> -->
                <!-- <span v-if="scope.row.poolCheckStatus==1">已通过</span>
                <span v-if="scope.row.poolCheckStatus==2">已驳回，原因：{{scope.row.poolBack}}</span>-->
              </template>
            </el-table-column>

            <el-table-column v-if="!isSchoolCom" prop="url" key="url" label="推荐批注" width="120">
              <template slot="header">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="竞赛排名（获奖情况）（例：1（**等奖））"
                  placement="top-start"
                >
                  <span>
                    推荐批注
                    <i class="el-icon-warning"></i>
                  </span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <p>{{scope.row.opinion||'-'}}</p>
                <div class="btnAuth">
                  <el-popover
                    @show="opinionONShow(scope.row)"
                    placement="top"
                    width="230"
                    v-model="scope.row.opinionEditVisible"
                  >
                    <el-input
                      @focus="onOpinionChange"
                      :value="opinion"
                      @input="opinionChanged"
                      placeholder="竞赛排名--获奖情况"
                    ></el-input>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="opinionClose(scope.row)">取消</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="opinionOk(scope.row,scope.$index)"
                      >确定</el-button>
                    </div>
                  </el-popover>

                  <el-button
                    :disabled="!authority.teamOpinion"
                    type="button"
                    size="mini"
                    @click="opinionEditShow(scope.row)"
                  >批注</el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="url" key="url1" label="操作" width="150">
              <template slot-scope="scope">
                <div class="btnAuth">
                  <el-button
                    :data="scope.row"
                    type="button"
                    size="mini"
                    @click="deleteTeam(scope.row)"
                  >删除团队</el-button>
                </div>
                <emailSender class="btnAuth" v-if="scope.row.poolId" :pool="scope.row"/>
                <div class="btnAuth" v-if="!autoPass&&scope.row.teamStatus!=4">
                  <el-button
                    :disabled="scope.row.teamStatus!=6"
                    :data="scope.row"
                    type="button"
                    size="mini"
                    @click="passed(scope.row, 1)"
                  >通过</el-button>
                </div>
                <div class="btnAuth" v-if="scope.row.teamStatus==4">
                  <el-button type="button" size="mini" @click="passed(scope.row, 0)">撤回</el-button>
                </div>
                <div class="btnAuth" v-if="isSchoolCom">
                  <el-button
                    :data="scope.row"
                    type="button"
                    size="mini"
                    @click="banned(scope.row)"
                  >{{scope.row.ban ? '解禁':'禁赛'}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer style=" margin: 0 auto;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          :page-size="pageData.pagesize"
          :page-sizes="pageData.arrPageSize"
          layout="sizes,total, prev, pager, next"
          :current-page.sync="pageData.pageCurrent"
          :total="pageData.totalCount"
          @current-change="currentPage"
        ></el-pagination>
      </el-footer>
    </el-container>

    <!-- 补交材料反馈 -->
    <el-dialog
      title="反馈"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="30%"
    >
      <span class="feedbackDiaog">反馈将以短信的形式通知参赛队伍</span>
      <el-input v-model="feedbackMessage" placeholder="请输入反馈内容"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sureFeedback">提交</el-button>
      </span>
    </el-dialog>

    <!-- 作品驳回弹窗 -->
    <el-dialog
      title="驳回"
      :visible.sync="showWorkSet"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="30%"
    >
      <span class="feedbackDiaog">驳回将以短信的形式通知参赛队伍</span>
      <el-input v-model="content" placeholder="请输入反馈内容"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showWorkSet = false">取消</el-button>
        <el-button type="primary" @click="passWork(invoGroupId, 2, content)">提交</el-button>
      </span>
    </el-dialog>

    <!-- 作品展示弹窗 -->
    <el-dialog
      title="作品展示"
      :visible.sync="showDiaWorkId"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="1200px"
    >
      <showWork v-if="showDiaWorkId" :diaWorkId="diaWorkId" :diaCid="diaCid" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDiaWorkId=false">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="报名表导入结果"
      :visible.sync="bImportResult"
      :show-close="false"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding-top:50px;"
      center
    >
      <p style="display:inline-block;">请选择赛项：</p>
      <el-select v-model="value1" width="100%" @change="changeImportList" placeholder="赛项">
        <el-option
          v-for="item in matchItemData"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        ></el-option>
      </el-select>

      <el-table 
        class="resultImport" 
        :data="resultList.list" 
        border style="width: 100%" 
        :row-key="getRowKeys"
        :expand-row-keys='expands'>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-if="scope.row.status!=0">
              <h3>导入结果列表：</h3>
              <div class="list" v-for="list in scope.row.failGroupsList" :key="list">{{list}}</div>
            </div>
            <div v-else>导入中</div>
          </template>
        </el-table-column>
        <el-table-column prop="excelName" label="文件名"></el-table-column>
        <el-table-column prop="createTime" label="导入日期">
          <template slot-scope="scope">{{ scope.row.createTime | date }}</template>
        </el-table-column>
        <el-table-column prop="status" label="导入状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0">导入中</div>
            <div v-else>导入成功</div>
          </template>
        </el-table-column>
        <el-table-column prop="successNum" label="成功条数"></el-table-column>
        <el-table-column prop="failNum" label="失败条数"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="bImportResultClose">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGroupId, getCompetitionId, getUserInfo } from "@@/utils/commons";
import jxapi from "@/api/jxapi/index";
import emailSender from './mailSender'
import invoiceDetail from "@@/components/invoice/common/detail";
import showWork from "@@/views/details/worksDetails";
import moment from "moment";
import { mapMutations, mapState, mapActions } from "vuex";
import expertExcel from '@@/components/expertExcel'
import selectExpert from './selectExpert'
import importForm from "./importForm";
import downloadForm from "./downloadForm";

export default {
  name: "regManagement",
  components: {
    invoiceDetail,
    showWork,
    emailSender,
    expertExcel,
    selectExpert,
    importForm,
    downloadForm,

  },
  data() {
    return {
      showDiaWorkId: false,
      opinion: "",
      isEditedOpinion: false,
      diaWorkId: "",
      diaCid: "",
      content: "",
      opinionEditVisible: false, //编辑批注
      showWorkSet: false,
      invoGroupId: "", //团队GroupId
      invoShow: false, //发票展示
      loading: false,
      isSchoolCom: false,
      groupDetails: {}, //团队信息
      matchItemData: [],
      value: "",
      groupId: "", //登录用户信息
      competitionId: "", //登录用户信息
      select: "",
      feedbackMessage: "", //反馈内容
      dialogVisible: false,
      tableData: [],
      form: {
        name: "",
        startTime: "",
        endTime: "",
      },
      // 分页
      pageData: {
        //分页数
        arrPageSize: [10, 20, 30, 40],
        //分页大小
        pagesize: 10,
        //总分页数
        pageCount: 1,
        //当前页面
        pageCurrent: 1,
        //总数
        totalCount: 10,
      },

      poolCheckStatus: "",
      poolCheckStatusList: [
        {
          text: "作品状态",
          value: '',
        },
        {
          text: "未提交",
          value: null,
        },
        {
          text: "审核中",
          value: 0,
        },
        {
          text: "审核通过",
          value: 1,
        },
        {
          text: "已反馈",
          value: 2,
        },
        {
          text: "已晋级",
          value: 3,
        },
        {
          text: "已淘汰",
          value: 4,
        },
        {
          text: "违规",
          value: 5,
        }
      ],
      poolStatus: "",
      poolStatusList: [
        {
          text: "材料状态",
          value: "",
        },
        {
          text: "未提交",
          value: 0,
        },
        {
          text: "审核中",
          value: 7,
        },
        {
          text: "已通过",
          value: 8,
        },
        {
          text: "已反馈",
          value: 10,
        },
      ],

      autoPass: true,
      isApplyFile: 0,
      isPoolCheck: 1, //0 不需要审核  1 需要审核

      schoolNum: 0, //学校统计
      academyNum: null, //学院统计
      groupNum: 0, //团队统计
      personNum: 0, //人数统计
      bImportResult: false,
      resultList: {},
      value1: "",
      cid: "",
      user: {},
      competitions: [],
      competitionsStatu: "",
      compets: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level, value, parent } = node;
          switch (level) {
            case 0:
              let groups = await jxapi.queryDowmGroup();
              resolve(
                groups.map((item) => ({
                  value: item.id,
                  label: item.groupName,
                  leaf: false,
                }))
              );
              //查询下级组织/usercenter/group/queryDowmGroup?groupId=13198
              break;
            case 1:
              let years = await jxapi.queryCompetitionYears({
                data: { groupId: value },
              });
              if (typeof years != "object")
                resolve([{ value: years, label: years, leaf: false }]);
              else
                resolve(
                  years.map((item) => ({
                    value: item,
                    label: item,
                    leaf: false,
                  }))
                );
              break;
            case 2:
              let compets = await jxapi.queryCompetitionByGroupId({
                data: { competitionYear: value, groupId: parent.value },
              });
              resolve(
                compets.map((item) => ({
                  value: item.id,
                  label: item.competitionName,
                  leaf: true,
                }))
              );
              break;
            //根据选取的组织id和年份查询主竞赛
          }
        },
      },
      exportData:{}, //导出数据
      expands: [], //默认展开第一个
      // 获取row的key值
      getRowKeys(row) {
          return row.id;
      },
    };
  },
  created(){
    if(!this.authority.manageRegistration){
        this.$message.error('无权限访问该页面')
        location.href = location.origin;
    }
  },
 async mounted() {
    this.groupId = getGroupId();
    this.user = getUserInfo();
    let groups = await jxapi.queryDowmGroup();
    if(groups == 'error' || !groups) return
    let years = await jxapi.queryCompetitionYears({
                data: { groupId: groups[0].id },
              });
     if(years == 'error' || !years) return
    let compets = await jxapi.queryCompetitionByGroupId({
                data: { competitionYear: years[years.length-1], groupId: groups[0].id },
              });
    if(compets == 'error' || !compets) return
    this.competitionsChange([compets[0].id])

  },
  methods: {
    //导出作品汇总表
    expertWorkPool(){
      jxapi.expertWorkPool({data:{
        competitionId:this.competitionId
      },config: {
                responseType: "arraybuffer",
            }})
    },
    async serachGroupInfo({ competitionId, groupId }) {
      if (this.groupDetails[groupId]) return;
      let info = await jxapi.usercenterGroupInfo({
        data: {
          competitionId,
          groupId,
        },
      });
      if (info == "error") return;
      //判断是否完善了信息 只用国籍判断
      info = info.map((item) => {
        item.full = item.complete==1? "已完善" : "未完善";
        return item;
      });
      this.$set(this.groupDetails, groupId, info);
    },
    opinionClose(row) {
      this.opinion = "";
      row.opinionEditVisible = false;
    },
    opinionChanged(v) {
      this.opinion = v;
    },
    async opinionEditShow(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        let _r = this.tableData[i];
        if (_r.groupId != row.groupId && _r.opinionEditVisible) {
          if (this.isEditedOpinion) {
            await this.$confirm(
              `团队：${_r.groupName},有批注未保存，是否需要保持？`,
              "提示",
              {
                confirmButtonText: "保存",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(async () => {
                await this.opinionOk(_r);
                //row.opinionEditVisible = true;
              })
              .catch(() => {
                this.opinionClose(_r);
                //row.opinionEditVisible = true;
              });
          } else {
            this.opinionClose(_r);
          }
        }
      }
      row.opinionEditVisible = true;
    },
    onOpinionChange() {
      this.isEditedOpinion = true;
    },
    opinionONShow(row) {
      this.opinion = row.opinion || this.opinion;
      this.isEditedOpinion = false;
    },
    async opinionOk(row, index) {
      let opinion = await jxapi.setTeamOpinion({
        data: {
          teamId: row.groupId,
          opinion: this.opinion || "",
        },
      });
      if (opinion == "error") return;
      row.opinionEditVisible = false;
      row.opinion = this.opinion;
      this.opinion = "";
    },
    showWorks(row) {
      if (row.poolId && row.competitionId) {
        this.diaCid = row.competitionId;
        this.diaWorkId = row.poolId;
        this.showDiaWorkId = true;
      }
    },
    // 2020-6-9
    // 消息发送时必须要将id传过去
    toSend() {
      if (!this.competitionId) return this.$message.warning("请选择竞赛");
      this.$router.push("/sendMessage?id=" + this.competitionId);
    },
    init() {
      this.countData();
      // this.getOrderNumber();
      this.getCompetitionChildList();
      this.$store.dispatch("setAuthorityByCode", {
        cId: this.competitionId,
      });
    },
    competitionsChange(val) {
      if (typeof val == "object") val = val[val.length - 1];
      this.pageData.pageCurrent = 1;
      this.competitionId = val;
      this.init();
    },
    bImportResultClose() {
      this.bImportResult = false;
      this.value1 = "";
      this.resultList = {};
    },
    async downloadpre(type) {
      if (!this.competitionId) {
        return this.$message.warning("请选择竞赛");
      }
      if (this.competitionId == "405" && type == 4) {
        type = 1;
      }
      let params = {
        competitionId: this.competitionId,
        type: type,
      };
      let result = await jxapi.downloadLogin({
        data: params,
        config: {
          responseType: "arraybuffer",
        },
      });
      if (result == "error") return;
    },
    async changeImportList(e) {
      let result = await jxapi.getImportResultList({
        data: { competitionId: e, pageNum: 1, pageSize: 0 },
      });
      if (result == "error") return;
      this.resultList = result;
      
      // 查询导入--默认展开第一项
      this.expands = []
      if(this.resultList && this.resultList.list && this.resultList.list[0] && this.resultList.list[0].id){
        this.expands.push(this.resultList.list[0].id)
      }

    },
    change(e) {
      this.cid = e;
      this.countData();
    },
    getCompetitionChildList() {
      jxapi
        .getCompetitionChildList({
          data: { competitionId: this.competitionId },
        })
        .then((res) => {
          if (res == "error") return this.$message.error("获取竞赛列表失败");
          let data = [];
          for (let i = 0; i < res.childs.length; i++) {
            data.push({
              value: res.childs[i].name,
              label: res.childs[i].name,
              key: res.childs[i].id,
            });
          }
          data.push({
            value: "全部",
            label: "全部",
            key: this.competitionId,
          });
          this.matchItemData = data;
        });
    },
    back() {
      return { path: "/details", query: { id: this.competitionId } };
    },
    // 获取报名列表 2020-8-18 展示样式修改
    async list() {
      this.loading = true;
      let params = {
        pageNum: this.pageData.pageCurrent,
        pageSize: this.pageData.pagesize,
        competitionId: this.cid ? this.cid : this.competitionId,
        selfGroupId: this.groupId,
        poolStatus: this.poolStatus, //status===0?0:status?status:''
      };
      if(this.poolCheckStatus || this.poolCheckStatus===0){
        // -1 未提交 0 审核中 1 审核通过 2 已反馈  3 晋级  4 淘汰  5 违规 ''全部
        params.poolCheckStatus = this.poolCheckStatus
      }else if(this.poolCheckStatus===null){
        params.poolCheckStatus = -1
      }
      if (this.form.name) {
        params.groupName = this.form.name;
      }
      if (this.form.startTime) {
        params.startTime = moment(this.form.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (this.form.endTime) {
        params.endTime = moment(this.form.endTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      this.tableData = [];
      await jxapi.applyList({ data: params }).then((res) => {
        let spare = res.spare || {};
        this.pageData.totalCount = res.total; //总条数
        this.loading = false;

        

        this.isSchoolCom = res && res.spare && res.spare.isSchoolCom// || false;
        this.autoPass = res && res.spare && res.spare.autoPass //|| true;
        this.isApplyFile = res && res.spare && res.spare.isApplyFile// || 0;
        this.isPoolCheck = res && res.spare && res.spare.isPoolCheck// || 0
        
        if (!res.list)  return;
        // 获取队长信息
        let arr = res.list;
        for (let i in arr) {
          if (arr[i].userList && arr[i].userList.length > 0) {
            arr[i].userName = arr[i].userList[0].userName;
            arr[i].roleName = arr[i].userList[0].roleName;
            arr[i].contactPhone = arr[i].userList[0].contactPhone;
          }
        }
        this.tableData = arr;
      });
    },
    // 获取报名统计数据
    async countData() {
      if (!this.competitionId) {
        return this.$message.warning("请选择竞赛");
      }
      let params = {
        competitionId: this.cid ? this.cid : this.competitionId,
        selfGroupId: this.groupId,
      };
      if (this.form.name) {
        params.groupName = this.form.name;
      }
      if (this.form.startTime) {
        params.startTime = moment(this.form.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (this.form.endTime) {
        params.endTime = moment(this.form.endTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      await jxapi.getCompetitionGroupNum({ data: params }).then((res) => {
        if (res == "error") return (this.loading = false);
        this.schoolNum = res.schoolNum;
        this.groupNum = res.groupNum;
        this.personNum = res.personNum;
        this.academyNum = res.academyNum;
        this.list();
      });
    },
    // 导出报名列表 条件判断
    beforeExpert(){
      if (!this.competitionId) {
        this.$message.warning("请选择竞赛");
        return true
      }
    },
    // 页码改变
    currentPage(e) {
      this.pageData.pageCurrent = e;
      this.countData();
    },
    handleSizeChange(val) {
      this.pageData.pageCurrent = 1;
      this.pageData.pagesize = val;
      this.countData();
    },
    sourch() {
      this.pageData.pageCurrent = 1;
      this.countData();
    },
    importSelect() {
      if (!this.competitionId) {
        return this.$message.warning("请选择竞赛");
      }
      this.bImportResult = true;
    },
    async importTable() {
      if (!this.competitionId) {
        return this.$message.warning("请选择竞赛");
      }
      // 210709调用查询导入接口，只要竞赛（包含赛项）中有导入中，就不让继续导入
      let res = await jxapi.getImportResultList({
        data: { competitionId: this.competitionId, pageNum: 1, pageSize: 0 },
      });
      if (res == "error") return;
      // if(res && res.list && res.list.length){
      //   for(let i in res.list){
      //     if(res.list[i].status==0){
            // return this.$message.warning('数据导入中，请点击 查询导入 查看详情！')
      //     }
      //   }
      // }
      this.$router.push(
        "/regManagement/importRegister?competitionId=" + this.competitionId
      );
    },
    checkFile(data) {
      // if(data.invoice.invoiceKind===2){
      this.invoShow = true;
      this.invoGroupId = data.groupId;
      // }else if(data.invoice.invoiceKind===1){
      //    window.open(data.invoice.imgUrl, "_blank");
      // }
    },
    close() {
      this.invoShow = false;
    },
    pass(data, flag) {
      if (data.poolStatus === "已通过") {
        return this.$message.info("团队状态未在审核中");
      }
      if (data.poolStatus === "已反馈") {
        return this.$message.info("团队状态未在审核中");
      }
      let params = {
        groupId: data.groupId,
        status: flag || "8",
      };
      jxapi.changeGroupPoolStatus({ data: params }).then((res) => {
        this.list();
        if (res != "error") return this.$message.success("操作成功");
      });
    },
    banned(data) {
      this.$confirm("操作后不可修改，请确认是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          teamId: data.groupId,
          ban: data.ban == 0 ? 1 : 0,
        };
        jxapi.bannedGroup({ data: params }).then((res) => {
          this.list();
          if (res != "error")
            return this.$message.success("禁赛状态修改成功！");
        });
      });
    },
    passed(data, index) {
      this.$confirm("操作后不可修改，请确认是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            teamId: data.groupId,
            pass: index,
          };
          jxapi.passedGroup({ data: params }).then((res) => {
            this.list();
            if (res != "error") return this.$message.success("操作成功！");
          });
        })
        .catch((err) => {});
    },
    deleteTeam(data) {
      this.$confirm("此操作将删除该团队, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let del = await jxapi.delGroup({
            data: { groupId: data.groupId, competitionId: this.competitionId },
          });
          if (del == "error") return;
          this.$message.success("删除成功");
          this.list();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    feedBack(data) {
      this.dialogVisible = true;
      this.invoGroupId = data.groupId;
    },
    sureFeedback() {
      let params = {
        groupId: this.invoGroupId,
        content: this.feedbackMessage,
        status: "10",
      };
      jxapi.changeGroupPoolStatus({ data: params }).then((res) => {
        this.dialogVisible = false;
        this.list();
        if (res != "error") return this.$message.success("已反馈");
      });
    },
    poolCheckStatusChange(value) {
      this.pageData.pageCurrent = 1;
      this.poolCheckStatus = value;
      this.list();
    },
    statusChang(value, row, column) {
      this.pageData.pageCurrent = 1;
      this.list();
      //0未提交  7审核中   8 已通过 10已反馈
      this.poolStatus = value; //===0?'未提交':value===7?'审核中':value===8?'已通过':value===10?'已反馈':"补交报名状态"
    },
    reWork(row) {
      this.invoGroupId = row.groupId;
      this.showWorkSet = true;
    },
    async passWork(groupId, type, content) {
      this.showWorkSet = false;
      let obj = {
        groupId: groupId,
        status: type, //1通过，2驳回
        content: content || null,
      };
      let res = await jxapi.poolCheck({ data: obj });
      this.list();
    },
  },
  computed: {
    ...mapState({
      authority: (state) => state.authorityManagement,
    }),
  },
  filters: {
    date(val) {
      return moment(val).format("YYYY.MM.DD");
    },
    // resourceType(row) {
    //   switch (row.poolCheckStatus) {
    //     case 1:
    //       return "已通过";
    //       break;
    //     case 2:
    //       return `已驳回，原因：${row.poolBack}`;
    //       break;
    //     default:
    //       return null;
    //   }
    // },
  },
  watch:{
    competitionId:{
      immediate: true,
      handler(val){
        this.exportData = {
          competitionId: val,
          selfGroupId: this.groupId,
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.el-table_1_column_1 .el-table__expand-icon {
  font-weight: bold;
  font-size: 20px;
  height: 40px;
}
.numColor {
  color: #469cff;
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
}
.btnAuth {
  text-align: center;
  margin-top: 10px;
}
.feedbackDiaog {
  margin-bottom: 10px;
  display: inline-block;
  text-align: left;
  width: 100%;
}
.resultImport {
  margin: 30px 0 10px 0;
  h3 {
    margin: 10px 0;
  }
  list {
    line-height: 24px;
  }
}
</style>
