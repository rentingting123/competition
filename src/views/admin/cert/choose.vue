<template>
<div>
    <div class="clearfix">
        <div class="form">
            <el-form ref="form"  :model="form" label-width="80px">
                <el-form-item>
                    <el-button size="small"  @click="back" type="primary">返回列表</el-button>
                    <el-button size="small"  @click="next" type="primary">下一步</el-button>
                </el-form-item>
                <el-form-item label="横版：">
                    <div class="type">
                        <p @click="changetype(3)" :class="{'on':type==3}">模板1</p>
                        <p @click="changetype(4)" :class="{'on':type==4}">模板2</p>
                    </div>
                </el-form-item>
                <el-form-item label="竖版：">
                    <div class="type">
                        <p @click="changetype(5)" :class="{'on':type==5}">模板1</p>
                        <p @click="changetype(6)" :class="{'on':type==6}">模板2</p>
                        <p @click="changetype(8)" :class="{'on':type==8}">模板3</p>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="img" :class="{'on':type==3||type==4}" >
        <img :src="url" v-if="url" width="100%" height="100%">
    </div>
</div>
</template>

<script>
export default {
    props:['certs','setCerts','backurls'],
    data(){
        return{
            form:{},
            url: 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/SLvD9yEB_1563264878699/type3.png',
            type: 3,
        }
    },
    created(){
        this.certlist = this.certs
        this.type = this.certs && this.certs.templateId || 3
    },
    methods:{
        changetype(index){
            this.certlist.templateId = index
            this.certlist.backUrl = ''
            this.type = index
        },
        next(){
            if(this.certlist.templateId = this.certlist.templateId || 3)
            return this.setCerts && this.setCerts(this.certlist, 2)
        },
        back(){
            if(this.backurls){
                this.$router.push(this.backurls)
            }else{
                this.$router.push('/admin/cert')
            }
        }
    },
    watch:{
        type(val){
            if(!val) return;
            if(val==3){
                this.url = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/SLvD9yEB_1563264878699/type3.png'
            }else if(val==4){
                this.url = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/sOS5rj2u_1563264912928/type4.png'
            }else if(val==5){
                this.url = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/DmUNlaWm_1563264963026/type5.png'
            }else if(val==6){
                this.url = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/KUgRC2iB_1563264983700/type6.png'
            }else if(val==8){
                this.url = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/KUgRC2iB_1563264983700/type7.png'
            }
        }
    }
}
</script>


<style lang="less" scoped>
.form{
    text-align: left;
    margin-top: 20px;
    width: 800px;
    float: left;
}
.type{
    width: auto;
    height: 25px;
    p{
        width: 53px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #E2E2E2;
        border-radius: 2px;
        font-size: 14px;
        color: #979797;
        display: inline-block;
        margin-right: 28px;
        text-align: center;
        cursor: pointer;
    }
    p.on{
        color: #1D86FF;
        border: 1px solid #0078E2;
    }
}
.img{
    width: 1116px;
    height: 1578.6px;
    padding-bottom: 50px;
}
.img.on{
    width: 1052.4px;
    height: 744px;
}
</style>
