<template>
  <el-select
    class="org-select"
    filterable
    :value="value"
    reserve-keyword
    remote
    :remote-method="remoteMethod"
    @change="change"
    :loading="loading"
    placeholder="请输入学校名称"
  >
    <el-option
      v-for="item in schoolList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import network from "@/api/jxapi/index";
export default {
  props: {
    shoolChange: Function,
    value: String,
  },
  model:{
      prop:'value',
      event:'changed',
  },
  data() {
    return {
      schoolList: [],
      loading: false,

    };
  },
  methods: {
    change(v) {

      this.$emit('changed',v)
      this.shoolChange && this.shoolChange(v);
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

      const data = await network.schools({ data: param });
      if (data == "error") return;
      if (!data) {
        this.schoolList = [];
        return;
      }
      this.schoolList = data.map((r) => {
        return {
          value: r.schoolcolName + "@" + r.schoolcolCodeID,
          label: r.schoolcolName,
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
.org-select{
    display: inline-block;
    width: 100%;
}
</style>
