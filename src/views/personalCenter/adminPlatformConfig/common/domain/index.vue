<template>
    <div class="domain">
        <el-form
            class="domainForm"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            >
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="定制服务">
                <el-select v-model="ruleForm.service" placeholder="请选择定制服务">
                <el-option
                    v-for="(item, index) in serviceList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="域名" prop="domain">
                <el-input v-model="ruleForm.domain">
                <template slot="prepend">http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="指向域名" prop="href">
                <el-input v-model="ruleForm.href" :readonly="editMode">
                <template slot="prepend">http://</template>
                </el-input>
            </el-form-item>
            <el-form-item v-if="createMode">
                <el-button type="primary" @click="submitForm('ruleForm')">生成</el-button>
            </el-form-item>
            <el-form-item v-if="editMode">
                <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
                <el-button type="primary" @click="cancelDomain('ruleForm')">取消</el-button>
                <el-button type="primary" @click="delDomain('ruleForm')">删除</el-button>
            </el-form-item>
        </el-form>
        <el-tag v-if="domainList.length > 0">已生成</el-tag>
        <div class="domainList">
            <div class="domainItem" v-for="(item, index) in domainList" :key="index">
                <ul>
                <li>
                    <label>名称：</label>
                    <span>{{item.name}}</span>
                    <i class="el-icon-edit" @click="editDomain(item, index)"></i>
                </li>
                <li>
                    <label>定制：</label>
                    <span>{{item.service === 0 ? '默认' : '未知'}}</span>
                </li>
                <li>
                    <label>域名：</label>
                    <a class="point" @click="jump(item.domain)">{{item.domain}}</a>
                </li>
                <li>
                    <label>指向域名：</label>
                    <a class="point" @click="jump(item.href)">{{item.href}}</a>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import { getGroupId } from '@@/utils/commons'
export default {
    data(){
        return{
            groupId: '',
            domainList: [],
            serviceList: [{ label: "默认", value: 0 }],
            ruleForm: {
                name: "",
                service: 0,
                domain: "",
                href: ""
            },
            rules: {
                name: [
                { required: true, message: "请输入名称", trigger: "blur" },
                { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
                ],
                domain: [{ required: true, message: "请输入域名", trigger: "blur" }],
                href: [{ required: true, message: "请输入指向域名", trigger: "blur" }]
            },
            createMode: true,
            editMode: false,
            editIndex: -1,
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
            this.domainList = data && data.domains || [];
        },
        jump(path) {
            location.href = path.indexOf("http") === -1 ? `http://${path}` : path;
        },
        async save(param) {
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
            this.$message.success("保存成功");
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                this.domainList.push(this.ruleForm);
                const param = {
                    objectId: this.groupId,
                    domains: this.domainList
                };
                this.save(param);
                } else {
                return false;
                }
            });
        },
        saveForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                this.domainList[this.editIndex] = this.ruleForm;
                const param = {
                    objectId: this.groupId,
                    domains: this.domainList
                };
                this.save(param);
                this.editIndex = -1;
                this.cancelDomain();
                }
            });
        },
        editDomain(item, index) {
            this.editIndex = index;
            this.createMode = false;
            this.editMode = true;
            this.ruleForm = Object.assign({}, item);
        },
        cancelDomain(item) {
            this.createMode = true;
            this.editMode = false;
            this.ruleForm = {
                name: "",
                service: 0,
                domain: "",
                href: ""
            };
        },
        delDomain(item) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const index = this.editIndex;
                this.domainList.splice(index, 1);
                this.editIndex = -1;

                const param = {
                    objectId: this.groupId,
                    domains: this.domainList
                };
                this.save(param);
                this.$message.success("删除成功!");
            });
            },
        }
}
</script>

<style lang='less' scoped>
.domainForm {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 20px;
}
.domainList {
    padding: 10px;
    .domainItem {
      border-bottom: 1px solid #ccc;
      padding: 10px;
      li {
        line-height: 24px;
        label {
          display: inline-block;
          width: 80px;
        }
        a {
          color: #409eff;
        }
      }
    }
}
.point {
    cursor: pointer;
}
</style>