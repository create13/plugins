<template>
    <div class="page-body disabled-tabbar">
        <!-- <r-header :rfs="contents"></r-header> -->

        <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="bgColors"  body-padding-top=".46rem">
            先锋作用评定<a slot="right" @click="showPops">评分说明</a></x-header>

        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>党员姓名：
                    <span class="grayColor">{{userName}}</span>
                </b>
            </group-title>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>获得荣誉（本项评定即获 5 分）：</b>
            </group-title>
            <textarea placeholder="请在此处填写评价" cols="30" rows="10" maxlength="300" v-model='Messge13'></textarea>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <span class="addPic">添加凭证</span>
            <div class="photo-list cl">
                <ul>
                    <li id="photoPrimary" v-for="(item,index) in picList13.list" :key="index">
                        <div class="preview">
                            <img style="float:left;width:100%" :key="index" width="100" :src="item">
                        </div>
                    </li>
                    <li>
                        <div class="preview addUpload" @click="chooseImage(picList13)">
                            <span class="add-bg"></span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>先锋表彰（本项评定即获 5 分）：</b>
            </group-title>
            <textarea placeholder="请在此处填写评价" cols="30" rows="10" maxlength="300" v-model='Messge14'></textarea>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <span class="addPic">添加凭证</span>
            <div class="photo-list cl">
                <ul>
                    <li v-for="(item,index) in picList14.list" :key="index">
                        <div class="preview">
                            <img style="float:left;width:100%" :key="index" width="100" :src="item">
                        </div>
                    </li>
                    <li>
                        <div class="preview addUpload" @click="chooseImage(picList14)">
                            <span class="add-bg"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <group-title slot="title">
                <b>先锋模范（本项总分 5 分，请打分）：</b>
            </group-title>
            <inline-x-number v-model="itemscore" class="inline-x-number" :min="0" :max="5"></inline-x-number>
            <textarea placeholder="请在此处填写评价" cols="30" rows="10" maxlength="300" v-model='Messge15'></textarea>
        </div>
        <div class="group-item">
            <span class="bg-line"></span>
            <span class="addPic">添加凭证</span>

            <div class="photo-list cl">
                <ul>
                    <li v-for="(item,index) in picList15.list" :key="index">
                        <div class="preview">
                            <img style="float:left;width:100%" :key="index" width="100" :src="item">
                        </div>
                    </li>
                    <li>
                        <div class="preview addUpload" @click="chooseImage(picList15)">
                            <span class="add-bg"></span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <group-title slot="title">
                <b class="widthSet">总分 (15分) :</b>
                <span class="colorSet">0</span>
            </group-title> -->
        </div>
        <div class="group-item">
            <group-title slot="title"></group-title>
            <x-button type="warn" @click.native="submit">
                确认并提交
            </x-button>
        </div>


        <div v-transfer-dom>
            <popup v-model="showPop" position="left" width="100%">
                <div class="middle">
                    <div class="middle-top">评分说明</div>
                    <div class="middle-content">
                        <p><span class="dark">1.获得荣誉:</span>年度获得综合党委以上荣誉的加5分</p>
                        <p><span class="dark">2.先锋表彰：</span>工作突出，年内受到公司、行业表彰奖励的，加5分；</p>
                        <p><span class="dark">3.先锋模范：</span>在其他发挥先锋模范作用方面需要加分的，由党支部研究后视情况予以加分。</p>
                    </div>
                    <div class="knowBtn" @click="know">我知道了</div>
                </div>
            </popup>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import wx from 'weixin-js-sdk';
import weixin from '@/services/weixin';
// import Xheaders from '@/components/comother/rheader';

import {
    XHeader,
    Popup,
    GroupTitle,
    Flexbox,
    Alert,
    FlexboxItem,
    XButton,
    DatetimePlugin,
    Datetime,
    Group,
    TransferDom,
    Picker,
    InlineXNumber
} from 'vux';

export default {
    directives:{
        TransferDom
    },
    components: {
        XHeader,
        Popup,
        GroupTitle,
        Flexbox,
        FlexboxItem,
        XButton,
        DatetimePlugin,
        Datetime,
        Group,
        Picker,
        InlineXNumber,
        Alert,
        // 'r-header': Xheaders
    },
    data() {
        return {
            Messge13: '',
            Messge14: '',
            Messge15: '',
            itemscore: 0,
            showPop:false,
            contents: { rights: '评分说明', title: '先锋作用评定' },
            picList15: { list: [], arr: [] },
            picList14: { list: [], arr: [] },
            picList13: { list: [], arr: [] }
        };
    },
    computed: {
        userName() {
            return decodeURIComponent(this.$route.params.name);
        }
    },
    methods: {
        submit() {
            let { departmentId, userId, partmentId } = this.$route.params;
            let { Messge13, Messge14, Messge15, itemscore } = this;
            let obj = {
                Messge13,
                Messge14,
                Messge15,
                itemscore,
                departmentid: +departmentId,
                userid: +userId,
                partmentid: +partmentId
            };
            const empty1 = !this.Messge13 && !this.picList13.arr.length;
            const empty2 = !this.Messge14 && !this.picList14.arr.length;
            const empty3 = !this.Messge15 && !this.picList15.arr.length;
            if (empty1 && empty2 && empty3) {
                return this.$vux.toast.show({
                    text: '请填写评定内容并上传凭证',
                    type: 'text'
                });
            }
            if (!empty1) {
                if (!this.Messge13) {
                    return this.$vux.toast.show({
                        text: '请填写获得荣誉评定内容',
                        type: 'text'
                    });
                }
                if (!this.picList13.arr.length) {
                    return this.$vux.toast.show({
                        text: '请上传荣誉凭证',
                        type: 'text'
                    });
                }
                obj.pic13 = this.picList13.arr.join(',');
            }
            if (!empty2) {
                if (!this.Messge14) {
                    return this.$vux.toast.show({
                        text: '请填写先锋表彰评定内容',
                        type: 'text'
                    });
                }
                if (!this.picList14.arr.length) {
                    return this.$vux.toast.show({
                        text: '请上传表彰凭证',
                        type: 'text',
                        position: 'center'
                    });
                }
                obj.pic14 = this.picList14.arr.join(',');
            }
            if (!empty3) {
                if (!this.Messge15) {
                    return this.$vux.toast.show({
                        text: '请填写先锋模范评定内容',
                        type: 'text'
                    });
                }
                if (!this.picList15.arr.length) {
                    return this.$vux.toast.show({
                        text: '请上传模范凭证',
                        type: 'text',
                        position: 'center'
                    });
                }
                obj.pic15 = this.picList15.arr.join(',');
            }
            axios({
                url: 'pavantgrade/save',
                method: 'post',
                headers: { contentType: 'application/json' },
                params: obj
            })
                .then(res => {
                    if (res.success) {
                        this.$vux.alert.show({
                            title: '提交成功',
                            onHide(){
                                setTimeout(() => history.back(), 500);
                            }
                        });
                    } else {
                        this.$vux.alert.show({ title: res.msg });
                    }
                })
                .catch(err => {
                    this.$vux.alert.show({ title: '提交失败' });
                });
        },
        chooseImage(it) {
            wx.chooseImage({
                count: 1, // 默认9
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
                            it.list.push('http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + pictureIds.join());
                            it.arr.push(pictureIds.join());
                        });
                    });
                }
            });
        },
        know(){
            this.showPop = false
        },
        showPops(){
            this.showPop = !this.showPop;
        }
    },
    mounted() {
        weixin.init(['chooseImage', 'uploadImage']);
    }
};
</script>

<style lang="less" scoped>
.widthSet {
    width: 35%;
    display: inline-block;
}
.colorSet {
    color: #b93647;
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
    .inline-x-number {
        .vux-number-selector {
            background-color: #b93647 !important;
        }
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
.img-list {
    img {
        width: 90%;
        border-radius: 5px;
    }
}
.addPic {
    height: 0.17rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    color: #464646;
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
    margin-right: 0.1rem;
    position: relative;
    vertical-align: top;
    width: 0.9rem!important;
    height: 0.9rem!important;
    overflow-y: hidden;
    margin-bottom: 0.2rem;
    box-sizing: border-box;
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
    background-color: #f4f4f4!important;
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
.grayColor {
    color: #999;
}
.group-item:nth-child(2) {
    margin-top: 0.52rem;
}
.middle{width:2.8rem;height:3rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:15%;}
.mint-popup-left{left:15%;}
.middle .middle-top{width:100%;height:.4rem; background:linear-gradient(90deg,rgba(185,54,71,1),rgba(155,10,26,1));box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);font-size:.16rem;color:#FFFFFF;text-align:center;line-height:.4rem;border-radius:10px 10px 0 0;}
.middle-content{width:2.4rem;height:1.7rem;margin:.21rem .19rem .21rem .21rem;}
.middle-content p{font-size:.14rem;color:#828282;line-height:.24rem;}
.dark{color:#333333;}
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
    border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0.2);}
.weui-btn_warn{
    height: .5rem!important;
}
</style>
<style lang="less">
.group-item {
    .inline-x-number {
        .vux-number-selector {
            background-color: #b93647;
            padding: 0;
            &.vux-number-selector-sub {
                padding: 0 1px;
            }
            svg {
                fill: #fff;
            }
        }
        input[readonly] {
            padding: 0;
            border: 0;
            height: 22px;
            line-height: 22px;
        }
    }
}
</style>
