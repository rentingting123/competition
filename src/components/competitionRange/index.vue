<template>
    <div>
        <el-select v-model="proValue" @change="choose1" placeholder="请选择">
            <el-option
                v-for="(item,i) in areaData1"
                :key="item.value"
                :disabled='i != competitionRangeValue'
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <!-- 省赛 地区 -->
        <el-select filterable :key="proValue" 
            v-model="cityValue" 
            v-if="areavalue2.length>0"
            @change="handleChange1">
            <el-option
                v-for="item in areavalue2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <!-- 区赛 地区 -->
        <el-select filterable :key="regValue" 
            v-model="regionValue" v-if="areavalue3.length>0"
            @change="handleChange1"
            style="margin: 5px auto;display:block;" multiple >
            <el-option
                v-for="item in areavalue3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-input v-if="regionValue.length===1" v-model="regionValue[0]" 
            style="margin-bottom:5px;width:200px;display:block" @input="handleChange1"></el-input>
        
        <el-input placeholder="请输入区赛，例如 '华北区'，'华东区'  " v-if="regionValue.length>1" 
            v-model="regValue" @input="handleChange1" style="margin-bottom:5px; width:300px;display:block" >
        </el-input>
        <!-- 20201126省厅试用，要求隐藏 -->
        <!-- 国赛 abcde -->
        <!-- <el-cascader
            expand-trigger="hover"
            :options="areaData"
            v-model="form.competitionLevel"
            v-if="proValue==='国赛'||areavalue3.length>0"
            :show-all-levels="true"
            @change="handleChange1"
        ></el-cascader> -->
        <!-- 省赛  a b -->
        <!-- <el-cascader
            style="margin-top:5px;"
            expand-trigger="hover"
            :options="areaDatas"
            v-model="form.competitionLevel"
            v-if="areavalue2.length>0&&proValue==='省赛'"
            :show-all-levels="true"
            @change="handleChange1"
        ></el-cascader> -->
    </div>
</template>

<script>
import area from "@@/assets/json/area1.json";
import { getUserInfo } from '@@/utils/commons'
export default {
    props: ['competitionLevel', 'competitionRange', 'setDate'],
    data(){
        return{
            form: {
                competitionLevel: [],
            },
            proValue: "",
            areaData1: area.provinces,
            cityValue: [],
            areavalue2: [],
            regValue: "",
            regionValue: [],
            areavalue3: [],
            areaData: [
                {
                    value: "A",
                    label: "A类竞赛：主要指竞赛项目主办方为多个国家级部委，简称“部委”"
                },
                {
                    value: "B",
                    label: "B类竞赛：主要指由教育部明确发文资助的竞赛，简称“教育部”"
                },
                {
                    value: "C",
                    label: "C类竞赛：主要指由高等教育学会或教育部高等教学指导委员会主办的竞赛，简称“教指委”"
                },
                {
                    value: "D",
                    label: "D类竞赛：主要指省级或行业主办的竞赛"
                },
                {
                    value: "E",
                    label: "E类竞赛：主要指企业或协会主办的竞赛"
                }
            ], //参赛地址数组
            areaDatas: [
                {
                    value: "A",
                    label: "A类竞赛：省教育厅纳入的竞赛"
                },
                {
                    value: "B",
                    label: "B类竞赛：省教育厅不纳入的竞赛"
                }
            ],
            competitionRangeValue: '', //创建账号时选择的值 0:国际 1:亚太 2:国 3:区 4:省 5:校
        }
    },
    created(){
       let user = getUserInfo();
       this.competitionRangeValue = user && user.competitionRange || ''
    },
    methods:{ 
        set(){
            let range = this.competitionRange ? this.competitionRange.split(",") : "";
            if (range.length <= 1) {
                this.proValue = range[0];
            } else if (range.length == 2) {
                this.proValue = range[0];
                if (this.proValue == "省赛") {
                    this.cityValue = range[1];
                    this.areavalue2 = this.areaData1[4].children;
                } else if (this.proValue == "区赛") {
                    this.proValue = range[0];
                    this.regValue = range[1];
                    this.regionValue = range.splice(1, range.length - 1);
                    this.areavalue3 = this.areaData1[3].children;
                    range.splice(0, 2);
                } else {
                    this.countyValue = range[1];
                    this.areavalue1 = this.areaData1[1].children;
                }
            } else {
                this.proValue = range[0];
                this.regValue = range[1];
                this.regionValue = range.splice(2, range.length - 1);
                this.areavalue3 = this.areaData1[3].children;
                range.splice(0, 2);
            }

            this.form.competitionLevel = this.competitionLevel && this.competitionLevel.split(",") || [];
        },
        choose1(val) {
            this.areavalue1 = [];
            this.areavalue2 = [];
            this.areavalue3 = [];
            this.cityValue = [];
            this.regionValue = [];
            this.countyValue = "";
            this.form.competitionLevel = [];

            if (val == "国赛") {
                this.areavalue1 = this.areaData1[1].children;
            } else if (val == "省赛") {
                this.areavalue2 = this.areaData1[4].children;
            } else if (val == "区赛") {
                this.areavalue3 = this.areaData1[3].children;
            }
            this.setForm()
        },
        handleChange1() {
            this.setForm()
        },
        setForm(){
            let range = "";
            if (this.countyValue && this.countyValue.length > 0) {
                range = this.proValue + "," + this.countyValue;
            } else if (this.cityValue && this.cityValue.length > 0) {
                if (this.cityValue.length > 1) {
                range = this.proValue + "," + this.cityValue;
                } else {
                range = this.proValue;
                }
            } else if (this.regionValue && this.regionValue.length > 0) {
                if (this.regionValue.length > 1) {
                range = "区赛," + this.regValue + "," + this.regionValue.join(",");
                } else {
                range = "区赛," + this.regionValue.join(",");
                }
            } else {
                range = this.proValue;
            }

            let form = {
                competitionRange: range,
                competitionLevel: this.form.competitionLevel.join(",")
            }
            this.setDate && this.setDate(form)
        }
    },
    watch:{
        competitionRange:{
            immediate: true,
            handler(val){
                this.set(this.competitionRange, this.competitionLevel)
            }
        },
        competitionLevel:{
            immediate: true,
            handler(val){
                this.set(this.competitionRange, this.competitionLevel)
            }
        },

    }
}
</script>

<style lang='less' scoped>

</style>