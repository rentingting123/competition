<template>
    <div class="allP">
        <p class="bastitle">导航栏设置</p>
        <el-button type="primary" style="margin-top:10px;" size="small" @click="show=true">设置</el-button>
        <el-dialog title="导航栏设置" 
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :visible.sync="show">

            <div class="main">
                <ul>
                    <li v-for="list in lists" :key="list.id">
                        <span>{{list.name}}</span>
                        <el-switch v-model="list.show" active-color="#13ce66" inactive-color="#ff4949" :disabled="list.disabled"></el-switch>
                        <ul v-if="list.childs">
                            <li v-for="item in list.childs" :key="item.id">
                                <span>{{item.name}}</span>
                                <el-switch v-model="item.show" active-color="#13ce66" inactive-color="#ff4949" :disabled="item.disabled"></el-switch>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="setNavs">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:['close','navsList'],
    data(){
        return{
            show: false,
            newlists: [
                {
                    name: "首页",
                    id: 0,
                    show: true,
                    disabled: true,
                    path: "/home"
                },
                {
                    name: "组织机构",
                    id: 21,
                    show: true,
                    path: "/datacenter/news/organization"
                },
                {
                    name: "制度文件",
                    id: 20,
                    show: true,
                    path: "/datacenter/news/filesystem",
                    childs: [
                        {
                            name: "章程细则",
                            id: 201,
                            show: true,
                            path: "/datacenter/news/filesystem/29"
                        },
                        {
                            name: "文件通知",
                            id: 202,
                            show: true,
                            path: "/datacenter/news/filesystem/30"
                        }
                    ]
                },
                {
                    name: "赛事动态",
                    id: 22,
                    show: true,
                    path: "/datacenter/news/dynamicevents"
                },
                {
                    name: "赛事回顾",
                    id: 24,
                    show: true,
                    path: "/datacenter/half/eventreview"
                },
                {
                    name: "成果展示",
                    id: 321,
                    show: true,
                    path: "/datacenter/previousworks",
                    childs: [
                        {
                            name: "创新成果集",
                            id: 32,
                            show: true,
                            path: "/datacenter/half/filesystem/32"
                        },
                        {
                            name: "竞赛通讯",
                            id: 33,
                            show: true,
                            path: "/datacenter/half/filesystem/33"
                        },
                        {
                            name: "竞赛成果奖",
                            id: 34,
                            show: true,
                            path: "/datacenter/half/filesystem/34"
                        }
                    ]
                },
                {
                    name: "省市分区赛",
                    id: 6,
                    show: true,
                    path: "/datacenter/divisionseries"
                },
                {
                    name: "媒体社评",
                    id: 27,
                    show: true,
                    path: "/datacenter/news/mediaeditorial"
                },
                {
                    name: "指导培训",
                    id: 8,
                    show: true,
                    path: "/datacenter/trainingsession"
                },
                {
                    name: "我要投稿",
                    id: 9,
                    show: true,
                    path: "/datacenter/contribute",
                    childs: [
                        {
                            name: "心路历程",
                            id: 90,
                            show: true,
                            path: "/datacenter/contribute/0"
                        },
                        {
                            name: "科教协同",
                            id: 91,
                            show: true,
                            path: "/datacenter/contribute/1"
                        },
                        {
                            name: "研究论文",
                            id: 92,
                            show: true,
                            path: "/datacenter/contribute/2"
                        },
                        {
                            name: "总结交流",
                            id: 93,
                            show: true,
                            path: "/datacenter/contribute/3"
                        },
                        {
                            name: "媒体社评",
                            id: 94,
                            show: true,
                            path: "/datacenter/contribute/4"
                        },
                        {
                            name: "赛事简讯",
                            id: 95,
                            show: true,
                            path: "/datacenter/contribute/5"
                        }
                    ]
                }
            ]
        }
    },
    computed:{
        lists(){
            return this.navsList.length>0 ? this.navsList : this.newlists
        }
    },
    methods:{
        setNavs(){
            this.show = false
            this.close && this.close('navsList', this.lists)
        }
    }
}
</script>

<style lang='less' scoped>
.basetitle{
    font-size: 17px;
    color: #4a4a4a;
    letter-spacing: 1.21px;
}
.main{
    li{
        margin: 10px 0;
        padding: 10px;
        span{
            display: inline-block;
            width: 200px;
        }
        ul{
            margin-left: 30px;
            background: rgba(0,0,0,0.2);
        }
    }
}
</style>