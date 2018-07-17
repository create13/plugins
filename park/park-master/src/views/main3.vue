<template>
  <div class="page-body">
    <x-header :left-options="{showBack: false}">
      {{info.departmentname}}
    </x-header>
    <div class="head">
      <flexbox>
        <flexbox-item class="dateLable">
          {{dateTimes}},{{info.partyBranch}}书记。
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item class="label">
          所属党委：
        </flexbox-item>
        <flexbox-item>
          {{info.departmentname}}

        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item class="label">
          所属片区：
        </flexbox-item>
        <flexbox-item>
          {{info.address}}

        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item class="label">
          党支部评级：
        </flexbox-item>
        <flexbox-item>
          {{info.honor}}
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item class="label">
          现有党员：
        </flexbox-item>
        <flexbox-item>
          <span class="number">{{info.people}}</span>
          人
        </flexbox-item>
      </flexbox>
      
        <div class="exit" @click="logoutManage">
            <span>退出登录</span>
        </div>
    </div>
    <div class="list">
      <h3>书记待办事宜</h3>
      <div v-if="todoList.length == 0">
        <img style="width:.9rem;height:1.2rem;margin-left:30%" src="@/assets/images/icon-noRecord.png" alt="">
        <p style="color:#ccc;margin-left:35%">暂无信息</p>
      </div>
      <div v-for="(item,index) in todoList" :key="index">
        <div class="item">
            <div class="title">{{index+1}}.
                <span v-if="item.type=='SCORE'">{{item.name}}积分加分确认</span>
                <span v-else-if="item.type=='ACTIVE'">
                   <router-link :to="{  name:'activePost', params:{ activeId:item.masId}}">{{item.title}}</router-link>
               </span>
            </div>
            <div class="content" >
                <div v-if="item.type=='SCORE'">
                    <button  v-if="item.beginYn=='Y'" @click="refer(item)">
                        去处理
                    </button>
                    <button  v-else-if="item.beginYn=='N'" @click="refer(item)">
                        去处理
                    </button>
                </div>
                <div v-if="item.type=='ACTIVE'">
                    <button  v-if="item.beginYn=='Y'" @click="refer(item)">
                        上传图片
                    </button>
                    <button  v-else-if="item.beginYn=='N'" @click="refer(item)">
                        活动二维码
                    </button>
                </div>
                <p v-show="index!==todoList.length-1"></p>
          </div>
        </div>
      </div>
    </div>
      <div v-transfer-dom  class="qrcode-dialog3">
          <x-dialog v-model="showQrcodeDialog" hide-on-blur :dialog-style="{height:'350px',minHeight:'350px'}">
               <div class="title">
                    <label>活动名称:</label>
                    <div class="activeTitle">{{activeTitle}}</div>
                </div>
                <div class="qrcode1">
                  <img id="fei" alt="">
                </div>
          </x-dialog>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from "axios";
import {
    XHeader,
    GroupTitle,
    Flexbox,
    Alert,
    FlexboxItem,
    XButton,
    DatetimePlugin,
    Datetime,
    Group,
    Picker,
    XDialog,
    TransferDomDirective as TransferDom,
    cookie
} from "vux";

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
        XDialog
    },
    data() {
        return {
            departmentid: this.$store.getters.user.departmentid,
            partyBranch: "",
            address: "",
            honor: "",
            people: "",
            todoList: [],
            activeTitle: "",
            info: [],
            dateTimes: "",
            departmentname:"",
            showQrcodeDialog: false
        };
    },
    methods: {
        refer(item) {
            if (item.type == "SCORE") {

                if(item.id===2 || item.id===4 || item.id===8){
                    this.$router.push({
                        path: "points/political/"+item.id
                    });
                }else{
                    this.$router.push({
                        path: "points/evaluation"
                    });
                }

            } else if (item.type == "ACTIVE") {
                if (item.beginYn == "Y") {
                    this.$router.push({
                        path: "active/partyBranch"
                    });
                } else {
                    this.activeTitle = item.name;
                    this.showQR(item.masId);
                }
            }
        },
        getDate() {
            let datime = new Date().getHours();
            if ((datime >= 5) && (datime < 8)) {
                this.dateTimes = "早上好";
            } else if ((datime >= 8) && (datime < 11)) {
                this.dateTimes = "上午好";
            } else if ((datime >= 11) && (datime < 13)) {
                this.dateTimes = "中午好";
            } else if ((datime >= 13) && (datime < 19)) {
                this.dateTimes = "下午好";
            } else {
                this.dateTimes = "晚上好";
            }
        },
        showQR(data) {
            document.getElementById("fei").src =
                "http://dj.dlbdata.cn/dangjian/active/showQrCode?activeId=" +
                data;
            this.showQrcodeDialog = true;
        },
        getDepartment() {
            axios({
                method: "get",
                url: "pdepartment/queryById",
                params: {
                    departmentid: this.departmentid
                }
            })
                .then(res => {
                    this.info = res.data;
                    this.partyBranch = res.data.partyBranch;
                    this.address = res.data.address;
                    this.honor = res.data.honor;
                    this.people = res.data.people;
                })
                .catch(function(error) {
                    console.log(error);
                });
            axios
                .get("pscoredetail/todoList", {
                    params: {
                        userId: this.$store.getters.user.userid
                    }
                })
                .then(res => {
                    this.todoList = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        ...mapActions(['logoutManage'])
    },
    beforeMount () {
        sessionStorage.userRoleId = 3;
    },
    mounted() {
        
        let datime = new Date().getHours();
        if ((datime >= 5) && (datime < 8)) {
            this.dateTime = '早上好';
        } else if ((datime >= 8) && (datime < 11)) {
            this.dateTime = '上午好';
        } else if ((datime >= 11) && (datime < 13)) {
            this.dateTime = '中午好';
        } else if ((datime >= 13) && (datime < 19)) {
            this.dateTime = '下午好';
        } else {
            this.dateTime = '晚上好';
        }
        this.getDepartment();
        this.getDate();
    },
};
</script>
<style lang="less">
.qrcode-dialog3 {
    .weui-dialog {
        padding: 20px;
        display: table;
        flex-direction: column;
        .title {
            text-align: left;
            word-break: break-all;
            label{
              color: #999;
            }
            .activeTitle {
                color: #000;
            }
        }
        .qrcode1 {
            flex: 1;
            img {
                margin-top: 10px;
                width: 100%;
            }
        }
    }
}
</style>

<style lang="less" scoped>
.page-body {
    background-color: #efefef;
    -webkit-overflow-scrolling: touch;
}

.head,
.list {
    background-color: #fff;
    line-height: 2;
    padding: 0.15rem;
}

.list {
    margin-top: 0.1rem;
    h3 {
        line-height: 1;
        margin-bottom: 0.08rem;
        margin-top: 0.08rem;
    }
    .item {
        /*margin-top: 0.1rem;*/
        padding: 0.05rem 0;
        border-top: 1px solid #eee;
        &:first-child {
            border-top: 0;
        }
    }
    .title {
        color: #666;
    }
    .title a {
        color: #666 !important;
    }
    .content {
        text-align: center;
    }
    a {
        color: #000;
    }
}

.number {
    color: #a0333b;
}
.vux-flexbox-item.label {
    flex: 0 0 auto;
    width: auto;
    color: #8b8b8b;
}
.vux-flexbox-item.dateLable {
    flex: 0 0 auto;
    width: auto;
}
button.weui-btn,
input.weui-btn {
    width: 32% !important;
}
.content button {
    padding: 4px 0.26rem;
    border: 0;
    background: #b93647;
    font-size: 0.16rem;
    color: #fff;
    margin: 0.2rem auto;
    border-radius: 4px;
}
.content p {
    width: 108%;
    height: 0.01rem;
    background-color: #efefef;
    margin-left: -4%;
}
.exit{
    display: inline-block;
    float: right;
    margin-top: -.3rem;
}
.exit span{
    display: inline-block;
    width: .6rem;
    font-size: .12rem;
    text-align: center;
    color: #BBBBBB;
    border: 1px solid #efefef;
    border-radius: 4px;
    background-color: #fcfcfc;
}
</style>
