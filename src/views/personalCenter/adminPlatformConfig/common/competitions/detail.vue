<template>
    <div class="detail" @click="toDetail">
        <div class="img" >
            <div :style="{backgroundImage: 'url(' + obj.logo + ')'}"></div>
        </div>
        <div class="detailmain">
            <h3 class="name textOverflow">{{obj.name}}</h3>
            <div class="descrption ellipsis4">{{obj.descrption}}</div>
            <div class="botton">
                <p class="left">
                    <el-input v-if="edit" size="mini" v-model="obj.message" class="input" placeholder="请输入类型"></el-input>
                    <span v-else>{{obj.message}}</span>
                </p>
                <p class="right">
                    <span><i class="iconfont">&#xe677;</i>参赛人数{{obj.personNum}}</span>
                    <span><i class="iconfont">&#xe678;</i>覆盖院校{{obj.schoolNum}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['obj','edit'],
    data(){
        return{

        }
    },
    methods:{
        toDetail(){
            if(this.edit) return
            if(!this.obj.url) return
            let url = this.obj.url.indexOf('http') == -1 ? 'http://' + this.obj.url : this.obj.url
            window.open(url)
        }
    }
}
</script>

<style lang='less' scoped>
.detail{
    width: 379px;
    height: 297px;
    border: 1px solid #DEDEDE;
    margin: 0 auto;
    cursor: pointer;
    .img{
        width: 379px;
        height: 162px;
        overflow: hidden;
        div{
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
        &:hover{
            div{
                transform: scale(1.1);
            }
        }
    }
    .detailmain{
        padding: 16px;
        .name{
            font-size: 16px;
            font-weight: 500;
            color: #4A4A4A;
            line-height: 22px;
            letter-spacing: 1px;
        }
        &:hover{
            .name{
                color: #6283ff;
            }
        }
        .descrption{
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(74, 74, 74, 0.5);
            line-height: 20px;
            overflow: hidden;
            margin: 10px 0;
        }
        .ellipsis4{
            overflow: hidden;
            word-break: break-all;
            display: -webkit-box;
            /*! autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .botton{
            font-size: 11px;
            font-weight: 500;
            color: #4A4A4A;
            line-height: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                font-size: 14px;
                font-weight: normal;
                color: #4A4A4A;
            }
            .right{
                font-size: 11px;
                font-weight: 500;
                color: #4A4A4A;
                line-height: 16px;
                i{
                    color: #9B9B9B;
                    margin-right: 3px;
                    font-size: 10px;
                }
                span{
                    color: #9B9B9B;
                    margin-left: 10px;
                }
            }
        }

    }

}
</style>