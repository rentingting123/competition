<template>
    <div class="bannerContainer">
        <div class="tip">最多可上传5张</div>
        
        <ul class="bannerLists">
            <li v-for="(list,index) in banners" :key="index">
                <div class="img">
                    <img :src="list.url" >
                    <span>
                        <el-upload style="display:inline-block;" :before-upload="(file)=>edit(file, index)" :show-file-list="false" action="/">
                            <i class="el-icon-edit-outline"></i>
                        </el-upload>
                        <i class="el-icon-delete" @click="del(index)"></i>
                        <i class="iconfont" @click="up(index)">&#xe633;</i>
                    </span>
                </div>
                <el-input v-model="list.href" placeholder="请输入链接地址"></el-input>
            </li>
        </ul>
        <el-upload :before-upload="add" :show-file-list="false" action="/">
            <el-button type="primary" class="addButton" v-if="banners.length<5">新增</el-button>
        </el-upload>

        <el-button type="primary" @click="saveBanner" class="submit">保存</el-button>
    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import Upload from "@/components/fileUpload/spaceNotice.vue";
import { getGroupId } from '@@/utils/commons'
export default {
    data(){
        return{
            groupId: '',
            banners: [],
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init() {
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            this.banners = data && data.bannerList || []
        },
        saveBanner() {
            let params = {
                objectId: this.groupId,
                bannerList: this.banners
            }
            this.save(params)
        },
        async save(param) {
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
            this.$message.success("保存成功");
        },
        add(file){
            Upload.upload({ file: file }).then(ret => {
                this.banners.unshift({
                    url: ret.location,
                    href: ''
                })
            });
            return false
        },
        edit(file, i){
            Upload.upload({ file: file }).then(ret => {
                this.$set(this.banners[i],'url',res.location)
            });
            return false
        },
        del(i){
            this.banners.splice(i, 1);
        },
        up(i){
            if(i==0){
                return this.$message.warning('已经是第一个')
            }
            let b = this.banners[i]
            this.banners.splice(i, 1)
            this.banners.unshift(b)
        }
    }
}
</script>

<style lang='less' scoped>
.bannerContainer{
    .tip {
        color: #666;
        line-height: 24px;
        margin-bottom: 20px;
        font-size: 14px;
    }
    .bannerLists{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li{
            width: 45%;
            height: auto;
            display: inline-block;
            margin-top: 20px;
            border: 1px solid #eeeeee;
            padding: 10px;
            .img{
                display: block;
                margin: 10px auto;
                width: 288px;
                height: 93px;
                position: relative;
                span{
                    display: none;
                    position: absolute;
                    background: rgba(0, 0, 0, 0.6);
                    width: 100%;
                    height: 100%;
                    line-height: 93px;
                    text-align: center;
                    top: 0%;
                    left: 0%;
                    i{
                        font-size: 24px;
                        margin: 0 10px;
                        cursor: pointer;
                        color: #ffffff;
                    }
                }
                &:hover{
                    span{
                        display: block;
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .addButton{
        display: block;
        margin-top: 10px;
    }
    .submit{
        display: block;
        margin: 20px auto 0;
    }
}
</style>