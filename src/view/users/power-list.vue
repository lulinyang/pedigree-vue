<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增节点</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table
          :data="nodelist"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <!-- <el-table-column prop="router" label="后端路由" width="180"></el-table-column> -->
          <el-table-column prop="index" label="前端路由"></el-table-column>
          <el-table-column prop="icon" label="图标" width="80" align="center">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="80" align="center"></el-table-column>
          <el-table-column label="置顶" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.top" @change="roofPlacement(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="description" label="描述" width="180"></el-table-column> -->
          <el-table-column prop="created_at" label="创建时间" width="150"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" width="150"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showModal(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="showDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>


    <el-dialog :title="nodes.id ? '修改' : '新增'" :visible.sync="isShow" width="500px">
      <el-form ref="formNode" :model="nodes" :rules="rules" label-width="120px">
        <el-form-item label="节点名称" prop="name" style="width: 350px;">
          <el-input v-model="nodes.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="后端路由" style="width: 350px;">
          <el-input v-model="nodes.router"></el-input>
        </el-form-item> -->
        <el-form-item label="前端路由" style="width: 350px;">
          <el-input v-model="nodes.index"></el-input>
        </el-form-item>
        <el-form-item label="图标" style="width: 350px;">
          <el-input v-model="nodes.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序值" style="width: 350px;" :error="sortMessage">
          <el-input v-model="nodes.sort"></el-input>
        </el-form-item>
        <el-form-item label="父节点">
          <el-select v-model="nodes.pidLevel" filterable placeholder="请选择节点层级" :disabled="nodes.id ? true : false">
            <el-option label="顶级节点" value="0-0"></el-option>
            <el-option
              v-for="item in nodeAll"
              :key="item.id"
              :label="item.name"
              :value="item.id + '-' +  (parseInt(item.level) + 1)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNodes('formNode')">{{ nodes.id ? '修改' : '新增' }}</el-button>
          <el-button @click="isShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/http/server/api";
import { truncate } from "fs";
export default {
  data() {
    return {
      nodelist: [],
      nodes: {},
      isShow: false,
      rules: {
        name: [{ required: true, message: "请输入节点名", trigger: "blur" }]
      },
      nodeAll: [],
      total: 0,
      sortMessage: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    roofPlacement(item) {
      item.isTop = true;
      http
        .addNode(item)
        .then(res => {
         if (res.data.original && res.data.original.updated) {
            // that.isShow = false;
            // this.$message.success("修改成功！");
          } else {
            this.$message.error("置顶失败！");
          }
        })
        .catch(res => {});
    },
    getList() {
      const that = this;
      http
        .getNodesGetTree({})
        .then(res => {
          that.nodelist = res.data;
        })
        .catch(res => {});
    },
    addNodes(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(isNaN(that.nodes.sort)) {
            that.sortMessage = "排序值不是一个数值！";
            return false;
          }
          http
            .addNode(that.nodes)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                that.isShow = false;
                that.getList();
                this.$message.success("新增成功！");
              } else if (res.data.original && res.data.original.updated) {
                that.isShow = false;
                this.$message.success("修改成功！");
              } else {
                this.$message.error("添加失败！");
              }
            })
            .catch(res => {});
        }
      });
    },
    showModal(item) {
      this.nodes = item ? item : { pidLevel: "0-0" };
      if (item) {
        item.pidLevel = item.pid + "-" + item.level;
        this.nodes = item;
      } else {
        this.nodes = { pidLevel: "0-0", sort: 0 };
      }
      this.isShow = true;
      const that = this;
      http
        .getNodesAll({})
        .then(res => {
          that.nodeAll = res.data;
        })
        .catch(res => {});
    },
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.children.length > 0) {
            this.$message.warning("此节点还有子节点，不能删除!");
            return false;
          }
          this.deleteNode(item);
          // this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    deleteNode(item) {
      http
        .deleteNode({ id: item.id })
        .then(res => {
          console.log("success", res);
          if (res.data.result) {
            this.$message.success(res.data.message);
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(res => {
          this.$message.error("删除失败!");
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