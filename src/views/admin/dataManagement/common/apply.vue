<template>
  <div>
    <!-- 引导，全屏滚动 -->
    <!-- 210326不传参数时显示问题，传参数时显示图片 -->
    <div  @click="show = true" v-if="!src"><i class="el-icon-download"></i>竞赛报告</div>

    <div
      id="conduct"
      class="conduct"
      v-if="imgShow && src"
      @mouseover="clearIntervals"
      @mouseleave="animate"
    >
      <i class="el-icon-close" @click="close"></i>
      <img @click="toconduct" :src="src" width="100" srcset="" />
    </div>


    <el-dialog
      :title="type == '9' ? '教师发展分析报告' : '竞赛分析报告'"
      :visible.sync="show"
      style="margin-top:10px;"
    >
      <el-form :model="form" ref="form" label-width="110px">
        <el-form-item
          label="姓名"
          prop="name"
          :rules="[{ required: true, message: '姓名不能为空' }]"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="电话号码"
          prop="phone"
          :rules="[
            { required: true, message: '电话号码不能为空' },
            { min: 11, max: 11, message: '手机号码格式错误', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="form.phone"
            :minlength="11"
            :maxlength="11"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="对标学校1"
          prop="school1"
          :rules="[{ required: true, message: '对标学校1不能为空' }]"
        >
          <schoolList v-model="form.school1" />
        </el-form-item>
        <el-form-item
          label="对标学校2"
          prop="school2"
          :rules="[{ required: false, message: '对标学校2不能为空' }]"
        >
          <schoolList v-model="form.school2" />
        </el-form-item>
        <el-form-item
          label="对标学校3"
          prop="school3"
          :rules="[{ required: false, message: '对标学校3不能为空' }]"
        >
          <schoolList v-model="form.school3" />
        </el-form-item>
        <el-form-item
          label="对标学校4"
          prop="school4"
          :rules="[{ required: false, message: '对标学校4不能为空' }]"
        >
          <schoolList v-model="form.school4" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import schoolList from "./OrgInput";
export default {
  props: ["type", "src"],
  components: {
    schoolList,
  },
  data() {
    return {
      imgShow: true,
      interval: "",
      i: 15,
      j: 20,
      userId: "",
      id: "",
      show: false,
      form: {
        phone: "",
        name: "",
        school1: "",
        school2: "",
        school3: "",
        school4: "",
      },
      top: 0,
      left: 0,
    };
  },
  created() {
    let user =
      this.$webapi.getlocal("userInfo") &&
      JSON.parse(this.$webapi.getlocal("userInfo"));
    this.userId = user && user.id;
    let selectGroup =
      this.$webapi.getlocal("selectGroup") &&
      JSON.parse(this.$webapi.getlocal("selectGroup"));
    this.id = selectGroup && selectGroup.objectId;
    this.form.group = selectGroup;

    this.$nextTick(() => {
      this.animate();
    });
  },
  beforeDestroy() {
    this.clearIntervals();
  },
  methods: {
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;

        let schools = [this.form.school1];
        if (this.form.school2 && !schools.includes(this.form.school2)) {
          schools.push(this.form.school2);
        }
        if (this.form.school3 && !schools.includes(this.form.school3)) {
          schools.push(this.form.school3);
        }
        if (this.form.school4 && !schools.includes(this.form.school4)) {
          schools.push(this.form.school4);
        }
        delete this.form.school2;
        delete this.form.school3;
        delete this.form.school4;
        delete this.form.school1;
        this.form.schools = schools;

        this.$api
          .post("/nodeapi/school/apply/set", {
            id: this.id,
            userId: this.userId,
            type: this.type,
            html: this.form,
          })
          .then((res) => {
            if (res) {
              this.$message.success("申请成功，稍后会有工作人员联系您");
              this.cancel();
            }
          });
      });
    },
    toconduct() {
      let box = document.getElementById("conduct");
      this.top = box.offsetTop;
      this.left = box.offsetLeft;
      this.show = true;
      this.imgShow = false;
      this.clearIntervals();
    },
    close() {
      this.imgShow = false;
      this.clearIntervals();
    },
    cancel() {
      this.form = {
        phone: "",
        name: "",
        school1: "",
        school2: "",
        school3: "",
        school4: "",
      };
      this.show = false;
      this.imgShow = true;
      this.$nextTick(() => {
        let box = document.getElementById("conduct");
        if (box && this.top) {
          box.style.top = this.top + "px";
          this.top = 0;
        }
        if (box && this.left) {
          box.style.left = this.left + "px";
          this.left = 0;
        }
        this.animate();
      });
    },
    clearIntervals() {
      clearInterval(this.interval);
    },
    animate() {
      let cwidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      let cheight =
        window.innerHeight ||
        window.screen.height ||
        document.body.clientHeight ||
        document.documentElement.clientHeight;
      let box = document.getElementById("conduct");
      if (!box) return;
      let width = box.clientWidth;
      let height = box.clientHeight;
      this.interval = setInterval(() => {
        let top = box.offsetTop,
          left = box.offsetLeft;

        if (left + width + Math.abs(this.j) > cwidth) {
          this.j = -Math.abs(this.j);
        }
        if (left - Math.abs(this.j) < 0) {
          this.j = Math.abs(this.j);
        }
        if (top + height + Math.abs(this.i) > cheight) {
          this.i = -Math.abs(this.i);
        }
        if (top - Math.abs(this.i) < 0) {
          this.i = Math.abs(this.i);
        }
        box.style.left = left + this.j + "px";
        box.style.top = top + this.i + "px";
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.conduct {
  width: auto;
  height: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  transition: 0.5s all linear;
  i {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 20px;
    // background: #ffffff;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
  }
  img {
    cursor: pointer;
  }
}
</style>
