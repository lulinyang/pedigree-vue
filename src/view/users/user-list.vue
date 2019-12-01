<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="keywords.username" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="keywords.name" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24">
          <!-- <div class="grid-content bg-purple-dark">
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="jumpPage('/add-ancestral-hall')"
            >新增宗祠</el-button>
          </div>-->
        </el-col>
      </el-row>
      <div>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="headUrl" label="头像" width="150">
            <template slot-scope="scope">
              <img :src="$host + scope.row.headUrl" width="50px" height="50px" class="headUrl" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="昵称/性别" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <img src="static/imgs/man.png" width="12px" class="sex_img" v-if="scope.row.sex*1 === 1">
              <img src="static/imgs/woman.png" width="12px" class="sex_img" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="手机号"></el-table-column>
          <el-table-column prop="forbidden" label="是否禁用">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.forbidden"></el-switch>
            </template>
          </el-table-column>
           <el-table-column prop="forbidden" label="实名认证" align="center">
            <template slot-scope="scope">
              <el-tag size="small" v-if="scope.row.authentication" type="success">已实名认证</el-tag>
              <el-tag size="small" v-else type="warning">未实名认证</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" min-width="180" align="center"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" min-width="180" align="center"></el-table-column>
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
export default {
  data() {
    return {
      list: [],
      keywords: {
        username: "",
        name: "",
        page: 1,
        pageSize: 8
      },
      total: 0
    };
  },
  created() {
    const that = this;
    that.getList();
  },
  methods: {
    jumpPage(page) {
      this.$router.push(page);
    },
    search() {
      this.keywords.page = 1;
      this.getList();
    },
    getList() {
      http.getUser(this.keywords).then(res => {
        this.list = res.data.data.data.map(item => {
          item.forbidden = item.deleted*1 === 0 ? false : true;
          return item;
        });
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
.headUrl {
  border-radius: 50%;
}
.sex_img {
  margin-left: 10px;
}
</style>