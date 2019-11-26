<template>
  <el-card class="box-card">
    <div class="box-card-form">
      <el-row>
        <el-col :span="12" style="text-align: center;">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="header_imgs[0]" :src="$host + header_imgs[0]" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="sex-text">男</p>
        </el-col>
        <el-col :span="12" style="text-align: center;">
          <el-upload
            class="avatar-uploader avatar-uploader-right"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
          >
            <img v-if="header_imgs[1]" :src="$host + header_imgs[1]" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="sex-text">女</p>
        </el-col>
        <el-col :span="24" style="text-align: center;margin-top: 35px;">
          <el-button type="primary" style="width: 60%;">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      header_imgs: [
        "/uploads/20191118/xDvSCD2yDtqSOVvvZci0r1qESUrL0HQ07ibX9GMN.jpeg",
        "/uploads/20191118/xvj76a7XRFSZSWlacdXOfcveEuCCOO90T0w1YgWQ.jpeg"
      ]
    };
  },
  methods: {
    handleAvatarSuccess() {},
    handleAvatarSuccess2() {}
  }
};
</script>

<style scoped>
.box-card {
  width: 100%;
  height: 98%;
  position: relative;
}
.box-card-form {
  width: 500px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}
.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
/* .avatar-uploader-right {
  margin-left: 50px;
} */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.sex-text {
  text-align: center;
}
</style>