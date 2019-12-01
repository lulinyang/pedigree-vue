<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="宗祠名称">
            <el-input v-model="keywords.name" placeholder="宗祠名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="jumpPage('/add-ancestral-hall')"
            >新增宗祠</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="list" style="width: 100%" border>
          <el-table-column prop="name" label="宗祠名称" width="150"></el-table-column>
          <el-table-column prop="describe" label="描述" width="180">
            <template slot-scope="scope">
              <p class="describe">{{scope.row.describe}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="administrators" label="管理员" width="180">
            <template slot-scope="scope">
              <el-tag
                size="small"
                class="tag"
                v-for="(item, index) in scope.row.admin"
                :key="index"
              >{{item.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="genealogy" label="管理的族谱">
            <template slot-scope="scope">
              <el-tag
                size="small"
                class="tag"
                v-for="(item, index) in scope.row.genealogys"
                :key="index"
              >{{item.area_surname}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="jumpPage(`/edit-ancestral-hall/${scope.row.id}`)"
              ></el-button>
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
      http.getAncestral(this.keywords).then(res => {
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
          this.delAncestral(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    delAncestral(item) {
      const param = {
        id: item.id
      };
      http.delAncestral(param).then(res => {
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
.tag {
  margin-right: 10px;
  cursor: pointer;
}
.describe {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /*截取第三行*/
  overflow: hidden;
}
</style>