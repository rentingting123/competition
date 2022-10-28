<template>
    <div class="partnerSet">
        <h3>设置机构</h3>
        <ul class="organizationList">
            <li v-for="(list,index) in organizationList" :key="index">
                <img :src="list.logo" >
                <span>
                    <i class="el-icon-edit-outline" @click="editOrganizations(list,index)"></i>
                    <i class="el-icon-delete" @click="delOrganizations(index)"></i>
                </span>
            </li>
            <li @click="addOrganizations" class="addOrganizations">
                <p>+</p>
            </li>
        </ul>

        <h3>设置合作伙伴</h3>
        <ul class="organizationList partnerList">
            <li v-for="(list,index) in partnerList" :key="index">
                <img :src="list.logo" >
                <span>
                    <i class="el-icon-edit-outline" @click="editPartners(list, index)"></i>
                    <i class="el-icon-delete" @click="delPartners(index)"></i>
                </span>
            </li>
            <li class="addOrganizations" @click="addPartners">
                <p>+</p>
            </li>
        </ul>

        <div>
            <el-button type="primary" @click="save" class="submit">保存</el-button>
        </div>

        <!-- 设置机构 -->
        <el-dialog :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="organizationshow">
			<div>
                <upload
                    width='80px'
                    height='80px'
                    :onSuccess="handleAvatarSuccess"
                    :onError="handleError"
                    :showlist='false'
                    accept='.png, .jpg'
                    >
                    <div class="organizationLogo">
                        <img v-if="Obj.logo" :src="Obj.logo" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                </upload>
                <el-input v-model="Obj.name" class="input" placeholder="请输入名称" ></el-input>
                <el-input v-model="Obj.url" class="input" placeholder="请输入跳转网址"></el-input>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="submit" >确认</el-button>
                <el-button type="primary" @click="cancel" >取消</el-button>
            </div>
		</el-dialog>

        <!-- 设置合作伙伴 -->
        <el-dialog :modal-append-to-body="false" :close-on-click-modal= false :visible.sync="partnershow">
			<div>
                <upload
                    width='232px'
                    height='50px'
                    :onSuccess="handleAvatarSuccess"
                    :onError="handleError"
                    :showlist='false'
                    accept='.png, .jpg'
                    >
                    <div class="organizationLogo partnerLogo">
                        <img v-if="Obj.logo" :src="Obj.logo" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                </upload>
                <el-input v-model="Obj.url" class="input" placeholder="请输入跳转网址"></el-input>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="partnerSubmit" >确认</el-button>
                <el-button type="primary" @click="cancel" >取消</el-button>
            </div>
		</el-dialog>
    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import upload from "@/components/fileUpload/index"
import { getGroupId } from '@@/utils/commons'
export default {
    components:{
        upload
    },
    data(){
        return{
            organizationList: [], //机构列表
            organizationshow: false, //机构弹窗
            Obj: {}, //弹窗中数据
            Index: '', //修改时index
            isEdit: false, //是否为修改弹窗
            partnerList: [], //合作伙伴
            partnershow: false, //合作伙伴弹窗
        }
    },
    created(){
         this.init()
    },
    methods:{
        async init(){
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            this.organizationList = data && data.organizationList || []
            this.partnerList = data && data.partnerList || []
        },
        submit(){
            if(!this.Obj.logo){
                return this.$message.warning('请上传图片')
            }
            if(!this.Obj.name){
                return this.$message.warning('请输入姓名')
            }
            if(this.isEdit){
                // 修改
                this.organizationList.splice(this.Index, 1, this.Obj)
                this.organizationshow = false
            }else{
                // 新增
                this.organizationList.push(this.Obj)
                this.organizationshow = false
            }
        },
        partnerSubmit(){
            if(!this.Obj.logo){
                return this.$message.warning('请上传图片')
            }
            if(this.isEdit){
                // 修改
                this.partnerList.splice(this.Index, 1, this.Obj)
                this.partnershow = false
            }else{
                // 新增
                this.partnerList.push(this.Obj)
                this.partnershow = false
            }
        },
        cancel(){
            this.isEdit = false
            this.Obj = {}
            this.organizationshow = false
            this.partnershow = false
        },
        handleAvatarSuccess(res, file){
            this.$set(this.Obj,'logo',res.location)
        },
        handleError(err, file, fileList) {
            this.$message.error("上传文件失败");
        },
        addOrganizations(){
            this.isEdit = false
            this.organizationshow = true;
            this.Obj = {}
        },
        editOrganizations(list, index){
            this.isEdit = true
            this.organizationshow = true;
            this.Index = index
            this.Obj = list || {}
        },
        // 删除组织
        delOrganizations(index){
            this.organizationList.splice(index, 1);
        },
        addPartners(){
            this.isEdit = false
            this.partnershow = true;
            this.Obj = {}
        },
        editPartners(list, index){
            this.isEdit = true
            this.partnershow = true;
            this.Index = index
            this.Obj = list || {}
        },
        // 删除组织
        delPartners(index){
            this.partnerList.splice(index, 1);
        },
        async save(){
            let param = {
                objectId : this.groupId,
                partnerList: this.partnerList,
                organizationList: this.organizationList,
            }
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
            this.$message.success("保存成功");
        },
    }
}
</script>

<style lang='less' scoped>
.partnerSet{
    padding: 0 20px;
    h3{
        margin: 20px 0;
        text-align: left;
    }
    .organizationList{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        li{
            width: 80px;
            height: 80px;
            overflow: hidden;
            position: relative;
            margin-right: 10px;
            margin-bottom: 20px;
            img{
                width: 100%;
                height: 100%;
            }
            span{
                display: none;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.6);
                color: #ffffff;
                line-height: 80px;
                text-align: center;
                i{
                    font-size: 24px;
                    margin: 0 5px;
                    cursor: pointer;
                }
            }
            &:hover{
                span{
                    display: block;
                }
            }
            &.addOrganizations{
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #999999;
                color: #ffffff;
                font-size: 24px;
                cursor: pointer;
            }
        }
    }
    .partnerList{
        li{
            width: 232px;
            height: 50px;
            span{
                line-height: 50px;
            }
        }
    }
    .submit{
        display: block;
        margin: 0 auto;
        margin-top: 20px;
    }
    .organizationLogo{
        width: 80px;
        height: 80px;
        background: #eeeeee;
        line-height: 80px;
        img{
            width: 100%;
            height: 100%;
        }
        &.partnerLogo{
            width: 232px;
            height: 50px;
            line-height: 50px;
        }
    }
    .input{
        width: 250px;
        display: block;
        margin-top: 10px;
    }

    /deep/.el-dialog__body{
        padding: 30px 50px;
    }
}
</style>