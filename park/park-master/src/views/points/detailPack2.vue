<template>
    <div class="page-body disabled-tabbar">
        <x-header>思想汇报评分<a slot="right" @click="showMenu">评分说明</a></x-header>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title" style="margin-left: 0.15rem">
                <b>党员姓名：
                    <span style="color: #999999">{{name1}}</span>
                </b>
            </group-title>

        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title" style="margin-left: 0.15rem">
                <b>时间:</b>
            </group-title>
            <flexbox :gutter="0">
                <flexbox-item>
                    <input type="text" v-model='startTime' readonly>
                </flexbox-item>
                <flexbox-item class="input-addon" style="position: relative">
                    <x-button mini type="warn">
                        <i class="iconfont dlb-icon-rili"></i>
                    </x-button>
                    <group class="date-no-box">
                        <datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm" @on-change="changeStart" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></datetime>
                    </group>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title" style="margin-left: 0.15rem">
                <b>汇报类型：
                    <span style="color: #999999">{{list1Selected.text}}</span>
                </b>
            </group-title>

        </div>

        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title" style="margin-left: 0.15rem">
                <b class="colorSet">党员思想汇报主要内容：</b>
            </group-title>
            <textarea cols="30" rows="10" maxlength="300" v-model='activeContent'></textarea>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title" style="margin-left: 0.15rem">
                <b>思想汇报图片：
                    <span style="color: #999999">最多可传3张</span>
                </b>
            </group-title>
            <div class="photo-list cl">
                <ul>
                    <li v-for="(item,index) in picList.list" :key="index">
                        <div class="preview">
                            <img style="float:left;width:100%" :key="index" width="100" :src="item" @touchend="clearLoop" @touchstart="showDeleteButton(index)">
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
                提交支部书记审核
            </x-button>
        </div>
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
    </div>
</template>

<script>
import axios from 'axios';
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
} from 'vux';
import wx from 'weixin-js-sdk';
import weixin from '@/services/weixin';
import { setTimeout } from 'timers';
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
            showPop:false,
            name1: '',
            value1: '',
            startTime: '',
            endTime: '',
            hourListValue: '',
            hot: '',
            ListValue: '',
            list1: [{ text: '口头汇报', moduleId: 11 }, { text: '书面汇报', moduleId: 12 }],
            list1Selected: {},
            activeContent: '',
            listSingle: {},
            userName: '',
            picList: { list: [], arr: [] }
        };
    },
    methods: {
        showMenu(){
               this.showPop = true;
            },
        know(){
             this.showPop = false;
        },
        getUser1() {
            axios
                .get('ppartymember/queryByUserId', {
                    params: {
                        userid: this.$route.params.userId
                    }
                })
                .then(res => {
                    this.name1 = res.data.name;
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
                This.$vux.alert.show({ title: '删除成功' });
            }, 1000);
        },
        clearLoop() {
            clearInterval(this.Loop);
        },
        atBig(item) {},
        getList() {
            axios
                .get('pscoredetail/queryById', {
                    params: {
                        id: this.$route.params.moduleid
                    }
                })
                .then(res => {
                    this.listSingle = res.data;
                })
                .catch(err => {
                    console.log('fail' + err.data);
                });
        },
        getUser() {
            axios
                .get('ppartymember/queryByUserId', {
                    params: {
                        userid: this.user.userid
                    }
                })
                .then(res => {
                    this.userName = res.data.name;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        openPicker() {
            this.$refs.picker.open();
        },
        submit() {
            var starttime = this.startTime.replace(new RegExp('-', 'gm'), '/');
            var starttimeHaoMiao = new Date(starttime).getTime();
            if (!starttime) {
                return this.$vux.toast.show({
                    text: '请设置时间',
                    type: 'text'
                });
            }
            if (!this.activeContent) {
                return this.$vux.toast.show({
                    text: '请填写内容',
                    type: 'text'
                });
            }
            if (!this.picList.arr.length) {
                return this.$vux.toast.show({
                    text: '请上传图片',
                    type: 'text'
                });
            }
            axios({
                url: 'pscoreparty/scoreCustom',
                method: 'post',
                params: {
                    detailId: this.list1Selected.moduleId,
                    userId: this.$route.params.userId,
                    adderId: this.user.userid,
                    score: 5,
                    imgs: this.picList.arr.join(),
                    remark: this.activeContent,
                    addTimes: new Date(this.startTime.replace(/-/gi, '/')).getTime()
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.success) {
                        this.$vux.alert.show({ title: '增加成功',onHide(){
                            setTimeout(() => history.back(), 1000);
                        }});
                    } else {
                        this.$vux.alert.show({ title: res.msg });
                    }
                })
                .catch(err => {
                    if (err.success) {
                        this.$vux.alert.show({ title: '增加失败' });
                        setTimeout(() => {
                            this.$vux.alert.hide();
                        }, 1000);
                    }
                });
        },

        getActivity() {},
        log(str1, str2 = '') {
            console.log(str1, str2);
        },
        showPlugin() {
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD HH',
                value: '2017-05-20 18',
                onConfirm(val) {
                    console.log('plugin confirm', val);
                },
                onShow() {
                    console.log('plugin show');
                },
                onHide() {
                    console.log('plugin hide');
                }
            });
        },
        toggleFormat() {
            this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm';
        },
        changeStart(value) {
            this.startTime = value;
        },
        changeEnd(value) {
            this.endTime = value;
        },
        clearValue(value) {
            this.value6 = '';
        },
        clearValue8(value) {
            this.value8 = '';
        },
        setToday(value) {
            let now = new Date();
            let cmonth = now.getMonth() + 1;
            let day = now.getDate();
            if (cmonth < 10) cmonth = '0' + cmonth;
            if (day < 10) day = '0' + day;
            this.value7 = now.getFullYear() + '-' + cmonth + '-' + day;
            console.log('set today ok');
        },

        chooseImage(it) {
            wx.chooseImage({
                count: 3, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
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
                                this.$http.get('picture/upload', {
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
                                'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + pictureIds.join()
                            );
                            it.arr.push(pictureIds.join());
                        });
                    });
                }
            });
        }
    },
    mounted() {
        weixin.init(['chooseImage', 'uploadImage']);
        this.list1Selected = this.list1.find(item => item.moduleId == this.$route.params.moduleid);
        /* this.getActivity();
            this.getList();
            this.getUser();*/
        this.getUser1();
    },
    computed: {
        ...mapGetters(['user'])
    }
};
</script>

<style lang="less" scoped>
.bg-line {
    width: 0.03rem;
    height: 0.14rem;
    margin-left: 1%;
    background: url(../../assets/images/icon-rectangle.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    float: left;
    margin-top: 0.05rem;
}
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
    input,
    textarea {
        display: block;
        width: 100%;
        padding: 0.06rem 0.08rem;
        border-radius: 3px;
        border: 1px solid #e4e4e4;
        background-color: #f4f4f4;
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
    font-size: 0.12rem;
    font-family: PingFangSC-Medium;
    color: rgba(153, 153, 153, 1);
    line-height: 0.17rem;
}
input[type='file'] {
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
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#b2404040, endColorstr=#b2404040);
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
    background-color:#f4f4f4!important;
    border: 1px solid #e4e4e4!important;
}
.photo-list .preview img {
    max-height: 0.6rem;
    max-width: 0.6rem;
    vertical-align: middle;
}
.photo-list .photo-primary-text {
    color: #ffa500;
    font-size: 12px;
}
.photo-list .add-bg {
    width: 0.2rem;
    height: 0.2rem;
    margin-left: 0.34rem!important;
    margin-top: 0.32rem!important;
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
    height: .32rem!important;
    line-height: .3rem!important;
}
</style>
<style>
.colorSet {
    color: #494949;
}
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
