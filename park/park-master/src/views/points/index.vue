<template>
    <div class="page-body">
        <x-header :left-options="{showBack: false}">
            党员积分信息
            <router-link slot="right" to="points/detail">评分说明</router-link>
        </x-header>
        <div class="box">
            <div class="head">
                <flexbox>
                    <flexbox-item class="avatar">
                        <img :src="picAccept">
                    </flexbox-item>
                    <flexbox-item>
                        <div class="label">积分周期：</div>
                        <div>2018年1月1日 - 12月31日</div>
                    </flexbox-item>
                </flexbox>
                <flexbox :gutter="15">
                    <flexbox-item>
                        <div class="piece left">
                            <div>现党员积分</div>
                            <span>{{itegral || 0.0}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="margin-right:5px;">
                        <div class="piece right">
                            <div>年度党员评级</div>
                            <span>{{results}}</span>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="body">
                <tab v-model="tabIndex" :line-width="5" active-color="#666" bar-active-color="#a0333b" custom-bar-width="1rem">
                    <tab-item>
                        <b>积分进度</b>
                    </tab-item>
                    <tab-item>
                        <b>获取明细</b>
                    </tab-item>
                </tab>
                <transition name="fade">
                    <div class="tab-content" v-if="tabIndex===0">
                        <div class="item-detail" v-for="(progres,index) in proTotal" :key="index">
	                            <div class="title cl">
	                                <b>{{index+1}}. {{progres.projectName}}</b>
	                                <div class="space"></div>
	                                <span class="number">{{progres.totalScore}}</span> /{{progres.score}}
                                    <span class="fr" v-if="progres.info&&progres.info.length!=0" @click="moreInfo(progres)">
                                        审批进度 <span class="icon-arrows"></span>
                                    </span>
	                            </div>
	                            <div class="content progress">
	                                <x-progress :percent="progres.totalScore/progres.score*100" :show-cancel="false"></x-progress>
	                            </div>
	                            <router-link :to="{name:'Dues'}" v-if="progres.id === 7">
	                            <div class="content">
	                                <x-button mini type="warn" v-if="projectList[progres.id]">
	                                   获取积分
	                                </x-button>
	                            </div>
	                            </router-link>

                                <div class="content"  v-else-if="projectList[progres.id]">
                                    <router-link :to="'points/addPoint/'+progres.id+'/'+ projectList[progres.id].id " v-show="progres.totalScore != progres.score">
                                    <x-button mini type="warn">
                                       获取积分
                                    </x-button>
                                    </router-link>
                                    <x-button mini type="warn" v-show="progres.totalScore == progres.score" @click.native="changeTable">
                                        点击记录
                                    </x-button>
                                </div>

                        </div>
                    </div>
                    <div class="tab-content" v-if="tabIndex===1">
                        <div class="item-detail" v-for="(knoew,index) in getList" :key="index">
                            <flexbox>
                                <flexbox-item class="label">
                                    获取时间：
                                </flexbox-item>
                                <flexbox-item>
                                   {{knoew.scoreTime | date}}
                                </flexbox-item>
                            </flexbox>
                            <flexbox>
                                <flexbox-item class="label">
                                    积分类型：
                                </flexbox-item>
                                <flexbox-item>
                                   {{knoew.detailTitle}}
                                </flexbox-item>
                            </flexbox>
                            <flexbox v-if="knoew.recordType == 1">
                                <flexbox-item class="label">
                                    活动名称：
                                </flexbox-item>
                                <flexbox-item>
                                    {{knoew.recordDesc}}
                                </flexbox-item>
                            </flexbox>
                            <flexbox v-if="knoew.approvedName">
                                <flexbox-item class="label">
                                    审核人：
                                </flexbox-item>
                                <flexbox-item>
                                    {{knoew.approvedName}}
                                </flexbox-item>
                            </flexbox>
                            <flexbox v-if="!knoew.approvedName">
                                <flexbox-item class="label">
                                    加分人：
                                </flexbox-item>
                                <flexbox-item>
                                    {{knoew.adderName||'系统自动'}}
                                </flexbox-item>
                            </flexbox>
                            <flexbox>
                                <flexbox-item class="label">
                                    积分变动：
                                </flexbox-item>
                                <flexbox-item>
                                    <span class="number" :class="[knoew.score >= 0?'colored':'colorGreen']">{{knoew.score|Upper}}</span>
                                </flexbox-item>
                            </flexbox>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <!--弹出框-->
        <div  id="showBox" v-if="darkbgShow">
            <div class="swiper-all xs-container">
                <ul class="cl swiper-box xs-content" id="xsContent" v-bind:style="{ width: ((myWidth+20)*infoList.length) +'px'}">
                    <li class="swiper-one xs-row" v-for="(item,i) in infoList" v-bind:style="{ width:myWidth +'px' }" :key="i">
                            <div class="swiper-one-inner">
                            <div class="states" v-if="item.status==0">
                                待审核
                            </div>
                            <div class="states" v-if="item.status==2">
                                已通过
                            </div>
                            
                         	<div class="btn-return" v-if="item.status==3" @click="reSubmit(item)">
                            	重新提交
                            </div>
                            <div class="states" v-if="item.status==3">
                                已拒绝
                            </div>
                            <h4 class="sinfo-title pr4"><b class="sinfo-border"></b><span>审批人：</span><span class="text-gray">{{item.branch}}</span></h4>
                            <h4 class="sinfo-title"><b class="sinfo-border"></b><span>开始时间：</span><span class="text-gray">{{item.starttime|formatDuring}}</span></h4>
                            <h4 class="sinfo-title"><b class="sinfo-border"></b><span>结束时间：</span><span class="text-gray">{{item.endtime|formatDuring}}</span></h4>
                            <h4 class="sinfo-title"><b class="sinfo-border"></b><span>主要内容：</span></h4>
                            <div class="text-gray-box">
                                {{item.content}}
                            </div>
                            <h4 class="sinfo-title" >
                                <b class="sinfo-border"></b><span>{{name}}：</span>
                                <span class="text-gray">{{item.pictures.length}}</span>
                            </h4>
                            <div class="show-list cl">
                                <dl>
                                    <dd v-for="(it,index) in item.pictures" :key="index">
                                        <div class="preview">
                                             <img class="previewer-demo-img"  :src="'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId='+it.pictureId" >
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="width:316.8px;">
                <div class="bg-cross" @click =closeBg()></div>
            </div>

        </div>

        <div class="bg-dark" v-if="darkbgShow"></div>
    </div>
</template>


<script>
import { mapActions } from 'vuex';
import { XHeader, Flexbox, FlexboxItem, Tab, TabItem, XProgress, XButton,cookie} from 'vux';
import XScroll from 'vux-xscroll/build/cmd/xscroll.js';
import Snap from 'vux-xscroll/build/cmd/plugins/snap.js';
import axios from 'axios';
export default {
    components: { XHeader, Flexbox, FlexboxItem, Tab, TabItem, XProgress, XButton, XScroll,Snap},
    data() {
        return {
            userAbout: {},
            tabIndex: 0,
            percent:0,
            collect:[],
            years:new Date().getFullYear(),
            proTotal:[],
            projectList:{},
            getList:[],
            rate:[],
            imgpics:[],
            itegral:'',
            results:'',
            infoList:[{}],
            darkbgShow:false,
            myWidth: 0.88*document.documentElement.clientWidth,
            userId : cookie.get('userId')
        };
    },
    filters: {
        formatDuring: function (value) {
            if(value == "" || value == null || value == undefined){
                var value="无";
                return value
            }else {
                Date.prototype.toLocaleString = function(){
                    let months = this.getMonth()+1;
                    if(months < 10){
                        months = '0' + months;
                    }
                    let dates = this.getDate();
                    if(dates < 10){
                        dates = '0' + dates;
                    }
                    let hours = this.getHours();
                    if(hours < 10){
                        hours = '0' + hours;
                    }
                    let minutes = this.getMinutes();
                    if(minutes < 10){
                        minutes = '0' + minutes;
                    }
                    return this.getFullYear() +'.'+months+'.'+dates+' '+hours+':'+minutes
                };
                return new Date(value).toLocaleString();
            }
        },
        date (val) {
            let times = new Date(val);
            let month = times.getMonth()+1;
            if(month <10){
                month = '0' + month; 
            }
            let datas = times.getDate();
            if(datas <10){
                datas = '0' + datas;
            }
            let hours = times.getHours();
            if(hours <10){
                hours = '0' + hours;
            }
            let minutes = times.getMinutes();
            if(minutes < 10){
                minutes = '0' + minutes;
            }
    		return `${times.getFullYear()}.${month}.${datas}  ${hours}.${minutes}`;
        },

        Upper: function (value) {
             return value> 0 ? '+' + value : value;
        }
    },
    methods:{
    	link(){
	    	this.$router.push({
	            path: '/points/addPoint1/:id',
	            name: 'addPoint1',
	            params: {
	                id:2,
	            }
	        })
    	},
    	progress(){
    		axios.get('pscoreparty/getProjectScoreByUserId',{
    			params:{
    				userId:this.userId,
    				year:this.years
    			}
    		}).then( res => {
                this.proTotal = res.data;
    		}).catch(err => {
    			console.log('fail'+err);
    		})
        },
        plus(score){
            if(score > 0){
                return '+'+score+'分';
            }else{
              return score+'分';
            }
        },
    	project(){
    		axios.get('pscoredetail/queryByRoleMenu',{
    			params:{
    				roleid:4,
    			}
    		}).then( res => {
    			let data = res.data;
    			let obj = {};
    			for(var i=0;i<data.length;i++){
    				obj[data[i].projectId] = data[i];
    				this.projectId = obj[data[i].projectId]
    			}
    			this.projectList  = obj;
    		}).catch(err => {
    			console.log('fail'+err);
    		})

    	},
    	getDetail(){
    		axios.get('pscoreparty/queryByUserId',{
    			params:{
    				userid:this.userId,
    				year:this.years
    			}
    		}).then( res => {
    			this.getList = res.data;
    		}).catch(err => {
    			console.log('fail'+err);
    		})

    	},
    	rating(){
            this.results ='暂无';
    	},
        moreInfo(itemList){
            // console.log(itemList);

            this.darkbgShow = true;
            this.infoList = itemList.info;
            this.name = itemList.projectName;
            // console.log(this.infoList);
            if (itemList) {
                var imgs=itemList;

               /* for(var i in imgs){

                    for (var j in imgs[i]) {
                        var obj = {};

                        obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + imgs[i][j];
                        obj.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + imgs[i][j];
                        this.imgpics.push(obj);
                    }
                }*/
               /* console.log(obj);
                let data = res.data;
                let obj = {};
                for(var i=0;i<data.length;i++){
                    obj[data[i].projectId] = data[i];
                    this.projectId = obj[data[i].projectId]
                }
                this.projectList  = obj;
*/
              /*  var imgs = itemList.pictures.split(",");
                this.imgpics = [];
                for (var i = 0; i < imgs.length; i++) {
                    var obj = {};
                    obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + imgs[i];
                    obj.src = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + imgs[i];
                    this.imgpics.push(obj);
                }*/
            } else {
                this.imgpics = [];
            }

            /*样式渲染*/
            setTimeout(function () {
                var xscroll = new XScroll({
                    renderTo: "#showBox",
                    preventDefault:false,
                    preventTouchMove:false,
                    touchAction:'pan-y'
                });

                xscroll.on('panstart',function(e){
                    console.log(e);
                });
                xscroll.on('panend',function(e){
                    xscroll._resetLockConfig();
                });
                xscroll.render();
            },1000)


        },
        closeBg(){
            this.darkbgShow = false;
        },
    	score(){
    		axios.get('pscoreparty/getSumScoreByUserId',{
    			params:{
    				userId:this.userId,
					year:new Date().getFullYear()
    			}
    		})
    		.then( res => {
    			this.itegral = res.data;
    		}).catch(err => {
    			console.log('fail'+err);
    		})

    	},
    	dataPickers(dates){
    		let times = new Date(dates).toLocaleString();
         	Date.prototype.toLocaleString = function() {
          		return this.getFullYear() + "年" + (this.getMonth()+1) + "月" + this.getDate() + "日 "
    		};
    		return times;
    	},
    	reSubmit(item){
    		this.setInfo(item);
    		this.$router.push(`points/addPoint1/${item.projectid}/${item.moduleid}/${item.studyid}`);
        },
        changeTable()
        {
            this.tabIndex = 1;
        },
        userName() {
            axios.get('ppartymember/queryByUserId', {
                params: {
                    userid: this.userId
                }
            })
            .then(res => {
                this.userAbout = res.data;
            })
            .catch(err => {
                console.log(err);
            });
        },
    	...mapActions(['setInfo'])
    },
    computed: {
        picAccept () {
            return this.userAbout.avatar;
        }
    },
   	mounted(){
   		this.progress();
   		this.project();
   		this.getDetail();
   		this.rating();
        this.score();
        this.userName();
    }
};
</script>

<style lang="less" scoped>
vux-tab-bar-inner{
    width:0.6rem!important;
}
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
  border:1px solid red;
  z-index:999;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.states{
    text-align: center;
    border-radius: 4px;
    border: 0.5px solid #B93647;
    position: absolute;
    right: .2rem;
    z-index: 999;
    top: .2rem;
    font-size: .14rem;
    color: #B93647;
    width:.46rem;
}
.reject{
    width:0.52rem!important;
}
.btn-return{
    position: absolute;
    right: .2rem;
    top: .6rem;
    z-index: 999;
    width:.74rem!important;
    border-radius: 4px;
    border: 0.5px solid #B93647;
    font-size: .14rem;
    line-height:.23rem;
    text-align: center;
    background-color:#B93647;
    color: #fff;
}
ol,ul,li{
    list-style:none;
}
.bg-dark{position:fixed;left:0;top:0;width:100%;height:100%;z-index:998;opacity:0.3;background-color:#000;filter:alpha(opacity=30)}
.bg-cross{
    width: .4rem;height: .4rem;right: 0;display: inline-block;margin-top:0.3rem;margin-bottom:0;margin-left:0.5rem;

background-image:url(../../assets/images/icon-del.png);background-size:contain;background-repeat:no-repeat;background-position:50% 50%;
}
#showBox{
    position: absolute;
    left:5%;
    top:20%;
    right:0;
    z-index: 1001;
    text-align: center;
}
.swiper-box{
    position: relative;
    z-index: 10001;
    text-align: left;
}
.swiper-one{
    float: left;
    border-radius: 10px;
    background: #fff;
    max-height: 4.0rem;
    margin-right: .1rem;
}
.swiper-one-inner{
    padding:.3rem .2rem .15rem;
    position: relative;
}
.sinfo-title{
    height: .16rem;
    line-height: .16rem;
    font-size: 0;
    margin-bottom: .1rem;
    vertical-align: top;
    overflow: hidden;
    text-overflow:ellipsis ;
}
.sinfo-title.pr4{
    padding-right:1rem;
    padding-top:0.1rem;
}
.sinfo-title span{
    vertical-align: text-bottom;
    font-size:.14rem;
    padding:0;
    height: .14rem;
    font-weight: normal;
    display: inline-block;
}
// .sinfo-title span.vb{
//     vertical-align:top;
// }
.sinfo-title .text-gray{
    color:#999;
    vertical-align: text-bottom;
}
.sinfo-border{
    width: 3px;
    height:.14rem;;
    background: #b93647;
    border-radius: 40px;
    display: inline-block;
    vertical-align: top;
    margin-right: .1rem;
}
.text-gray-box{
    margin-bottom:.16rem;
    line-height: 1.6;
    color:#999;
    font-size: .14rem;
    word-break: break-all;
    word-wrap: break-word;
}
.show-list{padding:0;}
.show-list.border0{border-bottom:0;padding-bottom: 0;}
.show-list dl{ font-size: 0;
    list-style: none;
    height: 0.6rem;
    overflow: hidden;}
.show-list dl dd{font-size:0;display:inline-block;margin-right:.1rem;position:relative;vertical-align:top;
    width:.6rem;height:.6rem;overflow:hidden;margin-bottom:.2rem;}
.show-list dl dd:first-child{margin-left:0;}
.show-list .operate{display:none;background:rgba(33,33,33,.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#b2404040, endColorstr=#b2404040);z-index:5;position:absolute;bottom:0;left:0;right:0;height:12px;padding-bottom:7px;font-size:12px;color:#fff;text-align: center}
.show-list .info{line-height:.6rem;text-align:center}
.show-list .preview{width:0.6rem;height:.6rem;z-index:4;line-height:.6rem;font-family:arial;background-color:#fff;
    background-repeat:no-repeat;position:absolute;bottom:0;left:0;text-align:center;right:0;cursor: pointer;border:1px solid #fff;box-sizing: border-box;}
.show-list .preview img{max-height:.6rem;max-width:.6rem;vertical-align:middle;}
.page-body {
    display: flex;
    flex-direction: column;
    background-color: #efefef;
}
.fr{
    float:right;
    margin-right: 20px;
    color:#ea8031;
    font-size:.12rem;
}
.icon-arrows{
    width: .05rem;
    height: .1rem;
    margin-left:.06rem;
    display: inline-block;
    background: url(../../assets/images/icon-arrows.png) no-repeat;
    background-size:100% 100%;
}
.box {
    flex: 1;
    overflow-y: auto;
}
.head{
    background-color: #fff;
     line-height: 2;
    padding: 0.1rem;
}
.body{
	 background-color: #fff;
     line-height: 2;
}
.head {
    .label {
        font-size: 0.14rem;
        color: #999;
    }
}
.body {
    flex: 1;
    margin-top: 0.15rem;
}
.vux-flexbox-item.avatar {
    display: flex;
    align-items: stretch;

    justify-content: center;
    flex: 0 0 auto;
    width: 1rem;
    min-height: 0.7rem;
    img {
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.05rem;
        border-radius: 50%;
        box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.15);
        background-color: rgba(0, 0, 0, 0.03);
    }
}
.vux-flexbox-item.label {
    flex: 0 0 auto;
    width: 0.8rem;
    color: #999;
}
.piece {
    margin-top: 0.1rem;
    padding: 0.15rem;
    border-radius: 5px;
    background-color: rgba(246,246,246,1);
    text-align: center;
    width:85%;
    height:0.6rem;
    span {
        font-size: 0.24rem;
        color: #ea8031;
        padding-left:-0.8rem;
        position: relative!important;
    right: 0!important;
    bottom: 0.1rem!important;
    }
}
.item-detail {
    margin-top: 0.05rem;
    padding: 0.15rem 0.1rem;
    border-top: 1px solid #eee;
    &:first-child {
        border-top: 0;
    }
    .title {
        color: #666;
    }
    .content {
       margin: .15rem 0 ;
        text-align: center;
        width:89.3%;
    }
    .space {
        display: inline-block;
    }
}
</style>
<style scoped>
.vux-tab .vux-tab-item{
	color:#999!important;
}
.vux-tab .vux-tab-selected{
	color: #333!important;
}
.number{
	color: #B93647;
}
.weui-btn_warn{
	background-color:#B93647;
}
.vux-tab-warp>>>.vux-tab-bar-inner {
    border-radius: 5px;
}
.vux-tab-warp>>>.vux-tab .vux-tab-item {
    background: transparent;
    font-size: 0.18rem;
}
.weui-progress>>>.weui-progress__bar {
    height: 0.15rem;
    border-radius: 0.2rem;
}
.weui-progress>>>.weui-progress__inner-bar {
    border-radius: 0.2rem;
    background-color: #ea8031;
}
.colorGreen{color:rgba(24,193,25,1);}
.colored{color:rgba(185,54,71,1);}
.cl {
    *zoom: 1
}

.cl:after {
    clear: both;
    content: '\20';
    display: block;
    height: 0;
    visibility: hidden
}
button.weui-btn_inline, input.weui-btn_inline, button.weui-btn_mini, input.weui-btn_mini{
    width:auto!important;
    margin-left:0.4rem;
    margin-top:0.1rem;
}
.progress{
    margin-left:0.2rem!important;
}
</style>