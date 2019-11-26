<template>
  <el-card class="box-card box-card-home">
    <el-row>
      <el-col :span="8">
        <div class="grid-content-left">
          <img width="100%" src="static/imgs/phone-header.jpg" class="phone-header" />
          <div class="mobile-box">
            <el-carousel height="190px" arrow="never">
              <el-carousel-item v-for="item in 4" :key="item">
                <img
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </el-carousel-item>
            </el-carousel>
            <el-row>
              <el-col :span="6">
                <div class="grid-menu">
                  <img width="60px" height="60px" src="static/imgs/home_menu1.png" />
                  <p>宗祠</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-menu">
                  <img width="60px" height="60px" src="static/imgs/home_menu3.png" />
                  <p>历史今日</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-menu">
                  <img width="60px" height="60px" src="static/imgs/home_menu5.png" />
                  <p>老黄历</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-menu">
                  <img width="60px" height="60px" src="static/imgs/home_menu6.png" />
                  <p>名人烈士</p>
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
                  <img :src="scope.row.imgUrl" width="100px" height="70px" />
                </template>
              </el-table-column>
              <el-table-column label="是否链接" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isLink"></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="link" label="链接地址">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.link"
                    :disabled="scope.row.isLink*1 === 0"
                    placeholder="请输入外部链接"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="是否禁用" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isDeleted"></el-switch>
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
                <el-button style type="primary" @click="addMenuItem()" plain>添加菜单</el-button>
                <el-button style="margin-left: 20px;" type="primary" @click="saveMenu()">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <template>
            <el-table :data="menus" style="width: 100%">
              <el-table-column label="图标">
                <template slot-scope="scope">
                  <img :src="scope.row.icon" width="70px" height="70px" class="img_icon"/>
                </template>
              </el-table-column>

              <el-table-column prop="link" label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" placeholder="请输入外部链接"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="是否禁用" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isDeleted"></el-switch>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: "0",
      banners: [
        {
          imgUrl:
            "https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg",
          isLink: true,
          link: "http://www.baidu.com",
          isDeleted: false
        },
        {
          imgUrl:
            "https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg",
          isLink: true,
          link: "http://www.baidu.com",
          isDeleted: false
        },
        {
          imgUrl:
            "https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg",
          isLink: true,
          link: "http://www.baidu.com",
          isDeleted: false
        }
      ],
      menus: [
        {
          icon:
            "https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg",
          name: "宗祠",
          isDeleted: false
        }
      ]
    };
  },
  methods: {
    addBannerItem() {
      this.banners.push({
        imgUrl:
          "https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg",
        isLink: false,
        link: "http://www.baidu.com",
        isDeleted: true
      });
    },
    addMenuItem() {
      this.menus.push({
        icon:
          "https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg",
        name: "宗祠",
        isDeleted: false
      });
    },
    saveBanner() {},
    saveMenu() {}
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
</style>