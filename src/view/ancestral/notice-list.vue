<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="keywords" class="demo-form-inline">
          <el-form-item label="所属宗祠">
            <el-select v-model="keywords.ancestral_id" filterable placeholder="请选择所属宗祠">
               <el-option label="全部" value=""></el-option>
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in ancestrals"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input v-model="keywords.content" placeholder="公告内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal">新增公告</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table :data="list" style="width: 100%" border>
          <el-table-column prop="ancestral_name" label="宗祠名称" width="180"></el-table-column>
          <el-table-column label="公告内容">
            <template slot-scope="scope">
              <p class="describe">{{scope.row.content}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="created_user_name" width="180"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showModalEdit(scope.row)"
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

    <el-dialog :title="id === '' ? '添加宗祠':'编辑宗祠'" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="所属宗祠" prop="ancestral_id">
          <el-select v-model="form.ancestral_id" placeholder="请选择所属宗祠" style="width: 80%;">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in ancestrals"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input type="textarea" v-model="form.content" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')" v-if="id === ''">保存</el-button>
        <el-button type="primary" @click="submitEdit('form')" v-else>编辑</el-button>
      </div>
    </el-dialog>
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
        content: "",
        page: 1,
        pageSize: 8
      },
      total: 0,
      dialogFormVisible: false,
      form: {},
      id: "",
      ancestrals: [],
      rules: {
        ancestral_id: [
          { required: true, message: "宗祠必选！", trigger: ["blur"] }
        ],
        content: [
          { required: true, message: "公告内容必填！", trigger: ["blur"] }
        ]
      }
    };
  },
  created() {
    this.getList();
    http.getAncestralAll({}).then(res => {
      this.ancestrals = res.data.data;
    });
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.addNotice(this.form).then(res => {
            this.$message.success(res.data.stateMsg);
            this.dialogFormVisible = false;
          });
        }
      });
    },
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.editNotice(this.form).then(res => {
            this.$message.success(res.data.stateMsg);
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    showModalEdit(item) {
      this.id = item.id;
      this.form = {
        id: item.id,
        ancestral_id: item.ancestral_id,
        content: item.content
      };
      http.getAncestralAll({}).then(res => {
        this.ancestrals = res.data.data;
        this.dialogFormVisible = true;
      });
    },
    showModal() {
      this.id = "";
      this.form = {
        ancestral_id: "",
        content: ""
      };
      http.getAncestralAll({}).then(res => {
        this.ancestrals = res.data.data;
        this.dialogFormVisible = true;
      });
    },
    search() {
      this.keywords.page = 1;
      this.getList();
    },
    getList() {
      http.getNoticeList(this.keywords).then(res => {
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
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delNotice(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    delNotice(item) {
      const param = {
        id: item.id
      };
      http.delNotice(param).then(res => {
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