import axios from 'axios';
import common from './common';

import { Loading } from 'element-ui';  // 加载中

const baseApi = common.baseApi;

axios.defaults.baseURL = baseApi;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.headers['Authorization'] = sessionStorage.getItem("token");

axios.interceptors.response.use (
  res => {
    return res.data;
  },
  err => {
    return Promise.reject (err);
  }
);

//聚合使用  没有loading

let myAxios = (url, params, success, method, vm) => {
  // let loading = Loading.service({
  //   target: '#app',
  //   lock: true,
  //   fullscreen: false,
  //   text: '加载中',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // });
  axios ({
    method: method,
    url: url,
    data: params,
  })
    .then (res => {
      // loading.close();
      console.log (`------${url}接口返回信息(${method})-------`);
      console.log (res);
      // if (res.hasOwnProperty ('msg')) {
      //   if (res.code != 200) {
      //
      //   }
      //   if (res.msg.includes ('未登录')) {
      //     console.log ('返回首页 ------------------todo');
      //     console.log (vm);
      //     vm.$router.push ('/');
      //   }
      // }
      success (res);
    })
    .catch (err => {
      // loading.close();
      console.group ('接口错误');
      console.log ('err: ', err);
      // if(err.response.data.code == 105 || err.response.data.code == 106) vm.$router.push ('/');
    });
};

// GTE

let myGet = (url, params, success, vm) => {
  // let loading = Loading.service({
  //   target: '#app',
  //   lock: true,
  //   fullscreen: false,
  //   text: '加载中',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // });
  axios
    .get (url, params)
    .then (res => {
      // loading.close();
      console.log (`------${url}接口返回信息(get)-------`);
      console.log (res);
      // if (res.hasOwnProperty ('msg')) {
      //   if (res.code != 200) {
      //     vm.$message ({
      //       type: 'error',
      //       message: res.msg,
      //     });
      //   }
      //   if (res.msg.includes ('未登录')) {
      //     console.log ('返回首页 ------------------todo');
      //     console.log (vm);
      //     vm.$message ({
      //       message: '登陆失效，请重新登陆',
      //       type: 'error',
      //     });
      //     vm.$router.push ('/');
      //   }
      // }
      success (res);
    })
    .catch (err => {
      // loading.close();
      console.group ('接口错误');
      console.log ('err: ', err);
      // if(err.response.data.code == 105 || err.response.data.code == 106) vm.$router.push ('/');
    });
};

// POST

let myPost = (url, params, success, vm) => {
  // let loading = Loading.service({
  //   target: '#app',
  //   lock: true,
  //   fullscreen: false,
  //   text: '加载中',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // });
  axios ({
    method: 'POST',
    url: url,
    data: params,
  })
    .then (res => {
      // loading.close();
      console.log (`------${url}接口返回信息(Post)-------`);
      console.log (res);
      // if (res.hasOwnProperty ('msg')) {
      //   if (res.code != 200) {
      //
      //   }
      //   if (res.msg.includes ('未登录')) {
      //     console.log ('返回首页 ------------------todo');
      //     console.log (vm);
      //     vm.$router.push ('/');
      //   }
      // }
      success (res);
    })
    .catch (err => {
      // loading.close();
      console.group ('接口错误');
      console.log ('err: ', err);
      // if(err.response.data.code == 105 || err.response.data.code == 106) vm.$router.push ('/');
    });
};



export default {
  install (Vue, options) {
    Vue.prototype.$axios = axios;
    Vue.prototype.$myAxios = myAxios;
    Vue.prototype.$myGet = myGet;
    Vue.prototype.$myPost = myPost;
  },
};
