<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" class="clearfix">
      <h1>{{genealogy.area_surname}}</h1>
      <p>发布人：{{ genealogy.username}}</p>
      <p>发时间：{{genealogy.created_at}}</p>
      <p>{{ genealogy.describe }}</p>
    </div>
    <p class="content-arcticle-box" v-html="genealogy.brief_introduction"></p>
  </el-card>
</template>

<script>
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  data() {
    return {
      genealogy: {}
    };
  },
  created() {
    http.getGenealogy({ id: this.$route.params.id }).then(res => {
      this.genealogy = res.data.data;
    });
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


