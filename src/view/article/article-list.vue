<template>
  <div style="height: 500px">
    <vue-ueditor-wrap v-model="msg" :destroy="false" :config="config" @ready="ready"></vue-ueditor-wrap>
  </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import config from "@/config/index";
console.log("config.origin", config.origin);
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      msg: "",
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: config.ueBaseUrl + "/static/UEditor/php/controller.php"
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/static/UEditor/'
        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
        // headers: {
        //   access_token: '37e7c9e3fda54cca94b8c88a4b5ddbf3'
        // }
      }
    };
  },
  methods: {
    // 5、 你可以在ready方法中拿到editorInstance实例,所有API和官方的实例是一样了。http://fex.baidu.com/ueditor/#api-common
    ready(editorInstance) {
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance);
    },
    addCustomUI(editorId, editorConfig) {
      console.log(
        editorId + "的配置参数是:",
        JSON.stringify(editorConfig, null, 2)
      );
    }
  }
};
</script>

