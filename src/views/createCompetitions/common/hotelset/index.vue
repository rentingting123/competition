<template>
  <div>
    <el-form :model="ruleFormHotel" ref="ruleFormHotel" label-width="0" class="demo-ruleForm">
      <div class="setting_model" v-for="(hotel, index) in ruleFormHotel.hotels" :key="index">
        <div class="hotel_name">
          <h1 class="title">合作酒店名称</h1>
          <el-form-item
            :prop="'hotels.' + index +'.name'"
            :rules="{ required: true, message: '请输入酒店地址', trigger: 'blur' }"
          >
            <el-input class="el-input-new" v-model="hotel.name" placeholder="请输入酒店名称"></el-input>
          </el-form-item>
          <div class="delname">
            <i
              class="iconfont"
              title="删除合作酒店"
              @click="handleHotelDel(index)"
              v-if="index > 0"
            >&#xe61e;</i>
          </div>
        </div>
        <div class="hotel_addr">
          <h1 class="title">合作酒店地址</h1>
          <el-form-item
            :prop="'hotels.' + index +'.address'"
            :rules="{ required: true, message: '请输入酒店地址', trigger: 'blur' }"
          >
            <el-input class="el-input-new" v-model="hotel.address" placeholder="请输入酒店地址"></el-input>
          </el-form-item>
        </div>
        <div class="hotel_phone">
          <h1 class="title">联系电话</h1>
          <el-form-item
            :prop="'hotels.' + index + '.contract_number'"
            :rules="{ required: false, message: '请输入联系电话', trigger: 'blur' }"
          >
            <el-input class="el-input-new" v-model="hotel.contract_number" placeholder="请输入负责人联系电话"></el-input>
          </el-form-item>
        </div>
        <div class="hotel_remark">
          <h1 class="title">
            备注
            <span>选填</span>
          </h1>
          <el-form-item :prop="'hotels.' + index + '.memo'">
            <el-input class="el-input-new" v-model="hotel.memo" placeholder="请输入备注内容,如是否包含早餐等"></el-input>
          </el-form-item>
        </div>
        <div class="room_type" v-for="(item, j) in hotel.rooms" :key="j">
          <p>
            <span class="title" style="margin-right: 110px">房型</span>
            <span class="title" style="margin-right: 30px">房间最大数</span>
            <span class="title" style="margin-right: 50px">床数/间</span>
            <span class="title">单价/间/晚</span>
          </p>
          <div class="room_type_name">
            <el-form-item
              :prop="'hotels.' + index + '.rooms.' + j + '.room_name'"
              class="room_type_item"
              :rules="{required: true, message: '请输入房型', trigger: 'blur'}"
            >
              <el-input class="room_type_input" v-model="item.room_name" placeholder="房型"></el-input>
            </el-form-item>
            <el-form-item
              :prop="'hotels.' + index + '.rooms.' + j + '.room_max'"
              class="room_type_item"
              :rules="{type:'number', required: true, message: '请输入数字', trigger: 'blur'}"
            >
              <el-input class="room_type_number" v-model.number="item.room_max" placeholder="数字"></el-input>
            </el-form-item>
            <el-form-item
              :prop="'hotels.' + index + '.rooms.' + j + '.bed_number'"
              class="room_type_item"
              :rules="{type:'number', required: true, message: '请输入数字', trigger: 'blur'}"
            >
              <el-input class="room_type_number" v-model.number="item.bed_number" placeholder="数字"></el-input>
            </el-form-item>
            <el-form-item
              :prop="'hotels.' + index + '.rooms.' + j + '.price'"
              class="room_type_item"
              :rules="{type:'number', required: true, message: '请输入数字', trigger: 'blur'}"
            >
              <el-input
                class="room_type_jiage"
                v-model.number="item.price"
                placeholder="单价:元"
                style="margin-right: 10px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="el-shanchu">
            <i class="iconfont" v-if="j>1" @click="handleRoomDel(index, j)" title="删除房型">&#xe61e;</i>
          </div>
        </div>
        <p class="add_room_type">
          <span @click="handleRoomAdd(index)">
            <i class="iconfont">&#xe62d;</i>
            <em>增加房型</em>
          </span>
        </p>
      </div>
      <p class="add_new_hotel">
        <span
          @click="handleHotelAdd()"
          style="display: inline-block;width: 430px; padding: 12px 0;background: #F9F9F9;"
        >
          <i class="iconfont">&#xe62d;</i>
          <em>增加合作酒店</em>
        </span>
      </p>
      <div class="group_btn">
        <el-button size="small" @click="Hotel = false">取消</el-button>
        <el-button size="small" type="primary" @click="submithotel('ruleFormHotel')">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import network from "@/api/jxapi";
export default {
  props: ['competitionId','close'],
  data() {
    return {
      Hotel: true,
      ruleFormHotel: {
        //酒店设置
        hotels: []
      },
      baseInfo: {}
    };
  },
  async created() {
    await this.getBaseInfo();
    this.getHotel();
  },
  methods: {
      async getBaseInfo(){
        let res = await network.getCompetitionDetail({id:this.competitionId});
        if(res=='error') return;
        this.baseInfo = res;
        localStorage.setItem('baseInfo',JSON.stringify(res));
      },
    /**
     * 获取酒店信息
     */
    async getHotel() {
      this.ruleFormHotel.hotels = this.baseInfo.competitionHotels.hotels;
    },
    /**
     * 删除酒店
     */
    handleHotelDel(i) {
      this.ruleFormHotel.hotels.splice(i, 1);
    },
    /**
     * @Description: 删除房型
     */
    handleRoomDel(i, j) {
      this.ruleFormHotel.hotels[i].rooms.splice(j, 1);
    },
    /**酒店设置
     * 增加房型
     */
    handleRoomAdd(i) {
      this.ruleFormHotel.hotels[i].rooms.push({
        room_name: "",
        room_max: "",
        bed_number: "",
        price: ""
      });
    },
    /**
     * @Description: 增加酒店
     */
    handleHotelAdd() {
      this.ruleFormHotel.hotels.push({
        name: "", //合作酒店名称
        address: "", //合作酒店地址
        contract_number: "", //联系电话
        memo: "", //备注
        rooms: [
          //房型 房间最大数 床数/间 单价/间/晚
          { room_name: "双人标间", room_max: "", bed_number: 2, price: "" },
          { room_name: "大床房", room_max: "", bed_number: 1, price: "" }
        ],
        new: true
      });
    },
    /**
     * 酒店设置提交
     */

    submithotel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveHotel();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 酒店设置保存提交信息
     */
    async saveHotel() {
      const obj = {
        id: this.competitionId,
        competitionHotels: {
          hotels: this.ruleFormHotel.hotels
        }
      };
      const res = await network.saveHotelApi({ data: obj });
      if (res == "error") return;
      this.ruleFormHotel.hotels = res.hotelInfo;
      this.$message.success("酒店设置成功");
      this.Hotel = false;
    }
  },
  watch:{
      Hotel(val){
          if(!val) return this.close && this.close();   
      }
  }
};
</script>
<style lang="less" scoped>
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0;
  cursor: pointer;
  span:nth-child(1) {
    font-weight: bold;
  }
}
.demo-ruleForm {
  margin-top: -25px;
}
.group_btn {
  border-top: 1px solid #dedede;
  text-align: right;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-bottom: -1.8rem;
}
.setting_model {
  //height: 480px;
  cursor: pointer;
  margin: 0 auto;
  overflow: auto;
  text-align: left;
  padding: 0px 150px;
  box-sizing: border-box;
  h1.title {
    font-size: 14px;
    color: #4a4a4a;
    margin-top: 20px;
    letter-spacing: 1px;
    span {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0.86px;
    }
  }
  .delname {
    cursor: pointer;
    float: right;
    margin-right: -30px;
    margin-top: -50px;
    i:hover {
      color: #d0021b;
    }
  }
  .type_select {
    .type_list {
      margin-top: 10px;
      display: flex;
      li {
        font-size: 14px;
        color: #1d86ff;
        margin-right: 10px;
        padding: 6px 10px;
        box-sizing: border-box;
        border: 1px solid #1d86ff;
        border-radius: 98px;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
        background: #1d86ff;
      }
    }
    .group_num {
      display: inline-block;
      margin-top: 6px;
      /deep/ .el-input-number {
        margin-top: 0.5rem;
      }
    }
    .group_num:first-child {
      margin-right: 130px;
    }
  }
  .radio_select {
    margin-top: 32px;
    font-size: 14px;
    color: #4a4a4a;
    .schoolNum {
      width: 126px !important;
    }
    .competition_group {
      display: inline-block;
    }
    .personage {
      vertical-align: top;
    }
    .uploadP {
      display: inline-block;
      .delete-btn {
        cursor: pointer;
        float: right;
      }
      /deep/ .el-upload-dragger {
        padding-top: 30px;
      }
      .el-upload__text {
        padding-top: 30px;
      }
      .el-upload__tip {
        padding-top: 10px;
      }
      .biaoming {
        border: 1px solid #1d86ff;
        border-radius: 5px;
        padding: 5px 20px 5px 20px;
        margin-top: -5px;
        float: left;
        color: #1d86ff;
        span {
          font-size: 14px;
          letter-spacing: 0;
        }
      }
      .cert {
        color: #ffffff;
        background-color: #1d86ff;
      }
      .yishengcheng {
        float: left;
        margin-left: 10px;
        i {
          color: #52c41a;
        }
        span {
          font-size: 16px;
          color: #787d81;
          letter-spacing: 0;
        } //clear: both;
      }
    }
    .el-danxiao {
      margin-left: -28px;
    }
    .el-school {
      margin-left: -15px;
    }
  } // 赛区分组
  .compe_teams {
    margin-top: 1.5rem;
    > span {
      font-size: 14px;
      color: #4a4a4a;
      display: inline-block;
      vertical-align: top;
    }
    margin-left: 0;
    > div {
      display: inline-block;
      text-align: left;
      width: 510px;
      .el-checkbox-group {
        label {
          margin-bottom: 0.3rem;
          &:nth-child(5) {
            margin-left: 0;
          }
        }
      }
    }
    .add-saiqu {
      margin-left: 55px;
      color: #1d86ff;

      font-size: 12px;
      letter-spacing: 0.86px;
      line-height: 22px;
      font-style: normal;
    }
    .el-school-type {
      margin-left: 2rem;
    }
    .el-school {
      margin-left: 13.2rem;
      margin-top: -1.5rem;
    }
  }
  .el-group-city {
    margin-left: 2.8rem;
    label:nth-child(10) {
      margin-left: 1rem;
    }
  }
  .year_select,
  .radio_select {
    /deep/ .el-form-item {
      margin-top: 10px;
    }
    .tag_type {
      display: inline-block;
      cursor: pointer;
      margin-right: 10px;
      font-size: 14px;
      color: #1d86ff;
      padding: 6px 10px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      i {
        margin-left: 10px;
      }
    }
    .add_tag {
      margin-top: 10px;
      display: inline-block;
      position: relative;
      font-size: 0;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      input {
        width: 115px;
        height: 31px;
        padding: 6px 10px;
        box-sizing: border-box;
        outline: none;
        border: 0;
        border-radius: 98px;
        background-color: transparent;
      }
      i {
        display: inline-block;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        position: absolute;
        top: -1px;
        right: -2px;
        color: #ffffff;
        background-color: #1d86ff;
      }
    }
    .active {
      color: #ffffff;
      background: #1d86ff;
    }
    .title {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 1px;
    }
  }
  .round_select .title {
    margin-bottom: 10px;
  }
}
.el-input-new {
  margin-top: 10px;
}
.room_type {
  p {
    .title {
      font-size: 14px;
      color: #4a4a4a;
      font-weight: bold;
    }
  }
  .room_type_name {
    margin-top: 9px;
    .room_type_item {
      display: inline-block;
      .room_type_input {
        width: 100px;
        margin-right: 38px;
      }
      .room_type_number {
        width: 60px;
        margin-right: 38px;
      }
      .room_type_jiage {
        width: 75px;
        margin-right: 38px;
      }
    }
  }
  .el-shanchu {
    cursor: pointer;
    float: right;
    margin-right: -5px;
    margin-top: -50px;
    i:hover {
      color: #d0021b;
    }
  }
}
.add_room_type {
  margin-top: 9px;

  font-size: 14px;
  color: #1d86ff;
  letter-spacing: 1px;
  span {
    cursor: pointer;
    i {
      margin: 0 0.2rem;
    }
  }
  em {
    font-style: normal;
  }
}
.add_new_hotel {
  padding-bottom: 20px;
  padding-top: 20px;
  cursor: pointer;

  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 1px;
  em {
    font-style: normal;
  }
}
</style>