<template>
  <el-card class="box-card">
    <el-form ref="memberForm" :model="member" :rules="rules" label-width="120px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="upImgageUrl"
          :show-file-list="false"
          name="img"
          :headers="headers"
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('memberForm')">保存</el-button>
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
export default {
  data() {
    return {
      id: "",
      member: { sex: 1, isdead: 0, brief_introduction: '' },
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
    
  },
  methods: {
    ready(editorSetting) {
      // console.log("editorSetting", editorSetting);
    },
    onSubmit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          http
            .addMember(that.member)
            .then(res => {
              this.$message.success(res.data.stateMsg);
              this.$router.go(-1);
            })
        } else {
          this.$message.error("区域姓氏必填！");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.code*10/10 === 200) {
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

