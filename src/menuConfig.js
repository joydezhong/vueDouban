let asideMenuConfig = [
  {
    name: '阅读管理',
    icon: 'people',
    children: [
      {
        name: '书本列表',
        icon: '',
        path: '/bookLists',
      },
      {
        name: '书本排行榜',
        icon: '',
        path: '/bookTops',
      }
    ],
  },
  {
  	name: '菜单项二',
    icon: 'star',
   	children: [
      {
        name: '书本列表',
        icon: '',
        path: '/bookLists',
      },
    ]
  },
  {
    name: '菜单包含子菜单',
    icon: 'settings',
    children: [
      {
        name: '下拉子项一',
        icon: '',
        path: '/666',
      },
      {
        name: '下拉子项二',
        path: '',
        icon: '/777',
      },
      {
        name: '下拉子项三',
        path: '',
        icon: '/888',
      }
    ],
  },
];

export default asideMenuConfig;
