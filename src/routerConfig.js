import BookLists from './pages/bookLists';
import BookTops from './pages/bookTops';

const routerConfig = [
  {
    path: '/bookLists',
    component: BookLists,
    meta: {
      title: '书本列表',
    },
  },
  {
    path: '/BookTops',
    component: BookTops,
    meta: {
      title: '书本排行榜',
    },
  }
];


export default routerConfig;
