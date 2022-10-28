<template>
<div class='meterial'>
    <el-button :disabled="disable" size="small" class="el-add-isEdit"  @click="materialData">
      {{baseInfo&& baseInfo.materialName || $t('competitionDetails.supplementaryMaterials')}}
    </el-button>
  <!-- 补交资料 -->
    <el-dialog
        title=""
        :visible.sync="material"
        width="600px"
        :close-on-click-modal= false
       >
      <meterial :close="close"/>
    </el-dialog>

</div>

</template>

<script>

import { getBaseInfo } from "@@/utils/commons";
import meterial from './meterial'
import { tologin } from '@/utils/util'
import { getToken } from "../../../utils/oauth";

export default {
  props:['disable'],
  components: {
    meterial
  },
  data(){
      return{
          material:false,
          baseInfo: {}
      }
  },
  created(){
    this.baseInfo = getBaseInfo()
  },
  methods:{

    materialData() {
      if (!getToken()) {
        return tologin();
      }
      this.material = true;
    },
    close(){
      this.material = false
    }
  }
}
</script>

<style lang="less" scoped>
.meterial{
    display: inline-block
}
</style>
