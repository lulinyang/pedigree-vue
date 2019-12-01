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
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="username" label="用户名" width="150"></el-table-column>
          <el-table-column prop="tel" label="手机号" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="orgname" label="昵称/企业" width="180"></el-table-column>
          <el-table-column prop="rolen_ame" label="角色"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" width="180"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="showModal(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="showDel(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;padding-top: 20px">
        <el-pagination
          background
          @current-change="changeCurrent"
          @size-change="handleSizeChange"
          :page-sizes="[8, 15, 50, 100, 200]"
          :page-size="keywords.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog :title="user.id ? '修改' : '新增'" :visible.sync="isShow" width="500px">
      <el-form ref="formUser" :model="user" :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="username" style="width: 350px;">
          <el-input v-model="user.username" :disabled="Boolean(user.id)"></el-input>
        </el-form-item>
        <el-form-item label="昵称/企业" prop="orgname" style="width: 350px;">
          <el-input v-model="user.orgname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel" style="width: 350px;">
          <el-input v-model="user.tel" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="width: 350px;">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 350px;" v-if="!user.id">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="role_id"
          style="width: 350px;"
          v-if="this.$store.state.user.username === 'admin'"
        >
          <el-select v-model="user.role_id" filterable placeholder="请选择">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
      list: [],
      keywords: {
        username: "",
        email: "",
        page: 1,
        pageSize: 8
      },
      user: {},
      isShow: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }],
        orgname: [
          { required: true, message: "昵称或企业必填", trigger: "blur" }
        ]
      },
      roles: [],
      total: 0
    };
  },
  created() {
    const that = this;
    that.getList();
  },
  methods: {
    search() {
      this.keywords.page = 1;
      this.getList();
    },
    getList() {
      http.getUserList(this.keywords).then(res => {
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.keywords.pageSize = pageSize;
      this.getList();
    },
    addUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.saveUser(this.user).then(res => {
            this.isShow = false;
            this.getList();
            this.$message.success(res.data.stateMsg);
          });
        }
      });
    },
    showModal(item) {
      this.user = item ? item : {};
      this.isShow = true;
      http.getRolesAll({}).then(res => {
        this.roles = res.data.data;
      });
    },
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    deleteUser(item) {
      const param = {
        id: item.id,
        orgcode: item.orgcode
      };
      http.deleteUser(param).then(res => {
        this.$message.success(res.data.stateMsg);
        this.getList();
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