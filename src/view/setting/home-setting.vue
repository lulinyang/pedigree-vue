<template>
  <el-card class="box-card box-card-home">
    <el-row >
      <el-col :span="8">
        <div class="grid-content-left">
          <img width="100%" src="static/imgs/phone-header.jpg" class="phone-header" />
          <div class="mobile-box">
            <el-carousel height="190px" arrow="never">
              <el-carousel-item v-for="(item, index) in banners" :key="index">
                <img
                  width="100%"
                  height="100%"
                  :src="$host + item.imgUrl"
                />
              </el-carousel-item>
            </el-carousel>
            <el-row style="background:#fff;">
              <el-col :span="6" v-for="(item, index) in menus" :key="index">
                <div class="grid-menu">
                  <img width="60px" height="60px" :src="$host + item.icon" />
                  <p>{{item.name}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-carousel">
                  <i class="el-icon-warning"></i>
                  <span>以指定数组当前元素的变量名</span>
                </div>
              </el-col>
            </el-row>
            <div class="grid-nav">
              <el-tabs v-model="activeName">
                <el-tab-pane label="全部" name="0">
                  <div v-for="i in 34" :key="i">
                    <div class="article-top">
                      <div>
                        <p class="content-a">#标题#</p>
                        <p class="content-p">内容内容内容内容内容内容内容内容内容内容内容</p>
                      </div>
                      <div>
                        <img
                          src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                          height="100%"
                          width="100%"
                        />
                      </div>
                    </div>
                    <div class="article-bottom">
                      <div>
                        <span class="label-bottom">楼主</span>
                        <span class="label-bottom">30浏览</span>
                        <span class="label-bottom">99赞</span>
                        <span class="label-bottom">99评论</span>
                      </div>
                      <div class="label-time">2019-11-11</div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="新闻资讯" name="1">
                  <div v-for="i in 34" :key="i">
                    <div class="article-top">
                      <div>
                        <p class="content-a">#标题#</p>
                        <p class="content-p">内容内容内容内容内容内容内容内容内容内容内容</p>
                      </div>
                      <div>
                        <img
                          src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                          height="100%"
                          width="100%"
                        />
                      </div>
                    </div>
                    <div class="article-bottom">
                      <div>
                        <span class="label-bottom">楼主</span>
                        <span class="label-bottom">30浏览</span>
                        <span class="label-bottom">99赞</span>
                        <span class="label-bottom">99评论</span>
                      </div>
                      <div class="label-time">2019-11-11</div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="新闻资讯" name="2">
                  <div v-for="i in 34" :key="i">
                    <div class="article-top">
                      <div>
                        <p class="content-a">#标题#</p>
                        <p class="content-p">内容内容内容内容内容内容内容内容内容内容内容</p>
                      </div>
                      <div>
                        <img
                          src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                          height="100%"
                          width="100%"
                        />
                      </div>
                    </div>
                    <div class="article-bottom">
                      <div>
                        <span class="label-bottom">楼主</span>
                        <span class="label-bottom">30浏览</span>
                        <span class="label-bottom">99赞</span>
                        <span class="label-bottom">99评论</span>
                      </div>
                      <div class="label-time">2019-11-11</div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <img width="100%" src="static/imgs/phone_footer.jpg" class="phone_footer" />
        </div>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card box-card-setting">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12">
                <span>首页轮播图</span>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button style type="primary" @click="addBannerItem()" plain>添加轮播</el-button>
                <el-button style="margin-left: 20px;" type="primary" @click="saveBanner()">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <template>
            <el-table :data="banners" style="width: 100%">
              <el-table-column label="轮播图">
                <template slot-scope="scope">
                  <el-upload
                    class="avatar-uploader"
                    :action="upImgageUrl"
                    :show-file-list="false"
                    :on-success="(res, file) => handleBannerSuccess(res, file, scope.row)"
                    name="img"
                  >
                    <img v-if="scope.row.imgUrl" :src="$host + scope.row.imgUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <!-- <el-upload>
                    <img :src="scope.row.imgUrl" width="100px" height="70px" />
                  </el-upload>-->
                </template>
              </el-table-column>
              <el-table-column label="是否链接" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.islink"></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="link" label="链接地址">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.link"
                    :disabled="scope.row.islink*1 === 0"
                    placeholder="请输入外部链接"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="是否禁用" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isDeleted"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="删除" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" @click="delBannerItem(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>

        <el-card class="box-card box-card-setting" style="margin-top: 20px;">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12">
                <span>首页菜单</span>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <!-- <el-button style type="primary" @click="addMenuItem()" plain>添加菜单</el-button> -->
                <el-button style="margin-left: 20px;" type="primary" @click="saveMenu()">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <template>
            <el-table :data="menus" style="width: 100%">
              <el-table-column label="图标">
                <template slot-scope="scope">
                  <el-upload
                    class="icon-uploader"
                    :action="upImgageUrl"
                    :show-file-list="false"
                    :on-success="(res, file) => handleMenuSuccess(res, file, scope.row)"
                    name="img"
                  >
                    <img v-if="scope.row.icon" :src="$host + scope.row.icon" class="icon" />
                    <i v-else class="el-icon-plus icon-uploader-icon"></i>
                  </el-upload>
                </template>
              </el-table-column>

              <el-table-column label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" placeholder="请输入名称"></el-input>
                </template>
              </el-table-column>
              <!-- <el-table-column label="路由">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.router" placeholder="请输入路由"></el-input>
                </template>
              </el-table-column> -->
              <!-- <el-table-column label="是否禁用" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isDeleted"></el-switch>
                </template>
              </el-table-column> -->
              <!-- <el-table-column label="删除" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" @click="delMenuItem(scope.$index)">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import config from "@/config/index";
import http from "@/http/server/api";
export default {
  data() {
    return {
      upImgageUrl: config.baseUrl + "/api/upImage",
      activeName: "0",
      banners: [],
      menus: []
    };
  },
  created() {
    this.getBanner();
    this.getMenu();
  },

  methods: {
    delBannerItem(index) {
      this.banners.splice(index, 1);
    },
    delMenuItem(index) {
      this.menus.splice(index, 1);
    },
    handleBannerSuccess(res, file, item) {
      if (res.code * 1 === 200) {
        item.imgUrl = res.data;
      }
    },
    handleMenuSuccess(res, file, item) {
      if (res.code * 1 === 200) {
        item.icon = res.data;
      }
    },
    getBanner() {
      http.getBanner({}).then(res => {
        this.banners = res.data.data.map(item => {
          item.islink = item.isLink * 1 === 1 ? true : false;
          item.isDeleted = item.deleted * 1 === 1 ? true : false;
          return item;
        });
      });
    },
    getMenu() {
      http.getMenu({}).then(res => {
        this.menus = res.data.data.map(item => {
          item.isDeleted = item.deleted * 1 === 1 ? true : false;
          return item;
        });
      });
    },
    addBannerItem() {
      this.banners.push({
        imgUrl:
          "/uploads/20191126/RMvbVmqOOg92zNaWVnagg2NHsXMKJnPQtXFhWoAY.png",
        islink: false,
        link: "",
        isDeleted: false
      });
    },
    addMenuItem() {
      if (this.banners.length >= 4) {
        this.$message.warning("最多添加四个");
        return false;
      }
      this.menus.push({
        icon: "/uploads/20191126/3kHYMDNVrX9m6xQtohRokltHghLkpJLaotW707SZ.png",
        name: "",
        isDeleted: false,
        router: ""
      });
    },
    saveBanner() {
      const params = {};
      let arr = [];
      this.banners.forEach(item => {
        item.deleted = item.isDeleted ? 1 : 0;
        item.isLink = item.islink ? 1 : 0;
        arr.push(item);
      });
      params.banners = arr;

      http.addBanner(params).then(res => {
        if (res.data.code * 1 === 200) {
          this.$message.success(res.data.stateMsg);
        }
      });
    },
    saveMenu() {
      const params = {};
      let arr = [];
      this.menus.forEach(item => {
        item.deleted = item.isDeleted ? 1 : 0;
        arr.push(item);
      });
      params.menus = arr;
      http.addMenu(params).then(res => {
        if (res.data.code * 1 === 200) {
          this.$message.success(res.data.stateMsg);
        }
      });
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.box-card-home {
  min-width: 1305px;
}
.grid-content-left {
  width: 400px;
  margin: 0 auto;
  background-color: #f8f8f8;
}
.mobile-box {
  width: 400px;
  height: 680px;
  background-color: #f8f8f8;
  margin: -5px auto 0;
  position: relative;
  overflow-y: auto;
}
.mobile-box::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}
.grid-menu {
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
}
.grid-carousel {
  line-height: 40px;
  background-color: #ecf9ff;
  color: #1989f9;
  padding: 0 20px;
}
.grid-nav {
  padding: 0 20px;
  background-color: #fff;
}
.article-top {
  padding-bottom: 10px;
  padding-top: 10px;
}
.article-top > div {
  float: left;
}
.article-top,
.article-bottom {
  overflow: hidden;
}
.article-top > div:nth-child(1) {
  width: 70%;
  height: 80px;
}
.article-top > div:nth-child(2) {
  width: 30%;
  height: 80px;
}
.article-bottom > div {
  float: left;
}
.article-bottom > div:nth-child(1) {
  width: 70%;
  line-height: 30px;
}
.article-bottom > div:nth-child(2) {
  width: 30%;
  line-height: 30px;
}
.article-bottom {
  border-bottom: 1px solid #f8f8f8;
}
.content-a {
  color: #1989f9;
}
.content-p {
  line-height: 35px;
}
.label-bottom {
  color: #999;
  font-size: 14px;
  margin-right: 10px;
}
.label-time {
  text-align: center;
  line-height: 35px;
}
.grid-content-right {
  width: 100%;
}
.box-card-setting {
  min-width: 670px;
}
.img_icon {
  border-radius: 50%;
}

.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9; */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 0;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 70px;
  display: block;
}

.icon-uploader .el-upload {
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 0;
}

.icon-uploader .el-upload:hover {
  border-color: #409eff;
  border-radius: 50%;
}
.icon-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.icon {
  width: 70px;
  height: 70px;
  display: block;
}
</style>

<style>
.el-upload--text {
  border: 0;
}
</style>