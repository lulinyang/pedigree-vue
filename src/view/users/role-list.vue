<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="formInline.username" placeholder="请名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
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
        <el-table :data="rolelist" border style="width: 100%">
          <el-table-column prop="name" label="角色名" width="180"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" @click="showModal(scope.row)">编辑</el-button>
              <el-button type="success" @click="showPower(scope.row)">分配权限</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;padding-top: 20px">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>

    <el-dialog :title="role.id ? '修改' : '新增'" :visible.sync="isShow" width="500px">
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

    <el-dialog title="分配权限" :visible.sync="isShowPower" width="400px">
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
import { truncate } from "fs";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      rolelist: [],
      formInline: {
        username: "",
        email: ""
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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getList() {
      const that = this;
      http
        .getRoles({})
        .then(res => {
          that.rolelist = res.data.data;
        })
        .catch(res => {});
    },
    addRole(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          http
            .addRole(that.role)
            .then(res => {
              console.log("res", res.data);
              if (res.data.original && res.data.original.created) {
                that.isShow = false;
                that.getList();
                this.$message.success("新增成功！");
              } else if (res.data.original && res.data.original.updated) {
                that.isShow = false;
                that.getList();
                this.$message.success("修改成功！");
              } else if (res.data.original && res.data.original.find) {
                this.$message.error("角色名重复！");
              } else {
                this.$message.error("添加失败！");
              }
            })
            .catch(res => {});
        }
      });
    },
    showModal(item) {
      this.role = item ? item : {};
      this.isShow = true;
    },
    showPower(item) {
      console.log("item", item);
      this.role = item ? item : {};
      const that = this;
      http
        .getNodesGetTree({})
        .then(res => {
          that.nodeAll = res.data;
        })
        .catch(res => {});
      this.isShowPower = true;
      setTimeout(() => {
        var permission_ids = item.permission_id;
        var arr = [];
        if(permission_ids != null) {
          arr = permission_ids.split(",");
        }
        this.$refs.tree.setCheckedKeys(arr);
      }, 100);
    },
    getCheckedKeys() {
      const that = this;
      var permission_id = this.$refs.tree.getCheckedKeys().toString();
      const params = {
        permission_id: permission_id,
        id: this.role.id
      };
      http
        .updateRolePower(params)
        .then(res => {
          if (res.data.original && res.data.original.updated) {
            this.isShowPower = false;
            that.getList();
            this.$message.success("操作成功！");
          }
        })
        .catch(res => {});
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