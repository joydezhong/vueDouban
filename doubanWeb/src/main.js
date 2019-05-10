import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'

import routes from './routes'

import server from './plugin/axios'

import './components/font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(server)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if(to.path=="/login"){

    next();
  }else{
    if(sessionStorage.getItem('token')){
      next()
    }else{
      next({path:"/login"})
    }
  }


})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

