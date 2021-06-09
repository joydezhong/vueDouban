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
    { 
        path: '/', 
        component: Home, 
        name: '主页', 
        iconCls: 'fa fa-tachometer',
        hidden: true,
        children: [
            { path: '/', component: Main, name: '主页', hidden: true },
        ]
    },
    {
        path: '/listDisplay',
        component: Home,
        name: '列表展示',
        iconCls: 'fa fa-tachometer',//图标样式class
        children: [
            { path: '/listDisplay/bookList', component: bookList, name: '书本列表'},
            { path: '/listDisplay/bookList/bookDetails', component: bookDetails, name: '书本详情', hidden: true },
            { path: '/listDisplay/movieList', component: movieList, name: '电影列表' },
            // 备用 调试页面
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table', hidden: true },
            { path: '/form', component: Form, name: 'Form', hidden: true },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/listManage',
        component: Home,
        name: '列表管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/listManage/bookManage', component: bookManage, name: '书本管理' },
            { path: '/listManage/movieManage', component: movieManage, name: '电影管理' }
        ]
    },
    {
        path: '/about',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/about/page6', component: Page6, name: '关于' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
