<template>
  <div class="scheduleSet">
    <span class="operateButton" :class="{'disabled': disabled}" @click="init">日程设置</span>

    <el-dialog
      title="日程设置"
      :modal-append-to-body="false"
      :append-to-body='true'
      :close-on-click-modal= false
      :visible.sync="schedule"
      width="850px"
      height="1849px"
      style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
      >
      <el-form :model="rctime" ref="rctime" label-width="0" class="demo-ruleForm">
        <div class="el-competition" v-for="(timeRc, m) in rctime.comList" :key="m">
          <div>
            <div class="star_time">
              <div class="el-competition-name">
                <span>
                  赛段名称
                  <el-tooltip content="赛段结束时间必填。赛段内各自结束时间可不填，进入下一个开始时间段时系统将默认结束上个内容">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <el-form-item
                  :prop="'comList.' + m +'.name'"
                  :rules="{ required: true, message: '请输入名称', trigger: 'blur' }"
                >
                  <el-input
                    type="text"
                    v-model="timeRc.name"
                    size="small"
                    placeholder="如:报名开始、初赛"
                    class="el-input-rctime"
                    @blur="changeName(m)"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="el-competition-err">
                <el-form-item
                  :prop="'comList.' + m +'.startTime'"
                  :rules="{ required: true, message: '请选择时间', trigger: 'blur' }"
                >
                  <el-date-picker
                    size="small"
                    v-model="timeRc.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间"
                    class="el-input-rctime"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="el-competition-err">
                <el-form-item
                  :prop="'comList.' + m +'.endTime'"
                  :rules="{ required: true, message: '请选择时间', trigger: 'blur' }"
                >
                  <el-date-picker
                    size="small"
                    v-model="timeRc.endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="结束时间"
                    class="el-input-rctime"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <i class="iconfont" @click="delTime(m,timeRc)">&#xe61e;</i>
              </div>
              <hr class="el-xian" />
            </div>
            <div v-for="(rcsign,n) in timeRc.signUp" :key="n">
              <div v-if="n == 0" class="star_time">
                <div style="margin-top:20px;margin-left:11px;" class="el-err-com">
                  <el-checkbox :checked="rcsign.isNeed">报名</el-checkbox>
                  <el-form-item
                    :prop="'comList.' + m + '.signUp.' + n + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcsign.name"
                      :placeholder="timeRc.name + '-报名'"
                      size="small"
                      class="el-input-rctime el-left"
                      @change="val=>$set(rcsign,'name',val)"
                    ></el-input>
                  </el-form-item>
                </div>
                <template v-if="rcsign.isNeed">
                  <div class="el-competition-err">
                    <el-form-item
                      :prop="'comList.' + m + '.signUp.' + n + '.startTime'"
                      :rules="{ required: false, message: '请选择时间', trigger: 'blur' }"
                    >
                      <el-date-picker
                        size="small"
                        v-model="rcsign.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcsign.startTime,m,n,1)"
                        @change="val=>$set(rcsign,'startTime',val)"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </template>
                <template v-else>
                  <div class="el-competition-err">
                    <el-form-item>
                      <el-date-picker
                        size="small"
                        v-model="rcsign.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcsign.startTime,m,n,1)"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </template>

                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcsign.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      class="el-input-rctime"
                      @blur="checkEndTime(rcsign.endTime,m,n,1)"
                    ></el-date-picker>
                  </el-form-item>
                </div>

                <!-- <div class="el-openradio">
                          <el-checkbox :checked="rcsign.btnContorl.isOpen">开放报名</el-checkbox>
                          <el-checkbox :checked="rcsign.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>-->
              </div>

              <div v-else class="star_time">
                <div class="el-baoming-err">
                  <div style="display: -webkit-box;margin-left: 4.9rem;">
                    <el-checkbox :checked="rcsign.isNeed"></el-checkbox>
                    <el-select class="el-type-value" v-model="rcsign.timeTypeValue" @change="res=>setVote(res,m,n,'signUp',timeRc.name)" placeholder="请选择">
                      <el-option
                        v-for="item in timeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <div class="el-div-delete">
                      <i class="iconfont" @click="delDate(1,m,n)">&#xe61e;</i>
                    </div>
                  </div>
                  <el-form-item
                    :prop="'comList.' + m + '.signUp.' + n + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcsign.name"
                      :placeholder="timeRc.name + '-报名'"
                      size="small"
                      class="el-input-rctime"
                      style="margin-left: 96px;margin-top:1rem;"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="el-start-time el-competition-err">
                  <template v-if="rcsign.isNeed">
                    <el-form-item
                      :prop="'comList.' + m + '.signUp.' + n + '.startTime'"
                      :rules="{ required: false, message: '请选择时间', trigger: 'blur' }"
                    >
                      <el-date-picker
                        size="small"
                        v-model="rcsign.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcsign.startTime,m,n,1)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                  <template v-else>
                    <el-form-item>
                      <el-date-picker
                        size="small"
                        v-model="rcsign.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcsign.startTime,m,n,1)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                </div>
                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcsign.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      class="el-input-rctime"
                      @blur="checkEndTime(rcsign.endTime,m,n,1)"
                    ></el-date-picker>
                  </el-form-item>
                </div>

              <div class="el-div-zuopin" v-if="rcsign.timeTypeValue == 5" @click="getVote(m,a)">
                  <i class="iconfont">&#xe655;</i>
                  <span>投票设置</span>
                </div>
                <div class="el-openradio" v-if="rcsign.timeTypeValue == 4">
                  <el-checkbox :checked="rcsign.btnContorl.isOpen">开放报名</el-checkbox>
                  <el-checkbox :checked="rcsign.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>
                <div class="el-openradio" v-else-if="rcsign.timeTypeValue == 2">
                  <el-checkbox :checked="rcsign.btnContorl.isOpen">开放上传</el-checkbox>
                  <el-checkbox :checked="rcsign.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>
              </div>

              <div class="el-display">
                <el-checkbox
                  :checked="rcsign.display"
                  @change="val=>$set(rcsign,'display',val)"
                >日程进度条中显示该日程</el-checkbox>
              </div>
            </div>
            <div class="increase" @click="addSchedule(1,m)">
              <i class="iconfont">&#xe62d;</i>
              <span class="el-add-time">增加自定义日程</span>
            </div>
          </div>
          <!--提交作品-->
          <div class="el-tijiao">
            <div v-for="(rcworks,a) in timeRc.works" :key="a">
              <div v-if="a == 0" class="star_time">
                <div style="margin-top:20px;">
                  <el-checkbox v-model="rcworks.isNeed">提交作品</el-checkbox>
                  <el-form-item
                    :prop="'comList.' + m + '.works.' + a + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcworks.name"
                      size="small"
                      :placeholder="timeRc.name + '-提交作品'"
                      class="el-input-rctime"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="el-competition-err">
                  <template v-if="rcworks.isNeed">
                    <el-form-item
                      :prop="'comList.' + m + '.works.' + a + '.startTime'"
                      :rules="{ required: false, message: '请选择时间', trigger: 'blur' }"
                    >
                      <el-date-picker
                        size="small"
                        v-model="rcworks.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcworks.startTime,m,a,2)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                  <template v-else>
                    <el-form-item>
                      <el-date-picker
                        size="small"
                        v-model="rcworks.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcworks.startTime,m,a,2)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                </div>
                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcworks.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      class="el-input-rctime"
                      @blur="checkEndTime(rcworks.endTime,m,a,2)"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="el-div-zuopin" @click="getzuoping(m,a,timeRc)">
                  <i class="iconfont">&#xe655;</i>
                  <span>作品设置</span>
                </div>
                <!-- <div class="el-openradio">
                          <el-checkbox :checked="rcworks.btnContorl.isOpen" label="开放上传">开放上传</el-checkbox>
                          <el-checkbox
                          :checked="rcworks.btnContorl.isEdit"
                          label="可修改"
                          class="el-can-xg"
                          >可修改</el-checkbox>
                </div>-->
              </div>
              <div v-else class="star_time">
                <div class="el-baoming-err">
                  <div style="display: -webkit-box;margin-left: 4.9rem;">
                    <el-checkbox :checked="rcworks.isNeed"></el-checkbox>
                    <el-select
                      class="el-type-value"
                      v-model="rcworks.timeTypeValue"
                      @change="res=>setVote(res,m,a,'works',timeRc.name)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in timeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <div class="el-div-delete">
                      <i class="iconfont" @click="delDate(2,m,a)">&#xe61e;</i>
                    </div>
                  </div>
                  <el-form-item
                    :prop="'comList.' + m + '.works.' + a + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcworks.name"
                      size="small"
                      :placeholder="timeRc.name + '-提交作品'"
                      class="el-input-rctime"
                      style="margin-left: 96px;margin-top:1rem;"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="el-competition-err">
                  <template v-if="rcworks.isNeed">
                    <el-form-item
                      :prop="'comList.' + m + '.works.' + a + '.startTime'"
                      :rules="{ required: false, message: '请选择时间', trigger: 'blur' }"
                    >
                      <el-date-picker
                        size="small"
                        v-model="rcworks.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcworks.startTime,m,a,2)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                  <template v-else>
                    <el-form-item>
                      <el-date-picker
                        size="small"
                        v-model="rcworks.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcworks.startTime,m,a,2)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                </div>
                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcworks.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      class="el-input-rctime"
                      @blur="checkEndTime(rcworks.endTime,m,a,2)"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="el-div-zuopin" v-if="rcworks.timeTypeValue == 5" @click="getVote(m,a)">
                  <i class="iconfont">&#xe655;</i>
                  <span>投票设置</span>
                </div>
                <div class="el-openradio" v-if="rcworks.timeTypeValue == 4">
                  <el-checkbox :checked="rcworks.btnContorl.isOpen">开放报名</el-checkbox>
                  <el-checkbox :checked="rcworks.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>
                <div class="el-openradio" v-else-if="rcworks.timeTypeValue == 2">
                  <el-checkbox :checked="rcworks.btnContorl.isOpen">开放上传</el-checkbox>
                  <el-checkbox :checked="rcworks.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>
              </div>
              <div class="el-display">
                <el-checkbox
                  :checked="rcworks.display"
                  @change="val=>$set(rcworks,'display',val)"
                >日程进度条中显示该日程</el-checkbox>
              </div>
            </div>
            <div class="increase" @click="addSchedule(2,m)">
              <i class="iconfont">&#xe62d;</i>
              <span class="el-add-time">增加自定义日程</span>
            </div>
          </div>
          <!--评审作品-->
          <div class="el-tijiao">
            <div v-for="(rcview,p) in timeRc.review" :key="p">
              <div v-if="p == 0" class="star_time">
                <div style="margin-top:20px;">
                  <el-checkbox v-model="rcview.isNeed">评审作品</el-checkbox>
                  <el-form-item
                    :prop="'comList.' + m + '.review.' + p + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcview.name"
                      size="small"
                      :placeholder="timeRc.name + '-评审作品'"
                      class="el-input-rctime"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="el-competition-err">
                  <template v-if="rcview.isNeed">
                    <el-form-item
                      :prop="'comList.' + m + '.review.' + p + '.startTime'"
                      :rules="{ required: false, message: '请选择时间', trigger: 'blur' }"
                    >
                      <el-date-picker
                        size="small"
                        v-model="rcview.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcview.startTime,m,p,3)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                  <template v-else>
                    <el-form-item>
                      <el-date-picker
                        size="small"
                        v-model="rcview.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcview.startTime,m,p,3)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                </div>
                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcview.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      class="el-input-rctime"
                      @blur="checkEndTime(rcview.endTime,m,p,3)"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="el-div-zuopin" @click="getpings(m,p)">
                  <i class="iconfont">&#xe655;</i>
                  <span>评审设置</span>
                </div>
              </div>

              <div v-else class="star_time">
                <div class="el-baoming-err">
                  <div style="display: -webkit-box;margin-left: 4.9rem;">
                    <el-checkbox :checked="rcview.isNeed"></el-checkbox>
                    <el-select class="el-type-value" v-model="rcview.timeTypeValue" @change="res=>setVote(res,m,p,'review',timeRc.name)" placeholder="请选择">
                      <el-option
                        v-for="item in timeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <div class="el-div-delete">
                      <i class="iconfont" @click="delDate(3,m,p)">&#xe61e;</i>
                    </div>
                  </div>
                  <el-form-item
                    :prop="'comList.' + m + '.review.' + p + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcview.name"
                      size="small"
                      :placeholder="timeRc.name + '-评审作品'"
                      class="el-input-rctime"
                      style="margin-left: 96px;margin-top:1rem;"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="el-competition-err">
                  <template v-if="rcview.isNeed">
                    <el-form-item
                      :prop="'comList.' + m + '.review.' + p + '.startTime'"
                      :rules="{ required: false, message: '请选择时间', trigger: 'blur' }"
                    >
                      <el-date-picker
                        size="small"
                        v-model="rcview.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcview.startTime,m,p,3)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                  <template v-else>
                    <el-form-item>
                      <el-date-picker
                        size="small"
                        v-model="rcview.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        class="el-input-rctime"
                        @blur="checkTime(rcview.startTime,m,p,3)"
                      ></el-date-picker>
                    </el-form-item>
                  </template>
                </div>
                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcview.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间"
                      class="el-input-rctime"
                      @blur="checkEndTime(rcview.endTime,m,p,3)"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="el-div-zuopin" v-if="rcview.timeTypeValue == 5" @click="getVote(m,p)">
                  <i class="iconfont">&#xe655;</i>
                  <span>投票设置</span>
                </div>
                <div class="el-openradio" v-if="rcview.timeTypeValue == 4">
                  <el-checkbox :checked="rcview.btnContorl.isOpen">开放报名</el-checkbox>
                  <el-checkbox :checked="rcview.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>
                <div class="el-openradio" v-else-if="rcview.timeTypeValue == 2">
                  <el-checkbox :checked="rcview.btnContorl.isOpen">开放上传</el-checkbox>
                  <el-checkbox :checked="rcview.btnContorl.isEdit" class="el-can-xg">可修改</el-checkbox>
                </div>
              </div>

              <div class="el-display">
                <el-checkbox
                  :checked="rcview.display"
                  @change="val=>$set(rcview,'display',val)"
                >日程进度条中显示该日程</el-checkbox>
              </div>
            </div>
            <div class="increase" @click="addSchedule(3,m)">
              <i class="iconfont">&#xe62d;</i>
              <span class="el-add-time">增加自定义日程</span>
            </div>
          </div>
          <!--结果发布-->
          <div class="el-tijiao">
            <div v-for="(rcresule,n) in timeRc.results" :key="n">
              <div class="star_time">
                <div style="margin-top:20px;">
                  <el-checkbox v-model="rcresule.isNeed">结果发布</el-checkbox>
                  <el-form-item
                    :prop="'comList.' + m + '.results.' + n + '.name'"
                    :rules="{ required: false, message: '请输入名称', trigger: 'blur' }"
                  >
                    <el-input
                      type="text"
                      v-model="rcresule.name"
                      size="small"
                      :placeholder="timeRc.name + '-结果发布'"
                      class="el-input-rctime"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="el-competition-err">
                  <el-form-item>
                    <el-date-picker
                      size="small"
                      v-model="rcresule.startTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择时间"
                      class="el-input-rctime"
                      @blur="checkTime(rcresule.startTime,m,n,4)"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="el-display" style="margin-top:-10px;">
                <el-checkbox
                  :checked="rcresule.display"
                  @change="val=>$set(rcresule,'display',val)"
                >日程进度条中显示该日程</el-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="el-add-saiduan" @click.prevent="addCompetition">
          <i class="iconfont">&#xe62d;</i>
          <span class="el-add-time">增加赛段</span>
        </div>
        <div class="el-score-weight">
          <h2>赛段分数占比</h2>
          <ul>
            <li>
              <div class="title1">赛段名称</div>
              <div class="title2">赛段分数占比</div>
              <div class="title3">线上报名支付</div>
            </li>
            <li v-for="(timeRc, m) in rctime.comList" :key="m">
              <div  class="title1">
                <span>{{timeRc.name}}</span>
              </div>
              <div  class="title2">
                <el-input-number
                  :precision="2" 
                  :step="0.01"
                  placeholder="请输入分数"
                  type="number"
                  :max="100"
                  :min="0"
                  @blur="checkscoreweight(m)"
                  v-model="timeRc.scoreWeight"
                >
                </el-input-number> %
              </div>

              <div  class="title3">
                <p>
                  <el-switch v-model="timeRc.openPay" style="margin-right:10px"></el-switch>

                  <el-input type="number" :min="0" v-if="timeRc.openPay" placeholder="请输入单价" v-model="timeRc.openPayprice" class="input-with-select">
                    <el-select v-model="timeRc.region" placeholder="请选择收费规则"  slot="prepend">
                      <el-option label="按团收费" :value="0"></el-option>
                      <el-option label="按人数收费" :value="1"></el-option>
                    </el-select>
                  </el-input>
                </p>
                <p v-if="timeRc.openPay && timeRc.region==1" class="pay-team-type">
                  <el-checkbox-group v-model="timeRc.region1">
                    <el-checkbox label="参赛者" :value="0"  name="type"></el-checkbox>
                    <el-checkbox label="指导老师" :value="1" name="type"></el-checkbox>
                  </el-checkbox-group>
                </p>
              </div>

            </li>
          </ul>

          
        </div>
        <div class="el-score-weight outlinepay">
            <p>线下报名费支付功能：
                <span >
                  <el-switch v-model="outlinePay" :active-text="outlineText"> </el-switch>
                </span>
            </p>

            <el-form ref="form1" :model="form1" label-width="80px" class="form" v-if="outlinePay">
              <el-form-item label="户名" prop="payAccount" :rules="[{ required: true, message: '户名不能为空', trigger: 'blur' }]">
                <el-input v-model="form1.payAccount" placeholder="请输入户名" ></el-input>
              </el-form-item>
              <el-form-item label="帐号" prop="payNumber" :rules="[{ required: true, message: '帐号不能为空', trigger: 'blur' }]">
                <el-input v-model="form1.payNumber" placeholder="请输入帐号" ></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="payAddress" :rules="[{ required: true, message: '开户行不能为空', trigger: 'blur' }]">
                <el-input v-model="form1.payAddress" placeholder="请输入开户行" ></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div class="group_btn">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitschedule('rctime')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    

    <!--弹框作品设置 -->
    <el-dialog
      title="作品设置"
      :modal-append-to-body="false"
      :append-to-body="true"
      :visible.sync="worksDialogVisible"
      :close-on-click-modal="false"
      width="800px"
      height="916px"
      style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px; "
    >
      <workset
        :rowId="setId"
        :competitionId="id"
        :close="closeDialog"
        v-if="worksDialogVisible"
      />
    </el-dialog>
    <!--弹框评审设置 -->
    <el-dialog
      title="评审设置"
      :append-to-body="true"
      :modal-append-to-body="false"
      :visible.sync="dialogReviewVisible"
      :close-on-click-modal="false"
      width="800px"
      height="1849px"
      style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
    >
      <review
        :rowId="setId"
        :competitionId="id"
        :close="closeDialog"
        v-if="dialogReviewVisible"
      />
    </el-dialog>
    <!-- 投票设置弹窗 -->
    <el-dialog
      title="投票设置"
      :append-to-body="true"
      :modal-append-to-body="false"
      :visible.sync="voteShow"
      :close-on-click-modal="false"
      width="800px"
      style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
    >
      <vote 
        :rowId="setId" 
        :competitionId="id" 
        :close="closeDialog"
        v-if="voteShow"
      />
    </el-dialog>
  </div>
</template>

<script>
import review from "./review/index";
import workset from "./workset/index";
import vote from "./vote/index";
import util from "@/utils/util";
import network from "@/api/jxapi/index";

export default {
  props: ["id", "disabled"],
  components: {
    review,
    vote,
    workset
  },
  data() {
    return {
      schedule: false,
      outlinePay: false,
      outlineText:'开启',
      form1:{
        payAccount: '',
        payAddress: '',
        payNumber: ''
      },

      worksDialogVisible: false, //竞赛日程里面的作品设置
      dialogReviewVisible: false, //竞赛日程里面的评审设置
      voteShow: false, //竞赛日程里面的投票设置
      setId: "",
      //竞赛日程
      rctime: {
        comList: [
          {
            name: "", //开始名称
            startTime: "", //开始时间
            endTime: "", //结束时间
            scoreWeight: 0,
            openPay: false,
            openPayprice: '',
            region: '',
            region1: [],
            //报名
            signUp: [
              {
                isNeed: true, //报名按钮是否选中
                name: "初赛-报名",
                startTime: "", //开始赛程
                endTime: "", //结束赛程
                btnContorl: {
                  isEdit: true,
                  isOpen: true
                }, //开放报名，可修改
                display: true, //日程进度条中显示改日程
                timeTypeValue: "1" //选择的类型值
              }
            ],
            //提交作品
            works: [
              {
                isNeed: true, //提交作品按钮是否选中
                name: "初赛-提交作品",
                startTime: "", //开始赛程
                endTime: "", //结束赛程
                btnContorl: {
                  isEdit: true,
                  isOpen: true
                }, //开放报名，可修改
                display: true, //日程进度条中显示改日程
                timeTypeValue: "1" //选择的类型值
              }
            ],
            //评审作品
            review: [
              {
                isNeed: true, //评审作品按钮是否选中
                name: "初赛-评审作品",
                startTime: "", //开始赛程
                endTime: "", //结束赛程
                btnContorl: {
                  isEdit: true,
                  isOpen: true
                }, //开放报名，可修改
                display: true, //日程进度条中显示改日程
                timeTypeValue: "1" //选择的类型值
              }
            ],
            //结果发布
            results: [
              {
                isNeed: true, //结果发布按钮是否选中
                name: "初赛-结果发布",
                startTime: "", //开始赛程
                display: true //日程进度条中显示改日程
              }
            ]
          }
        ] //赛程
      },
      m: 0, //日程设置中comList[m]的 m值
      a: 0, //日程设置中comList[m].works[a]的 a值
      b: 0, //日程设置中comList[m].review[b]的 b值
      timeType: [
        {
          value: "1",
          label: "其他"
        },
        {
          value: "2",
          label: "提交作品"
        },
        {
          value: "3",
          label: "评审作品"
        },
        {
          value: "4",
          label: "报名"
        },
        {
          value: "5",
          label: "投票"
        }
      ], //选择类型，其他、提交作品、评审作品、报名
      comTypeMap: { signUp: 1, works: 2, review: 3, results: 4 }
    };
  },
  methods: {
    //设置默认赛段
    //加载日程
    async init(){
      if(this.disabled) return;
      await this.renderSchedule();
      this.schedule = true
    },
    async renderSchedule() {
      this.rctime.comList = [];
      let typeObj = { 1: "signUp", 2: "works", 3: "review", 4: "results" };

      let res = await network.getSchedule({
        data: { competitionId: this.id }
      });
      if (res == "error") return;
      let list = res.competitionTimes;
      // 线上报名处理
      for(let i in list){
          list[i].openPayprice = list[i].price==0 ? 0 : list[i].price
          if(list[i].isPay==0){
            list[i].openPay = false
            list[i].region = list[i].region || ""
            list[i].region1 = list[i].region1 || ""
          }else{
            list[i].openPay = true
            if(list[i].payRule==0){
              list[i].region = 0
            }else if(list[i].payRule==1){
              list[i].region = 1
              list[i].region1 = ['参赛者']
            }else if(list[i].payRule==2){
              list[i].region = 1
              list[i].region1 = ['指导老师']
            }else if(list[i].payRule==3){
              list[i].region = 1
              list[i].region1 = ['参赛者','指导老师']
            }
          }
          
      }
      // 线下报名
      this.outlinePay = !!res.outlinePay
      this.form1.payAccount = res.payAccount || ''
      this.form1.payAddress = res.payAddress || ''
      this.form1.payNumber = res.payNumber || ''
      
      
      let comList = this.rctime.comList;
      // 空数据新增
      if (list.length < 1) {
        this.addCompetition();
        return;
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].competition_times.length > 0) {
          for (let j = 0; j < list[i].competition_times.length; j++) {
            let type = list[i].competition_times[j].type;
            if (type == 0) {
              this.rctime.comList.push({
                rowId: list[i].rowId,
                scoreWeight: parseFloat(list[i].scoreWeight * 100) || 0,
                openPay: list[i].openPay || false,
                openPayprice: list[i].openPayprice,
                region: list[i].region,
                region1: list[i].region1 || [],
                sort: list[i].sort,
                name: "", //开始名称
                startTime: "", //开始时间
                endTime: "", //结束时间
                display: true,
                //报名
                signUp: [
                  {
                    default: true,
                    isNeed: true, //报名按钮是否选中
                    name: list[i].competition_times[j].name + "-报名",
                    startTime: "", //开始赛程
                    endTime: "", //结束赛程
                    btnContorl: {
                      isEdit: true,
                      isOpen: true
                    }, //开放报名，可修改
                    display: true, //日程进度条中显示改日程
                    timeTypeValue: "1" //选择的类型值
                  }
                ],
                //提交作品
                works: [
                  {
                    default: true,
                    isNeed: true, //提交作品按钮是否选中
                    name: list[i].competition_times[j].name + "-提交作品",
                    startTime: "", //开始赛程
                    endTime: "", //结束赛程
                    btnContorl: {
                      isEdit: true,
                      isOpen: true
                    }, //开放报名，可修改
                    display: true, //日程进度条中显示改日程
                    timeTypeValue: "1" //选择的类型值
                  }
                ],
                //评审作品
                review: [
                  {
                    default: true,
                    isNeed: true, //评审作品按钮是否选中
                    name: list[i].competition_times[j].name + "-评审作品",
                    startTime: "", //开始赛程
                    endTime: "", //结束赛程
                    btnContorl: {
                      isEdit: true,
                      isOpen: true
                    }, //开放报名，可修改
                    display: true, //日程进度条中显示改日程
                    timeTypeValue: "1" //选择的类型值
                  }
                ],
                //结果发布
                results: [
                  {
                    default: true,
                    isNeed: true, //结果发布按钮是否选中
                    name: list[i].competition_times[j].name + "-结果发布",
                    startTime: "", //开始赛程
                    display: true //日程进度条中显示改日程
                  }
                ]
              });
              // this.rctime.comList.push({name: ''});
              this.$set(
                comList[comList.length - 1],
                "name",
                list[i].competition_times[j].name
              );
              this.$set(
                comList[comList.length - 1],
                "startTime",
                list[i].competition_times[j].startTime
              );
              this.$set(
                comList[comList.length - 1],
                "endTime",
                list[i].competition_times[j].endTime
              );
              this.$set(comList[comList.length - 1], "display", true);
              this.$set(comList[comList.length - 1], "isNeed", true);
            } else if (type > 0 && type < 4) {
              this.addSchedule(
                type,
                comList.length - 1,
                list[i].competition_times[j]
              );
              let arr = comList[comList.length - 1][typeObj[type]];
              this.$set(
                arr[arr.length - 1],
                "isNeed",
                list[i].competition_times[j].isNeed
              );
              this.$set(
                arr[arr.length - 1],
                "name",
                list[i].competition_times[j].name
                  ? list[i].competition_times[j].name
                  : ""
              );
              this.$set(
                arr[arr.length - 1],
                "startTime",
                list[i].competition_times[j].startTime
              );
              this.$set(
                arr[arr.length - 1],
                "endTime",
                list[i].competition_times[j].endTime
              );
              this.$set(
                arr[arr.length - 1],
                "display",
                list[i].competition_times[j].display
              );
              this.$set(
                arr[arr.length - 1],
                "timeTypeValue",
                list[i].competition_times[j].timeTypeValue+''
              );
            } else if (type == 4) {
              comList[comList.length - 1]["results"] = [];
              comList[comList.length - 1]["results"].push({
                isNeed: true, //报名按钮是否选中
                name: name,
                startTime: "" //开始赛程
              });
              let arr = comList[comList.length - 1][typeObj[type]];
              this.$set(
                arr[arr.length - 1],
                "isNeed",
                list[i].competition_times[j].isNeed
              );
              this.$set(
                arr[arr.length - 1],
                "name",
                list[i].competition_times[j].name
                  ? list[i].competition_times[j].name
                  : ""
              );
              this.$set(
                arr[arr.length - 1],
                "startTime",
                list[i].competition_times[j].startTime
              );
              this.$set(
                arr[arr.length - 1],
                "display",
                list[i].competition_times[j].display
              );
            } else if (type == 5) {
              //自定义日程
              let parentType = list[i - 1].type;
              if (parentType > 0 && parentType < 4) {
                comList[comList.length - 1][typeObj[parentType]].push(temp);
              } else if (childType == 4) {
                comList[comList.length - 1][typeObj[parentType]].push(
                  tempResults
                );
              }
            }
          }
        } else {
          this.rctime.comList.push({
            rowId: list[i].rowId,
            sort: list[i].sort,
            scoreWeight: parseFloat(list[i].scoreWeight * 100) || 0,
            openPay: list[i].openPay || false,
            openPayprice: list[i].openPayprice,
            region: list[i].region,
            region1: list[i].region1 || [],
            name: "", //开始名称
            startTime: "", //开始时间
            endTime: "", //结束时间
            display: true,
            //报名
            signUp: [
              {
                default: true,
                isNeed: true, //报名按钮是否选中
                name: "初赛-报名",
                startTime: "", //开始赛程
                endTime: "", //结束赛程
                btnContorl: {
                  isEdit: true,
                  isOpen: true
                }, //开放报名，可修改
                display: true, //日程进度条中显示改日程
                timeTypeValue: "1" //选择的类型值
              }
            ],
            //提交作品
            works: [
              {
                default: true,
                isNeed: true, //提交作品按钮是否选中
                name: "初赛-提交作品",
                startTime: "", //开始赛程
                endTime: "", //结束赛程
                btnContorl: {
                  isEdit: true,
                  isOpen: true
                }, //开放报名，可修改
                display: true, //日程进度条中显示改日程
                timeTypeValue: "1" //选择的类型值
              }
            ],
            //评审作品
            review: [
              {
                default: true,
                isNeed: true, //评审作品按钮是否选中
                name: "初赛-评审作品",
                startTime: "", //开始赛程
                endTime: "", //结束赛程
                btnContorl: {
                  isEdit: true,
                  isOpen: true
                }, //开放报名，可修改
                display: true, //日程进度条中显示改日程
                timeTypeValue: "1" //选择的类型值
              }
            ],
            //结果发布
            results: [
              {
                default: true,
                isNeed: true, //结果发布按钮是否选中
                name: "初赛-结果发布",
                startTime: "", //开始赛程
                display: true //日程进度条中显示改日程
              }
            ]
          });
        }
      }
      // console.log(this.rctime.comList);
    },
    /**
     * 删除赛段
     */
    async delTime(i, timeRc) {
      if (timeRc.news) {
        let delSchedule = await network.delSchedule({
          data: {
            rowId: timeRc.rowId,
            competitionId: this.id
          }
        });
        if (delSchedule == "error") return;
        this.rctime.comList.splice(i, 1);
      } else {
        this.rctime.comList[i].scoreWeight = 0;
        const a = await this.submitschedule("rctime", 1);
        if (!a) return;
        let delSchedule = await network.delSchedule({
          data: {
            rowId: timeRc.rowId,
            competitionId: this.id
          }
        });
        if (delSchedule == "error") return;
        this.rctime.comList.splice(i, 1);
        this.$nextTick(() => {
          this.submitschedule("rctime", 2);
        });
      }
    },
    /**
       删除自定义的日程
       */
    delDate(n, m, a) {
      if (n == 1) {
        this.rctime.comList[m].signUp.splice(a, 1);
      } else if (n == 2) {
        this.rctime.comList[m].works.splice(a, 1);
      } else if (n == 3) {
        this.rctime.comList[m].review.splice(a, 1);
      }
    },
    /**
     * 竞赛日程设置
     */
    addSchedule(i, m, arr) {
      var list = [
        { key: "signUp", name: "初赛-报名" },
        { key: "works", name: "初赛-提交作品" },
        { key: "review", name: "初赛-评审作品" }
      ];
      let key = list[i - 1].key;
      let name = list[i - 1].name;
      if (
        this.rctime.comList[m][key][this.rctime.comList[m][key].length - 1]
          .default
      ) {
        this.rctime.comList[m][key].pop();
      }

      //删除默认
      this.rctime.comList[m][key].push({
        isNeed: true, //报名按钮是否选中
        name: name,
        startTime: "", //开始赛程
        endTime: "", //结束赛程
        btnContorl: {
          isEdit: arr ? arr.edit : "",
          isOpen: arr ? arr.signup : ""
        }, //开放报名，可修改
        display: true, //日程进度条中显示改日程
        timeTypeValue: "1" //选择的类型值
      });
    },
    /**
     * 弹出作品设置弹框
     */
    async getzuoping(m, a, timeRc) {
      this.worksDialogVisible = true;
      this.m = m;
      this.a = a;
      this.setId = timeRc.rowId;
    },
    setVote(res,m,b,key,name){
      // console.log(this.rctime.comList[m][key][b])
      this.$set(this.rctime.comList[m][key][b],'name',name+'-'+this.timeType[res-1].label)
      this.$set(this.rctime.comList[m][key][b], 'timeTypeValue', res)
    },
    async getpings(m, b) {
      this.m = m;
      this.b = b;
      this.setId = this.rctime.comList[m].rowId;
      this.dialogReviewVisible = true;
    },
    async getVote(m, b) {
      this.m = m;
      this.b = b;
      this.setId = this.rctime.comList[m].rowId;
      this.voteShow = true;
    },
    /**
     * 增加赛段
     */
    addCompetition() {
      this.rctime.comList.push({
        news: true,
        name: "", //开始名称
        rowId: util.randomChar(12),
        startTime: "", //开始时间
        endTime: "", //结束时间
        display: true,
        scoreWeight: 0,
        openPay: false,
        openPayprice: '',
        region: '',
        region1: [],
        //报名
        signUp: [
          {
            isNeed: true, //报名按钮是否选中
            name: "初赛-报名",
            startTime: "", //开始赛程
            endTime: "", //结束赛程
            btnContorl: {
              isEdit: true,
              isOpen: true
            }, //开放报名，可修改
            display: false, //日程进度条中显示改日程
            timeTypeValue: "1" //选择的类型值
          }
        ],
        //提交作品
        works: [
          {
            isNeed: true, //提交作品按钮是否选中
            name: "初赛-提交作品",
            startTime: "", //开始赛程
            endTime: "", //结束赛程
            btnContorl: {
              isEdit: true,
              isOpen: true
            }, //开放报名，可修改
            display: false, //日程进度条中显示改日程
            timeTypeValue: "1", //选择的类型值
            //作品设置
            workSet: {
              contentType: [],
              file: [
                {
                  fujian: 1, //附件是否必填
                  fileName: "", //附件名
                  checked: false, //是否选中
                  fileType: [] //可接受的形式
                }
              ]
            }
          }
        ],
        //评审作品
        review: [
          {
            isNeed: true, //评审作品按钮是否选中
            name: "初赛-评审作品",
            startTime: "", //开始赛程
            endTime: "", //结束赛程
            btnContorl: {
              isEdit: true,
              isOpen: true
            }, //开放报名，可修改
            display: false, //日程进度条中显示改日程
            timeTypeValue: "1" //选择的类型值
          }
        ],
        //结果发布
        results: [
          {
            isNeed: true, //结果发布按钮是否选中
            name: "初赛-结果发布",
            startTime: "", //开始赛程
            display: false //日程进度条中显示改日程
          }
        ]
      });
    },
    /**
     * 日程设置取消按钮
     */
    cancel() {
      this.schedule = false
    },
    //日程设置确定按钮
    async submitschedule(formName, index) {
      let _ret = true;
      await this.$refs[formName].validate(valid => {
        if (valid) {
          _ret = this.saveSchedule(index);
        } else {
          console.log("error submit!!");
          _ret = false;
          return false;
        }
      });
      return _ret;
    },
    /**
     * 保存日程设置
     */
    async saveSchedule(index) {
      var that = this;
      var lists = [];
      var timelist = [];
      // 检验占比
      let total = 0;
      for (let i in this.rctime.comList) {
        total += parseFloat(this.rctime.comList[i].scoreWeight);
      }
      if (total == 0) {
        this.rctime.comList[this.rctime.comList.length - 1].scoreWeight = 100;
      } else if (total != 100) {
        this.$message.warning("赛段分数占比之和需要等于100");
        return false;
      }

      for (let i = 0; i < this.rctime.comList.length; i++) {
        var list = [];
        let item = this.rctime.comList[i];
        console.log(item);
        // 日程主表 初赛赛段不显示到timeline
        if (i == 0) {
          item.display = false;
        }
        list.push({
          name: item.name,
          startTime: item.startTime,
          endTime: item.endTime,
          type: 0,
          display: item.display || false
        });
        // 遍历对象，对其中的数组进行操作，添加到
        for (let j in item) {
          if (Array.isArray(item[j]) && j!='region1') {
            for (let k = 0; k < item[j].length; k++) {
              let obj = {
                name: item[j][k].name,
                startTime: item[j][k].startTime,
                endTime: item[j][k].endTime,
                timeTypeValue: item[j][k].timeTypeValue || '',
                isNeed: item[j][k].isNeed ? item[j][k].isNeed : false
              };
              obj.type = this.comTypeMap[j];
              obj.display = item[j][k].display;
              if (item[j][k].btnContorl) {
                obj.signup = item[j][k].btnContorl.isOpen;
                obj.edit = item[j][k].btnContorl.isEdit;
              }
              list.push(obj);
            }
          }
        }
        let nums = 10000
        let payRule = ""
        let params = {}
        if(!item.openPay){
          payRule = 0
          params = {
            isPay:0,
            payRule:'',
            price:''
          }
        }else{
          if(!item.openPayprice || item.openPayprice<0) return this.$message.warning('请输入单价');
          if(item.region!==0&&item.region!==1) return this.$message.warning('请选择收费类型');

          if(item.region==0){
            payRule = 0
          }else{
            if(item.region1.includes('参赛者') && item.region1.includes('指导老师')){
              payRule = 3
            }else if(item.region1.includes('参赛者') && !item.region1.includes('指导老师')){
              payRule = 1
            }else if(!item.region1.includes('参赛者') && item.region1.includes('指导老师')){
              payRule = 2
            }else{
              return this.$message.warning('按人数收费时，请选择收费对象')
            }
          }
            
            params = {
              isPay:1,
              payRule: payRule,
              price: item.openPayprice
            }
        }
        
        lists.push({
          rowId: item.rowId,
          scoreWeight: parseFloat((item.scoreWeight*nums)/100/nums),
          sort: i,
          competition_times: list,
          ...params
        });
        timelist = timelist.concat(list);
      }

      // 线下支付数据处理判断
      let data = {
        outlinePay: 0,
        payAccount: '',
        payAddress: '',
        payNumber: ''
      }
      if(!this.outlinePay){
        data.outlinePay = 0
      }else{
        data.outlinePay = 1
        if(!this.form1.payAccount) return this.$message.warning('请输入线下支付户名')
        if(!this.form1.payAddress) return this.$message.warning('请输入线下支付账号')
        if(!this.form1.payNumber) return this.$message.warning('请输入线下支付开户行')
        data.payAccount = this.form1.payAccount
        data.payAddress = this.form1.payAddress
        data.payNumber = this.form1.payNumber
      }

      const params = {
        competitionId: parseInt(that.id),
        competitionTimes: lists,
        ...data
      };
      if (index == 1) {
        return true;
      } else if (index == 2) {
        let saveSchedule = await network.saveSchedule({ data: params });
        if (saveSchedule == "error") return;
      } else {
        let saveSchedule = await network.saveSchedule({ data: params });
        if (saveSchedule == "error") return;
        this.$message.success("保存成功");
        this.schedule = false
      }
    },

    /**
     * 改变赛段名
     */
    changeName(m) {
      let tem = this.rctime.comList[m].signUp;
      let temTwo = this.rctime.comList[m].works;
      let temThree = this.rctime.comList[m].review;
      let temF = this.rctime.comList[m].results;
      for (let v of tem) {
        v.name = this.rctime.comList[m].name + "-报名";
      }
      for (let a of temTwo) {
        a.name = this.rctime.comList[m].name + "-提交作品";
      }
      for (let b of temThree) {
        b.name = this.rctime.comList[m].name + "-评审作品";
      }
      for (let c of temF) {
        c.name = this.rctime.comList[m].name + "-结果发布";
      }
    },
    //校验起始时间
    checkTime(num, m, n, a) {
      let star_time = this.rctime.comList[m].startTime && this.rctime.comList[m].startTime.substring(0,10)
      let end_time = this.rctime.comList[m].endTime && this.rctime.comList[m].endTime.substring(0,10)
      switch (a) {
        case 1: {
          if ( num < star_time || num > end_time ) {
            this.rctime.comList[m].signUp[n].startTime = "";
            this.$message.error("起始时间应该在赛段起始时间与结束时间之间");
          }
          break;
        }
        case 2: {
          if ( num < star_time || num > end_time ) {
            // console.log(num,this.rctime.comList[m].startTime)
            this.rctime.comList[m].works[n].startTime = "";
            this.$message.error("起始时间应该在赛段起始时间与结束时间之间");
          }
          break;
        }
        case 3: {
          if ( num < star_time || num > end_time ) {
            this.rctime.comList[m].review[n].startTime = "";
            this.$message.error("起始时间应该在赛段起始时间与结束时间之间");
          }
          break;
        }
        default: {
          if ( num < star_time || num > end_time ) {
            this.rctime.comList[m].results[n].startTime = "";
            this.$message.error("起始时间应该在赛段起始时间与结束时间之间");
          }
        }
      }
    },
    //校验结束时间
    checkEndTime(num, m, n, a) {
      switch (a) {
        case 1: {
          if (num > this.rctime.comList[m].endTime) {
            this.rctime.comList[m].signUp[n].endTime = "";
            this.$message.error("结束时间应该在赛段起始时间与结束时间之间");
          }
          if (num < this.rctime.comList[m].signUp[n].startTime) {
            this.rctime.comList[m].signUp[n].endTime = "";
            this.$message.error("结束时间应该大于起始时间");
          }
          break;
        }
        case 2: {
          if (num > this.rctime.comList[m].endTime) {
            this.rctime.comList[m].works[n].endTime = "";
            this.$message.error("结束时间应该在赛段起始时间与结束时间之间");
          }
          if (num < this.rctime.comList[m].works[n].startTime) {
            this.rctime.comList[m].works[n].endTime = "";
            this.$message.error("结束时间应该大于起始时间");
          }
          break;
        }
        case 3: {
          if (num > this.rctime.comList[m].endTime) {
            this.rctime.comList[m].review[n].endTime = "";
            this.$message.error("结束时间应该在赛段起始时间与结束时间之间");
          }
          if (num < this.rctime.comList[m].review[n].startTime) {
            this.rctime.comList[m].review[n].endTime = "";
            this.$message.error("结束时间应该大于起始时间");
          }
          break;
        }
        default: {
          if (num > this.rctime.comList[m].endTime) {
            this.rctime.comList[m].signUp[n].endTime = "";
            this.$message.error("结束时间应该在赛段起始时间与结束时间之间");
          }
        }
      }
    },
    // 检验输入的分数占比
    checkscoreweight(m) {
      let total = 0;
      let num = 10000
      for (let i in this.rctime.comList) {
        if (i == m) continue;
        total += parseFloat(this.rctime.comList[i].scoreWeight);
      }
      if (parseFloat(this.rctime.comList[m].scoreWeight) + total > 100) {
        this.rctime.comList[m].scoreWeight = (100*num - total*num)/num;
        this.$message.warning("赛段分数占比之和需要等于100");
      }

      // if(total<=100) return;
      // this.rctime.comList[m].scoreWeight = 0
    },
    /**
     *
     */
    closeDialog() {
      this.dialogReviewVisible = false;
      this.voteShow = false;
      this.worksDialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
div,
ul,
li,
p {
  box-sizing: border-box;
}
//竞赛日程
.group_btn {
  border-top: 1px solid #dedede;
  text-align: right;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
}
.el-competition {
  width: 756px; // height: 803px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 20px 0 10px 20px;
  background: #f9f9f9;
  box-sizing: border-box;
  // overflow: auto;
  .el-input-rctime {
    background: #ffffff;
    width: 150px !important;
  }
  .el-left {
    margin-left: 25px !important;
  }
  .el-div-zuopin {
    margin-left: 10px !important;
    color: #4a4a4a;
    i {
      margin-top: 5px;
      width: 14px;
      height: 14px;
    }
    span {
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
  .el-div-zuopin:hover {
    i,
    span {
      color: #4199ff !important;
    }
  }
  .el-openradio {
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 1px;
    margin-left: 128px !important;
    .el-can-xg {
      margin-left: 80px;
    }
  }
  .el-display {
    text-align: left;
    margin-left: 128px !important;
  }
  .el-xian {
    border-top: 1px solid #dedede;
    width: 646px !important;
  }
  .el-tijiao {
    margin-top: -15px !important;
  }
  .el-main {
    text-align: left;
  }
  .star_time {
    font-size: 0;
    text-align: left;
    cursor: pointer;
    /deep/ .el-form-item__content {
      line-height: 36px;
    }
    /deep/ .el-input__inner {
      line-height: 36px;
      height: 36px;
    }
    .el-competition-name {
      /deep/ .el-form-item__content {
        margin-left: 30px !important;
      }
      /deep/ .el-form-item__error {
        left: 5px;
      }
    }
    .el-err-com {
      /deep/ .el-form-item__error {
        left: 35px;
      }
    }
    .el-baoming-err {
      margin-top: 20px;
      /deep/ .el-form-item__error {
        left: 95px;
      }
    }
    .el-competition-err {
      /deep/ .el-form-item__error {
        left: 5px;
      }
    }
    div {
      display: inline-block;
      font-size: 14px;
      color: #4a4a4a;
      margin-left: 6px;
      h1 {
        font-weight: normal;
        text-align: left;
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #4a4a4a;
      }
      i {
        color: #9b9b9b;
      }
      i:hover {
        color: #d0021b;
      }
    }
    .el-icon-delete {
      vertical-align: bottom;
      font-size: 18.2px;
      margin-left: 9px;
    }
    .el-type-value {
      width: 109px;
    }
    .el-start-time {
      margin-left: -4.3rem;
      /deep/ .el-form-item__content {
        margin-left: 76px !important;
      }
    }
    .el-div-delete {
      margin-left: 1rem;
    }
  }
  .el-isShow {
    margin-left: 98px;
    text-align: left;
    margin-top: 10px;
    width: 210px;
    height: 36px;
    padding-left: 10px;
    padding-top: 8px;

    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 1px;
  }
  .increase {
    text-align: center;
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 1px;
    cursor: pointer;
    height: 45px;
    background: #e9e9e9;
    line-height: 45px;
    width: 646px;
    margin: 18px 33px 20px 0;
    i {
      display: inline-block;
      width: 10px;
      height: 14px;
      line-height: 14px;
      margin-right: 7px;
      font-size: 12px;
      color: #4a4a4a; //background-color: #4A4A4A;
      border-radius: 2px;
    }
  }
}
.el-add-saiduan {
  text-align: center;
  margin: 30px 0 30px 28px;
  padding-top: 15px;
  width: 706px;
  background: #e9e9e9;
  height: 46px;
  el-add-time {
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 1px;
  }
}
.el-score-weight {
  margin: 30px 0 30px 28px;
  padding: 0 30px;
  width: 756px;
  background: #f9f9f9;
  text-align: left;
  &.outlinepay{
    padding: 30px;
    .form{
      margin-top: 10px;
    }
  }
  .title1{
    width: 165px;
    display: inline-block;
    vertical-align: top;
  }
  .title2{
    width: 220px;
    display: inline-block;
    vertical-align: top;
  }
  .title3{
    width: 284px;
    display: inline-block;
    vertical-align: top;
    p{
      width: auto;
    }
    .pay-team-type{
      margin-left: 56px;
      margin-top: 5px;
    }
  }

  h2 {
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    color: #4a4a4a;
    border-bottom: 1px solid #eeeeee;
  }
  ul {
    padding-bottom: 20px;
  }
  li {
    margin-top: 20px;
  }
  p {
    display: inline-block;
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      margin-left: 10px;
    }
  }
  /deep/.el-input-group {
    width: 200px;
  }
}
.input-with-select{
  width: 240px !important;
}
 /deep/.el-input-group__prepend .el-select{
   width: 115px;
 }

.scheduleSet{
  display: inline-block;
  vertical-align: middle;
  .operateButton{
    font-size: 14px;
    font-weight: 500;
    color: #0078E2;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
    &.disabled{
      color: #D6D6D6;
      cursor: no-drop;
    }
  }
}
</style>

