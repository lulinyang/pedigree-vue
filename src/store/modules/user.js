import http from '@/http/server/api'
import VueCookies from 'vue-cookies'
const user = {
    state: {
        access_token: VueCookies.get('access_token'),
        token_type: VueCookies.get('token_type'),
    },

    mutations: {
        setAccessToken: (state, access_token) => {
            state.access_token = access_token
        },
        setExpiresIn: (state, expires_in) => {
            state.expires_in = expires_in
        },
        setRefreshToken: (state, refresh_token) => {
            state.refresh_token = refresh_token
        },
        setTokentype: (state, token_type) => {
            state.token_type = token_type
        },
        setName: (state, username) => {
            state.username = username;
            VueCookies.set('username', username);
        },
        setEmail: (state, email) => {
            state.email = email;
            VueCookies.set('email', email);
        },
        setLoginAt: (state, login_at) => {
            state.login_at = login_at;
            VueCookies.set('login_at', login_at);
        },
    },

    actions: {
        // 获取access_token
        getToken({ commit }, param) {
            return new Promise((resolve, reject) => {
                http.getToken(param).then(response => {
                    const data = response.data;
                    commit('setAccessToken', data.access_token);
                    commit('setExpiresIn', data.expires_in);
                    commit('setRefreshToken', data.access_token);
                    commit('setTokentype', data.token_type);
                    VueCookies.set('access_token', data.access_token, data.expires_in);
                    VueCookies.set('refresh_token', data.refresh_token);
                    VueCookies.set('token_type', data.token_type);
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