<template>
  <el-card class="box-card">
    <el-form ref="celebrityForm" :model="celebrity" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="celebrity.name" style="width: 450px" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="字">
        <el-input v-model="celebrity.name_word" style="width: 450px" placeholder="请输入字"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="celebrity.address" style="width: 450px" placeholder="请输入住址"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          name="img"
          :action="upImgageUrl"
          :show-file-list="false"
          :on-success="handleThumbnailSuccess"
        >
          <img v-if="celebrity.thumbnail" :src="baseUrl + celebrity.thumbnail" class="avatar" />
          <i v-if="isShowImg" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          type="textarea"
          v-model="celebrity.describe"
          :rows="4"
          style="width: 450px;"
          placeholder="请输入描述内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="content">
        <vue-neditor-wrap
          v-model="celebrity.content"
          :config="myConfig"
          :destroy="false"
          @ready="ready"
        ></vue-neditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('celebrityForm')">{{id === "" ? '立即创建' : "保存"}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import config from "@/config/index";
import http from "@/http/server/api";
import editor from "@/config/editor";
import { limitWords } from "@/tools/validator";
export default {
  data() {
    return {
      id: this.$route.params.id ? this.$route.params.id : "",
      celebrity: {
        content: ""
      },
      isShowImg: true,
      baseUrl: config.baseUrl,
      upImgageUrl: config.baseUrl + "/api/upImage",
      myConfig: editor.myConfig,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      rules: {
        name: [
          {
            required: true,
            message: "姓名不能为空！",
            trigger: ["blur", "change"]
          }
        ],
        describe: [
          {
            required: true,
            message: "描述不能为空！",
            trigger: ["blur", "change"]
          }
        ],
        content: [
          {
            required: true,
            message: "文章内容不能为空！",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    if (this.id !== "") {
      http.getCelebrityById({ id: this.id }).then(res => {
        const data = res.data.data;
        // console.log("res.data.data", res.data.data);
        if (data.thumbnail && data.thumbnail != "") {
          this.isShowImg = false;
        } else {
          this.isShowImg = true;
        }
        if (data.tag && data.tag != "") {
          this.dynamicTags = data.tag.split(",");
        } else {
          this.dynamicTags = [];
        }

        this.celebrity = data;
      });
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    ready(editorSetting) {
      // console.log("editorSetting", editorSetting);
    },
    onSubmit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.celebrity.tag = this.dynamicTags.toString();
          http.addCelebrity(that.celebrity).then(res => {
            this.$message.success(res.data.stateMsg);
            this.$router.go(-1);
          });
        }
      });
    },
    handleThumbnailSuccess(res, file) {
      if (res.code * 1 === 200) {
        this.celebrity.thumbnail = res.data;
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

