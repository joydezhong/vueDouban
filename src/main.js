import Vue from 'vue'
import App from './App.vue'

import store from './store/store' // 导入store

import server from './plugin'

import router from './router'

import mdui from 'mdui'

Vue.config.productionTip = false

// 核心插件
Vue.use (mdui);
Vue.use(server);

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
