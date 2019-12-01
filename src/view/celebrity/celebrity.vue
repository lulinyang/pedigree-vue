<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="keywords.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="字">
            <el-input v-model="keywords.name_word" placeholder="请输入字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row style="margin-bottom: 15px">
        <el-col :span="24">
          <div>
            <el-button type="primary" icon="el-icon-plus" @click="jumpPage('/add-celebrity')">添加历史名人/烈士</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="arcticleList" border style="width: 100%">
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="name_word" label="字" ></el-table-column>
          <el-table-column label="缩略图" width="120">
            <template slot-scope="scope">
              <el-image :src="baseUrl + scope.row.thumbnail"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="描述" >
            <template slot-scope="scope">
              <p class="describe">{{scope.row.describe}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="标签" width="180">
            <template slot-scope="scope">
              <p class="describe">{{scope.row.tag}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="jumpPage(`/edit-celebrity/${scope.row.id}`)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="showDel(scope.row.id)"></el-button>
              <!-- <el-button type="info" icon="el-icon-info" circle @click="jumpPage(`/celebrity-detail/${scope.row.id}`)"></el-button> -->
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
    this.getList();
  },
  methods: {
    jumpPage(page) {
      this.$router.push(page);
    },
    search() {
      this.getList();
    },
    getList() {
      const that = this;
      http
        .getCelebrity(this.keywords)
        .then(res => {
          that.arcticleList = res.data.data.data;
          that.total = res.data.data.total;
        })
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
            .delCelebrity({ id: id })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！");
                that.getList();
              }
            })
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
  }
};
</script>

<style scoped>
.describe {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

