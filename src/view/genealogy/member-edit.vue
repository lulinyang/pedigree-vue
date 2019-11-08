<template>
  <el-card class="box-card">
    <el-form ref="memberForm" :model="member" :rules="rules" label-width="120px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="upImgageUrl"
          :show-file-list="false"
          :headers="headers"
          name="img"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="member.headUrl" :src="baseUrl + member.headUrl" class="avatar" />
          <i v-if="isShowImg" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="member.name" style="width: 450px" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="member.tel" style="width: 450px" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="所在地">
        <el-cascader :options="options" clearable v-model="member.areas" style="width: 450px"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="member.address" style="width: 450px" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="member.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否去世">
        <el-radio-group v-model="member.isdead">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <vue-neditor-wrap
          v-model="member.brief_introduction"
          :config="myConfig"
          :destroy="false"
          @ready="ready"
        ></vue-neditor-wrap>
        <!-- <vue-ueditor-wrap
          v-model="member.brief_introduction"
          :destroy="destroy"
          :config="config"
          @ready="ready"
          style="width: 800px"
        ></vue-ueditor-wrap> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('memberForm')">{{ id == '' ? '立即创建' : '保存'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import editor from "@/config/editor";
import config from "@/config/index";
import http from "@/http/server/api";
import { area } from "@/tools/area";
import { request } from "http";
export default {
  data() {
    return {
      id: "",
      member: {},
      isShowImg: true,
      options: area,
      baseUrl: config.baseUrl,
      upImgageUrl: config.baseUrl + "/api/upImage",
      myConfig: editor.myConfig,
      destroy: false,
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      },
       headers: {
        "Authorization": this.$store.getters.token_type + ' ' + this.$store.getters.access_token
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id && this.id != "") {
      const that = this;
      http.getMember({ id: this.id }).then(res => {
        if (res.data.data.thumbnail) {
          that.isShowImg = false;
        }
        res.data.data.brief_introduction =
          res.data.data.brief_introduction == null
            ? " "
            : res.data.data.brief_introduction;
        that.member = res.data.data;
      });
    }
  },
  methods: {
    ready(editorSetting) {
      // console.log("editorSetting", editorSetting);
    },
    addCustomUI(editorId, editorConfig) {
      console.log(
        editorId + "的配置参数是:",
        JSON.stringify(editorConfig, null, 2)
      );
    },
    onSubmit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.addMember(that.member).then(res => {
            this.$message.success(res.data.stateMsg);
            this.$router.go(-1);
          });
        } else {
          this.$message.error("区域姓氏必填！");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.code *10/10 === 200) {
        this.member.headUrl = res.data;
        this.isShowImg = false;
      } else {
        this.$message.error("上传失败！");
      }
    }
  },
  destroyed() {
    console.log("将editor进行销毁");
    this.destroy = true;
  }
};
</script>


<style scoped>
.avatar-uploader {
  margin: 0 30px;
  width: 92px;
  height: 92px;
  overflow: hidden;
  border-radius: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  width: 90px;
  height: 90px;
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
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
</style>

