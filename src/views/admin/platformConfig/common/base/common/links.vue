<template>
    <div class="allP">
        <p class="bastitle">友情链接</p>
        <div class="phone">
            <div class="alink" v-for="(item,index) in links" :key="index">
                <el-input class="input" v-model="item.name" placeholder="请输入链接名称" />
                <el-input class="input" v-model="item.url" placeholder="请输入链接地址" />
                <i class="iconfont" @click="dellink(index)">&#xe61e;</i>
            </div>
            <el-button class="add" size="small" type="primary" @click="addlink">
                <i class="el-icon-circle-plus"></i> 增加
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['lists'],
    computed:{
        links(){
            return this.lists
        }
    },
    methods:{
        addlink() {
            this.links.push({ name: "", url: "" });
        },
        dellink(i) {
            this.links.splice(i, 1);
        },
    }
}
</script>

<style lang='less' scoped>
.bastitle{
    font-size: 17px;
    color: #4a4a4a;
    letter-spacing: 1.21px;
}
.phone{
    .alink{
        margin-top: 20px;
        .input{
            width: 200px;
            margin-right: 20px;
        }
        i{
            cursor: pointer;
        }
    }
    .add{
        margin-top: 20px;
    }
}
</style>