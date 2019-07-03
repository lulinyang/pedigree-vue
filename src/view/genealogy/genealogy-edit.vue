<template>
  <el-card class="box-card">
    <el-form ref="genealogyForm" :model="genealogy" :rules="rules" label-width="120px">
      <el-form-item label="区域姓氏" prop="area_surname">
        <el-input v-model="genealogy.area_surname" style="width: 450px" placeholder="请输入区域姓氏"></el-input>
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
        <vue-ueditor-wrap
          v-model="genealogy.brief_introduction"
          :destroy="destroy"
          :config="config"
          @ready="ready"
          style="width: 800px"
        ></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('genealogyForm')">{{ id == '' ? '立即创建' : '保存'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import config from "@/config/index";
import http from "@/http/server/api";
import { setTimeout } from "timers";
export default {
  components: {
    VueUeditorWrap
  },

  data() {
    return {
      id: "",
      genealogy: {},
      isShowImg: true,
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
        area_surname: [{ required: true, message: "区域姓氏", trigger: "blur" }]
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id != "") {
      const that = this;
      http
        .getGenealogy({ id: this.id })
        .then(res => {
          if (res.data.code == "200") {
            if (res.data.result.thumbnail) {
              this.isShowImg = false;
            }
            res.data.result.brief_introduction =
              res.data.result.brief_introduction == null
                ? " "
                : res.data.result.brief_introduction;
            that.genealogy = res.data.result;
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
            .addGenealogy(that.genealogy)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                this.$message.success("新增成功！");
                this.$router.push("/genealogy-list");
              } else if (res.data.original && res.data.original.updated) {
                this.$message.success("修改成功！");
                this.$router.push("/genealogy-list");
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
    handleThumbnailSuccess(res, file) {
      if (res.res) {
        this.genealogy.thumbnail = res.url;
        this.isShowImg = false;
        // console.log(URL.createObjectURL(file.raw));
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

