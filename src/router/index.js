import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/',
			component: resolve => require(['@/components/common/Home.vue'], resolve),
			meta: { title: '系统首页' },
			children: [
				{
					path: '/home',
					component: resolve => require(['@/view/home.vue'], resolve),
					meta: { title: '系统首页' }
				},
				//用户中心
				{
					path: '/admin-list',
					component: resolve => require(['@/view/admin/admin-list.vue'], resolve),
					meta: { title: '管理员' }
				},
				{
					path: '/role-list',
					component: resolve => require(['@/view/admin/role-list.vue'], resolve),
					meta: { title: '角色管理' }
				},
				{
					path: '/power-list',
					component: resolve => require(['@/view/admin/power-list.vue'], resolve),
					meta: { title: '权限管理' }
				},
				//族谱管理
				{
					path: '/genealogy-list',
					component: resolve => require(['@/view/genealogy/genealogy-list.vue'], resolve),
					meta: { title: '族谱列表' }
				},
				{
					path: '/genealogy-add',
					component: resolve => require(['@/view/genealogy/genealogy-add.vue'], resolve),
					meta: { title: '新增族谱' }
				},
				{
					path: '/genealogy-edit/:id(\\d+)',
					component: resolve => require(['@/view/genealogy/genealogy-edit.vue'], resolve),
					meta: { title: '编辑族谱' }
				},
				{
					path: '/genealogy-detail/:id(\\d+)',
					component: resolve => require(['@/view/genealogy/genealogy-detail.vue'], resolve),
					meta: { title: '家族简介' }
				},
				{
					path: '/pedigree-list/:id(\\d+)',
					component: resolve => require(['@/view/genealogy/pedigree-list.vue'], resolve),
					meta: { title: '族谱详情' }
				},
				{
					path: '/pedigree-topology/:id(\\d+)',
					component: resolve => require(['@/view/genealogy/pedigree-topology.vue'], resolve),
					meta: { title: '族谱拓扑图' }
				},
				//成员管理
				{
					path: '/member-list',
					component: resolve => require(['@/view/genealogy/member-list.vue'], resolve),
					meta: { title: '成员管理' }
				},
				{
					path: '/member-add',
					component: resolve => require(['@/view/genealogy/member-add.vue'], resolve),
					meta: { title: '新增成员' }
				},
				{
					path: '/member-edit/:id(\\d+)',
					component: resolve => require(['@/view/genealogy/member-edit.vue'], resolve),
					meta: { title: '编辑成员' }
				},
				{
					path: '/member-detail',
					component: resolve => require(['@/view/genealogy/member-detail.vue'], resolve),
					meta: { title: '成员简介' }
				},
				//文章管理
				{
					path: '/column-list',
					component: resolve => require(['@/view/article/column-list.vue'], resolve),
					meta: { title: '栏目管理' }
				},
				{
					path: '/article-list',
					component: resolve => require(['@/view/article/article-list.vue'], resolve),
					meta: { title: '文章列表' }
				},
				{
					path: '/article-add',
					component: resolve => require(['@/view/article/article-add.vue'], resolve),
					meta: { title: '新增文章' }
				},
				{
					path: '/article-edit/:id(\\d+)',
					component: resolve => require(['@/view/article/article-edit.vue'], resolve),
					meta: { title: '编辑文章' }
				},
				{
					path: '/article-detail/:id(\\d+)',
					component: resolve => require(['@/view/article/article-detail.vue'], resolve),
					meta: { title: '文章详情' }
				},
				{
					path: '/celebrity',
					component: resolve => require(['@/view/celebrity/celebrity.vue'], resolve),
					meta: { title: '名人烈士' }
				},
				{
					path: '/add-celebrity',
					component: resolve => require(['@/view/celebrity/add-celebrity.vue'], resolve),
					meta: { title: '添加历史名人/烈士' }
				},
				{
					path: '/edit-celebrity/:id',
					component: resolve => require(['@/view/celebrity/add-celebrity.vue'], resolve),
					meta: { title: '编辑历史名人/烈士' }
				},
				{
					path: '/celebrity-detail/:id',
					component: resolve => require(['@/view/celebrity/celebrity-detail.vue'], resolve),
					meta: { title: '历史名人/烈士详情' }
				},
				//用户管理
				{
					path: '/user-list',
					component: resolve => require(['@/view/users/user-list.vue'], resolve),
					meta: { title: '宗祠管理' }
				},
				//宗祠管理
				{
					path: '/ancestral-hall',
					component: resolve => require(['@/view/ancestral/ancestral-hall.vue'], resolve),
					meta: { title: '宗祠管理' }
				},
				{
					path: '/add-ancestral-hall',
					component: resolve => require(['@/view/ancestral/add-ancestral-hall.vue'], resolve),
					meta: { title: '添加宗祠' }
				},
				// notice-list
				{
					path: '/edit-ancestral-hall/:id',
					component: resolve => require(['@/view/ancestral/add-ancestral-hall.vue'], resolve),
					meta: { title: '编辑宗祠' }
				},
				{
					path: '/notice-list',
					component: resolve => require(['@/view/ancestral/notice-list.vue'], resolve),
					meta: { title: '公告管理' }
				},
				{
					path: '/topic-list',
					component: resolve => require(['@/view/topic/topic-list.vue'], resolve),
					meta: { title: '话题管理' }
				},
				//基础设置
				{
					path: '/home-setting',
					component: resolve => require(['@/view/setting/home-setting.vue'], resolve),
					meta: { title: '首页配置' }
				},
				{
					path: '/default-head',
					component: resolve => require(['@/view/setting/default-head.vue'], resolve),
					meta: { title: '默认头像' }
				},
				{
					path: '/404',
					component: resolve => require(['../components/page/404.vue'], resolve),
					meta: { title: '404' }
				},
				{
					path: '/403',
					component: resolve => require(['../components/page/403.vue'], resolve),
					meta: { title: '403' }
				}
			]
		},
		{
			path: '/login',
			component: resolve => require(['@/view/login.vue'], resolve)
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
})
