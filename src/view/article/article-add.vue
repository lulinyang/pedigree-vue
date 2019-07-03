<template>
  <el-card class="box-card">
    <el-form ref="articleForm" :model="article" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title" style="width: 450px" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目" prop="type">
        <el-select v-model="article.type" filterable placeholder="请选择" style="width: 450px">
          <el-option v-for="item in columnlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
          <img v-if="article.thumbnail" :src="baseUrl + article.thumbnail" class="avatar" />
          <i v-if="isShowImg" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="article.describe"
          :rows="4"
          style="width: 450px;"
          placeholder="请输入描述内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="content">
        <vue-ueditor-wrap
          v-model="article.content"
          :destroy="destroy"
          :config="config"
          @ready="ready"
          style="width: 800px"
        ></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('articleForm')">{{ id == '' ? '立即创建' : '保存'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      id: "",
      article: {},
      isShowImg: true,
      columnlist: [],
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
        title: [{ required: true, message: "标题必填！", trigger: "blur" }],
        content: [
          { required: true, message: "文章内容不能为空！", trigger: "blur" }
        ],
        type: [{ required: true, message: "所属栏目必选！", trigger: "blur" }]
      }
    };
  },
  created() {
		const that = this; 
    http
      .getColumnList(that.keywords)
      .then(res => {
        that.columnlist = res.data.data;
      })
      .catch(res => {});
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
        if (!that.article.title || that.article.title == "") {
          this.$message.error("标题必填！");
          return false;
        }
        if (!that.article.type || that.article.type == "") {
          this.$message.error("所属栏目必选项！");
          return false;
        }
        if (!that.article.content || that.article.content == "") {
          this.$message.error("文章内容必填！");
          return false;
        }

        if (valid) {
          http
            .addarticle(that.article)
            .then(res => {
              if (res.data.original && res.data.original.created) {
                this.$message.success("新增成功！");
                this.$router.push("/article-list");
              } else if (res.data.original && res.data.original.updated) {
                this.$message.success("修改成功！");
                this.$router.push("/article-list");
              } else {
                this.$message.error("添加失败！");
              }
            })
            .catch(res => {});
        }
      });
    },
    handleThumbnailSuccess(res, file) {
      if (res.res) {
        this.article.thumbnail = res.url;
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

