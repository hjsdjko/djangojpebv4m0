import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Messages from '../pages/messages/list'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import caipufenleiList from '../pages/caipufenlei/list'
import caipufenleiDetail from '../pages/caipufenlei/detail'
import caipufenleiAdd from '../pages/caipufenlei/add'
import caipuxinxiList from '../pages/caipuxinxi/list'
import caipuxinxiDetail from '../pages/caipuxinxi/detail'
import caipuxinxiAdd from '../pages/caipuxinxi/add'
import peiliaoxinxiList from '../pages/peiliaoxinxi/list'
import peiliaoxinxiDetail from '../pages/peiliaoxinxi/detail'
import peiliaoxinxiAdd from '../pages/peiliaoxinxi/add'
import meishixinxiList from '../pages/meishixinxi/list'
import meishixinxiDetail from '../pages/meishixinxi/detail'
import meishixinxiAdd from '../pages/meishixinxi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'
import discusscaipuxinxiList from '../pages/discusscaipuxinxi/list'
import discusscaipuxinxiDetail from '../pages/discusscaipuxinxi/detail'
import discusscaipuxinxiAdd from '../pages/discusscaipuxinxi/add'
import discusspeiliaoxinxiList from '../pages/discusspeiliaoxinxi/list'
import discusspeiliaoxinxiDetail from '../pages/discusspeiliaoxinxi/detail'
import discusspeiliaoxinxiAdd from '../pages/discusspeiliaoxinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'messages',
					component: Messages
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'caipufenlei',
					component: caipufenleiList
				},
				{
					path: 'caipufenleiDetail',
					component: caipufenleiDetail
				},
				{
					path: 'caipufenleiAdd',
					component: caipufenleiAdd
				},
				{
					path: 'caipuxinxi',
					component: caipuxinxiList
				},
				{
					path: 'caipuxinxiDetail',
					component: caipuxinxiDetail
				},
				{
					path: 'caipuxinxiAdd',
					component: caipuxinxiAdd
				},
				{
					path: 'peiliaoxinxi',
					component: peiliaoxinxiList
				},
				{
					path: 'peiliaoxinxiDetail',
					component: peiliaoxinxiDetail
				},
				{
					path: 'peiliaoxinxiAdd',
					component: peiliaoxinxiAdd
				},
				{
					path: 'meishixinxi',
					component: meishixinxiList
				},
				{
					path: 'meishixinxiDetail',
					component: meishixinxiDetail
				},
				{
					path: 'meishixinxiAdd',
					component: meishixinxiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
				{
					path: 'discusscaipuxinxi',
					component: discusscaipuxinxiList
				},
				{
					path: 'discusscaipuxinxiDetail',
					component: discusscaipuxinxiDetail
				},
				{
					path: 'discusscaipuxinxiAdd',
					component: discusscaipuxinxiAdd
				},
				{
					path: 'discusspeiliaoxinxi',
					component: discusspeiliaoxinxiList
				},
				{
					path: 'discusspeiliaoxinxiDetail',
					component: discusspeiliaoxinxiDetail
				},
				{
					path: 'discusspeiliaoxinxiAdd',
					component: discusspeiliaoxinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
