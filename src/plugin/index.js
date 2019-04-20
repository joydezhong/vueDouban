import axios from 'axios';
import common from './common';

const baseApi = common.baseApi;

axios.defaults.baseURL = baseApi;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

// axios.defaults.headers['authorization'] = localStorage.getItem("token");

axios.interceptors.response.use (
  res => {
    return res.data;
  },
  err => {
    return Promise.reject (err);
  }
);

//聚合使用

let myAxios = (url, params, success, method, vm) => {

  axios ({
    method: method,
    url: url,
    data: params,
  })
    .then (res => {
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
      console.group ('接口错误');
      console.log ('err: ', err);
      // if(err.response.data.code == 105 || err.response.data.code == 106) vm.$router.push ('/');
    });
};

let myGet = (url, params, success, vm) => {
  axios
    .get (url, params)
    .then (res => {
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
  },
};
