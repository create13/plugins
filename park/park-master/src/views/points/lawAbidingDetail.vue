<template>
    <div class="page-body disabled-tabbar">
         <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="bgColors"  body-padding-top=".46rem">
            遵章守纪评分
              <a slot="right" @click="showMenu">评分说明</a>
             </x-header>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>党员姓名：<span style="color: #999999">{{name}}</span></b>
            </group-title>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>所属支部：<span style="color: #999999">{{departmentname}}</span></b>
            </group-title>
        </div>

        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>扣分原因</b>
            </group-title>
            <textarea cols="30" rows="10"  maxlength="300" v-model='Content1' placeholder="请简单总结扣分原因"></textarea>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>原因描述</b>
            </group-title>
            <textarea cols="30" rows="10"  maxlength="300" v-model='Content2' placeholder="请详细描述扣分原因"></textarea>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <span class="addPic">添加凭证</span>
            <div class="photo-list cl">
                <ul>
                    <li v-for="(item,index) in picList.list" :key="index">
                        <div class="preview">
                            <img style="float:left;width:100%" :key="index" width="100" :src="item"  @touchend="clearLoop" @touchstart="showDeleteButton(index)">
                        </div>
                    </li>
                    <li>
                        <div class="preview addUpload" @click="chooseImage(picList)">
                            <span class="add-bg"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="group-item">
            <group-title slot="title"></group-title>
            <x-button type="warn" style="height：.5rem!important;" @click.native="submit()">
                点击确认扣分
            </x-button>
        </div>
  <div v-transfer-dom>
				<popup v-model="showPop" position="left" width="100%">
				<div class="middle">
					<div class="middle-top">评分说明</div>
					<div class="middle-content">
              	<p>
                            1、党员在支部民主评议党员活动中，被评定为“不合格党员”或受限期改正等组织处置的扣20分；<br>
                            2、党员受到党内纪律处分或行政处罚以上的，实行“一票否决”。
						</p>
					
					</div>
					<div class="knowBtn" @click="know()">我知道了</div>
				</div>
				</popup>
			</div>
    </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

import {
  XHeader,
  GroupTitle,
  Flexbox,
  TransferDomDirective as TransferDom,
  Alert,
  FlexboxItem,
  XButton,
  DatetimePlugin,
  Datetime,
  Group,
  Picker,
  Previewer,
  Popup,
} from "vux";
import wx from "weixin-js-sdk";
import weixin from "@/services/weixin";
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    XButton,
    DatetimePlugin,
    Datetime,
    Group,
    Picker,
    Alert,
    Previewer,
    Popup,
  },
  data() {
    return {
      value1: "",
      startTime: "",
      endTime: "",
      hourListValue: "",
      hot: "",
      ListValue: "",
      activeContent: "",
      listSingle: {},
      userName: "",
      picList: { list: [], arr: [] },
      userid: "",
      departmentid: "",
      name: "",
      departmentname: "",
      Content1: "",
      Content2: "",
      showPop:false
    };
  },
  methods: {
    getUser1() {
      axios
        .get("ppartymember/queryByUserId", {
          params: {
            userid: this.$route.params.userId
          }
        })
        .then(res => {
          this.userid = res.data.userid;
          this.departmentid = res.data.departmentid;
          this.name = res.data.name;
          this.departmentname = res.data.departmentname;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit() {
      if(!this.Content1){
          return this.$vux.toast.show({
              text: '填写扣分原因',
              type: 'text'
          });
      }
      if(!this.Content2){
          return this.$vux.toast.show({
              text: '填写原因描述',
              type: 'text'
          });
      }
      if(this.picList.arr.length==0){
          return this.$vux.toast.show({
              text: '请上传图片',
              type: 'text'
          });
      }

      axios
        .get("pscoreparty/scoreClean", {
          params: {
            detailId: 6,
            adderId: this.user.userid,
            userId: this.userid,
            imgs: this.picList.arr.join(),
            remark: JSON.stringify({
              title: this.Content1,
              remark: this.Content2
            })
          }
        })
        .then(res => {
            this.$vux.alert.show({
                title: res.msg,
                onHide () {
                    setTimeout(() => history.back(),500);
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
    },
    showDeleteButton(it) {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      var This = this;
      this.Loop = setTimeout(function() {
        This.picList.list.splice(it, 1);
        This.picList.arr.splice(it, 1);
        This.$vux.alert.show({ title: "删除成功" });
      }, 1000);
    },
    clearLoop() {
      clearInterval(this.Loop);
    },
    atBig(item) {},

    openPicker() {
      this.$refs.picker.open();
    },

    getActivity() {},
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    showPlugin() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD HH",
        value: "2017-05-20 18",
        onConfirm(val) {
          console.log("plugin confirm", val);
        },
        onShow() {
          console.log("plugin show");
        },
        onHide() {
          console.log("plugin hide");
        }
      });
    },
    toggleFormat() {
      this.format =
        this.format === "YYYY-MM-DD HH:mm" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm";
    },
    changeStart(value) {
      this.startTime = value;
    },
    changeEnd(value) {
      this.endTime = value;
    },
    clearValue(value) {
      this.value6 = "";
    },
    clearValue8(value) {
      this.value8 = "";
    },
    setToday(value) {
      let now = new Date();
      let cmonth = now.getMonth() + 1;
      let day = now.getDate();
      if (cmonth < 10) cmonth = "0" + cmonth;
      if (day < 10) day = "0" + day;
      this.value7 = now.getFullYear() + "-" + cmonth + "-" + day;
      console.log("set today ok");
    },
    showMenu(){
               this.showPop = true;
            },
    know(){
             this.showPop = false;
        },
    chooseImage(it) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds || [];
          new Promise(resolve => {
            let serverIds = [];
            let toUpload = localId =>
              wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res => {
                  serverIds.push(res.serverId);
                  if (localIds.length) {
                    toUpload(localIds.shift());
                  } else {
                    resolve(serverIds);
                  }
                }
              });
            if (localIds.length) {
              toUpload(localIds.shift());
            } else {
              resolve(serverIds);
            }
          }).then(serverIds => {
            let promiseList = [];
            serverIds.map(serverId =>
              promiseList.push(
                this.$http.get("picture/upload", {
                  params: {
                    mediaId: serverId
                  }
                })
              )
            );
            Promise.all(promiseList).then(result => {
              let pictureIds = [];
              result.map(item => pictureIds.push(item.data));
              it.list.push(
                "http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=" +
                  pictureIds.join()
              );
              it.arr.push(pictureIds.join());
            });
          });
        }
      });
    }, 
  },
  mounted() {
    weixin.init(["chooseImage", "uploadImage"]);
    this.getUser1();
  },
  computed: {
        ...mapGetters(['user'])
    }

};
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}
.group-item {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  &:last-child {
    margin-bottom: 0.2rem;
  }
  &:nth-child(2) {
    margin-top: 0.6rem;
  }
  .bg-line{
    width: 0.03rem;
    height: 0.14rem;
    margin-left: 1%;
    background: url(../../assets/images/icon-rectangle.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    float: left;
    margin-top: 0.05rem;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.06rem 0.08rem;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    color: #333;
    font-size: 0.14rem;
  }
  input {
    height: 0.32rem;
  }
  .vux-flexbox-item input {
    border-right-width: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-addon {
    flex: 0 0 auto;
    width: auto;
  }
  .weui-btn_mini {
    height: 0.32rem;
    line-height: 1;
    padding: 0 0.16rem;
    font-size: 0.14rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &::after {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.weui-cells__title {
  margin-top: 0.2rem;
  padding-left: 0;
  padding-right: 0;
  color: #464646;
}
.active-type-list {
  margin: 0.1rem auto;
  width: 92%;
  position: relative;
  li {
    background: #fff5e6;
    height: 0.3rem;
    text-indent: 0.2rem;
    line-height: 0.3rem;
    color: #cb2f00;
    font-size: 0.15rem;
  }
}

.addPic {
    height: 0.17rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Medium;
    color: #464646;
    font-weight: 600;
    line-height: 0.17rem;
}
input[type="file"] {
  color: transparent;
  opacity: 0;
}
.square {
  width: 0.4rem;
  height: 0.4rem;
  border: 1px solid #b53141;
  background: url(../../assets/images/icon-plug.png) no-repeat;
  background-size: 50% 50%;
  background-position: center;
}

.photo-list {
  padding: 0.1rem 0 0;
}
.photo-list.border0 {
  border-bottom: 0;
  padding-bottom: 0;
}
.photo-list ul {
  font-size: 0;
  list-style: none;
}
.photo-list ul li {
  font-size: 0;
  display: inline-block;
  margin-right: 0.2rem;
  position: relative;
  vertical-align: top;
  width: 0.9rem!important;
  height: 0.9rem!important;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.photo-list ul li:first-child {
  margin-left: 0;
}
.photo-list .operate {
  display: none;
  background: rgba(33, 33, 33, 0.6);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr=#b2404040,
      endColorstr=#b2404040
    );
  z-index: 5;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12px;
  padding-bottom: 7px;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.photo-list .info {
  line-height: 0.6rem;
  text-align: center;
}
.photo-list .preview {
  width: 0.9rem!important;
  height: 0.9rem!important;
  z-index: 4;
  line-height: 0.6rem;
  font-family: arial;
  background-color: #dbdbdb;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  right: 0;
  cursor: pointer;
  border: 1px solid #fff;
  box-sizing: border-box;
}
.photo-list .preview.addUpload {
  background-color: #f4f4f4;
  border: 1px solid #e4e4e4;
}
.photo-list .preview img {
  max-height: 0.9rem!important;
  max-width: 0.9rem!important;
  vertical-align: middle;
}
.photo-list .photo-primary-text {
  color: #ffa500;
  font-size: 12px;
}
.photo-list .add-bg {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.34rem;
  margin-top: 0.32rem;
  display: block;
  background: url(../../assets/images/add_icon_bg1.png) no-repeat;
  background-size: contain;
  background-position: center;
}
.photo-list ul li:hover .operate {
  display: block;
}
.photo-list ul .operate a {
  color: #fff;
  cursor: pointer;
  text-decoration: none;
}
.photo-list ul li.no-operate:hover .operate {
  display: none;
}
.photo-list .upload-file-input {
  opacity: 0;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  left: 0;
  width: 0.6rem;
  bottom: 0;
}
.weui-btn_warn{
  height: .5rem!important;
  line-height: .3rem!important;
}
</style>
<style>
.date-no-box {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.32rem;
  overflow: hidden;
  opacity: 0;
}
.date-no-box .vux-no-group-title {
  margin-top: 0 !important;
}
.date-no-box .weui-cell {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 0.32rem;
  padding: 0;
}
.middle .middle-top{width:100%;height:.4rem; background:linear-gradient(90deg,rgba(185,54,71,1),rgba(155,10,26,1));box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);font-size:.16rem;color:#FFFFFF;text-align:center;line-height:.4rem;border-radius:10px 10px 0 0;}
.middle{width:2.8rem;height:2.5rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:21%;overflow:hidden;}
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0.2)!important;}
.middle-content p{font-size:.14rem;color:#828282;line-height:.24rem;}
.middle-content{width:2.4rem;height:1.2rem;margin:.21rem .19rem .21rem .21rem;}

</style>
