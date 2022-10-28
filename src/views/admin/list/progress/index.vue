<template>
    <div class="progress">
       <div v-for="list in lists" class="lists" :key="list.id" :class="{'disabled': finish}">
           <span :class="{'on': list.flag}"></span><p>/</p>
       </div>
    </div>
</template>

<script>
export default {
    props:['finish','signup','work','expert'],
    data(){
        return{
            lists:[
                {
                    id: 1,
                    flag: false
                },
                {
                    id: 2,
                    flag: false
                },
                {
                    id: 3,
                    flag: false
                },
            ]
        }
    },
    mounted(){
        if(this.signup){
            this.$set(this.lists[0],'flag', true)
        }
        if(this.work){
            this.$set(this.lists[1],'flag', true)
        }
        if(this.expert){
            this.$set(this.lists[2],'flag', true)
        }
    }

}
</script>

<style lang='less' scoped>
.progress{
    display: flex;
    justify-content: center;
    align-items: center;
    .lists{
        span{
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 100%;
            background: red;
            &.on{
                background: #3FBF8F;
            }
        }
        p{
            display: inline-block;
            color: #D0D0D0;
            font-size: 8px;
            margin: 0 5px;
        }
        &:last-child{
            p{
                display: none;
            }
        }
        &.disabled{
            span{
                background: #D0D0D0;
            }
        }
    }
}
</style>