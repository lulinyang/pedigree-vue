<template>
  <el-card class="box-card">
    <el-form ref="ancestralForm" :model="ancestral" :rules="rules" label-width="120px">
      <el-form-item label="宗祠名称" prop="name">
        <el-input v-model="ancestral.name" style="width: 450px" placeholder="请输入宗祠名称"></el-input>
      </el-form-item>
      <el-form-item label="管理员" prop="administrators">
        <el-select
          style="width: 450px"
          v-model="ancestral.administrators"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入手机号"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所管理的族谱" prop="genealogy">
        <el-select
          v-model="ancestral.genealogy"
          style="width: 450px"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入族谱名称"
          :remote-method="remoteMethod2"
          :loading="loading"
        >
          <el-option
            v-for="item in genealogys"
            :key="item.id"
            :label="item.area_surname"
            :value="item.id.toString()"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轮播图" prop="fileList">
        <el-upload
          class="upload-demo"
          :action="upImgageUrl"
          :on-remove="handleRemove"
          :file-list="ancestral.fileList"
          :on-success="handleBannerSuccess"
          list-type="picture"
          name="img"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          type="textarea"
          v-model="ancestral.describe"
          :rows="4"
          style="width: 450px;"
          placeholder="请输入描述内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ancestralForm')">{{id === "" ? '立即创建' : "保存"}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import config from "@/config/index";
import http from "@/http/server/api";
import { limitWords } from "@/tools/validator";
export default {
  data() {
    return {
      id: this.$route.params.id ? this.$route.params.id : "",
      ancestral: {
        fileList: []
      },
      isShowImg: true,
      columnlist: [],
      baseUrl: config.baseUrl,
      upImgageUrl: config.baseUrl + "/api/upImage",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      rules: {
        name: [
          { required: true, message: "宗祠名称必填！", trigger: ["blur"] }
        ],
        administrators: [
          {
            required: true,
            message: "管理员必填！",
            trigger: ["blur", "change"]
          }
        ],
        fileList: [
          {
            required: true,
            message: "轮播图不能为空！",
            trigger: ["blur", "change"]
          }
        ],
        describe: [{ required: true, message: "描述必填！", trigger: ["blur"] }]
      },
      loading: false,
      users: [],
      genealogys: [],
      list: []
      // fileList: []
    };
  },
  created() {
    const that = this;
    http.getUserAll({}).then(res => {
     
      that.users = [];
      res.data.data.forEach(item => {
        that.users.push({
          label: `${item.name} (${item.username})`,
          value: item.id.toString()
        });
      });
    });
    http.getSurnameAll({}).then(res => {
      that.genealogys = res.data.data;
    });
    if (this.id !== "") {
      http.getAncestralById({ id: this.id }).then(res => {
        const data = res.data.data;
        this.ancestral = {
          id: data.id,
          name: data.name,
          describe: data.describe,
          administrators: data.administrators.split(","),
          genealogy: data.genealogy.split(","),
          fileList: data.banners.split(',').map(item => {
            return {
              url: config.baseUrl + item
            }
          })
        };
      });
    }
  },
  methods: {
    remoteMethod(query) {
      const that = this;
      this.loading = true;
      http.getUserAll({ username: query }).then(res => {
        this.loading = false;
        that.users = [];
        res.data.data.forEach(item => {
          that.users.push({
            label: `${item.name} (${item.username})`,
            value: item.id.toString()
          });
        });
      });
    },
    remoteMethod2(query) {
      const that = this;
      this.loading = true;
      http.getSurnameAll({ area_surname: query }).then(res => {
        this.loading = false;
        that.genealogys = res.data.data;
      });
    },
    onSubmit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ancestral.banners = this.ancestral.fileList
            .map(item => {
              item.url = item.url.replace(config.baseUrl, "");
              return item.url;
            })
            .toString();
          this.ancestral.administrators = this.ancestral.administrators.toString();
          this.ancestral.genealogy = this.ancestral.genealogy.toString();
          delete this.ancestral.fileList;
          http.addAncestral(that.ancestral).then(res => {
            this.$message.success(res.data.stateMsg);
            this.$router.go(-1);
          });
        }
      });
    },
    handleBannerSuccess(res, file) {
      const that = this;
      if ((res.code * 10) / 10 === 200) {
        this.ancestral.fileList.push({
          name: "food.jpeg",
          url: that.$host + res.data
        });
      } else {
        this.$message.error("上传失败！");
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  }
};
</script>


<style scoped>
.upload-demo {
  width: 180px;
}
</style>

<style>
.upload-demo a.el-upload-list__item-name {
  display: none;
}
.upload-demo .el-upload-list--picture {
  width: 450px;
}
.upload-demo .el-upload-list__item {
  width: 180px;
  height: 120px;
  float: left;
  margin-right: 10px;
}
.upload-demo .el-upload-list__item img {
  width: 150px;
  height: 100px;
}
</style>

