<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="keywords.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="keywords.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增成员</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="memberlist" border style="width: 100%">
          <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span>{{scope.row.sex == 1 ? '男' : '女'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="isdead" label="是否过世">
            <template slot-scope="scope">
              <span>{{scope.row.sex == 0 ? '否' : '是'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <div class="user-avator">
                <img :src="baseUrl + scope.row.headUrl" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tel" label="联系电话" width="150"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="area" label="区/县"></el-table-column>
          <el-table-column prop="address" label="详细地址" width="180"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="150"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" width="150"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showModal(scope.row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="showDel(scope.row.id)">删除</el-button>
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
import { area } from "@/tools/area";
import config from "@/config/index";
export default {
  data() {
    return {
      memberlist: [],
      baseUrl: config.baseUrl,
      keywords: {
        name: "",
        page: 1
      },
      total: 0
    };
  },
  created() {
    const that = this;
    that.getList();
  },
  methods: {
    search() {
      this.keywords.page = 1;
      this.getList();
    },
    getList() {
      const that = this;
      http
        .getMemberList(this.keywords)
        .then(res => {
          that.memberlist = res.data.data;
          that.total = res.data.total;
        })
        .catch(res => {});
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    showDel(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletemember(id);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    deletemember(id) {
			const that =  this;
      http
        .deleteMember({ id: id })
        .then(res => {
          if (res.data.result) {
            if (res.data.code == 200) {
              this.$message.success("删除成功！");
              that.getList();
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(res => {
          this.$message.error("删除失败!");
        });
    },
    showModal(id) {
      if (id) {
        this.$cookies.set("memberId", id);
        this.$router.push("/member-edit");
      } else {
        this.$router.push("/member-add");
      }
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
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>