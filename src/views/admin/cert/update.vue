<template>
    <div>
        <choose class="mt" :setCerts='setCerts' :certs="certs" v-if="type==1 && certs" :backurls='backurl'/>
        <set class="mt" :setCerts='setCerts' :certs="certs" v-else-if="type==2 && certs" :backurls='backurl'/>
        <look class="mt" :setCerts='setCerts' :competitionId='competitionId' :certs="certs" v-else-if="type==3 && certs" :backurls='backurl'/>
    </div>
</template>

<script>
import set from './set'
import choose from './choose'
import look from './look'
import network from '@@/api/jxapi'
export default {
    props:['backurl'],
    components:{
        set,
        choose,
        look,
    },
    data(){
        return{
            type: '',
            competitionId:'',
            certs:''
        }
    },
    created(){
        this.competitionId = this.$route.query.competitionId
        this.type = this.$route.query.type
        this.geCertdetail()
    },
    methods:{
        async geCertdetail(){
            // 生成证书,0初始化,1可操作,2操作中,3操作完成
            let res = await network.geCertdetail({data:{
                competitionId: this.competitionId
            }});
            if(res=='error') return;
            if(!res) return this.certs = {}
            this.certs = res
        },
        setCerts(certs,type){
            this.type = type
            if(certs){
                this.certs = certs;
            }
        }
    }
}
</script>
<style lang="less">
.mt {
  margin-top: 100px;
}
</style>
