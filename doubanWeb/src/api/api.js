import axios from 'axios';
import common from '@/plugin/axios/common';

let base = common.baseApi;

export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res); };

export const requestRegister = params => { return axios.post(`${base}/api/register`, params).then(res => res); };

export const getBookList = params => { return axios.get(`${base}/api/books/bookLists`, { params: params }); };

