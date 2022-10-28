<template>
    <el-dialog 
        :close-on-click-modal="false" 
        :modal-append-to-body='false'
        :visible.sync="show"
        :title="form.id?'修改主办方活动':'新增主办方活动'"
        width="800px"
        >
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="form">

            <el-form-item label="活动标题" prop="activityTitle">
                <el-input v-model="form.activityTitle"></el-input>
            </el-form-item>

            <!-- <el-form-item label="活动封面" prop="activityBanner">
                <div>
                    <upload accept=".jpg, .png, .gif, .jpeg" :onSuccess="success" :showlist="false" class="upload">
                        <img :src="form.activityBanner" v-if="form.activityBanner" style="width: 285px;height: 163px;">
                        <div v-else class="add">+</div>
                    </upload>
                </div>
            </el-form-item> -->

            <el-form-item label="活动时间" prop="time">
                <div>
                    <el-date-picker
                        v-model="form.time"
                        type="datetimerange"
                        range-separator="至"
                        format='yyyy-MM-dd HH:mm'
                        value-format='yyyy-MM-dd HH:mm'
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-form-item label="活动地址链接" prop="redirectUrl">
                <el-input v-model="form.redirectUrl"></el-input>
            </el-form-item>

            <!-- 20210514 删掉活动封面，活动列表的封面图直接使用视频封面展示 -->
            <el-form-item label="视频封面(建议宽高比1.78:1)" prop="videoBanner">
                <upload accept=".jpg, .png, .gif, .jpeg" :onSuccess="success1" :showlist="false" class="upload">
                    <img :src="form.videoBanner" v-if="form.videoBanner" style="width: 285px;height: 163px;">
                    <div v-else class="add">+</div>
                </upload>
            </el-form-item>

            <el-form-item label="视频列表" >
                <ul class="videoInfo">
                    <li>
                        <upload accept=".mp4" :onSuccess="successVideo" :showlist="false" class="upload">
                            <div class="add">+</div>
                        </upload>
                    </li>
                    <li v-for="item,i in form.videoInfo" :key="i">
                        <div class="img">
                            <video :src="item.url" controls></video>
                            <div class="button">
                                <upload accept=".mp4" :onSuccess="(file, filelist)=>{edit(file,i)}" :showlist="false" class="upload">
                                   <el-button type="primary" >修改</el-button>
                                </upload>
                                
                                <el-button type="primary" @click="del(i)">删除</el-button>
                            </div>
                        </div>
                        <el-input v-model="item.name" placeholder="请输入视频名称"></el-input>
                    </li>
                </ul>
            </el-form-item>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" @click="submit('form')">确 定</el-button>
        </span>

    </el-dialog> 
</template>
<script>
import network from '@@/api/jxapi'
import upload from '@@/components/fileUpload/index'
import moment from 'moment'
export default {
    props:['close', 'obj', 'id'],
    components:{
        upload
    },
    data(){
        return{
            show: true,
            form: {
                videoInfo: [],
                time: []
            },
            rules: {
                activityTitle: [
                    { required: true, message: '请输入活动标题', trigger: 'change' }
                ],
                // activityBanner: [
                //     { required: true, message: '请上传活动封面', trigger: 'change' }
                // ],
                videoBanner: [
                    { required: true, message: '请上传视频封面', trigger: 'change' }
                ],
                time: [
                    { required: true, message: '请选择活动时间', trigger: 'change' }
                ]
            }
        }
    },
    created(){
        let obj = {...this.obj}
        
        if(obj.videoInfo){
            obj.videoInfo = JSON.parse(obj.videoInfo)
        }else{
            obj.videoInfo = []
        }
        if(obj.startTime){
           obj.time = [obj.startTime, obj.endTime]
        }else{
            obj.time = []
        }
        this.form = obj
        console.log(this.form);
    },
    mounted(){
        
    },
    methods:{
        submit(name){
            this.$refs[name].validate(async (valid) => {
                if(!valid) return;

                for(let i in this.form.videoInfo){
                    if(!this.form.videoInfo[i].name){
                        return this.$message.warning('请输入视频名称')
                    }
                }
                
                let params = {
                    ...this.form,
                    videoInfo: JSON.stringify(this.form.videoInfo),
                    competitionId: this.id
                }

                if(this.form.time && this.form.time.length>1){
                    params.startTime = this.form.time[0]
                    params.endTime = this.form.time[1]
                }
                
                let res = await network.saveCompetitionActivity({data:params})
                if(res=='error') return;
                this.show = false
            })
        },
        // success(file){
        //     this.$set(this.form, 'activityBanner', file.location)
        // },
        success1(file){
            this.$set(this.form, 'videoBanner', file.location)
            this.$set(this.form, 'activityBanner', file.location)
        },
        successVideo(file){
            if(this.form.videoInfo && this.form.videoInfo.length>0){
                this.form.videoInfo.push({
                    name: '',
                    url: file.location
                })
            }else{
                this.$set(this.form, 'videoInfo', [{
                    name: '',
                    url: file.location
                }])
            }
        },
        del(i){
            this.form.videoInfo.splice(i, 1)
            if(this.form.videoInfo.length<1){
                this.form.videoInfo = ''
            }
        },
        edit(file, i){
            this.$set(this.form.videoInfo[i], 'url', file.location)
        },
    },
    watch:{
        show(val){
            if(!val) return this.close && this.close();
        }
    }
}
</script>
<style lang="less" scoped>
.form{
    text-align: left;
    .add{
        width: 120px;
        height: 120px;
        line-height: 120px;
        background: #F0F2F4;
        border-radius: 5px;
        text-align: center;
        font-size: 50px;
        color: #787D81;
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
    }
    .videoInfo{
        display: inline-block;
        vertical-align: top;
        li{
            width: 213px;
            height: 166px;
            display: inline-block;
            vertical-align: top;
            margin-right: 20px;
            margin-bottom: 20px;
            
            .img{
                width: 213px;
                height: 120px;
                margin-bottom: 10px;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                .button{
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    >div:first-child{
                        width: 70px !important;
                        margin-top: 0;
                        margin-right: 20px;
                    }
                }
                &:hover{
                    .button{
                        display: flex;
                    }
                }

            }
            &:first-child{
                width: 120px;
                height: 120px;
            }
        }
    }
}

</style>
