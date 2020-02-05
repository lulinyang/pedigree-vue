<template>
  <el-card class="box-card">
    <el-form ref="genealogyForm" :model="genealogy" :rules="rules" label-width="120px">
      <el-form-item label="区域姓氏" prop="area_surname">
        <el-input v-model="genealogy.area_surname" style="width: 450px" placeholder="请输入区域姓氏"></el-input>
      </el-form-item>
      <el-form-item label="管理员" prop="administrators">
        <el-select
          style="width: 450px"
          v-model="genealogy.administrators"
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
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          name="img"
          :action="upImgageUrl"
          :show-file-list="false"
          :on-success="handleThumbnailSuccess"
        >
          <img v-if="genealogy.thumbnail" :src="baseUrl + genealogy.thumbnail" class="avatar" />
          <i v-if="isShowImg" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="genealogy.describe"
          :rows="4"
          style="width: 450px;"
          placeholder="请输入描述内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <vue-neditor-wrap
          v-model="genealogy.brief_introduction"
          :config="myConfig"
          :destroy="false"
          @ready="ready"
        ></vue-neditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('genealogyForm')">{{ id == '' ? '立即创建' : '保存'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import editor from "@/config/editor";
import config from "@/config/index";
import http from "@/http/server/api";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      id: '',
      genealogy: {},
      isShowImg: true,
      baseUrl: config.baseUrl,
      upImgageUrl: config.baseUrl + "/api/upImage",
      myConfig: editor.myConfig,
      users: [],
      loading: false,
      rules: {
        area_surname: [{ required: true, message: "区域姓氏", trigger: "blur" }],
        administrators: [
          {
            required: true,
            message: "管理员必填！",
            trigger: ["blur", "change"]
          }
        ],
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
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
    http.getGenealogy({ id: this.$route.params.id }).then(res => {
      if (res.data.data.thumbnail) {
        this.isShowImg = false;
      }
      res.data.data.brief_introduction =
        res.data.data.brief_introduction == null
          ? ""
          : res.data.data.brief_introduction;
      this.genealogy = res.data.data;
    });
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
    ready(editorSetting) {
      // console.log("editorSetting", editorSetting);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.addGenealogy(this.genealogy).then(res => {
            this.$router.go(-1);
            this.$message.success(res.data.stateMsg);
          });
        }
      });
    },
    handleThumbnailSuccess(res, file) {
      // console.log('res.code', res ,res.code);
      if (res.code *10/10 == 200) {
        this.genealogy.thumbnail = res.data;
        this.isShowImg = false;
      } else {
        this.$message.error("上传失败！");
      }
    }
  }
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

