<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" class="clearfix">
      <h1>{{celebrity.title}}</h1>
      <p>发布人：{{celebrity.create_user}} {{celebrity.created_at}}</p>
      <p>{{ celebrity.describe }}</p>
    </div>
    <p class="content-arcticle-box" v-html="celebrity.content"></p>
  </el-card>
</template>

<script>
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  data() {
    return {
      id: this.$route.params.id ? this.$route.params.id : '',
      celebrity: {}
    };
  },
  created() {
    if (this.id != "") {
      http.getCelebrityById({ id: this.id }).then(res => {
        console.log(res);
        this.celebrity = res.data.data;
      });
    }
  }
};
</script>
<style scoped>
.clearfix h1 {
  text-align: center;
}
.clearfix p {
  text-align: center;
  line-height: 40px;
  color: #999;
}
.content-arcticle-box {
  display: block;
  margin: 0 auto;
  max-width: 800px;
  min-width: 600px;
  text-align: center;
}
/* .content-box {
	max-width: 700px;
} */
</style>


