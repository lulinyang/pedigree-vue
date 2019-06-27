import extendsApi from '../extendsApi'

class AllServiceApi extends extendsApi {
  constructor() {
    super()
    // this.demoUrl = 'test.com';
    // this.oauth = 'test.com/oauth/token'
  }
  //获取token
  getToken(params) {
    const data = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'iSqQiR68eFhYnYQ1CwZJgCxdnUMNdqJiUcIHq4Gg',
      provider: 'customer',
      username: params.username,
      password: params.password
    }
    return this.sendPost('/oauth/token', data);
  }
  //登录
  login(params) {
    return this.sendPost('/api/getUserInfo', params);
  }

  //用户列表
  getUserList(params) {

    return this.sendGet('/api/getUserList', params);
  }
  //得到所有角色
  getRolesAll(params) {
    return this.sendGet('/api/getRolesAll', params);
  }
  //新增用户
  saveUser(params) {
    return this.sendPost('/api/saveUser', params);
  }
  //得到节点列表
  getNodes(params) {
    return this.sendGet('/api/getNodes', params);
  }
  //得到所有节点
  getNodesAll(params) {
    return this.sendGet('/api/getNodesAll', params);
  }
  //得到所有节点
  getNodesGetTree(params) {
    return this.sendGet('/api/getNodesGetTree', params);
  }
  //新增节点
  addNode(params) {
    return this.sendPost('/api/addNode', params);
  }
  //得到角色列表
  getRoles(params) {
    return this.sendGet('/api/getRoles', params);
  }
  //新增角色
  addRole(params) {
    return this.sendPost('/api/addRole', params);
  }
  //分配权限
  updateRolePower(params) {
    return this.sendPost('/api/updateRolePower', params);
  }
  //删除节点
  deleteNode(params) {
    return this.sendPost('/api/deleteNode', params);
  }
  //删除角色
  deleteRole(params) {
    return this.sendPost('/api/deleteRole', params);
  }
  //删除用户
  deleteUser(params) {
    return this.sendPost('/api/deleteUser', params);
  }
}

export default new AllServiceApi()