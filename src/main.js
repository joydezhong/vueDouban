import Vue from 'vue'
import App from './App.vue'

import store from './store/store' // 导入store

import router from './router'

import mdui from 'mdui'

Vue.config.productionTip = false

// 核心插件
Vue.use (mdui);

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
