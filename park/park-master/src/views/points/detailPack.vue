<template>
    <div class="page-body disabled-tabbar">
        <view-box ref="viewBox" body-padding-top=".46rem">
            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="bgColors"  body-padding-top=".46rem">
             {{contents.title}}
              <a slot="right" @click="showMenu">评分说明</a>
             </x-header>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">党员姓名:</span>
                <span class="numberz">{{content.partyname}}</span>
            </p>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">活动时间:</span>
                <span class="numberz1">{{content.starttime|formatDuring}}~{{content.endtime|formatDuring}}</span>
            </p>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">主要内容:</span>
            </p>
            <div class="artical">
                {{content.content}}
            </div>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">活动图集</span>
                <span class="numberz">{{ num}}张</span>
            </p>
            <div class="img-show">
                <img class="previewer-demo-img" v-for="(item,index) in content.picture" :key="index" :src="item.msrc" @click="show(index)">
                <div v-transfer-dom>
                    <previewer :list="content.picture || []" ref="previewer" :options="options" @on-index-change="logIndexChange">
                    </previewer>
                </div>
            </div>

            <table width="90%" style="margin:0.1rem auto;">
                <tr>
                    <td width="50%">
                        <button class="btnRed" v-if="content.status==0" @click="reject()">驳回</button>
                    </td>
                    <td width="50%">
                        <button class="btnRed" v-if="content.status==0" @click="pass()">通过</button>
                    </td>
                </tr>
            </table>
            <button class="btnRed" v-if="content.status==2">已评分 (评分人：{{content.branch}})</button>
            <button class="btnRed" v-if="content.status==3">审核已驳回 (审核人：{{content.branch}})</button>            
       <div v-transfer-dom>
				<popup v-model="showPop" position="left" width="100%">
				<div class="middle">
					<div class="middle-top">评分说明</div>
					<div class="middle-content">

						<p v-if="moduleid === '2'">
							党员自学或参加其他党组织组织的学习教育活动，经所属党支部书记确认后，每参加一次加2.5分（共5分）。
						</p>
                        <p v-else-if="moduleid === '4'">
                            党员在金领驿站参加政治活动，或“双报到”参加居民区党组织组织的党日活动，经所属党支部书记确认后，每次加2分（共10分）。
                        </p>
                        <p v-else-if="moduleid === '11'">
                            党员积极参加公益活动，每次加3分(最高不超过20分)。
                        </p>
                        <p v-else-if="moduleid === '8'">
                            党员积极参加公益活动，每次加3分(最高不超过10分)。
                        </p>
					</div>
					<div class="knowBtn" @click="know()">我知道了</div>
				</div>
				</popup>
			</div>
        </view-box>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import {ViewBox,TransferDom,Popup,Flexbox, FlexboxItem,XHeader,Previewer} from 'vux';
export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        Previewer,
        ViewBox,
        Popup,
    },
    filters: {
        formatDuring: function(value) {
            if (!value) {
                return '无';
            } else {
                Date.prototype.toLocaleString = function() {
                    let months = this.getMonth() + 1;
                    if (months < 10) {
                        months = '0' + months;
                    }
                    let dates = this.getDate();
                    if (dates < 10) {
                        dates = '0' + dates;
                    }
                    let hours = this.getHours();
                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    let minutes = this.getMinutes();
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    return this.getFullYear() + '.' + months + '.' + dates + ' ' + hours + ':' + minutes;
                };
                return new Date(value).toLocaleString();
            }
        }
    },
    methods: {
        cos(){
        console.log('1111');
        },
        show(index) {
            this.$refs.previewer.show(index);
        },
        reject(){
            axios.get('pstudy/reject', {
                    params: {
                        userid: this.user.userid,
                        studyid: this.$route.params.studyid
                    }
                })
                .then(res => {
                    if (res.success) {
                        this.$vux.alert.show({ title: res.msg,onHide(){
                                history.back(-1);
                            }});
                    } else {
                        this.$vux.alert.show({ title: res.msg });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        pass() {
            axios
                .get('pstudy/pass', {
                    params: {
                        userid: this.user.userid,
                        studyid: this.$route.params.studyid
                    }
                })
                .then(res => {
                    if (res.success) {
                        this.$vux.alert.show({ title: res.msg,onHide(){
                            history.back(-1);
                        }});
                    } else {
                        this.$vux.alert.show({ title: res.msg });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        spread() {
            this.spr = true;
            this.btnAn = !this.btnAn;
            this.btnPack = !this.btnPack;
        },
        folding() {
            this.spr = !this.spr;
            this.btnAn = !this.btnAn;
            this.btnPack = !this.btnPack;
        },
        noSpread() {
            this.noSpr = true;
            this.nobtnAn = !this.nobtnAn;
            this.nobtnPack = !this.nobtnPack;
        },
        noFolding() {
            this.noSpr = !this.noSpr;
            this.nobtnAn = !this.nobtnAn;
            this.nobtnPack = !this.nobtnPack;
        },
        logIndexChange(arg) {
            console.log(arg);
        },
        getDetail() {
            this.$http
                .get('pstudy/queryById?studyid=' + this.$route.params.studyid)
                .then(res => {
                    this.content = res.data;
                    this.content.picture = [];

                    this.num = res.data.pictures.length;
                    this.content.pictures.forEach(it => {
                        console.log(it);
                        var obj = {};
                        obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + it.pictureId;
                        obj.src = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + it.pictureId;
                        this.content.picture.push(obj);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getModule() {
            this.$http
                .get('pscoredetail/queryById?id=' + this.$route.params.moduleid)
                .then(res => {
                    this.contents.title = res.data.projectName+'评分';
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getDetail() {
            this.$http
                .get('pstudy/queryById?studyid=' + this.$route.params.studyid)
                .then(res => {
                    this.content = res.data;
                    this.content.picture = [];
                    this.num = res.data.pictures.length;
                    this.content.pictures.forEach(it => {
                        var obj = {};
                        obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + it.pictureId;
                        obj.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + it.pictureId;
                        this.content.picture.push(obj);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        dataPick(s) {
            Date.prototype.toLocaleString = function() {
                return this.getFullYear() + '年' + (this.getMonth() + 1) + '月' + this.getDate() + '日';
            };
            return new Date(s).toLocaleString();
        },
        showMenu(){
               this.showPop = true;
            },
         know(){
             this.showPop = false;
        },
         getmoduleid(){
                this.moduleid=this.$route.params.moduleid

            },
        },
       
         mounted() {
        this.getDetail();
        this.getModule();
        this.getmoduleid();
    },
        computed: {
        ...mapGetters(['user'])
    },
    data() {
        return {
            moduleid:'',
            contents:{title:''},
            num: 0,
            activeData: {},
            picInfo: [],
            list: [],
            content: {},
            spr: false,
            noSpr: false,
            nobtnPack: false,
            nobtnAn: false,
            btnPack: false,
            btnAn: false,
            peopleNum: null,
            participants: null,
            Noparticipants: null,
            showPop:false,
            options: {
                getThumbBoundsFn(index) {
                    // find thumbnail element
                    let thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
                    // get window scroll Y
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                    // optionally get horizontal scroll
                    // get position of element relative to viewport
                    let rect = thumbnail.getBoundingClientRect();
                    // w = width
                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                    // Good guide on how to get element coordinates:
                    // http://javascript.info/tutorial/coordinates
                }
            }
        };
    },
};
</script>
<style scoped>
html,
body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
.page-body {
    display: flex;
    flex-direction: column;
}
.artical {
    width: 84%;
    height: auto;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    color: rgba(102, 102, 102, 1);
    line-height: 0.24rem;
    margin: 0.2rem 8% 0 8%;
    text-indent: 2em;
}
.artical p {
    margin-bottom: 0.1rem;
}
.allPic .bg-line {
    width: 0.03rem;
    height: 0.14rem;
    margin-left: 5%;
    background: url(../../assets/images/icon-rectangle1.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    float: left;
    margin-top: 0.06rem;
}
.picture {
    font-size: 0.14rem;
    font-family: PingFangSC-Semibold;
    color: rgba(51, 51, 51, 1);
    /* margin-left: 0.05rem; */
    display: block;
    float: left;
}

.numberz{
	font-size:.14rem;
	font-family:PingFangSC-Medium;
	color:rgba(153,153,153,1);
	display:block;
	float: left;
	margin-left:.1rem;
}

.numberz1 {
    font-size: 0.14rem;
    font-family: PingFangSC-Medium;
    color: rgba(153, 153, 153, 1);
    margin-left: 0.1rem;
}
.allPic {
    height: 0.3rem;
    line-height: 0.3rem;
    overflow: hidden;
    margin-top: 0.2rem;
}
.img-show {
    width: 84%;
    height: auto;
    margin-left: 8%;
}
.img-show img {
    width: .9rem;
    height: .9rem;
    margin-top: 0.1rem;
}
.img-show img:not(:first-child) {
    margin-left: 2%;
}
.img-left {
    width: 0.37rem;
    height: 0.37rem;
    position: absolute;
    left: 0.1rem;
    top: 3.15rem;
    z-index: 900;
}
.img-right {
    width: 0.37rem;
    height: 0.37rem;
    position: absolute;
    right: 0.1rem;
    top: 3.15rem;
    z-index: 900;
}
.color-num {
    color: rgba(185, 54, 71, 1);
}
.line-pic {
    width: 87.2%;
    margin: 0.1rem 4.8% 0.2rem 8%;
    height: 0.36rem;
    overflow: hidden;
}
.line-pic img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.07rem;
    display: block;
    float: left;
}
.wz-fonts {
    font-family: PingFangSC-Medium;
    color: rgba(153, 153, 153, 1);
    line-height: 0.24rem;
    width: 87.2%;
    margin: 10px auto;
    word-spacing: 0.24rem;
    height: 44px;
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    white-space: pre-wrap;
}
.wz-fonts.auto {
    height: auto;
    overflow: auto;
}
.wz-fonts span {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    line-height: 22px;
    vertical-align: top;
}
.no-picture {
    width: 1.1rem;
    font-size: 0.2rem;
    font-family: PingFangSC-Semibold;
    color: rgba(51, 51, 51, 1);
    display: block;
    float: left;
    margin-left: 0.1rem;
}
.btnMore {
    width: 1.6rem;
    height: 0.3rem;
    border-radius: 15px;
    margin: 0.2rem auto;
    font-size: 0.1rem;
    font-family: PingFangSC-Medium;
    color: rgba(204, 204, 204, 1);
    border: 1px solid #e4e4e4;
    line-height: 0.3rem;
    text-align: center;
}
.down {
    width: 0.1rem;
    height: 0.1rem;
    display: inline-block;
    background: url(../../assets/images/icon-down.png) no-repeat;
    background-size: 100% 100%;
    margin-left: 0.05rem;
}
.up {
    width: 0.1rem;
    height: 0.1rem;
    display:block;
    background: url(../../assets/images/icon-up.png) no-repeat;
    background-size: 100% 100%;
    float: right;
    margin-right: 0.2rem;
    margin-top: 0.1rem;
}
.btnRed {
    width: 89.4%;
    height: 0.4rem;
    background: rgba(185, 54, 71, 1);
    border-radius: 4px;
    font-size: 0.16rem;
    font-family: PingFangSC-Medium;
    color: rgba(255, 255, 255, 1);
    line-height: 0.4rem;
    text-align: center;
    position: relative;
    left: 5.3%;
    border: 0;
    top: 0.24rem;
}
.grayBtn {
    background: rgba(216, 216, 216, 1);
}
.middle .middle-top{width:100%;height:.4rem; background:linear-gradient(90deg,rgba(185,54,71,1),rgba(155,10,26,1));box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);font-size:.16rem;color:#FFFFFF;text-align:center;line-height:.4rem;border-radius:10px 10px 0 0;}
.middle{width:2.8rem;height:2.02rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:21%;overflow:hidden;}
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0.2);}
.middle-content p{font-size:.14rem;color:#828282;line-height:.24rem;}
.middle-content{width:2.4rem;height:0.8rem;margin:.21rem .19rem .21rem .21rem;}
</style>
