<template>
    <div class="page-body">
        <x-header>思想汇报评分<a slot="right" @click="showMenu">评分说明</a></x-header>
        <view-box ref="viewBox" body-padding-top=".2rem">
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">党员姓名:</span>
                <span class="numberz">{{name}}</span>
            </p>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">时间:</span>
                <span class="numberz1">{{scoreTime|formatDuring}}</span>
            </p>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">汇报类型:</span>
                <span class="numberz1">{{list1Selected.text}}</span>
            </p>

            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">思想汇报主要内容:</span>
            </p>
            <div class="artical">
                {{content1}}
            </div>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">思想汇报图片</span>
                <span class="numberz">{{ imgpics.length}}张</span>
            </p>
            <div class="img-show">
                <img class="previewer-demo-img" v-for="(item,index) in imgpics" :key="index" :src="item.msrc" @click="show(index)">
                <div v-transfer-dom>
                    <previewer :list="imgpics" ref="previewer" :options="options" @on-index-change="logIndexChange">
                    </previewer>
                </div>
            </div>
            <x-button type="primary" style="background-color: #D8D8D8;width: 90%!important;margin-top: 1.5rem">已评分（评分人:{{adderName}}）</x-button>
                <div v-transfer-dom>
                    <popup v-model="showPop" position="left" width="100%">
                        <div class="middle">
                            <div class="middle-top">评分说明</div>
                            <div class="middle-content">
                                <p>
                                    1、党员每上半年口头向支部书记汇报一次，经支部书记审核通过后加5分； 2、党员每下半年书面向支部汇报一次，经支部书记审核通过后加5分。
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
import axios from 'axios';
import { mapGetters } from 'vuex';
import { Previewer, TransferDom, ViewBox, XHeader, XButton } from 'vux';
export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        Previewer,
        ViewBox,
        XButton
    },
    filters: {
        formatDuring: function(value) {
            if (value == '' || value == null || value == undefined) {
                var value = '无';
                return value;
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
        getList1() {
            axios
                .get('pscoreparty/showDakDetialByUserId', {
                    params: {
                        userId: this.$route.params.userId,
                        detailId: this.$route.params.moduleid
                    }
                })
                .then(res => {
                    console.log('12313123', res);
                    this.scoreTime = res.data.scoreTime;

                    this.content1 = res.data.remark;
                    this.adderName = res.data.adderName;

                    if (res.data.imgs) {
                        var imgs = res.data.imgs.split(',');
                        this.imgpics = [];
                        for (var i = 0; i < imgs.length; i++) {
                            var obj = {};
                            obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + imgs[i];
                            obj.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + imgs[i];
                            this.imgpics.push(obj);
                        }
                    } else {
                        this.imgpics = [];
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getUser1() {
            axios
                .get('ppartymember/queryByUserId', {
                    params: {
                        userid: this.$route.params.userId
                    }
                })
                .then(res => {
                    this.userId = res.data.userid;
                    this.departmentid = res.data.departmentid;
                    this.name = res.data.name;
                    this.departmentname = res.data.departmentname;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        show(index) {
            this.$refs.previewer.show(index);
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
       showMenu(){
               this.showPop = true;
            },
        know(){
             this.showPop = false;
        },
    },
    mounted() {
        this.list1Selected = this.list1.find(item => item.moduleId == this.$route.params.moduleid);
        this.getUser1();
        this.getList1();
    },
    data() {
        return {
            scoreTime: '',
            num: 0,
            userId: '',
            adderName: '',
            name: '',
            departmentid: '',
            content1: '',
            content2: '',
            departmentname: '',
            activeData: {},
            picInfo: [],
            list: [],
            list1: [{ text: '口头汇报', moduleId: 11 }, { text: '书面汇报', moduleId: 12 }],
            list1Selected: {},
            content: {},
            imgpics: [],
            imgs: '',
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
  computed: {
        ...mapGetters(['user'])
    }
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
    width: 0.04rem;
    height: 0.18rem;
    margin-left: 8%;
    background: url(../../assets/images/icon-rectangle.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    float: left;
    margin-top: 0.07rem;
}
.picture {
    font-size: 0.14rem;
    font-family: PingFangSC-Semibold;
    color: rgba(51, 51, 51, 1);
    margin-left: 0.1rem;
    display: block;
    float: left;
}
.numberz {
    font-size: 0.14rem;
    font-family: PingFangSC-Medium;
    color: rgba(153, 153, 153, 1);
    display: block;
    float: left;
    margin-left: 0.1rem;
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
    width: 49%;
    height: 1.5rem;
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
.middle{width:2.8rem;height:2.4rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:15%;}
.mint-popup-left{left:15%;}
.middle .middle-top{width:100%;height:.4rem; background:linear-gradient(90deg,rgba(185,54,71,1),rgba(155,10,26,1));box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);font-size:.16rem;color:#FFFFFF;text-align:center;line-height:.4rem;border-radius:10px 10px 0 0;}
.middle-content{width:2.4rem;height:1.2rem;margin:.21rem .19rem .05rem .21rem;}
.middle-content p{font-size:.14rem;color:#828282;line-height:.24rem;}
.dark{color:#333333;}
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
    border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0.2);}
</style>
