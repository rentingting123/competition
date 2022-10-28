<template>
  <div class="time_shaft">
    <div class="back_line">
      <div class="current_line" :style="{width: timePercent/validPlanCount*100+'%'}"></div>
    </div>
    <div class="dot_line flexRowBetween">
      <div
        class="plan"
        v-for="(plan,index) in plans"
        :key="index"
        :style="{left:index/validPlanCount*100+'%'}"
      >
        <div v-if="plan.isNeed && plan.display">
          <p class="time">{{formatSchedule(plan.startTime)}}</p>
          <p
            :class="`dot ${formatSchedule(new Date())==formatSchedule(plan.startTime)?'now':(new Date()>new Date(plan.startTime)?'active':'')}`"
          ></p>
          <p class="name">{{plan.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jxapi from "@@/api/jxapi/index";
import moment from "moment";

export default {
  data() {
    return {
      validPlanCount: 5,
      timePercent: 0,
      plans: [] // 竞赛计划
    };
  },
  props: {
    id: [Number, String],
    flag: Boolean
  },
  async created() {
    this.init();
  },
  methods: {
    async init() {
      this.plans = [];
      let times = await jxapi.getTimesLists({
        data: { competitionId: this.id }
      });
      if (times == "error") return;
      times.map(item => {
        if (item.isNeed && item.display) {
          this.plans.push(item);
        }
      });
      // this.plans = times

      this.getTimePercent();
    },
    getTimePercent() {

      let current = new Date();
  
      if (this.plans.length < 1) return;
      let start = new Date(this.plans[0].startTime);
      let index = 0;
      for (let i = this.plans.length - 1; i > 0; i--) {
        if (this.plans[i].isNeed && this.plans[i].display) {
          this.validPlanCount = i;
          this.timePercent = i;
          break;
        }
      }
      for (let i = this.plans.length - 1; i > -1; i--) {
        let startTime = new Date(this.plans[i].startTime);
        
        if (current <= startTime||this.formatSchedule(current)==this.formatSchedule(startTime)) {
          this.timePercent = i;
          //当检查到当天就跳出循环以免有多个赛段在当天开始
          if(this.formatSchedule(current)==this.formatSchedule(startTime))break;
        }
      }
    },
    formatSchedule(time) {
      if (!time) return "";
      return moment(time).format("M月DD日");
    }
  },
  watch: {
    flag(val) {
      if (!val) {
        this.init();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.time_shaft {
  margin-top: 2rem;
  height: 4rem;
  position: relative;
  margin-left: 6rem;
  margin-right: 2.5rem;
  width: 50rem;
  .back_line {
    position: absolute;
    top: 50%;
    margin-top: -10px;
    z-index: 1;
    width: 50rem;
    height: 4px;
    background: #dedede;
    border-radius: 2px;
    .current_line {
      background: #1d86ff;
      height: 4px;
      border-radius: 2px;
    }
  }
  .dot_line {
    position: absolute;
    top: 0;
    left: 0;
    width: 50rem;
    z-index: 1;
    height: 4rem;
    font-size: 0.7rem;
    color: #4a4a4a;
    letter-spacing: 0.2px;
    margin-left: -2rem;
    .plan {
      position: absolute;
      text-align: center;
      width: 4.3rem;
      z-index: 1;
      cursor: pointer;
      .time {
        height: 15.2px;
        // visibility: hidden;
      }
      .name {
        // visibility: hidden;
      }
      &:first-child {
        .name,
        .time {
          position: relative;
          left: 1.7rem;
          text-align: left;
        }
      }
      &:last-child {
        .name,
        .time {
          position: relative;
          right: 1.7rem;
          text-align: right;
        }
      }
    }
    .plan:hover {
      .time {
        height: 15.2px;
        visibility: visible;
      }
      .name {
        visibility: visible;
      }
    }
    .dot.now {
      border: 3px solid #1d86ff;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      50% {
       // background-color: transparent;
        box-shadow: 0 0 5px 3px #1d86ff;
      }
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid #dedede;
      display: inline-block;
    }
    .dot.active {
      border: 3px solid #1d86ff;
    }
  }
}
</style>

