<template>
    <div>
        <h3>{{title}}</h3>
    </div>
</template>

<script>
export default {
    props: ['title', 'on' ],
}
</script>

<style lang='less' scoped>
div{
    display: inline-block;
    vertical-align: top;
    h3{
        width: auto;
        display: inline-block;
        height: 44px;
        line-height: 44px;
        background: #FFFFFF;
        border-radius: 5px 5px 0px 0px;
        font-size: 14px;
        font-weight: 400;
        color: #4A4A4A;
        letter-spacing: 1px;
        text-align: left;
        background: #ffffff;
        padding: 0 10px;
    }
}
</style>
