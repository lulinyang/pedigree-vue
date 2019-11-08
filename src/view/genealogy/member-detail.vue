<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" class="clearfix">
      <h1>{{member.name}}</h1>
    </div>
    <p class="content-arcticle-box" v-html="member.brief_introduction"></p>
  </el-card>
</template>

<script>
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  data() {
    return {
      id: "",
      member: {}
    };
  },
  created() {
    const that = this;
    this.id = this.$route.query.id;
    if (this.id != "") {
      http
        .getMember({ id: this.id })
        .then(res => {
          that.member = res.data.data;
        })
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


