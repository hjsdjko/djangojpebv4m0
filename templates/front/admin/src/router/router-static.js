import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Board from '@/views/board'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import aboutus from '@/views/modules/aboutus/list'
    import caipuxinxi from '@/views/modules/caipuxinxi/list'
    import discusspeiliaoxinxi from '@/views/modules/discusspeiliaoxinxi/list'
    import peiliaoxinxi from '@/views/modules/peiliaoxinxi/list'
    import discusscaipuxinxi from '@/views/modules/discusscaipuxinxi/list'
    import systemintro from '@/views/modules/systemintro/list'
    import caipufenlei from '@/views/modules/caipufenlei/list'
    import yonghu from '@/views/modules/yonghu/list'
    import meishixinxi from '@/views/modules/meishixinxi/list'
    import messages from '@/views/modules/messages/list'
    import config from '@/views/modules/config/list'
    import newstype from '@/views/modules/newstype/list'


//2.配置路由   注意：名字
export const routes = [{
    path: '/',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center', affix: true}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '美食资讯',
        component: news
      }
      ,{
	path: '/aboutus',
        name: '关于我们',
        component: aboutus
      }
      ,{
	path: '/caipuxinxi',
        name: '菜谱信息',
        component: caipuxinxi
      }
      ,{
	path: '/discusspeiliaoxinxi',
        name: '配料信息评论',
        component: discusspeiliaoxinxi
      }
      ,{
	path: '/peiliaoxinxi',
        name: '配料信息',
        component: peiliaoxinxi
      }
      ,{
	path: '/discusscaipuxinxi',
        name: '菜谱信息评论',
        component: discusscaipuxinxi
      }
      ,{
	path: '/systemintro',
        name: '系统简介',
        component: systemintro
      }
      ,{
	path: '/caipufenlei',
        name: '菜谱分类',
        component: caipufenlei
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/meishixinxi',
        name: '美食信息',
        component: meishixinxi
      }
      ,{
	path: '/messages',
        name: '留言板',
        component: messages
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/newstype',
        name: '美食资讯分类',
        component: newstype
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/board',
    name: 'board',
    component: Board,
    meta: {icon:'', title:'board'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
