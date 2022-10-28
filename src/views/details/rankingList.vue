<template>
<!--排行-->
    <div id="rankingList">
        <!--无任何数据时显示-->
        <div class="empty" v-if="0">
            <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/non_competition.png">
            <el-button type="primary" round @click="rankingList_dialog = true">添加</el-button>
        </div>

        <!--有数据时显示-->
        <div v-else>
            <ul>
                <li v-for="(item, index) in rankingList" @click="rankin(index)" :class="{active_color:item.isActive}">
                    <span>{{item.name}}</span>
                    <em>|</em>
                </li>
                <li class="add_ranking">
                    <i><img src="https://web.moocollege.com/mooc/hzq/competition/competition/加号.svg" width="12" height="12"></i>
                    <span @click="rankingList_dialog = true">添加排行榜</span>
                </li>
            </ul>
            <h1>初赛排行</h1>
            <el-table
            :data="tableData"
            style="width: 100%;margin-top:30px;">
                <el-table-column
                    label="排名"
                    align="center"
                    width="60">
                    <template slot-scope="scope">
                        <p v-if="scope.$index == 0"><img src="https://web.moocollege.com/mooc/hzq/competition/user_center/cup6.png"></p>
                        <p v-else-if="scope.$index == 1"><img src="https://web.moocollege.com/mooc/hzq/competition/user_center/cup5.png"></p>
                        <p v-else-if="scope.$index == 2"><img src="https://web.moocollege.com/mooc/hzq/competition/user_center/cup4.png"></p>
                        <p v-else>{{scope.$index+1}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="浮动"
                    align="center"
                    width="50">
                    <template slot-scope="scope">
                        <p class="decline" v-if="scope.row.float < 0"><i class="iconfont">&#xe668;</i>{{scope.row.float*-1}}</p>
                        <p class="invariability" v-if="scope.row.float == 0">-</p>
                        <p class="goUp" v-if="scope.row.float > 0"><i class="iconfont">&#xe669;</i>{{scope.row.float}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="团队"
                    width="160">
                    <template slot-scope="scope">
                        <p>{{scope.row.groupName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="团队成员"
                    width="280">
                    <template slot-scope="scope">
                        <p v-for="obj in scope.row.members" class="comma">
                            <span v-for="(o,i) in obj.member" :key="i">
                                {{o}}<em>，</em><br v-if="(i+1)%3==0?true:false">
                            </span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="学校"
                    width="160">
                    <template slot-scope="scope">
                        <div v-for="(obj,idx) in scope.row.members" :key="idx">
                            <p>{{obj.school}}</p>
                            <p v-for="(o,i) in obj.member" :key="i" v-if="(i+1)%3==0?true:false">{{obj.school}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="分数"
                    width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.score}}</p>
                    </template>
                </el-table-column>
            </el-table>
            
            <p class="download">
                相关下载：
                <span>复赛排名排行榜.pdf</span>
            </p>
        </div>


        <!--添加排行弹框-->
        <el-dialog
            title="排行榜"
            :visible.sync="rankingList_dialog"
            :close-on-click-modal= false
            width="50rem">

            <div class="dialog_content">
                <!--<p style="margin-bottom:10px;">排行榜名称</p>
                <el-input placeholder="请输入排行榜名称" style="margin-bottom:18px;"></el-input>-->
                <p style="margin-bottom:10px;">阶段日程</p>
                <el-select v-model="rankingListValue" placeholder="请选择">
                    <el-option
                    v-for="item in rankingListOptions"
                    :key="item.scheduleName"
                    :label="item.scheduleName"
                    :value="item.scheduleName">
                    </el-option>
                </el-select>
                <el-upload
                class="upload-demo"
                drag
                :file-list="fileList"
                action="https://jsonplaceholder.typicode.com/posts/"
                width="18.75rem"
                :on-change="handleChange"
                :on-success="upSuccess"
                multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
                        <div class="el-upload__tip" slot="tip" style="color: rgba(0,0,0,0.43); font-size:12px;">仅支持excel文件</div>
                    </div>
                    <a :href="rankTemplet" class="downTemt" @click.stop="downTemt">
                        <i class="iconfont">&#xe610;</i>下载模板
                    </a>
                </el-upload>
                <el-button class="button" v-if="selfMotion">
                    <div class="button_content">
                        <i class="iconfont">&#xe611;</i>
                        <span>自动生成排行榜</span>
                    </div>
                </el-button>
                <el-button class="button-dis" v-else disabled>
                    <div class="button_content">
                        <i class="iconfont">&#xe611;</i>
                        <span>自动生成排行榜</span>
                    </div>
                </el-button>
                <p><span>*</span>在本平台系统上打分的竞赛可自动生成排行榜</p>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="rankingList_dialog = false">取 消</el-button>
                <el-button type="primary" @click="hint_dialog = true">添 加</el-button>
            </span>
        </el-dialog>

        <!--生成排行榜提示-->
        <el-dialog
            title="提示"
            :visible.sync="hint_dialog"
            :close-on-click-modal= false
            custom-class="upper"
            width="27rem">
                <div class="full">
                    <h4>温 馨 提 示</h4>
                    <p>排行榜一旦生成，则不可修改删除，是否生成排行榜？</p>
                    <el-button @click="hint_dialog = false" size="medium">取 消</el-button>
                    <el-button type="primary" @click="addRanking" size="medium">生 成</el-button>
                </div>
        </el-dialog>
    </div>
</template>


<script>
import network from '@@/api/jxapi'
import { getCompetitionId } from '@@/utils/commons'

    export default {
        data(){
            return {
                rankingList: [
                    {
                        name: '初赛排行',
                        isActive: true,
                    },
                    {
                        name: '复赛排行',
                        isActive: false,
                    }
                ],  // 排行榜
                tableData: [
                    // {
                    //     date: '1',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '2',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '3',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '4',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '4',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '4',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '4',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '4',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }, {
                    //     date: '4',
                    //     name: '-',
                    //     address: '冯诺伊曼-旺仔',
                    //     nums: '章妹妹，张媛媛，谭星星',
                    //     university: '浙江大学',
                    //     grade: '43.1232'
                    // }
                ], // 排行榜列表
                rankingList_dialog: false, //添加排行榜弹框
                hint_dialog: false, //添加排行榜提示弹框
                rankingListOptions: [], // 阶段日程
                rankingListValue: '', // 选中的阶段日程
                rankTemplet: '', // 下载模板
                schoolList: [], // 学校
                studentList: [], // 成员
                selfMotion: true, // 自动生成排行榜
                fileList: [], // 上传列表
                competitionId:''
            }
        },
        mounted() {
            this.competitionId = getCompetitionId()
            this.getSchedule();
        },
        methods: {
            rankin(index){
                this.rankingList.forEach(obj => {
                    obj.isActive = false;
                })
                this.rankingList[index].isActive = true;
            },
            /**
             * 生成排行榜
             **/
            async addRanking(){
                const obj = {
                    competitionId: this.competitionId,
                    schedule: this.rankingListValue,
                    excelRank: '',
                };
                const res = await network.saveRankApi({data:obj});
            },
            /**
             * 请求数据
             * @param tableData 排行榜列表
             * schedules 阶段日程
             * rankTemplet 下载模板
             **/
            async getSchedule(){
                const obj = {
                    competitionId: this.competitionId,
                    rankType: '',
                };
                const res = await network.getScheduleApi({data:obj});
                if(res=='error') return;
                const resRank = await network.getRankApi({data:obj});
                if(resRank=='error') return;
                this.tableData = resRank.list; 
                this.rankingListOptions = res.schedules; 
                this.rankTemplet = res.rankTemplet; 

                // this.tableData.forEach((obj,index) => {
                //     const arr = [];
                //     const arrSdt = [];
                //     obj.members.forEach((item,idx) => {
                //         arr.push(item.school);
                //     });
                    
                //     obj.school = [...new Set(arr)];
                // });
                // console.log(this.tableData);
            },
            downTemt(){
                // console.log(this.rankTemplet)
            },
            handleChange(file, res){
                
            },
            /**
             * 上传成功
             **/
            upSuccess(file, res){
                
            },
        }
    }
</script>


<style lang="less" scoped>
#rankingList{
    width: 1040px;
    margin: auto;
    background-color: #fff;
    min-height: 337px;
    box-sizing: border-box;
    padding: 24px 70px;
    text-align: start;
    h1{
        font-size: 30px;
        border-left: 4px solid #1D86FF;
        padding-left: 16px;
        font-weight: 500;
        margin-top: 50px;
    }
    .decline{
        color: #1CCB4C;
    }
    .goUp{
        color: #CB3A4C;
    }
    .empty{
        min-height: 337px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .dialog_content{
        width: 300px;
        margin: auto;
        text-align: start;
        .upload-demo{
            margin-top: 16px;
            width: 300px;
            
            /deep/ .el-upload-dragger{
                width: 300px;
                overflow: visible;
                position: relative;
                .downTemt{
                    position: absolute;
                    bottom: 5px;
                    right:-85px;
                    color: #4A4A4A;
                    font-size: 14px;
                    i{
                        color: #9B9B9B;
                        margin-right: 3px;
                    }
                }
                .downTemt:hover{
                    color: #1D86FF;
                    i{
                        color: #1D86FF;
                    }
                }
            }
            
        }
        .button{
            padding:4px 8px;
            margin-top: 16px;
            margin-bottom: 7px;
            border: 1px solid #1D86FF;
            .button_content{
                display: flex;
                align-items: center;
                i{
                    color: #1D86FF;
                    font-size: 20px;
                }
                span{
                    margin-left: 4px;
                    color: #1D86FF;
                }
            }
        }
        .button-dis{
            padding:4px 8px;
            margin-top: 16px;
            margin-bottom: 7px;
            border: 1px solid #DFDFDF;
            background: #DFDFDF;
            .button_content{
                display: flex;
                align-items: center;
                i{
                    color: #9B9B9B;
                    font-size: 20px;
                }
                span{
                    margin-left: 4px;
                    color: #9B9B9B;
                }
            }
        }
        p{
            font-size: 12px;
            color:#4A4A4A;
            span{
                color:red;
                margin-right: 4px;
            }
        }
    }
    ul{
        display: flex;
        font-size: 14px;
        li{
            cursor: pointer;
            &:hover span{
                color: #1D86FF;
            }
            >em{
                margin:0px 15px;
                color:#DEDEDE ;
            }
        }
        .add_ranking{
            display: flex;
            align-items: center;
            color:#9B9B9B;
            i{
                margin-top: 1px;
                margin-right: 5px;
            }
        }
        
        .active_color{
            color: #1D86FF;
        }
    }
    /deep/ .el-table th{
        font-size: 14px;
        color:#4A4A4A;
        background: #F7F7F7;
    }
    .download{
        font-size: 14px;
        margin-top: 15px;
        span{
            color: #1D86FF;
            cursor: pointer;
        }
    }

    .full{
        text-align: center;
        padding:20px 0;
        h4{
            font-size: 16px;
        }
        p{
            margin-top: 20px;
            margin-bottom: 50px;
        }
    }
    /deep/ .upper{
        .el-dialog__header{
            display: none;
        }
    }
    .comma{
        em{
            display: inline;
        }
        span:last-child{
            em{
                display: none;
            }
        }
        span:nth-child(3n){
            em{
                display: none;
            }
        }
    }
}
</style>