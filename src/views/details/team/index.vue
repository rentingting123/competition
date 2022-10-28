<template>
    <div>
        <TeamDetail :isOut='isOut'/>
    </div>
</template>


<script>
import TeamDetail from './teamDetails.vue'
    export default {
        data(){
            return{
                isOut: false
            }
        },
        components: {
            TeamDetail,
        },
        beforeRouteEnter (to, from, next){
            if(from.fullPath=='/'){
                next(vm => {
                    vm.isOut = true
                })
            }
            next()
        }
    }
</script> 


