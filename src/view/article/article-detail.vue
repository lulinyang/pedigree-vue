<template>
<el-card class="box-card" shadow="always">
	<div slot="header" class="clearfix">
		<h1>{{article.title}}</h1>
		<p>发布人：{{article.create_user}}   {{article.created_at}}</p>
		<p>{{ article.describe }}</p>
	</div>
		<p class="content-arcticle-box" v-html="article.content"></p>
</el-card>
</template>

<script>
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  data() {
    return {
      id: "",
      article: {}
    };
  },
  created() {
    const that = this;
    this.id = this.$route.query.id;
    if (this.id != "") {
      const that = this;
      http
        .getArticle({ id: this.id })
        .then(res => {
          if (res.data.code == 200) {
            that.article = res.data.result;
          }
        })
        .catch(res => {});
    }

    // http
    //   .getColumnList(that.keywords)
    //   .then(res => {
    //     that.columnlist = res.data.data;
    //   })
    //   .catch(res => {});
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


