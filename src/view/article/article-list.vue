<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="keywords.title" placeholder="请输入标题"></el-input>
          </el-form-item>

          <el-form-item label="栏目">
            <el-select v-model="keywords.type" filterable placeholder="请选择栏目">
              <el-option :value="''" :label="'全部'"></el-option>
              <el-option
                v-for="item in columnlist"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="keywords.describe" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="keywords.create_user" placeholder="请输入创建人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
       <el-row style="margin-bottom: 15px">
        <el-col :span="24">
          <div>
            <el-button type="primary" icon="el-icon-plus" @click="jumpPage('add')">添加文章</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="arcticleList" border style="width: 100%">
          <el-table-column prop="title" label="标题" width="200"></el-table-column>
          <el-table-column prop="typename" label="所属栏目"></el-table-column>
          <el-table-column label="缩略图" width="120">
            <template slot-scope="scope">
              <el-image :src="baseUrl + scope.row.thumbnail"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="描述" width="240"></el-table-column>
          <el-table-column prop="create_user" label="创建人"></el-table-column>
          <el-table-column prop="update_user" label="更新人"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" width="180"></el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
               <el-button type="primary" icon="el-icon-edit" circle @click="jumpPage('edit',scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="showDel(scope.row.id)"></el-button>
              <el-button type="info" icon="el-icon-info" circle @click="showDetail(scope.row.id)"></el-button>
              <!-- <el-button type="primary" icon="el-icon-edit" @click="editArcticl(scope.row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="showDel(scope.row.id)">删除</el-button>
              <el-button type="success" @click="showDetail(scope.row.id)">文章详情</el-button> -->
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
  </div>
</template>

<script>
import http from "@/http/server/api";
import config from "@/config/index";
// import memberListVue from './member-list.vue';
export default {
  data() {
    return {
      keywords: {
        title: "",
        page: 1,
        pageSize: 8,
        type: ""
      },
      arcticleList: [],
      total: 0,
      baseUrl: config.baseUrl,
      columnlist: []
    };
  },
  created() {
    http.getColumnList({}).then(res => {
      this.columnlist = res.data.data.data;
    });
    this.getList();
  },
  methods: {
    jumpPage(page, id = "") {
      if (page === "add") {
        this.$router.push("/article-add");
      } else {
        this.$router.push(`/article-edit/${id}`);
      }
    },
    search() {
      this.getList();
    },
    getList() {
      const that = this;
      http
        .getArcticlList(this.keywords)
        .then(res => {
          that.arcticleList = res.data.data.data;
          that.total = res.data.data.total;
        })
        .catch(res => {});
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.keywords.pageSize = pageSize;
      this.getList();
    },
    showDel(id) {
      const that = this;
      this.$confirm("确认此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http
            .deleteArcticle({ id: id })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！");
                that.getList();
              }
            })
            .catch(res => {});
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    showDetail(id) {
      this.$router.push(`/article-detail/${id}`);
    }
  }
};
</script>

