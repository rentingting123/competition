import down from './download'

const install = function(Vue) {
    Vue.directive('down', down)
}

if (window.Vue) {
    window['down'] = down
    Vue.use(install); // eslint-disable-line
}

export default install