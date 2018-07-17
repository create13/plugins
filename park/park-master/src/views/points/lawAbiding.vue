<template>

	<div style="height:100%;" class="disabled-tabbar">
   		<view-box ref="viewBox" body-padding-top=".46rem">
            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
                {{contents.title}}<a slot="right" @click="showMenu">评分说明</a></x-header>
			    <div class="points-table">
                    <flexbox :gutter="0">
                        <flexbox-item>序号</flexbox-item>
                        <flexbox-item>党员姓名</flexbox-item>
                        <flexbox-item>分数</flexbox-item>
                        <flexbox-item>一票否决</flexbox-item>
                    </flexbox>
                    
                    <flexbox  style="text-align: center" v-if="list.length === 0">
                        <div style="margin-left:30%;">
                            <img style="width:.9rem;height:1.2rem;" src="@/assets/images/icon-noRecord.png" alt="">
                            <p style="color: #CCC;">暂无信息</p>
                        </div>
                    </flexbox>
                    <flexbox :gutter="0"  v-for="(con,index) in list" :key="index">
                        <flexbox-item>{{index+1}}</flexbox-item>
                        <flexbox-item>{{con.approvedName}}</flexbox-item>

                        <flexbox-item >{{con.typetotalscore}}</flexbox-item>
                        <flexbox-item>
                            <input type="button" class="btnSub" :value="con.validYn|Upper" :class="con.validYn|Upper1" @click="changeItem(con)"></input>
                        </flexbox-item>
                    </flexbox>
               </div>
			<div v-transfer-dom>
				<popup v-model="showPop" position="left" width="100%">
				<div class="middle">
					<div class="middle-top" @click="show()">评分说明</div>
					<div class="middle-content">
						<p>
                            1、党员在支部民主评议党员活动中，被评定为“不合格党员”或受限期改正等组织处置的扣20分；<br>
                            2、党员受到党内纪律处分或行政处罚以上的，实行“一票否决”。
						</p>
					</div>
					<div class="knowBtn" @click="know">我知道了</div>
				</div>
				</popup>
			</div>
   		</view-box>
 	</div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import {
  ViewBox,
  TransferDom,
  Popup,
  Flexbox,
  FlexboxItem,
  XHeader
} from "vux";
Vue.component(Popup.name, Popup);
export default {
  data() {
    return {
      contents: { rights: "评分说明", title: "遵章守纪评分" },
      list: [],
      isYellow: false,
      showPop: false,
      uuserId: ""
    };
  },
  filters: {
    Upper: function(value) {
      try {
        if (value === "N") throw "去处理";
        if (value === "Y") throw "已审核";
        if (value === 0) throw "待审核";
      } catch (err) {
        return (value = err);
      }
    },
    Upper1: function(value) {
      try {
        /* if(value===null) throw "yellowA";*/
        if (value === "N") throw "yellowB";
        if (value === "Y") throw "yellowC";
      } catch (err) {
        return (value = err);
      }
    }
  },
  components: {
    XHeader,
    ViewBox,
    Popup,
    Flexbox,
    FlexboxItem
  },
  directives: {
    TransferDom
  },
  methods: {
    getlist() {
      axios({
        method: "get",
        url: "pscoreparty/getDakDetialByDepartmentId",
        params: {
          departmentId: this.$store.getters.user.departmentid
        }
      })
        .then(res => {
          this.list = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    changeItem(item) {
      if (item.validYn == "Y") {
        this.$router.push({
          path: "points/lawAbidingDetailFinish/:userId",
          name: "lawAbidingDetailFinish",
          params: {
            userId: item.userId
          }
        });
      } else {
        this.$router.push({
          path: "lawAbidingDetail/:userId",
          name: "lawAbidingDetail",
          params: {
            userId: item.userId
          }
        });
      }
    },
    showMenu() {
      this.showPop = true;
    },
    know() {
      this.showPop = false;
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style scoped lang="less">
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.vux-flexbox {
  width: 88%;
  margin-left: 6%;
  text-align: center;
  margin-top: 0.2rem;
}
.vux-flexbox-item {
  font-size: 0.14rem;
}
.vux-flexbox:nth-child(1) {
  color: rgba(250, 122, 0, 1);
  border: 0;
  padding-bottom: 0px;
}
.vux-flexbox {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 0.2rem;
}
.vux-flexbox .vux-flexbox-item:nth-child(1) {
  flex: 0 0 auto;
  width: 16%;
}
/*#table-style{
	width:86.7%;
	height:auto;
	margin:0px auto;
}
#table-style tbody tr td{height:.28rem;padding-top:.2rem;font-size:.2rem;width:33.33%;text-align:left;}
#table-style tbody tr td:nth-child(3){text-align:right;}*/
.btnSub {
  width: 0.6rem;
  height: 0.24rem;
  font-size: 0.14rem;
  line-height: 0.24rem;
  border-radius: 4px;
  font-family: PingFangSC-Medium;
  border: 0px;
  color: #ffffff;
  background-color: rgba(185, 54, 71, 1);
}
.yellowA {
  background-color: #bababa;
}
.yellowB {
  background-color: #f84d2b;
}
.yellowC {
  background-color: rgba(244, 151, 74, 1);
}
.middle {
  width: 2.8rem;
  height: 2.5rem;
  margin: 0.8rem auto;
  border-radius: 10px;
  background-color: #ffffff;
  position: absolute;
  z-index: 300;
  left: calc(50% - 1.4rem);
  top: 21%;
  overflow: hidden;
}
.mint-popup-left {
  left: 15%;
}
.middle .middle-top {
  width: 100%;
  height: 0.4rem;
  background: linear-gradient(
    90deg,
    rgba(185, 54, 71, 1),
    rgba(155, 10, 26, 1)
  );
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  font-size: 0.16rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.4rem;
  border-radius: 10px 10px 0 0;
}
.middle-content {
  width: 2.4rem;
  height: 1.2rem;
  margin: 0.21rem 0.19rem 0.21rem 0.21rem;
}
.middle-content p {
  font-size: 0.14rem;
  color: #828282;
  line-height: 0.24rem;
}
.dark {
  color: #333333;
}
.knowBtn {
  width: 1.2rem;
  height: 0.3rem;
  margin: 0rem auto;
  color: #ffffff;
  background: rgba(185, 54, 71, 1);
  border-radius: 4px;
  line-height: 0.3rem;
  text-align: center;
  font-size: 0.16rem;
}
.vux-popup-dialog {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
