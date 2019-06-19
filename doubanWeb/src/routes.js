import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import bookList from './views/nav1/bookList.vue'
import bookDetails from './Views/nav1/bookDetails.vue'
import bookManage from './Views/nav2/bookManage.vue'
import movieList from './views/nav1/moveList.vue'
import movieManage from './views/nav2/movieManage'
import Page6 from './views/nav3/Page6.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
      path: '/register',
      component: Register,
      name: '',
      hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '列表展示',
        iconCls: 'fa fa-tachometer',//图标样式class
        children: [
          { path: '/main', component: Main, name: '主页', hidden: true },
          { path: '/table', component: Table, name: 'Table', hidden: true },
          { path: '/form', component: Form, name: 'Form', hidden: true },
          { path: '/user', component: user, name: '列表' },
          { path: '/bookList', component: bookList, name: '书本列表' },
          { path: '/movieList', component: movieList, name: '电影列表' },
          { path: '/bookDetails', component: bookDetails, name: '书本详情', hidden: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '列表管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/bookManage', component: bookManage, name: '书本管理' },
            { path: '/movieManage', component: movieManage, name: '电影管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
