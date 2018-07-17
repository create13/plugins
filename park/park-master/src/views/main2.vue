<template>
  <div class="page-body">
    <x-header :left-options="{showBack: false}">
      上海中心片区
    </x-header>
        <div class="box">
            <div class="head">
              <flexbox>
                <!-- <flexbox-item class="dateLable"> -->
                  <!-- {{dateTimes}}, -->
                <!-- </flexbox-item> -->
                <flexbox-item>
                  {{dateTime}}，{{headName.name}}书记
                </flexbox-item>
              </flexbox>
              <!-- <flexbox>
                    <flexbox-item class="label">
                        片区负责人：
                    </flexbox-item>
                    <flexbox-item>
                        {{headName.name}}
                    </flexbox-item>
                </flexbox> -->
                <flexbox>
                    <flexbox-item class="label">
                        现有党支部：
                    </flexbox-item>
                    <flexbox-item>
                      <span class="number">{{headName.branchSum}}</span> 个
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item class="label">
                        所属党委：
                    </flexbox-item>
                    <flexbox-item>
                        陆家嘴中心
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item class="label">
                        现有党员：
                    </flexbox-item>
                    <flexbox-item>
                        <span class="number">{{headName.peopleSum}}</span>
                        人
                    </flexbox-item>
                </flexbox>
              <div class="exit" @click="logoutManage">
                  <span>退出登录</span>
              </div>
            </div>
      <div class="list">
        <h3>书记待办事宜 <span style="color:#b93647;font-size:.16rem;"> ({{total}})</span></h3>
        <div v-for="(item,index) in todoList" :key="index">
          <div class="item">
           <div class="title">{{index+1}}.
               <span v-if="item.type=='SCORE'">{{item.title}}积分加分确认</span>
               <span v-if="item.type=='GRAND'">{{item.title}}积分加分确认</span>
               <span v-else-if="item.type=='ACTIVE'">
                   <router-link :to="{  name:'activePost', params:{ activeId:item.masId}}">{{item.title}}</router-link>
               </span>
              </div>
            <div class="content">
                <div v-if="item.type=='SCORE'">
                    <button  @click="refer(item)">
                        去处理
                    </button>
                </div>
                <div v-if="item.type=='GRAND'">
                    <button  @click="refer(item)">
                        去评分
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
    </div>


     <div v-transfer-dom class="qrcode-dialog2">
         <x-dialog v-model="showQrcodeDialog" hide-on-blur :dialog-style="{minHeight:'350px'}">
               <div class="title">
                    <label>活动名称:</label>
                    <div class="activeTitle">{{activeTitle}}</div>
                </div>
                <div class="qrcode">
                  <img id="fei" alt="">
                </div>
          </x-dialog>
      </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import axios from 'axios';
  import { XHeader, GroupTitle, Flexbox, Alert, FlexboxItem, XButton,DatetimePlugin,Datetime ,Group,Picker ,XDialog, TransferDomDirective as TransferDom ,cookie } from 'vux';

  export default {
      directives: {
          TransferDom
      },
    data() {
      return {
        users: [{id: 1, fonts: '年度积分', integral: 0}, {id: 2, fonts: '活动次数', integral: 0}],
        userAbout: {},
        dateTime: '',
        charts: '',
        partAbout: {},
        todoList: [],
        total : 0,
        dateTimes: "",
        headName:{},
        activeTitle:"",
        showQrcodeDialog: false
      };
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
    beforeMount () {
      sessionStorage.userRoleId = 2;
    },
    mounted() {
      let datime = new Date().getHours();
      if (datime >= 5 && datime < 8) {
        this.dateTime = '早上好';
      } else if (datime >= 8 && datime < 11) {
        this.dateTime = '上午好';
      } else if (datime >= 11 && datime < 13) {
        this.dateTime = '中午好';
      } else if (datime >= 13 && datime < 19) {
        this.dateTime = '下午好';
      } else {
        this.dateTime = '晚上好';
      }
      this.getHead();
      this.getHeader();
      this.$nextTick(function () {
        //this.drawAxis('echartShow');
      });
      this.userName();
      this.infoDetail();
      /*this.getUserByScoreInfo();
      this.getUserByActiveInfo();
      this.getScoreByType();*/
    },
    methods: {
      refer(item){

          if(item.type == 'GRAND'){
              this.$router.push({
                  path:'points/review'
              })
          }else if(item.type == 'ACTIVE'){if(item.beginYn=='Y'){
              this.$router.push({
                  path:'active/partyBranch1'
              })}else{ this.activeTitle = item.name;
                  this.showQR(item.masId);}
          }
      },
      showQR(data){
          document.getElementById('fei').src = 'http://dj.dlbdata.cn/dangjian/active/showQrCode?activeId='+data;
          this.showQrcodeDialog = true;
      },
      infoDetail() {
        axios
          .get('/dangjian/pdepartment/queryById', {
            params: {
              departmentid: this.$store.getters.user.departmentid
            }
          })
          .then(res => {
            this.partAbout = res.data;
          })
          .catch(err => {
            console.log(err);
          });
        axios
          .get('/dangjian/pscoredetail/todoList', {
            params: {
              userId: this.$store.getters.user.userid
            }
          })
          .then(res => {
            this.todoList = res.data;
            console.log(this.todoList);
          })
          .catch(err => {
            console.log(err);
          });
      },
      userName() {
        axios
          .get('/dangjian/ppartymember/queryByUserId', {
            params: {
              userid: this.$store.getters.user.userid
            }
          })
          .then(res => {
            this.userAbout = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      getHead(){
        this.$http.get('ppartymember/queryByRoleId',{
            params:{
                roleid:this.$store.getters.user.roleid
            }
        }).then(res => {
            this.headName = JSON.parse(res.data);
            console.log(this.headName);
        }).
        catch(err =>{
            console.log('fail'+err);
        })
      },
      getHeader(){
        this.$http.get('pscoredetail/todoListCount',{
            params:{
                userId: this.$store.getters.user.userid
            }
        }).then(res => {
            // this.headName = JSON.parse(res.data);
            console.log(res);
            this.total = res.data;
        }).
        catch(err =>{
            console.log('fail'+err);
        })
      },
      ...mapActions(['logoutManage'])
    }
  };
</script>
<style lang="less">

.vux-flexbox-item.dateLable {
    flex: 0 0 auto;
    width: auto;
}
.qrcode-dialog2 {
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
        .qrcode {
            flex: 1;
            img {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>
<style lang="less" scoped>
  .page-body {
    display: flex;
    flex-direction: column;
    background-color: #efefef;
    -webkit-overflow-scrolling: touch;
  }

  .box {
    flex: 1;
    overflow-y: auto;
  }

  .head {
    background-color: #fff;
    line-height: 2;
    padding: 0.1rem 0.2rem;
  }

  .list {
      background-color: #fff;
      -webkit-overflow-scrolling: touch;
    margin-top: 0.07rem;
     padding: 0.2rem 0.2rem;
    h3 {
      line-height: 1;
    }
    a{
      color:#000;
    }
    .item {
      margin-top: 0.1rem;
      border-top: 1px solid #eee;
      &:first-child {
        border-top: 0;
      }
    }
    .title {
      color: #666;
    }
    .title a{
        color: #666!important;
    }
    .content {
      text-align: center;
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
  .content button{
      padding: 4px 0.26rem;
      border: 0;
      background: #b93647;
      font-size: 0.16rem;
      color: #fff;
      margin: 0.2rem auto;
      border-radius: 4px;
  }

  .content p{
      width: 108%;
      height: .01rem;
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
