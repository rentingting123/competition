<template>
  <div>
    <div class="first">
      <div>
        <div class="firsttitle">竞赛获奖率</div>
        <div class="firstcontent" style="min-width: 120px">
          <div>获奖数/参赛数</div>
          <div>{{ awardRate.competitionAwardRate }}%</div>
        </div>
      </div>
      <div style="margin: 0 15px">
        <div class="firsttitle">高校获奖率</div>
        <div class="firstcontent" style="min-width: 136px">
          <div>获奖高校/参赛高校</div>
          <div>{{ awardRate.competitionSchoolAwardRat }}%</div>
        </div>
      </div>
      <div style="width: 83%">
        <div class="firsttitle">竞赛奖项数量</div>
        <div class="jiang">
          <div style="padding-left: 43px" class="firstcontent">
            <div>特等奖</div>
            <div>{{ awardRate.specialAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>一等奖</div>
            <div>{{ awardRate.firstAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>二等奖</div>
            <div>{{ awardRate.secondAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>三等奖</div>
            <div>{{ awardRate.thirdAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>单项奖</div>
            <div>{{ awardRate.singleAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>指导教师奖</div>
            <div>{{ awardRate.teacherAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>组织奖</div>
            <div>{{ awardRate.organizationAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>竞赛承办</div>
            <div>{{ awardRate.undertakeAwardCount }}</div>
          </div>
          <div class="firstcontent">
            <div>秘书处</div>
            <div>{{ awardRate.secretaryAwardCount }}</div>
          </div>
          <div class="firstcontent" style="min-width: 50px">
            <div>其他</div>
            <div>{{ awardRate.otherAwardCount }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="left">
        <div class="firsttitle">参赛信息</div>
        <div class="lefttop">
          <div>
            <div>参赛学生数</div>
            <div>{{ entryInformation.studentCount }}</div>
          </div>
          <div>
            <div>参赛项目数</div>
            <div>{{ entryInformation.itemCount }}</div>
          </div>
          <div>
            <div>参赛团队数</div>
            <div>{{ entryInformation.teamCount }}</div>
          </div>
          <div>
            <div>参赛省份分布</div>
            <div>{{ entryInformation.provinceCount }}</div>
          </div>
          <div style="width: 62%">
            <div>参赛性别分布</div>
            <div>
              男{{ entryInformation.sexMale }}/女{{
                entryInformation.sexFemale
              }}/保密{{ entryInformation.sexSecurity }}
            </div>
          </div>
          <div>
            <div>参赛专业分布</div>
            <div>{{ entryInformation.major }}</div>
          </div>
          <div style="width: 62%">
            <div>参赛年级分布</div>
            <div>
              一年级{{ entryInformation.firstGrade }}/二年级{{
                entryInformation.secondGrade
              }}/三年级{{ entryInformation.thirdGrade }}
            </div>
          </div>
        </div>
        <div class="firsttitle">参赛高校分布</div>
        <div class="lefttable">
          <table
            class="table"
            border
            style="border-collapse: collapse; width: 100%"
          >
            <tr>
              <th>本科院校</th>
              <td colspan="3">
                <div
                  class="child"
                  style="border-right: 1px solid #dedede; float: left"
                >
                  <span style="float: left">双一流高校</span>
                  <span
                    style="float: right; color: #1281e2; padding-right: 10px"
                    >{{
                      universityDistribution1.doubleFirstClassUniversityCount
                    }}</span
                  >
                </div>
                <div class="child" style="float: right">
                  <span style="float: left">一般本科院校</span>
                  <span style="float: right; color: #1281e2">{{
                    universityDistribution1.commonUniversityCount
                  }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>高职院校</th>
              <td>
                <span>高水平高职学校</span>
                <span>{{ universityDistribution1.highCollogeCount }}</span>
              </td>
              <td>
                <span>高水平专业群建设学校</span>
                <span>{{
                  universityDistribution1.highProfessionalCollogeCount
                }}</span>
              </td>
              <td>
                <span>一般高职院校</span>
                <span>{{ universityDistribution1.commonCollogeCount }}</span>
              </td>
            </tr>
            <tr>
              <th>其他院校</th>
              <td colspan="3">
                <span>其他院校</span>
                <span>{{ universityDistribution1.otherCollogeCount }}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="firsttitle">参赛数据</div>
        <div class="downlast">
          <div v-for="(item, index) in lastlist2" class="lastbox" :key="index">
            <div class="name">
              <div>{{ item.name }}</div>
              <div>{{ item.content }}</div>
            </div>
            <div class="proportion">
              {{ item.proportion }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="firsttitle">获奖信息</div>
        <div class="lefttop">
          <div>
            <div>获奖学生数</div>
            <div>{{ awardData.studentCount }}</div>
          </div>
          <div>
            <div>获奖项目数</div>
            <div>{{ awardData.itemCount }}</div>
          </div>
          <div>
            <div>获奖团队数</div>
            <div>{{ awardData.teamCount }}</div>
          </div>
          <div>
            <div>获奖省份分布</div>
            <div>{{ awardData.provinceCount }}</div>
          </div>
          <div style="width: 62%">
            <div>获奖性别分布</div>
            <div>
              男{{ awardData.sexMale }}/女{{ awardData.sexFemale }}/报名{{
                awardData.sexSecurity
              }}
            </div>
          </div>
          <div>
            <div>获奖专业分布</div>
            <div>{{ awardData.major }}</div>
          </div>
          <div style="width: 62%">
            <div>获奖年级分布</div>
            <div>
              一年级{{ awardData.firstGrade }}/二年级{{
                awardData.secondGrade
              }}/三年级{{ awardData.thirdGrade }}
            </div>
          </div>
        </div>
        <div class="firsttitle">获奖高校分布</div>
        <div class="lefttable">
          <table
            class="table"
            border
            style="border-collapse: collapse; width: 100%"
          >
            <tr>
              <th>本科院校</th>
              <td colspan="3">
                <div
                  class="child"
                  style="border-right: 1px solid #dedede; float: left"
                >
                  <span style="float: left">双一流高校</span>
                  <span
                    style="float: right; color: #1281e2; padding-right: 10px"
                    >{{
                      universityDistribution.doubleFirstClassUniversityCount
                    }}</span
                  >
                </div>
                <div class="child" style="float: right">
                  <span style="float: left">一般本科院校</span>
                  <span style="float: right; color: #1281e2">{{
                    universityDistribution.commonUniversityCount
                  }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>高职院校</th>
              <td>
                <span>高水平高职学校</span>
                <span>{{ universityDistribution.highCollogeCount }}</span>
              </td>
              <td>
                <span>高水平专业群建设学校</span>
                <span>{{
                  universityDistribution.highProfessionalCollogeCount
                }}</span>
              </td>
              <td>
                <span>一般高职院校</span>
                <span>{{ universityDistribution.commonCollogeCount }}</span>
              </td>
            </tr>
            <tr>
              <th>其他院校</th>
              <td colspan="3">
                <span>其他院校</span>
                <span>{{ universityDistribution.otherCollogeCount }}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="firsttitle">获奖数据</div>
        <div class="downlast">
          <div v-for="(item, index) in lastlist3" class="lastbox" :key="index">
            <div class="name">
              <div>{{ item.name }}</div>
            </div>
            <div class="proportion">
              {{ item.proportion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../list/common/table.vue";
import network from "@/api/jxapi/index";
export default {
  created() {
    this.getList();
  },
  props: ["currentCId"],
  data() {
    return {
      awardData: {},
      entryInformation: {},
      universityDistribution: {},
      universityDistribution1: {},
      awardRate: {},
      lastlist1: [
        {
          name: "单校最高参赛团队占比",
          content: "最多高校参赛团队数/总参赛团队数",
          proportion: "",
        },
        {
          name: "双高参赛占比",
          content: "（高水平高职+高水平专业群建设学校参赛数）…",
          proportion: "",
        },
        {
          name: "参赛TOP20高校占比",
          content: "TOP20高校参赛数/总参赛数",
          proportion: "",
        },
        {
          name: "参赛TOP20高校双一流占比",
          content: "TOP20中参赛双一流高校/总参赛高校数",
          proportion: "",
        },
        {
          name: "双一流参赛占比",
          content: "双一流高校参赛数/总参赛高校数",
          proportion: "",
        },
        {
          name: "参赛性别比",
          content: "男/女/保密",
          proportion: "",
        },
        {
          name: "参赛年级比",
          content: "一/二/三/四/其他",
          proportion: "",
        },
      ],
      lastlist: [
        {
          name: "单校最高参赛团队占比",
          content: "最多高校参赛团队数/总参赛团队数",
          proportion: "",
        },
        {
          name: "双高参赛占比",
          content: "（高水平高职+高水平专业群建设学校参赛数）…",
          proportion: "",
        },
        {
          name: "参赛TOP20高校占比",
          content: "TOP20高校获奖数/总获奖数",
          proportion: "",
        },
        {
          name: "参赛TOP20高校双一流占比",
          content: "TOP20中获奖双一流高校/总获奖高校数",
          proportion: "",
        },
        {
          name: "双一流参赛占比",
          content: "双一流高校获奖数/总获奖高校数",
          proportion: "",
        },
        {
          name: "参赛性别比",
          content: "男/女/保密",
          proportion: "",
        },
        {
          name: "参赛年级比",
          content: "一/二/三/四/其他",
          proportion: "",
        },
      ],
      lastlist2: [
        {
          name: "最多高校参赛团队数量",
          proportion: "2324",
        },
        {
          name: "双高参赛团队数量",
          proportion: "2324",
        },
        {
          name: "TOP20高校参赛团队数量",
          proportion: "2324",
        },
        {
          name: "双一流参赛团队数量",
          proportion: "2324",
        },
      ],
      lastlist3: [
        {
          name: "最多高校参赛团队数量",
          proportion: "2324",
        },
        {
          name: "双高参赛团队数量",
          proportion: "2324",
        },
        {
          name: "TOP20高校参赛团队数量",
          proportion: "2324",
        },
        {
          name: "双一流参赛团队数量",
          proportion: "2324",
        },
      ],
    };
  },
  methods: {
    async getList() {

      //获奖数据
      let resData=await network.getCompetitionEnterProportionInfo({
        data:{
         competitionId: this.currentCId,
        }
      });
       if (resData == "error") return;
       if (resData.length !== 0) {
      }
      //参赛数据
      //   获奖信息
      let res = await network.getCompetitionEnterAwardInfo({
        data: {
          
        },
      });
      if (res == "error") return;
      if (res.length !== 0) {
        this.awardData = res[0];
      }
       console.log('getList',55555555);
      // 获奖占比
      let res1 = await network.getCompetitionEnterAwardProportionInfo({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res1 == "error") return;
      if (res1.length !== 0) {
        let obj = res1[0];
        this.lastlist[0].proportion = obj.singleHighestRate + "%";
        this.lastlist[1].proportion = obj.doubleHighRate + "%";
        this.lastlist[2].proportion = obj.topSchoolRate + "%";
        this.lastlist[3].proportion = obj.topDoubleFirstSchoolRate + "%";
        this.lastlist[4].proportion = obj.doubleFirstSchoolRate + "%";
        this.lastlist[5].proportion =
          "男" +
          obj.sexMaleRate +
          "%" +
          "/女" +
          obj.sexFemaleRate +
          "%" +
          "/保密" +
          obj.sexSecurityRate +
          "%";
        this.lastlist[6].proportion =
          "一年级" +
          obj.firstGrade +
          "%" +
          "/二年级" +
          obj.secondGrade +
          "%" +
          "/三年级" +
          obj.thirdGrade +
          "%" +
          "/四年级" +
          obj.fourthGrade +
          "%" +
          "/其它" +
          obj.otherGrade +
          "%";
      }
      // 竞赛获奖率，高校获奖率，竞赛奖项数量
      let res2 = await network.getCompetitionEnterProportionInfo({
        data: {
          competitionId: this.currentCId,
        },
      });
     
      if (res2 == "error") return;
      if (res2.length !== 0) {
         console.log(res2);
        res2[0].competitionAwardRate = res2[0]?.competitionAwardRate;
        res2[0].competitionSchoolAwardRat = res2[0]?.competitionSchoolAwardRate;
        this.awardRate = res2[0];
      }
      // 参赛信息
      let res3 = await network.getCompetitionEnterInfo({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res3 == "error") return;
      if (res3.length !== 0) {
        this.entryInformation = res3[0];
      }

      // 参赛占比
      let res4 = await network.getCompetitionEnterProportionInfo({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res4 == "error") return;
      if (res4.length !== 0) {
        console.log(res4,111);
        let obj1 = res4[0];
        this.lastlist1[0].proportion = obj1.singleHighestRate + "%";
        this.lastlist1[1].proportion = obj1.doubleHighRate + "%";
        this.lastlist1[2].proportion = obj1.topSchoolRate + "%";
        this.lastlist1[3].proportion = obj1.topDoubleFirstSchoolRate + "%";
        this.lastlist1[4].proportion = obj1.doubleFirstSchoolRate + "%";
        this.lastlist1[5].proportion =
          "男" +
          obj1.sexMaleRate +
          "%" +
          "/女" +
          obj1.sexFemaleRate +
          "%" +
          "/保密" +
          obj1.sexSecurityRate +
          "%";
        this.lastlist1[6].proportion =
          "一年级" +
          obj1.firstGrade +
          "%" +
          "/二年级" +
          obj1.secondGrade +
          "%" +
          "/三年级" +
          obj1.thirdGrade +
          "%" +
          "/四年级" +
          obj1.fourthGrade +
          "%" +
          "/其它" +
          obj1.otherGrade +
          "%";
      }

      // 获奖高校分布
      let res5 = await network.getCompetitionEnterSchoolAwardInfo({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res5 == "error") return;
      if (res5.length !== 0) {
        this.universityDistribution = res5[0];
      }

      // 参赛高校分布
      let res6 = await network.getCompetitionEnterSchoolInfo({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res6 == "error") return;
      if (res6.length !== 0) {
        this.universityDistribution1 = res6[0];
      }
    },
  },
};
</script>

<style scoped>
.current {
  background-color: #409eff !important;
  color: #fff;
}
/* .lastbox:last-child {
  width: 100%;
} */
.proportion {
  color: #228ae5;
}
.name > div:last-child {
  font-size: 14px;
  color: #878789;
  margin-top: 10px;
}
.lastbox {
  align-items: center;
  display: flex;
  justify-content: space-between;
  background: #f5fafe;
  padding: 15px;
  margin-bottom: 15px;
  text-align-last: left;
  width: 44%;
}
.downlast {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.lefttable {
  margin-top: 15px;
  margin-bottom: 15px;
}
.child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  /* padding: 0 px; */
}
.table {
  border-color: #dedede;
}
/* .table td{
    display: flex;
    justify-content: space-between;
    align-items: center;
} */
.table td {
  padding: 0 10px;
}
.table td > span:first-child {
  float: left;
}
.table td > span:last-child {
  float: right;
  color: #1281e2;
}
.table tr {
  height: 50px;
}
.table th {
  background: #f5fafe;
}
.lefttop {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
}
.lefttop > div > div:last-child {
  color: #228ae5;
}
.lefttop > div {
  padding: 15px;
  background: #f5fafe;
  width: 28%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.left {
  width: 47%;
  min-height: 200px;
  background-color: #fff;
  padding: 15px;
}
.right {
  width: 47%;
  min-height: 200px;
  padding: 15px;
  background-color: #fff;
}
.down {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
.jiang {
  display: flex;
  justify-content: space-between;
  max-height: 100px;
  background: #f5fafe;
}
.first {
  width: 98%;
  background-color: #fff;
  padding: 15px;
  display: flex;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
}
.firsttitle {
  font-size: 16px;
  color: black;
  font-weight: 800;
  margin-bottom: 15px;
  width: 100%;
  -moz-text-align-last: left;
  text-align-last: left;
  letter-spacing: 2px;
  position: relative;
  padding-left: 10px;
}
.firstcontent {
  padding: 13px;
  text-align: left;
  min-width: 53px;
  min-height: 52px;
  /* margin-top: 15px; */
  background: #f5fafe;
}
.firstcontent > div:first-child {
  font-size: 16px;
  color: #878789;
  margin-bottom: 10px;
}
.firstcontent > div:last-child {
  color: #57a5ec;
  font-size: 16px;
}
.firsttitle::before {
  content: "";
  position: absolute;
  left: 3px;
  top: 1px;
  width: 4px;
  height: 19px;
  background-color: #0078e1;
}
</style>
