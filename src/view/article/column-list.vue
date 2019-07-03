<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <!-- <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="栏目名">
            <el-input v-model="keywords.name" placeholder="请输入栏目名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增栏目</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="columnlist" border style="width: 100%">
          <el-table-column prop="name" label="栏目名" width="180"></el-table-column>
          <el-table-column prop="create_user" label="创建人"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showModal(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="showDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div style="text-align: center;padding-top: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="8"
          @current-change="changeCurrent"
        ></el-pagination>
      </div> -->
    </el-card>

    <el-dialog :title="column.id ? '修改' : '新增'" :visible.sync="isShow" width="500px">
      <el-form ref="formcolumn" :model="column" :rules="rules" label-width="120px">
        <el-form-item label="栏目名" prop="name" style="width: 350px;">
          <el-input v-model="column.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addColumn('formcolumn')">{{ column.id ? '修改' : '新增' }}</el-button>
          <el-button @click="isShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      columnlist: [],
      keywords: {
        name: "",
        page: 1
      },
      column: {},
      isShow: false,
      rules: {
        name: [{ required: true, message: "请输入栏目名", trigger: "blur" }]
      },
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    search() {
      this.getList();
    },
    changeCurrent(page) {
      this.keywords.page = page;
      this.getList();
    },
    getList() {
      const that = this;
      http
        .getColumnList(that.keywords)
        .then(res => {
          that.columnlist = res.data.data;
          that.total = res.data.total;
        })
        .catch(res => {});
    },
    addColumn(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          http
            .addColumn(that.column)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                that.isShow = false;
                that.getList();
                this.$message.success("新增成功！");
              } else if (res.data.original && res.data.original.updated) {
                that.isShow = false;
                this.$message.success("修改成功！");
              }else {
                this.$message.error(res.data.original.message);
              }
            })
            .catch(res => {});
        }
      });
    },
    showModal(item) {
      this.column = item ? item : {};
      this.isShow = true;
    },
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delColumn(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    delColumn(item) {
      http
        .delColumn({ id: item.id })
        .then(res => {
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
.buttons {
  text-align: center;
  margin-top: 15px;
}
</style>