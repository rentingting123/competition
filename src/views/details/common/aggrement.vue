<template>
<!-- 报名须知 -->
    <el-dialog
        :title="$t('competitionDetails.signupNotice')"
        :visible.sync="show"
        width="800px"
        :append-to-body='true'
        v-if="show"
        :close-on-click-modal= false
        >

        <editorShow :data='base && base.agreementInfo'/>

        <el-checkbox v-model="checked"  style="text-align:center;display: block;margin-top:30px;">
            {{$t('competitionDetails.agress')}}
        </el-checkbox>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="show = false">{{$t('competitionDetails.cancel')}}</el-button>
            <el-button type="primary" @click="ok">{{$t('competitionDetails.ok')}}</el-button>
        </span>
   </el-dialog>
</template>

<script>
import network from '@@/api/jxapi/index'
import editorShow from '@@/components/editor/show'
import { getBaseInfo } from "@@/utils/commons";

export default {
    components:{
        editorShow
    },
    props:['setAggrement','competitionId', 'info'],
    data(){
        return{
            show: true,
            base: '',
            checked: false
        }
    },
    created(){
        this.base = this.info || getBaseInfo();
    },
    methods:{
        async ok(){
            if(!this.checked) return this.$message.warning(this.$t('competitionDetails.isAgress'));
            
            let res = await network.setAgreement({data:{
                competitionId: this.competitionId
            }})
            if(res=='error') return;

            this.setAggrement && this.setAggrement(true)
        }
    },
    watch:{
        show(val){
            if(!val){
                return this.setAggrement && this.setAggrement(false)
            }
        }
    }

}
</script>

<style lang="less" scoped>
.dialog-footer{
    display: block;
    text-align: center;
}
</style>