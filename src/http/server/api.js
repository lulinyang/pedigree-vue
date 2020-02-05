import extendsApi from './extendsApi'

class AllServiceApi extends extendsApi {
  constructor() {
    super()
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
  //获取当前用户所有权限
  getJurisdiction(params) {
    return this.sendGet('/api/getJurisdiction', params);
  }
  //新增族谱
  addGenealogy(params) {
    return this.sendPost('/api/addGenealogy', params);
  }
  //获取族谱列表
  getGenealogyList(params) {
    return this.sendGet('/api/getGenealogyList', params);
  }
  //根据id获取族谱
  getGenealogy(params) {
    return this.sendGet('/api/getGenealogy', params);
  }
  //删除族谱
  deleteGenealogy(params) {
    return this.sendPost('/api/deleteGenealogy', params);
  }
  //得到成员列表
  getMemberList(params) {
    return this.sendGet('/api/getMemberList', params);
  }
  //新增成员
  addMember(params) {
    return this.sendPost('/api/addMember', params);
  }
  //得到成员信息 
  getMember(params) {
    return this.sendGet('/api/getMember', params);
  }
  //删除族谱
  deleteMember(params) {
    return this.sendPost('/api/deleteMember', params);
  }
  //得到族谱详情成员(树形)，
  getPedigreeTree(params) {
    return this.sendGet('/api/getPedigreeTree', params);
  }
  //获取全部成员
  getMemberAll(params) {
    return this.sendGet('/api/getMemberAll', params);
  }
  //添加族谱详情列表
  addPedigree(params) {
    return this.sendPost('/api/addPedigree', params);
  }
  //得到族谱详情成员(分类)
  getPedigreeAll(params) {
    return this.sendGet('/api/getPedigreeAll', params);
  }
  //删除族谱详情成员
  deletePedigree(params) {
    return this.sendPost('/api/deletePedigree', params);
  }
  //得到族谱详情成员(拓扑图)
  getTreeChart(params) {
    return this.sendGet('/api/getTreeChart', params);
  }
  //得到分类列表
  getColumnList(params) {
    return this.sendGet('/api/getColumnList', params);
  }
  //新增栏目
  addColumn(params) {
    return this.sendPost('/api/addColumn', params);
  }
  //删除栏目
  delColumn(params) {
    return this.sendPost('/api/delColumn', params);
  }
  //新增文章
  addarticle(params) {
    return this.sendPost('/api/addarticle', params);
  }
  //获取文章列表
  getArcticlList(params) {
    return this.sendGet('/api/getArcticlList', params);
  }
  //根据id得到一篇文章
  getArticle(params) {
    return this.sendGet('/api/getArticle', params);
  }
  //删除文章
  deleteArcticle(params) {
    return this.sendPost('/api/deleteArcticle', params);
  }
  //保存轮播图
  addBanner(params) {
    return this.sendPost('/api/addBanner', params);
  }
  //获取轮播图
  getBanner(params) {
    return this.sendGet('/api/getBanner', params);
  }
  //删除轮播图
  delBanner(params) {
    return this.sendPost('/api/delBanner', params);
  }
  //保存首页菜单
  addMenu(params) {
    return this.sendPost('/api/addMenu', params);
  }
  //获取首页菜单
  getMenu(params) {
    return this.sendGet('/api/getMenu', params);
  }
  //获取用户列表（移动端）
  getUser(params) {
    return this.sendGet('/api/getUser', params);
  }
  //根据用户名得到用户
  getUserAll(params) {
    return this.sendGet('/api/getUserAll', params);
  }
  //根据族谱名获取所有族谱
  getSurnameAll(params) {
    return this.sendGet('/api/getSurnameAll', params);
  }
  //添加宗祠
  addAncestral(params) {
    return this.sendPost('/api/addAncestral', params);
  }
  //宗祠列表
  getAncestral(params) {
    return this.sendGet('/api/getAncestral', params);
  }
  //根据ID获取宗祠
  getAncestralById(params) {
    return this.sendGet('/api/getAncestralById', params);
  }
  //删除宗祠
  delAncestral(params) {
    return this.sendPost('/api/delAncestral', params);
  }
  //添加历史名人/烈士
  addCelebrity(params) {
    return this.sendPost('/api/addCelebrity', params);
  }
  //获取历史名人/烈士
  getCelebrity(params) {
    return this.sendGet('/api/getCelebrity', params);
  }
  //根据ID获取历史名人/烈士
  getCelebrityById(params) {
    return this.sendGet('/api/getCelebrityById', params);
  }
  //删除历史名人/烈士
  delCelebrity(params) {
    return this.sendPost('/api/delCelebrity', params);
  }
  //得到全部宗祠
  getAncestralAll(params) {
    return this.sendGet('/api/getAncestralAll', params);
  }
  //添加公告
  addNotice(params) {
    return this.sendPost('/api/addNotice', params);
  }
  //公告列表
  getNoticeList(params) {
    return this.sendGet('/api/getNoticeList', params);
  }
  //编辑公告
  editNotice(params) {
    return this.sendPost('/api/editNotice', params);
  }
  //删除公告
  delNotice(params) {
    return this.sendPost('/api/delNotice', params);
  }
  //得到话题列表
  getConversationList(params) {
    return this.sendGet('/api/getConversationList', params);
  }
  //删除话题
  delConversationList(params) {
    return this.sendPost('/api/delConversationList', params);
  }
}

export default new AllServiceApi()