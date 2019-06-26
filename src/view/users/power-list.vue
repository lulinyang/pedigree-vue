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
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增节点</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="nodelist" border style="width: 100%">
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <el-table-column prop="router" label="路由"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="showModal(scope.row)">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;padding-top: 20px">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>

    <el-dialog :title="nodes.id ? '修改' : '新增'" :visible.sync="isShow" width="500px">
      <el-form ref="formNode" :model="nodes" :rules="rules" label-width="120px">
        <el-form-item label="节点名称" prop="name" style="width: 350px;">
          <el-input v-model="nodes.name"></el-input>
        </el-form-item>
        <el-form-item label="路由" style="width: 350px;">
          <el-input v-model="nodes.router"></el-input>
        </el-form-item>
        <el-form-item label="描述" style="width: 350px;">
          <el-input v-model="nodes.description"></el-input>
        </el-form-item>
        <el-form-item label="父节点">
          <el-select v-model="nodes.pidLevel" filterable placeholder="请选择节点层级">
            <el-option label="顶级节点" value="0-0"></el-option>
            <el-option v-for="item in nodeAll" :key="item.id" :label="item.name" :value="item.id + '-' +  (parseInt(item.level) + 1)"></el-option>
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
      formInline: {
        username: "",
        email: ""
      },
      nodes: {},
      isShow: false,
      rules: {
        name: [{ required: true, message: "请输入节点名", trigger: "blur" }]
      },
      nodeAll: []
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
        .getNodes({})
        .then(res => {
          that.nodelist = res.data.data;
        })
        .catch(res => {});
    },
    addNodes(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(formName, that.nodes);return;
          http
            .addNode(that.nodes)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                that.isShow = false;
                that.getList();
                this.$message.success("新增成功！");
              } else if (res.data.original && res.data.original.updated) {
                that.isShow = false;
                that.getList();
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
      this.nodes = item ? item : { pidLevel: '0-0' };
      if(item) {
        item.pidLevel = item.pid + '-' + item.level;
        this.nodes = item;
      }else {
        this.nodes = { pidLevel: '0-0' }
      }
      this.isShow = true;
      const that = this;
      http
        .getNodesAll({})
        .then(res => {
          that.nodeAll = res.data;
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
</style>