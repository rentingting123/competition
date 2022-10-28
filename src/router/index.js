import Vue from 'vue'
import Router from 'vue-router'
// system 为用户中心中的系统管理
// expert 为用户中心中的专家库

Vue.use(Router)
let baseRoute = [
    //  首页
    {
        path: '/',
        name: '首页',
        component: (resolve) => require(['../views/home'], resolve),
    },
    // 竞赛列表
    {
        path: '/competition',
        name: '竞赛',
        meta: { title: "竞赛" },
        component: (resolve) => require(['../views/competition/competition'], resolve)
    },
    // 竞赛列表
    {
        path: '/experience',
        name: '体验中心',
        meta: { title: "体验中心" },
        component: (resolve) => require(['../views/experience'], resolve)
    },
    //竞赛详情 start
    {
        path: '/details',
        meta: { title: "竞赛详情" },
        component: (resolve) => require(['../views/details/details'], resolve),
        children: [{
                path: '/',
                name: '竞赛详情',
                component: (resolve) => require(['../views/details/contestInfo'], resolve),
            },
            {
                path: '/details/entryGuide',
                name: '竞赛指南',
                component: (resolve) => require(['../views/details/entryGuide'], resolve),
            },
            {
                path: '/details/Points',
                name: '赛项',
                component: (resolve) => require(['../views/details/Points'], resolve),
            },
            {
                path: '/details/player',
                name: '选手',
                component: (resolve) => require(['../views/details/player'], resolve),
            },
            {
                path: '/details/team',
                name: '团队',
                component: (resolve) => require(['../views/details/team/team'], resolve),
            },
            {
                path: '/details/dynamicState',
                name: '动态详情',
                component: (resolve) => require(['../views/details/dynamicState'], resolve),
            },
            {
                path: '/details/rankingList',
                name: '排行',
                component: (resolve) => require(['../views/details/rankingList'], resolve),
            },
            {
                path: '/details/worksShow',
                name: '作品展示',
                component: (resolve) => require(['../views/details/worksShow.vue'], resolve),
            },
            {
                path: '/details/:detailsId',
                name: 'detailsPage',
                component: (resolve) => require(['../views/details/newPage.vue'], resolve),
            },
        ]
    },
    //竞赛详情 end
    // admin start
    {
        path: '/admin',
        meta: { noHeader: true, noFooter: true },
        component: (resolve) => require(['../views/admin'], resolve),
        children: [{
                path: 'list',
                name: '竞赛管理竞赛列表',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/list'], resolve),
            },
            // l 新增
            {
                path: 'dataManagement',
                name: '数据管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/dataManagement'], resolve),
            },
            // {/admin/dataManagement
            //     path: 'comData',
            //     name: '竞赛管理驾驶舱',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/data/views/comData'], resolve),
            // },
            // {
            //     path: 'competyManage',
            //     name: '竞赛管理数据统计',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/compety/components/compety-manage'], resolve),
            // },
            // ///components/compety-signup-detail.vue
            // {
            //     path: 'competySignupDetail/:id',
            //     name: '报名管理2',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/compety/components/compety-signup-detail.vue'], resolve),
            // },
            // // const competyManageDetail = () => import('../components/compety-manage-detail.vue')
            // {
            //     path: 'competyManageDetail/:id',
            //     name: '获奖管理2',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/compety/components/compety-manage-detail.vue'], resolve),
            // },

            // // ../components/leading-in.vue
            // // leadingIn = () => import('../components/leading-in.vue')
            // // {
            // //     path: '/leadingIn/:id/:type',
            // //     name: 'leadingIn',
            // //     meta: { noHeader: true, noFooter: true },
            // //     component: (resolve) => require(['@rankadmin/compety/components/leading-in.vue'], resolve),
            // // },

            // // { path: '/competyAutoCheck/:id', component: competyAutoCheck },获奖管理校对
            // // '../components/compety-auto-check.vue')
            // // {
            // //     path: '/competyAutoCheck/:id',
            // //     name: '获奖管理校对2',
            // //     meta: { noHeader: true, noFooter: true },
            // //     component: (resolve) => require(['@rankadmin/compety/components/compety-auto-check.vue'], resolve),
            // // },

            // // { path: '/leadingInMuti/:id/:type', component: leadingInMuti, name: 'leadingInMuti' },
            // // {
            // //     path: '/leadingIn/:id/:type',
            // //     name: 'leadingInMuti',
            // //     meta: { noHeader: true, noFooter: true },
            // //     component: (resolve) => require(['@rankadmin/compety/components/leading-inMuti.vue'], resolve),
            // // },
            // // const competyWorkDetail = () => import('../components/compety-work-detail.vue')
            // {
            //     path: 'competyWorkDetail/:id',
            //     name: '作品管理2',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/compety/components/compety-work-detail.vue'], resolve),
            // },
            // // const competyReviewDetail = () => import('../components/compety-review-detail.vue')
            // // {
            // //     path: 'competyReviewDetail/:id',
            // //     name: '评审管理2',
            // //     meta: { noHeader: true, noFooter: true },
            // //     component: (resolve) => require(['@rankadmin/compety/components/compety-review-detail.vue'], resolve),
            // // },
            // // const constitution = () => import('../components/constitution.vue');
            // {
            //     path: 'constitution/:id',
            //     name: '章程管理2',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/compety/components/constitution.vue'], resolve),
            // },
            // // const addCompet = () => import('../../dataCenter/components/compet/addCompet.vue');
            // // 要
            // {
            //     path: 'addCompet',
            //     name: '竞赛信息管理2',
            //     meta: { noHeader: true, noFooter: true },
            //     component: (resolve) => require(['@rankadmin/compety/../dataCenter/components/compet/addCompet.vue'], resolve),
            // },
            {
                path: 'regManagement',
                name: '竞赛管理报名管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/regManagement'], resolve)
            },
            {
                path: 'financialManagement',
                name: '竞赛管理财务管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/financialManagement'], resolve)
            },
            {
                path: 'cert',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/cert'], resolve),
                children: [{
                        path: '/',
                        name: '证书设置证书设置',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/admin/cert/certset'], resolve),
                    },
                    {
                        path: 'setTemplate',
                        name: '证书设置设置证书',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/admin/cert/setTemplate'], resolve)
                    },
                    {
                        path: 'generation',
                        name: '证书设置生成证书',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/admin/cert/generation'], resolve)
                    },
                    {
                        path: 'update',
                        name: '证书设置修改和设置证书',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/admin/cert/update'], resolve)
                    },
                    {
                        path: 'generationlook',
                        name: '证书设置查看证书',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/admin/cert/generationlook'], resolve)
                    },
                ]
            },
            {
                path: 'collectionlist',
                name: '竞赛管理调查问卷',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/collection/list'], resolve)
            },
            {
                path: 'workmanagement',
                name: '作品管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/workmanagement/index'], resolve)
            },

            {
                path: 'schooldatatab',
                name: '本校竞赛数据标签完善',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/schooldatatab/index'], resolve)
            },
            {
                path: 'compic',
                name: '竞赛画像',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/compic/index'], resolve)
            },
            {
                path: 'seedata',
                name: '本校竞赛数据查看及导入导出',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/seedata/index'], resolve)
            },
            {
                path: 'schoolComCreation',
                name: '本校竞赛创建',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/schoolComCreation/index'], resolve)
            },
            {
                path: 'dataAudit',
                name: '数据审核',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/dataAudit/index'], resolve)
            },
            {
                path: 'competitionData',
                name: '竞赛数据',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/competitionData/index'], resolve)
            },
            {
                path: 'comInformation',
                name: '竞赛信息',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/comInformation/index'], resolve)
            },
            {
                path: 'competitionBenchmark',
                name: '竞赛标杆',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/competitionBenchmark/index'], resolve)
            },
            {
                path: 'competitionArea',
                name: '竞赛地域',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/competitionArea/index'], resolve)
            },
            {
                path: 'surveyYear',
                name: '历年概况',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/surveyYear/index'], resolve)
            },
            {
                path: 'collegeStyle',
                name: '高校概貌',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/collegeStyle/index'], resolve)
            },
            {
                path: 'benchmarkingFocus',
                name: '对标分析',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/benchmarkingFocus/index'], resolve)
            },
            {
                path: 'leavmessage',
                name: '留言管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/leavmessage/index'], resolve)
            },
            {
                path: 'information',
                name: '消息管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/information/index'], resolve)
            },
            {
                path: 'skin',
                name: '竞赛管理皮肤管理',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/platformConfig'], resolve)
            },
            {
                path: 'verify',
                name: '竞赛管理信息审核',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/verify'], resolve)
            },
            {
                path: 'logs',
                name: '竞赛管理操作审计',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/logs'], resolve)
            },
            {
                path: 'empowerment',
                name: '竞赛管理竞赛赋能',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['../views/admin/empowerment'], resolve)
            },
            {
                path: 'createNewCompetition',
                meta: { noHeader: true, noFooter: true },
                component: (resolve) => require(['@/views/createCompetitions/index'], resolve),
                children: [

                    {
                        path: '/createNewCompetition',
                        name: '竞赛列表创建竞赛信息1',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/contestInfo'], resolve),
                    },
                    {
                        path: '/',
                        name: '竞赛管理竞赛列表1',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/contestInfo'], resolve),
                    },
                    {
                        path: '/competition/entryGuide',
                        name: '竞赛列表创建竞赛指南',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/entryGuide'], resolve),
                    },
                    {
                        path: '/competition/Points',
                        name: '竞赛列表创建赛项',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/Points'], resolve),
                    },
                    {
                        path: '/competition/player',
                        name: '竞赛列表创建选手',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/player'], resolve),
                    },
                    {
                        path: '/competition/team',
                        name: '竞赛列表创建团队',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/team/team'], resolve),
                    },
                    {
                        path: '/competition/dynamicState',
                        name: '竞赛列表创建动态',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/dynamicState'], resolve),
                    },
                    {
                        path: '/competition/rankingList',
                        name: '竞赛列表创建排行',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/rankingList'], resolve),
                    },
                    {
                        path: '/competition/worksShow',
                        name: '竞赛列表创建作品展示',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/worksShow'], resolve),
                    },
                    {
                        path: '/competition/:competitionId',
                        name: 'competitionPage',
                        meta: { noHeader: true, noFooter: true },
                        component: (resolve) => require(['../views/details/newPage'], resolve),
                    },
                ]
            },

        ]
    },
    // admin end

    // 绑定手机号 start
    {
        path: '/bindphone',
        name: 'bindphone',
        meta: { title: "绑定手机号" },
        component: (resolve) => require(['../views/bindphone'], resolve)
    },
    // 绑定手机号 end
    // 批量发送短信以及邮件 start
    {
        path: '/sendMessage',
        name: '批量发送短信页',
        component: (resolve) => require(['../views/sendMessage/send'], resolve)
    },
    // 批量发送短信以及邮件 end
    // 报名管理页 start
    {
        path: '/regManagement/importRegister',
        name: '倒入报名表',
        component: (resolve) => require(['../views/regManagement/import.vue'], resolve)
    },
    // 报名管理页 end
    // 采集用户信息页面 start
    {
        path: '/admin/collection/:id/:userId',
        name: '获取采集信息',
        meta: { noHeader: true, noFooter: true, noAuthority: true },
        component: (resolve) => require(['../views/admin/collection'], resolve),
    },
    // 采集用户信息页面 end

    // 证书手机扫码查看部分，待优化todo start
    // 查看证书登录
    {
        path: '/adminLogin/:id',
        name: '查看证书登录',
        meta: { noHeader: true, noFooter: true },
        component: (resolve) => require(['../views/adminLogin'], resolve),
    },
    // 查看证书详情
    {
        path: '/admin/workshow/:id',
        name: '查看证书详情',
        meta: { noHeader: true, noFooter: true },
        component: (resolve) => require(['../views/adminLogin/workshow'], resolve),
    },
    // 查看证书详情不需要登录版
    {
        path: '/share',
        name: '查看证书',
        meta: { noHeader: true, noFooter: true },
        component: (resolve) => require(['../views/adminLogin/share'], resolve),
    },
    // 证书手机扫码查看部分，待优化todo end

    // 动态 start
    {
        path: '/issue',
        name: '动态',
        component: (resolve) => require(['../views/issue/index'], resolve),
    },
    {
        path: '/issue/detail',
        name: '动态发布',
        component: (resolve) => require(['../views/issue/detail'], resolve),
    },
    // 动态 end
    // 作品 start
    {
        path: '/submitWork/:workId/:cId/:gId',
        name: '提交作品',
        component: (resolve) => require(['../views/submitWork/submitWork'], resolve),
    },
    {
        path: '/submitWork/:workId',
        name: '修改作品',
        component: (resolve) => require(['../views/submitWork/submitWork'], resolve),
    },
    // 作品 end

    //创建竞赛-详情页
    {
        path: '/competition/worksShow/:worksId',
        name: '创建竞赛作品展示详情',
        component: (resolve) => require(['../views/details/worksDetails'], resolve),
    },
    {
        path: '/competition/team/:teamId/:competitionId',
        name: '创建竞赛团队详情',
        component: (resolve) => require(['../views/details/team/index'], resolve),
    },
    {
        path: '/competition/player/:playerId',
        name: '创建竞赛选手详情',
        component: (resolve) => require(['../views/details/playerDetails'], resolve),
    },
    //竞赛详情-详情页
    {
        path: '/details/worksShow/:worksId/:cId',
        name: '竞赛详情作品展示详情',
        component: (resolve) => require(['../views/details/worksDetails'], resolve),
    },
    {
        path: '/details/team/:teamId',
        name: '竞赛详情团队详情',
        component: (resolve) => require(['../views/details/team/index'], resolve),
    },
    {
        path: '/details/player/:playerId',
        name: '竞赛详情选手详情',
        component: (resolve) => require(['../views/details/playerDetails'], resolve),
    },
    // 个人/团队搜索
    {
        path: '/searchteam',
        name: '搜索个人、团队',
        component: (resolve) => require(['../views/searchteam'], resolve),
    },
    // 个人中心 start
    {
        path: '/personalCenter',
        meta: { title: "个人中心" },
        component: (resolve) => require(['../views/personalCenter'], resolve),
        children: [{
                path: '/',
                name: '我的团队',
                component: (resolve) => require(['../views/personalCenter/myteam'], resolve),
            },
            {
                path: '/jingsai',
                name: '我的竞赛',
                component: (resolve) => require(['../views/personalCenter/jingsai'], resolve),
            },
            {
                path: '/xuexi',
                name: '我的学习',
                component: (resolve) => require(['../views/personalCenter/xuexi'], resolve),
            },
            {
                path: '/credential',
                name: '荣誉资质',
                component: (resolve) => require(['../views/personalCenter/credential'], resolve),
            },
            {
                path: '/chengchang',
                name: '成长体系',
                component: (resolve) => require(['../views/personalCenter/chengchang'], resolve),
            },
            {
                path: '/huaxiang',
                name: '能力画像',
                component: (resolve) => require(['../views/personalCenter/huaxiang'], resolve),
            },
            {
                path: '/mymsg',
                name: '我的消息',
                component: (resolve) => require(['../views/personalCenter/mymsg'], resolve),
            },
            {
                path: '/renzheng',
                name: '认证体系',
                component: (resolve) => require(['../views/personalCenter/renzheng'], resolve),
            },
            {
                path: '/profile',
                name: '个人设置',
                component: (resolve) => require(['../views/personalCenter/profile'], resolve),
            },
            {
                path: '/adminPlatformConfig',
                component: (resolve) => require(['../views/personalCenter/adminPlatformConfig'], resolve),
            },
        ]
    },
    // 个人中心 end

    //酒店预订 start
    {
        path: '/bookHotel',
        name: '酒店预订',
        meta: { title: "酒店预订" },
        component: (resolve) => require(['../views/bookHotel/bookHotel'], resolve)
    },
    //酒店预订 end
    // 底部栏  start
    // 平台简介
    {
        path: '/introductionPlatform',
        name: 'introductionPlatform',
        component: (resolve) => require(['../views/introduction/platform'], resolve)
    },
    // 产品介绍
    {
        path: '/introductionProduct',
        name: 'introductionProduct',
        component: (resolve) => require(['../views/introduction/product'], resolve)
    },
    // 拓展服务
    {
        path: '/expendingServices',
        name: 'expendingServices',
        component: (resolve) => require(['../views/introduction/expendingServices'], resolve)
    },
    // 帮助中心
    {
        path: '/helpcenter',
        name: 'helpcenter',
        component: (resolve) => require(['../views/introduction/helpcenter'], resolve)
    },
    // 底部栏  end
    // 高校入驻 start
    {
        path: '/universitieSettled',
        name: 'universitieSettled',
        meta: { title: "高校入驻", noHeader: true, noFooter: true },
        component: (resolve) => require(['../views/universitieSettled'], resolve)
    },
    // 竞赛试用申请
    {
        path: '/applyCompetition',
        name: 'applyCompetition',
        meta: { title: "试用申请", noHeader: true, noFooter: true },
        component: (resolve) => require(['../components/applyCompetition/index.vue'], resolve)
    },
    // 证书查询
    {
        path: '/searchCert',
        name: 'searchCert',
        meta: { title: "证书查询", noHeader: true, noFooter: true },
        component: (resolve) => require(['../views/searchCert/cert.vue'], resolve)
    },
    // 证书查询 end
    // 错误处理 start
    {
        path: '/401',
        name: '无权访问',
        component: (resolve) => require(['../views/401'], resolve)
    },
    {
        path: '/404',
        name: '找不到页面',
        component: (resolve) => require(['../views/404'], resolve)
    },
    { path: '*', redirect: '/404', hidden: true }
    // 错误处理 end
];

let router = new Router({
    routes: baseRoute
});

router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.meta.title) { //如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
})

// 解决elementui中的vue-router在3.0版本以上重复点击报错问题 start
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    // end

export default router;
