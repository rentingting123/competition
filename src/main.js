// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './vuex/store.js'
import i18n from './i18n'
import VueLazyLoad from 'vue-lazyload'
import permission from './directive/permission'
// 富文本编辑框
import VueQuillEditor from 'vue-quill-editor-hzq'
import 'quill-hzq/dist/quill.core.css'
import 'quill-hzq/dist/quill.snow.css'
import 'quill-hzq/dist/quill.bubble.css'
import 'animate.css'
//import '@babel/polyfill'; // es6 shim

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
router.beforeEach((to, from, next) => {
    Vue.prototype.$noAuthority = to.meta.noAuthority
    next()
})


Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    attempt: 1
})

import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)

Vue.use(ElementUI);
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

Vue.use(permission)
new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: { App },
    template: '<App/>',
})
