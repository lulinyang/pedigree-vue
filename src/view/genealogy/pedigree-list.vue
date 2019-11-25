<template>
  <div>
    <el-card class="box-card" style="width: 100%;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-plus" @click="showModal(false)">新增族谱成员</el-button>
            <el-button type="primary" @click="showTopology()">查看拓扑图</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table
          :data="pedigreelist"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="title" label="标题" align="left"></el-table-column>
          <el-table-column prop="sort" label="排序" align="center"></el-table-column>
          <!-- <el-table-column label="置顶">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.top" @change="roofPlacement(scope.row)"></el-switch>
            </template>
          </el-table-column>-->
          <el-table-column prop="created_at" label="创建时间" width="150"></el-table-column>
          <el-table-column prop="updated_at" label="更新时间" width="150"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="showModal(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="showDel(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog :title="pedigree.id ? '修改' : '新增'" :visible.sync="isShow" width="620px">
      <el-form ref="formNode" :model="pedigree" :rules="rules" label-width="120px">
        <el-form-item label="成员" prop="member_id" style="width: 520px;">
          <el-select
            v-model="pedigree.member_id"
            filterable
            style="width: 400px;"
            @change="selectMember(pedigree.member_id)"
          >
            <el-option
              v-for="item in memberAll"
              :key="item.id"
              :label="item.name + '(' + (item.sex == 1 ? '男' : '女') + ')' + item.province + item.city  + item.area +item.address"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配偶" style="width: 520px;">
          <el-select
            v-model="pedigree.mate_id"
            filterable
            style="width: 400px;"
            @change="selectMate(pedigree.mate_id)"
          >
            <el-option
              v-for="item in memberAll"
              :key="item.id"
              :label="item.name + '(' + (item.sex == 1 ? '男' : '女') + ')' + item.province + item.city  + item.area +item.address"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" style="width: 520px;">
          <el-input v-model="pedigree.title" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="排序值" style="width: 520px;" :error="sortMessage">
          <el-input v-model="pedigree.sort"></el-input>
        </el-form-item>
        <el-form-item label="父辈" style="width: 520px;">
          <el-select
            v-model="pedigree.pidLevel"
            filterable
            style="width: 400px;"
            :disabled="pedigree.id ? true : false"
          >
            <el-option label="第一代" value="0-0"></el-option>
            <el-option
              v-for="item in pedigreeAll"
              :key="item.id"
              :label="item.title"
              :value="item.id + '-' +  (parseInt(item.level) + 1)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPedigree('formNode')">{{ pedigree.id ? '修改' : '新增' }}</el-button>
          <el-button @click="isShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/http/server/api";
let id = "";
export default {
  data() {
    return {
      id: "",
      pedigreelist: [],
      pedigree: {
        pidLevel: "0-0",
        sort: 0
      },
      isShow: false,
      memberAll: [],
      total: 0,
      sortMessage: "",
      pedigreeAll: [],
      memberInfo: {},
      mateInfo: {},
      rules: {
        member_id: [{ required: true, message: "成员必选！", trigger: "blur" }]
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList();
  },
  methods: {
    showTopology() {
      const that = this;
      this.$router.push(`/pedigree-topology/${this.id}`);
    },
    selectMember(id) {
      http.getMember({ id, id }).then(res => {
        this.memberInfo = res.data.data;
        if (
          this.pedigree.mate_id != "" &&
          this.memberInfo.sex == this.mateInfo.sex
        ) {
          this.$message.warning("不允许性别一样！");
          this.$set(this.pedigree, "member_id", "");
          return false;
        }
        this.$set(this.pedigree, "title", this.memberInfo.name);
      });
    },
    selectMate(id) {
      if (!this.pedigree.member_id) {
        this.$message.warning("先选择成员！");
        this.$set(this.pedigree, "mate_id", "");
        return false;
      }
      http.getMember({ id, id }).then(res => {
        this.mateInfo = res.data.data;
        if (this.memberInfo.sex == this.mateInfo.sex) {
          this.$message.warning("不允许性别一样！");
          this.$set(this.pedigree, "mate_id", "");
          return false;
        }
        this.$set(
          this.pedigree,
          "title",
          this.pedigree.title + "-" + this.mateInfo.name
        );
      });
    },
    getList() {
      const that = this;
      http
        .getPedigreeTree({ surname_id: this.id })
        .then(res => {
          that.pedigreelist = res.data.data;
        })
        .catch(res => {});
    },
    addPedigree(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (isNaN(that.pedigree.sort)) {
            that.sortMessage = "排序值不是一个数值！";
            return false;
          }

          if (that.id == "") {
            this.$message.error("surname_id不能为空！");
            return false;
          }

          that.pedigree.surname_id = that.id;
          http.addPedigree(that.pedigree).then(res => {
            this.$message.success(res.data.stateMsg);
            that.isShow = false;
            this.getList();
          });
        }
      });
    },
    showModal(item) {
      this.pedigree = item ? item : { pidLevel: "0-0", sort: 0 };
      if (item) {
        item.pidLevel = item.pid + "-" + item.level;
        this.pedigree = item;
      } else {
        this.pedigree = { pidLevel: "0-0", sort: 0 };
      }
      this.isShow = true;
      const that = this;
      http
        .getMemberAll({})
        .then(res => {
          this.memberAll = res.data.data;
        })
        .catch(res => {});
      http.getPedigreeAll({ surname_id: this.id }).then(res => {
        this.pedigreeAll = res.data.data;
      });
    },
    showDel(item) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.children.length > 0) {
            this.$message.warning("下面还有子孙，不能删除!");
            return false;
          }
          this.deletePedigree(item);
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    deletePedigree(item) {
      http.deletePedigree({ id: item.id, surname_id: this.id }).then(res => {
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
</style>