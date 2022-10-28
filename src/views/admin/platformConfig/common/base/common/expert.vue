<template>
    <div>
        <div class="setBanner allP">
            <p class="bastitle">
              <span>院士专家</span>
              <span>尺寸158*230px</span>
            </p>
            <div class="ban">
              <div class="banNotice">
                  <div class="banNoticeBack" @click="addBanner">+</div>
              </div>
              <div
                  class="banList"
                  v-for="(item,index) in banList"
                  :key="item.url"
                  @mouseenter="changeBanMark(index)"
                  @mouseleave="banMarkIndex=''"
                  >
                  <img :src="item.url" alt />
                  <div class="banMark" v-if="banMarkIndex===index">
                    <p>
                        <span @click="delBanner(index)">删除</span>
                        <span @click="modifyBanner(index,item)">修改</span>
                    </p>
                  </div>
              </div>
            </div>
            <div style="clear:both;"></div>
        </div>

        <el-dialog
            class="banotice"
            :show-close="false"
            :visible.sync="banner_dialog"
            :close-on-click-modal="false"
            :append-to-body="true"
            width="800px"
            >
            <div slot="title">
              <p>BANNER</p>
            </div>
            <div class="notfup" @mouseenter="changeMark2" @mouseleave="mark2=false">
              <notice :showlist="false" accept=".jpg, .png, .gif" drag :onSuccess="banUpSuccess">
                  <div class="upImg" v-if="bannerFile">
                    <img :src="bannerFile" alt />
                  </div>
                  <div class="avatar" v-else>
                    <p class="iconfont icon-icon-uploadExcel">
                        <i class="el-icon-upload"></i>
                    </p>
                    <p>点击或将文件拖拽到这里上传</p>
                    <span>建议尺寸：尺寸158*230px</span>
                  </div>
                  <div class="noticeMark" v-if="mark2">
                    <p>修改</p>
                  </div>
              </notice>
              <div class="everTitle">
                  <p class="title">姓名</p>
                  <el-input class="input" v-model="name" placeholder="请填写姓名" />
                  <p class="title">简介</p>
                  <el-input type="textarea" :autosize="{ minRows: 2 }" class="input" v-model="message" placeholder="请填写简介" />
              </div>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="subanner">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import notice from "@@/components/fileUpload/notice.vue";
export default {
    components:{notice},
    props:['lists','close'],
    data(){
        return{
            banner_dialog: false,
            mark2: false,
            bannerFile: "",
            name: "",
            message: "",
            banMarkIndex: null,
            bannerFlag: false,
        }
    },
    computed:{
        banList(){
            return this.lists
        }
    },
    methods:{
        //取消banner 修改
        cancel() {
            this.name = "";
            this.message = "";
            this.bannerFile = "";
            this.banner_dialog = false;
        },
        //删除轮播图
        delBanner(index) {
            this.banList.splice(index, 1);
            this.close && this.close('expertList', this.banList)
        },
        //修改轮播图
        modifyBanner(index, item) {
            this.bannerItemIndex = index;
            this.bannerFile = item.url;
            this.name = item.name;
            this.message = item.message;
            this.banner_dialog = true;
            this.bannerFlag = true;
        },
        // 新增轮播图
        addBanner(){
          this.bannerFile = '';
          this.name = '';
          this.message = '';
          this.banner_dialog = true;
          this.bannerFlag = false;
        },
        subanner() {
            if (this.bannerFlag) {
                let obj = {}
                obj.url = this.bannerFile;
                obj.name = this.name;
                obj.message = this.message;
                this.banList.splice(this.bannerItemIndex, 1, obj);
                this.cancel()
            } else {
                if (!this.bannerFile) return this.$message.info("上传图片是必填项");
                let obj = {}
                obj["url"] = this.bannerFile;
                obj["name"] = this.name;
                obj["message"] = this.message;
                this.banList.push(obj);
                this.cancel()
            }
            this.close && this.close('expertList', this.banList)
        },
        changeMark2() {
            if (this.bannerFile) {
                this.mark2 = true;
            }
        },
        banUpSuccess(ret, file, flieList) {
            if (!ret.location) {
                return this.$message.info("上传失败");
            }
            this.bannerFile = ret.location;
        },
        changeBanMark(index) {
            this.banMarkIndex = index;
        },
    }
}
</script>

<style lang='less' scoped>
.setBanner {
  .bastitle {
      span:first-child {
          font-size: 17px;
          color: #4a4a4a;
          letter-spacing: 1.21px;
      }
      span:nth-child(2) {
          font-size: 12px;
          color: #9b9b9b;
          letter-spacing: 0.86px;
      }
  }
  .ban {
    .banNotice {
      float: left;
      margin-right: 20px;
      .banNoticeBack {
        background: #f0f2f4;
        border-radius: 5px;
        height: 120px;
        width: 180px;
        text-align: center;
        line-height: 120px;
        font-size: 36px;
        color: #787d81;
        cursor: pointer;
        margin-top: 10px;
      }
    }
    .banList {
      width: 180px;
      height: 120px;
      border-radius: 5px;
      margin-right: 20px;
      float: left;
      margin-top: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .banMark {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border-radius: 5px;
        p {
          color: #fff;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 120px;
          span {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.banotice {
  .notfup {
    width: 460px;
    margin: 0 auto;
    .upImg {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .noticeMark {
      width: 453px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      p {
        color: #fff;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 146px;
      }
    }
    .everTitle {
      
      .title{
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 1px;
        margin: 20px 0 5px;
      }
      .input{
        width: 300px;
      }
    }
  }
}
</style>