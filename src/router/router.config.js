/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/rankingList',
        name: 'RankingList',
        component: () => import('@/views/rankingList/index'),
        meta: { title: '排行榜', keepAlive: false }
      },
      {
        path: '/multiple',
        name: 'Multiple',
        component: () => import('@/views/multiple/index'),
        meta: { title: '多个', keepAlive: false }
      },
      {
        path: '/single',
        name: 'Single',
        component: () => import('@/views/single/index'),
        meta: { title: '单个', keepAlive: false }
      },
      {
        path: '/nothing',
        name: 'Nothing',
        component: () => import('@/views/nothing/index'),
        meta: { title: '没有', keepAlive: false }
      }
    ]
  }
]
