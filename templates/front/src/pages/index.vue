<template>
	<div class="main-containers">
		<div class="body-containers" :style='{"minHeight":"100vh","padding":"45px 0 0","margin":"0","position":"relative","background":"#ffffff"}'>
		<div class="top-container" :style='{"padding":"0 20px","top":"0","alignItems":"center","left":"0","background":"#f0f0f0","display":"flex","width":"100%","position":"fixed","justifyContent":"flex-end","height":"45px","zIndex":"1002"}'>
			<!-- info -->
			<div :style='{"padding":"0 0 0 40px","alignItems":"center","left":"0","bottom":"-120px","background":"none","display":"flex","width":"21%","position":"absolute","height":"120px"}'>
			  <span :style='{"padding":"0 0 0 12px","lineHeight":"44px","fontSize":"22px","color":"#654b3c","float":"left"}'>豆果美食推荐系统</span>
			</div>
			
			<div v-if="false" :style='{"color":"#666","margin":"0 10px","fontSize":"14px"}'>0753-1234567</div>
			
			<div id="search" class="search" :style='{"margin":"0 30px 0 0","alignItems":"center","flexWrap":"wrap","bottom":"-85px","background":"none","display":"flex","width":"22%","position":"absolute","justifyContent":"flex-end","height":"auto"}'>
				<div :style='{"margin":"0 0px 0 0"}' class="select">
					<el-select v-model="queryIndex">
						<el-option v-for="(item,index) in queryList" :key="index" :label="item.queryName" :value="index"></el-option>
					</el-select>
				</div>
				<div :style='{"margin":"0 10px 0 0"}' class="input" v-if="queryIndex==0">
					<el-input v-model="peiliaoxinxipeiliaomingcheng" placeholder="配料名称"></el-input>
				</div>
				<div :style='{"margin":"0"}' class="btn" v-if="queryIndex==0">
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"30px","background":"#654b3c","width":"auto","lineHeight":"44px","fontSize":"14px","height":"44px"}' type="primary" @click="search('peiliaoxinxi')">
						<span class="icon iconfont icon-fangdajing07" :style='{"color":"rgba(255, 255, 255, 1)","margin":"0 4px 0 0","fontSize":"14px"}'></span>
						搜索
					</el-button>
				</div>
			</div>
			<img v-if="headportrait&&Token" :style='{"width":"40px","margin":"0 12px","borderRadius":"50%","display":"none","height":"40px"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
			<div v-if="Token" :style='{"padding":"0 12px","fontSize":"14px","lineHeight":"32px","color":"#654B3C","height":"32px"}'>{{username}}</div>
			<div v-if="Token && notAdmin" :style='{"padding":"0 12px","fontSize":"14px","lineHeight":"32px","color":"#654B3C","height":"32px"}' @click="goMenu('/index/center')">个人中心</div>
			<el-button v-if="!Token" @click="toLogin()" :style='{"padding":"0 12px","margin":"0 10px","color":"#654B3C","borderRadius":"2px","background":"#f0f0f0","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px"}'>登录/注册</el-button>
			<el-button v-if="Token" @click="logout" :style='{"padding":"0 12px","margin":"0 10px","color":"#654B3C","borderRadius":"2px","background":"#f0f0f0","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px"}'>退出</el-button>
		</div>


			<div class="menu-preview" :style='{"padding":"0 25% 0 21%","borderColor":"#efefef","top":"45px","background":"#ffffff","borderWidth":"0","width":"100%","position":"fixed","borderStyle":"solid","height":"auto","zIndex":"999"}'>
			<el-scrollbar wrap-class="scrollbar-wrapper-horizontal">
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"0","listStyle":"none","margin":"0","alignItems":"center","background":"#FFF","display":"flex","width":"100%","position":"relative","height":"120px"}' :default-active="activeMenu" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<div class="userinfo" :style='{"width":"84px","padding":"6px 10px 0","display":"none","height":"auto"}'>
					  <el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"20px","display":"block","height":"32px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover"></el-image>
					  <div :style='{"fontSize":"12px","lineHeight":"1.5","color":"#333","textAlign":"center"}'>nickname</div>
					</div>
					<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>首页</span>
					</el-menu-item>
					<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
						<i :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>个人中心</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
			</div>


			<div class="banner-preview" :style='{"width":"100%","margin":"120px 0 0 0","height":"auto"}'>
				<el-carousel :style='{"width":"100%","margin":"0 auto","height":"600px"}' trigger="click" indicator-position="inside" arrow="always" type="default" direction="horizontal" height="600px" :autoplay="true" :interval="3000" :loop="true">
					<el-carousel-item :style='{"borderRadius":"0","width":"100%","height":"600px"}' v-for="item in carouselList" :key="item.id">
						<el-image @click="carouselClick(item.url)" :style='{"objectFit":"cover","width":"100%","height":"100%"}' :src="baseUrl + item.value" fit="cover"></el-image>
					</el-carousel-item>
				</el-carousel>
			</div>


			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview" :style='{"width":"100%","height":"auto"}'>
				<div :style='{"width":"100%","padding":"20px","overflow":"hidden","background":"#654B3C","height":"auto"}'><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import axios from 'axios'

export default {
    data() {
		return {
		queryList:[
		  {
			  queryName:"配料名称",
		  },
		],
		queryIndex: 0,
		peiliaoxinxipeiliaomingcheng: '',
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-explore","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-form","buttons":["新增","查看","修改","删除"],"menu":"菜谱分类","menuJump":"列表","tableName":"caipufenlei"}],"menu":"菜谱分类管理"},{"child":[{"allButtons":["新增","查看","修改","删除","分类统计","配料","查看评论","首页总数","首页统计"],"appFrontIcon":"cuIcon-qrcode","buttons":["查看","修改","删除","查看评论","首页总数"],"menu":"菜谱信息","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-phone","buttons":["查看","修改","删除","查看评论","新增"],"menu":"配料信息","menuJump":"列表","tableName":"peiliaoxinxi"}],"menu":"配料信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","菜品浏览","收藏量","发布量","首页总数","首页统计","爬取数据"],"appFrontIcon":"cuIcon-goodsnew","buttons":["查看","修改","删除","首页总数","爬取数据","新增"],"menu":"美食信息","menuJump":"列表","tableName":"meishixinxi"}],"menu":"美食信息管理"},{"child":[{"allButtons":["查看","修改","回复","删除"],"appFrontIcon":"cuIcon-message","buttons":["查看","修改","回复","删除"],"menu":"留言板","tableName":"messages"}],"menu":"留言板"},{"child":[{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-goodsnew","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-pay","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-clothes","buttons":["查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"美食资讯","tableName":"news"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"美食资讯分类","tableName":"newstype"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","分类统计","配料","查看评论","首页总数","首页统计"],"appFrontIcon":"cuIcon-form","buttons":["查看","查看评论"],"menu":"菜谱信息列表","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-present","buttons":["查看","查看评论"],"menu":"配料信息列表","menuJump":"列表","tableName":"peiliaoxinxi"}],"menu":"配料信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","菜品浏览","收藏量","发布量","首页总数","首页统计","爬取数据"],"appFrontIcon":"cuIcon-vipcard","buttons":["查看"],"menu":"美食信息","menuJump":"列表","tableName":"meishixinxi"}],"menu":"美食信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","分类统计","配料","查看评论","首页总数","首页统计"],"appFrontIcon":"cuIcon-qrcode","buttons":["新增","查看","修改","删除"],"menu":"菜谱信息","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","分类统计","配料","查看评论","首页总数","首页统计"],"appFrontIcon":"cuIcon-form","buttons":["查看","查看评论"],"menu":"菜谱信息列表","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-present","buttons":["查看","查看评论"],"menu":"配料信息列表","menuJump":"列表","tableName":"peiliaoxinxi"}],"menu":"配料信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","菜品浏览","收藏量","发布量","首页总数","首页统计","爬取数据"],"appFrontIcon":"cuIcon-vipcard","buttons":["查看"],"menu":"美食信息","menuJump":"列表","tableName":"meishixinxi"}],"menu":"美食信息模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}],
			baseUrl: '',
			carouselList: [],
			menuList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('frontUserid')
			},
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			timer: '',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
		}
    },
    created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
        if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';



    },
    computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('frontToken')
            if(arr[1]!='/index/home'){
            	var element = document.getElementById('scrollView');
            	var distance = element.offsetTop;
            	window.scrollTo( 0, distance )
            }else{
            	window.scrollTo( 0, 0 )
            }
        },
		headportrait(){
			this.$forceUpdate()
		},
    },
    methods: {
      search(tablename) {
        if (this.queryIndex == 0 && this.peiliaoxinxipeiliaomingcheng) {
          this.$router.push({path: '/index/' + tablename, query: {indexQueryCondition: this.peiliaoxinxipeiliaomingcheng}});
        }
      },

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.open(`${this.$config.baseUrl}admin/dist/index.html`, "_blank");
		},
		goMenu(path) {
            this.$router.push(path);
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	  
	    & /deep/ .scrollbar-wrapper-vertical {
	      overflow-x: hidden;
	    }
	  
	    & /deep/ .scrollbar-wrapper-horizontal {
	      overflow-y: hidden;
	  
	      .el-scrollbar__view {
	        white-space: nowrap;
	      }
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home {
				cursor: pointer;
				padding: 0 0px;
				color: #654b3c;
				white-space: nowrap;
				display: flex;
				font-size: 14px;
				border-color: #f0f0f0;
				line-height: 56px;
				background: #fff;
				justify-content: center;
				border-width: 0 1px 0 0;
				align-items: center;
				position: relative;
				border-style: solid;
				list-style: none;
				min-width: 120px;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home:hover {
				color: #fff;
				background: #654b3c;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home.is-active {
				color: #fff;
				background: #654b3c;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item {
				cursor: pointer;
				padding: 0 0px;
				color: #654b3c;
				white-space: nowrap;
				display: flex;
				font-size: 14px;
				border-color: #f0f0f0;
				line-height: 56px;
				background: #fff;
				justify-content: center;
				border-width: 0 1px 0 0;
				align-items: center;
				position: relative;
				border-style: solid;
				list-style: none;
				min-width: 120px;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item:hover {
				color: #fff;
				background: #654b3c;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item.is-active {
				color: #fff;
				background: #654b3c;
			}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: #654b3c;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: #654b3c;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0 0 10px;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		border-radius: 10px;
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
        padding-bottom: 20px;
        width: 100%;
        margin-bottom: 10px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }
    }

    .clear-float {
        clear: both;
    }


	
	// -------- search --------
	.main-containers .search .select /deep/ .el-input__inner {
				border: 0;
				border-radius: 30px 0 0 30px;
				padding: 0 0px 0 10px;
				box-shadow: #F6F6F6;
				color: #000;
				background: url(http://codegen.caihongy.cn/20231121/0655feaddd0a492b8c1bc3fbb312874e.png) no-repeat right center,#F6F6F6;
				width: 110px;
				font-size: 14px;
				height: 44px;
			}
	
	.main-containers .search .input /deep/ .el-input__inner {
				border: 0;
				border-radius: 0 30px 30px 0;
				padding: 0 10px;
				outline: none;
				color: #000;
				background: #F6F6F6;
				width: 150px;
				font-size: 14px;
				height: 44px;
			}
	// -------- search --------
	
	.main-containers .btn-service {
				border: 0;
				padding: 0 8px;
				margin: 0 10px;
				color: #654B3C;
				background: #efefef;
				width: auto;
				font-size: 14px;
				line-height: 32px;
				height: 32px;
			}
	
	.main-containers .btn-service:hover {
				color: #654B3C;
			}
	
	.main-containers .btn-shop {
				border: 0;
				padding: 0 8px;
				margin: 0 10px;
				color: #654B3C;
				background: #efefef;
				width: auto;
				font-size: 14px;
				line-height: 32px;
				height: 32px;
			}
	
	.main-containers .btn-shop:hover {
				color: #654B3C;
			}
</style>
