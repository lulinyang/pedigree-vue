<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="keywords.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="keywords.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增用户</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="userlist" border style="width: 100%">
          <el-table-column prop="username" label="姓名" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="rolen_ame" label="角色"></el-table-column>
          <el-table-column prop="login_at" label="上次登录时间"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showModal(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;padding-top: 20px">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="changeCurrent"></el-pagination>
      </div>
    </el-card>

    <el-dialog :title="user.id ? '修改' : '新增'" :visible.sync="isShow" width="500px">
      <el-form ref="formUser" :model="user" :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="username" style="width: 350px;">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="width: 350px;">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 350px;" v-if="!user.id">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" style="width: 350px;">
          <el-select v-model="user.role_id" filterable placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser('formUser')">{{ user.id ? '修改' : '新增' }}</el-button>
          <el-button @click="isShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      userlist: [],
      keywords: {
        username: "",
        email: "",
        page: 1
      },
      user: {},
      isShow: false,
      rules: {
        username: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      roles: [],
      page: 1,
      total: 0
    };
  },
  created() {
    const that = this;
    that.getList();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    search() {
      this.keywords.page = 1;
      this.getList();
    },
    getList() {
      const that = this;
      http
        .getUserList(this.keywords)
        .then(res => {
          that.userlist = res.data.data;
          that.total = res.data.total;
        })
        .catch(res => {});
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    addUser(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          http
            .saveUser(that.user)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                that.isShow = false;
                that.getList();
                this.$message.success("新增成功！");
              } else if (res.data.original && res.data.original.updated) {
                that.isShow = false;
                that.getList();
                this.$message.success("修改成功！");
              } else if (res.data.original && res.data.original.find) {
                this.$message.error(res.data.original.message);
              } else {
                this.$message.error("添加失败！");
              }
            })
            .catch(res => {});
        }
      });
    },
    showModal(item) {
      const that = this;
      this.user = item ? item : {};
      this.isShow = true;
      http.getRolesAll().then(res => {
        that.roles = res.data
      });
    }
  }
};
</script>


<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.grid-content {
  margin-bottom: 15px;
}
</style>