<template>
  <el-card class="box-card">
    <el-form ref="genealogyForm" :model="genealogy" :rules="rules" label-width="120px">
      <el-form-item label="区域姓氏" prop="area_surname" style="width: 700px;">
        <el-input v-model="genealogy.area_surname" style="width: 450px" placeholder="请输入区域姓氏"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          :action="upImgageUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :limit="1"
          :on-exceed="errMessage"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <!-- <el-upload
          class="avatar-uploader"
          name="img"
          :action="upImgageUrl"
          :show-file-list="false"
          :on-success="handleThumbnailSuccess"
        >
          <img v-if="genealogy.thumbnail" :src="baseUrl + genealogy.thumbnail" class="avatar" />
          <i v-if="isShowImg" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
      </el-form-item>
      <el-form-item label="描述" style="width: 700px;">
        <el-input type="textarea" v-model="genealogy.describe" :rows="4" placeholder="请输入描述内容"></el-input>
      </el-form-item>
      <el-form-item label="简介" style="width: 1000px;">
        <vue-neditor-wrap
          v-model="genealogy.brief_introduction"
          :config="myConfig"
          :destroy="false"
          @ready="ready"
        ></vue-neditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('genealogyForm')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import VueNeditorWrap from "vue-neditor-wrap";
import editor from "@/config/editor";
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  components: {
    VueNeditorWrap
  },

  data() {
    return {
      genealogy: {
        brief_introduction: ""
      },
      isShowImg: true,
      baseUrl: config.baseUrl,
      upImgageUrl: config.baseUrl + "/api/upImage",
      myConfig: editor.myConfig,
      rules: {
        area_surname: [{ required: true, message: "区域姓氏", trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {},
  methods: {
    ready(editorSetting) {
      // console.log("editorSetting", editorSetting);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.addGenealogy(this.genealogy).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.stateMsg);
              this.$router.push('/genealogy-list');
            }
          });
        }
      });
    },
    handleThumbnailSuccess(res, file) {
      if (res.data.code === 200) {
        this.genealogy.thumbnail = res.data.data.url;
        this.isShowImg = false;
      }
    },
    handleRemove(file, fileList) {
      delete this.genealogy.thumbnail;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      if ((res.code / 10) * 10 === 0) {
        this.genealogy.thumbnail = res.data.src;
      }
    },
    errMessage(files, fileList) {
      this.$message.warning("只能上传一张图片！");
    },
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

