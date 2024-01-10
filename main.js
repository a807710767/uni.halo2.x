import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import * as config from '@/config/index.js'
Vue.use(uView);
// 如此配置即可
uni.$u.config.unit = 'rpx'
Vue.config.productionTip = false;
Vue.prototype.$uView = {
	size: 'mini'
};
console.log(config)
Vue.prototype.halo = config

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()