<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="所属宗祠">
            <el-select v-model="keywords.ancestral_id" filterable placeholder="请选择所属宗祠">
              <el-option label="全部" value></el-option>
              <el-option label="全局" value="0"></el-option>
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in ancestrals"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人">
            <el-input v-model="keywords.name" placeholder="发布人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal">新增公告</el-button>
          </div>
        </el-col>
      </el-row>-->
      <div>
        <el-table :data="list" style="width: 100%" border>
          <el-table-column prop="name" label="用户昵称" width="180"></el-table-column>
          <el-table-column label="话题所属">
            <template slot-scope="scope">
              <span v-if="scope.row.ancestral_id != 0">{{scope.row.ancestral_name}}</span>
              <span v-else>全局</span>
            </template>
          </el-table-column>
          <el-table-column label="话题内容" width="300">
            <template slot-scope="scope">
              <p class="describe">{{scope.row.content}}</p>
            </template>
          </el-table-column>
          <el-table-column label="话题图片" width="400">
            <template slot-scope="scope">
              <el-image
                v-for="(item, index) in scope.row.imgs_arr"
                :key="index"
                style="width: 80px; height: 80px;margin-right: 5px;"
                :src="$host + item"
                fit="fit"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="发布时间" width="180"></el-table-column>

          <el-table-column prop="browse_volume" label="浏览量" align="center"></el-table-column>
          <el-table-column prop="fabulous_num" label="点赞数" align="center"></el-table-column>
          <el-table-column prop="comment_num" label="评论数" align="center"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
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
        ancestral_id: "",
        name: "",
        page: 1,
        pageSize: 8
      },
      total: 0,
      id: "",
      ancestrals: []
    };
  },
  created() {
    this.getList();
    http.getAncestralAll({}).then(res => {
      this.ancestrals = res.data.data;
    });
  },
  methods: {
    search() {
      this.keywords.page = 1;
      this.getList();
    },
    getList() {
      http.getConversationList(this.keywords).then(res => {
        this.list = res.data.data.data.map(item => {
          if (item.imgs) {
            item.imgs_arr = item.imgs.split(",");
          } else {
            item.imgs_arr = [];
          }
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
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delConversationList(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    delConversationList(item) {
      const param = {
        id: item.id
      };
      http.delConversationList(param).then(res => {
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