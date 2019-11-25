<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="区域姓氏">
            <el-input v-model="keywords.area_surname" placeholder="区域姓氏"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="keywords.describe" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="keywords.username" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row style="margin-bottom: 15px">
        <el-col :span="24">
          <div>
            <el-button type="primary" icon="el-icon-plus" @click="jumpPage('add')">新增族谱</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="area_surname" label="区域姓氏" width="150"></el-table-column>
        <el-table-column label="缩略图" width="90">
          <template slot-scope="scope">
            <el-image :src="baseUrl + scope.row.thumbnail"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template slot-scope="scope">
            <p class="describe">{{scope.row.describe}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="创建人"></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column prop="updated_at" label="更新时间"></el-table-column>

        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="jumpPage('edit', scope.row.id)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="showDel(scope.row.id)"></el-button>
            <el-button type="info" icon="el-icon-info" circle @click="seeDetail(scope.row.id)"></el-button>
            <el-button type="success" @click="seePedigree(scope.row.id)">查看族谱</el-button>
          </template>
        </el-table-column>
      </el-table>

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
export default {
  data() {
    return {
      keywords: {
        area_surname: "",
        page: 1,
        pageSize: 8
      },
      list: [],
      total: 0,
      baseUrl: config.baseUrl
    };
  },
  created() {
    this.getList();
  },
  methods: {
    seePedigree(id) {
      this.$router.push(`/pedigree-list/${id}`);
    },
    search() {
      this.getList();
    },
    getList() {
      const that = this;
      http.getGenealogyList(this.keywords).then(res => {
        that.list = res.data.data.data;
        that.total = res.data.data.total;
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
    jumpPage(page, id = "") {
      if (page === "add") {
        this.$router.push("/genealogy-add");
      } else {
        this.$router.push(`/genealogy-edit/${id}`);
      }
    },
    seeDetail(id) {
      this.$router.push(`/genealogy-detail/${id}`);
    },
    showDel(id) {
      const that = this;
      this.$confirm("确认此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.deleteGenealogy({ id: id }).then(res => {
            this.$message.success("删除成功！");
            that.getList();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    }
  }
};
</script>

<style scoped>
.describe {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /*截取第三行*/
  overflow: hidden;
}
</style>

