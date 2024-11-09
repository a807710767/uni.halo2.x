import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);


Vue.prototype.$uView = {
	size: 'mini'
};
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)
App.mpType = 'app'

Vue.config.productionTip = false;

const app = new Vue({
	...App
})
app.$mount()