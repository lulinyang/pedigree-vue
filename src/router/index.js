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
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/home',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user-list',
                    component: resolve => require(['@/view/users/user-list.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/role-list',
                    component: resolve => require(['@/view/users/role-list.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/power-list',
                    component: resolve => require(['@/view/users/power-list.vue'], resolve),
                    meta: { title: '权限管理' }
                },
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
                    path: '/genealogy-edit',
                    component: resolve => require(['@/view/genealogy/genealogy-edit.vue'], resolve),
                    meta: { title: '编辑族谱' }
                },
                {
                    path: '/pedigree-list',
                    component: resolve => require(['@/view/genealogy/pedigree-list.vue'], resolve),
                    meta: { title: '族谱详情' }
                },
                {
                    path: '/pedigree-topology',
                    component: resolve => require(['@/view/genealogy/pedigree-topology.vue'], resolve),
                    meta: { title: '族谱拓扑图' }
                },
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
                    path: '/member-edit',
                    component: resolve => require(['@/view/genealogy/member-edit.vue'], resolve),
                    meta: { title: '编辑成员' }
                },
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
                    path: '/article-edit',
                    component: resolve => require(['@/view/article/article-edit.vue'], resolve),
                    meta: { title: '编辑文章' }
                },
                {
                    path: '/article-detail',
                    component: resolve => require(['@/view/article/article-detail.vue'], resolve),
                    meta: { title: '文章详情' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
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
