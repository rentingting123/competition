<template>
    <div id="register">
        <register type="2" />
    </div>
</template>

<script>
import register from './common/register'
import {removeToken} from '@/utils/oauth'
export default {
    components:{
        register
    },
    beforeDestroy(){
         removeToken()
        localStorage.removeItem('userInfo')
        
    }
}
</script>

<style lang="less" scoped>
#register{
    background-image: linear-gradient(-180deg, #29dfb2 0%, #019fff 100%);
}
</style>
