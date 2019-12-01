<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="keywords.name" placeholder="请名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增角色</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="name" label="角色名" width="180"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="showModal(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="showDel(scope.row)"></el-button>
              <!-- <el-button type="primary" icon="el-icon-edit" @click="showModal(scope.row)">编辑</el-button> -->
              <el-button type="success" @click="showPower(scope.row)">分配权限</el-button>
              <!-- <el-button type="danger" icon="el-icon-delete" @click="showDel(scope.row)">删除</el-button> -->
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

    <el-dialog :title="role.id ? '修改' : '新增'" :visible.sync="isShow" width="50%">
      <el-form ref="formRole" :model="role" :rules="rules" label-width="120px">
        <el-form-item label="角色名" prop="name" style="width: 350px;">
          <el-input v-model="role.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" style="width: 350px;">
          <el-input v-model="role.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRole('formRole')">{{ role.id ? '修改' : '新增' }}</el-button>
          <el-button @click="isShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="分配权限" :visible.sync="isShowPower" width="40%">
      <el-tree
        :data="nodeAll"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
      <div class="buttons">
        <el-button @click="isShowPower = false">取消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/http/server/api";
import { setTimeout } from "timers";
import { Promise, reject } from "q";
export default {
  data() {
    return {
      list: [],
      keywords: {
        name: "",
        page: 1,
        pageSize: 8
      },
      role: {
        pid: 0
      },
      isShow: false,
      isShowPower: false,
      nodeAll: [],
      rules: {
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }]
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    search() {
      this.getList();
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.keywords.pageSize = pageSize;
      this.getList();
    },
    getList() {
      http.getRoles(this.keywords).then(res => {
        this.list = res.data.data.data;
        this.total = res.data.data.total;
      });
    },
    addRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.addRole(this.role).then(res => {
            this.isShow = false;
            this.getList();
            this.$message.success(res.data.stateMsg);
          });
        }
      });
    },
    showModal(item) {
      this.role = item ? item : {};
      this.isShow = true;
    },
    showPower(item) {
      this.role = item ? item : {};
      const that = this;
      const parentNodes = [];
      new Promise((resolve, reject) => {
        http
          .getNodesGetTree({})
          .then(res => {
            that.nodeAll = res.data.data;
            that.nodeAll.forEach(val => {
              if (val.children.length > 0) {
                parentNodes.push(val.id);
              }
            });
            resolve(parentNodes);
          })
          .catch(res => {
            reject(res);
          });
      }).then(res => {
        that.isShowPower = true;
        setTimeout(() => {
          var permission_ids = item.permission_id;
          var arr = [];
          if (permission_ids != null && permission_ids != "") {
            arr = permission_ids.split(",");
            let keys = [];

            arr.forEach(id => {
              if (parentNodes.toString().indexOf(id) === -1) {
                keys.push(id);
              }
            });
            that.$refs.tree.setCheckedKeys(keys);
          }
        }, 100);
      });
    },
    getCheckedKeys() {
      const that = this;
      var permission_id = this.$refs.tree.getCheckedKeys();
      var half = this.$refs.tree.getHalfCheckedKeys();
      var permIds = permission_id.concat(half).toString();
      const params = {
        permission_id: permIds,
        id: this.role.id
      };
      http.updateRolePower(params).then(res => {
        this.isShowPower = false;
        this.keywords.page = 1;
        that.getList();
        this.$message.success(res.data.stateMsg);
      });
    },
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRole(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    deleteRole(item) {
      http.deleteRole({ id: item.id }).then(res => {
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
.buttons {
  text-align: center;
  margin-top: 15px;
}
</style>