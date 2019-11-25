import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

import VueNeditorWrap from "vue-neditor-wrap";
Vue.use(VueNeditorWrap);

Vue.component('vue-neditor-wrap', VueNeditorWrap)
Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'medium'
});
Vue.prototype.$axios = axios;

import store from '@/store/index'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// Vue.http.options.emulateJSON = true;
const i18n = new VueI18n({
    locale: 'zh',
    messages
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (!VueCookies.isKey('access_token') && to.path !== '/login') {
        next('/login');
    }else {
        next();
    }
    
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')