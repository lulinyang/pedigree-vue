<template>
  <el-card class="box-card">
    <el-form ref="memberForm" :model="member" :rules="rules" label-width="120px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="upImgageUrl"
          :show-file-list="false"
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
        <vue-ueditor-wrap
          v-model="member.brief_introduction"
          :destroy="destroy"
          :config="config"
          @ready="ready"
          style="width: 800px"
        ></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('memberForm')">{{ id == '' ? '立即创建' : '保存'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import config from "@/config/index";
import http from "@/http/server/api";
import { area } from "@/tools/area";
import { request } from "http";
export default {
  components: {
    VueUeditorWrap
  },

  data() {
    return {
      id: "",
      member: {sex: 1, isdead: 0},
      isShowImg: true,
      options: area,
      baseUrl: config.baseUrl,
      upImgageUrl: config.baseUrl + "/api/upImage",
      destroy: false,
      config: {
        autoHeightEnabled: false,
        initialFrameHeight: 500,
        initialFrameWidth: "100%",
        serverUrl: config.ueBaseUrl + "/static/UEditor/php/controller.php",
        toolbars: config.toolbars
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      }
    };
  },
    created() {
      let id = this.$cookies.get("memberId");
      this.id = id;
      if (id && id != "") {
        const that = this;
        http
          .getMember({ id, id })
          .then(res => {
            if (res.data.code == "200") {
              if (res.data.result.thumbnail) {
                this.isShowImg = false;
              }
              that.member = res.data.result;
            }
          })
          .catch(res => {});
      }
    },
  methods: {
    ready(editorInstance) {
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance);
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
          http
            .addMember(that.member)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                this.$message.success("新增成功！");
                this.$router.push("/member-list");
              } else if (res.data.original && res.data.original.updated) {
                this.$message.success("修改成功！");
                this.$router.push("/member-list");
              } else {
                this.$message.error("添加失败！");
              }
            })
            .catch(res => {});
        } else {
          this.$message.error("区域姓氏必填！");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.res) {
        this.member.headUrl = res.url;
        this.isShowImg = false;
      } else {
        this.$message.error("上传失败！");
      }
    }
  },
  destroyed() {
    console.log("将editor进行销毁");
    this.destroy = true;
    this.$cookies.remove("memberId");
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

