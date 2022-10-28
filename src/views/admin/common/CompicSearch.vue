<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入竞赛名称"></el-input>
        <el-button type="primary">查看竞赛分析</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="value" placeholder="请选择">
          <el-option label="国赛·大学生结构赛" value="国赛·大学生结构赛"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="80px" label="年份筛选">
          <el-date-picker v-model="value" type="year" placeholder="选择年"></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {},
  created () { },
  mounted () { }
}
</script>

<style scoped lang='less'>
</style>
