<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="keywords.username" placeholder="强输入标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="arcticleList" border style="width: 100%">
          <el-table-column prop="title" label="标题" width="200"></el-table-column>
          <el-table-column label="缩略图" width="90">
            <template slot-scope="scope">
              <el-image :src="baseUrl + scope.row.thumbnail"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="描述" width="240"></el-table-column>
          <el-table-column prop="create_user" label="创建人"></el-table-column>
          <el-table-column prop="update_user" label="更新人"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="270">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="editArcticl(scope.row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="showDel(scope.row.id)">删除</el-button>
              <el-button type="success" @click="showDetail(scope.row.id)">文章详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;padding-top: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="8"
          @current-change="changeCurrent"
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
        area_surname: "",
        page: 1
      },
      arcticleList: [],
      total: 0,
      baseUrl: config.baseUrl
    };
  },
  created() {
    const that = this;
    that.getList();
  },
  methods: {
    search() {},
    getList() {
      const that = this;
      http
        .getArcticlList(this.keywords)
        .then(res => {
          that.arcticleList = res.data.data;
          that.total = res.data.total;
        })
        .catch(res => {});
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    editArcticl(id) {
      this.$router.push({
        path: '/article-edit',
        query: {
          id: id
				}
      });
    },
    showDel(id) {
			const that = this;
      this.$confirm("确认此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.deleteArcticle({id: id})
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
      this.$router.push({
        path: '/article-detail',
        query: {
          id: id
				}
      });
    }
  }
};
</script>

