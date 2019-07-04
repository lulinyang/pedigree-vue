import http from '@/http/server/api'
import VueCookies from 'vue-cookies'
const user = {
    state: {
        access_token: VueCookies.get('access_token'),
        token_type: VueCookies.get('token_type'),
        username: VueCookies.get('username'),
        headUrl: VueCookies.get('headUrl')
    },

    mutations: {
        setAccessToken: (state, access_token) => {
            state.access_token = access_token
        },
        setRefreshToken: (state, refresh_token) => {
            state.refresh_token = refresh_token
        },
        setTokentype: (state, token_type) => {
            state.token_type = token_type
        },
        setName: (state, username) => {
            state.username = username;
            VueCookies.set('username', username, 1);
        },
        setHeadUrl: (state, headUrl) => {
            state.headUrl = headUrl;
            VueCookies.set('headUrl', headUrl, 1);
        },
        setEmail: (state, email) => {
            state.email = email;
            VueCookies.set('email', email, 1);
        },
        setLoginAt: (state, login_at) => {
            state.login_at = login_at;
            VueCookies.set('login_at', login_at, 1);
        }
    },

    actions: {
        // 获取access_token
        getToken({ commit }, param) {
            return new Promise((resolve, reject) => {
                http.getToken(param).then(response => {
                    const data = response.data;
                    commit('setAccessToken', data.access_token);
                    commit('setRefreshToken', data.access_token);
                    commit('setTokentype', data.token_type);
                    VueCookies.set('access_token', data.access_token, 1);
                    VueCookies.set('refresh_token', data.refresh_token, 1);
                    VueCookies.set('token_type', data.token_type, 1);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            });
        },
        //登录
        login({ commit }, param) {
            return new Promise((resolve, reject) => {
                http.login(param).then(response => {
                    const data = response.data;
                    commit('setName', data.username);
                    commit('setHeadUrl', data.headUrl);
                    commit('setEmail', data.email);
                    commit('setLoginAt', data.login_at);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            });
        }
    }
}

export default user