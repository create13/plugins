<template>
    <div class="page-body">
        <x-header :left-options="{showBack: false}" class="bgColors">
            支部活动
            <router-link slot="right" :to="{name:'activeNews'}">发起活动</router-link>
        </x-header>
        <div class="box">
            
            <flexbox  style="text-align: center" v-if="list.length === 0">
                <div style="margin:50% auto auto;">
                    <img style="width:.9rem;height:1.2rem;" src="@/assets/images/icon-noRecord.png" alt="">
                    <p style="color: #CCC;">暂无信息</p>
                </div>
            </flexbox>
            <flexbox class="list-item" v-for="(item,index) in list" :key="index" :gutter="0" align="stretch">
                <flexbox-item class="list-avatar">
                    <img src="@/assets/images/icon-head.png">
                </flexbox-item>
                <flexbox-item class="list-body">
                    <flexbox align="start">
                        <flexbox-item class="list-head">
                            <router-link :to="{name:'activePost',params:{activeId:item.id}}">
                                <b>{{item.activeName}}</b>
                                <span>{{item.activePrincipalPeople}}</span>
                                &nbsp; &nbsp;<span>{{datePick(item.startTime)}}</span>
                            </router-link>
                        </flexbox-item>
                        <flexbox-item v-if="item.activeCreatePeople == user.userid && item.startTime  > new Date().getTime()">
                            <input type="button" class="cancle" value="取消活动" @click="deleteActive(item.id)">
                        </flexbox-item>
                    </flexbox>
                    <router-link :to="{name:'activePost',params:{activeId:item.id}}">
                        <div class="list-content" v-html="item.active_Context"></div>
                    </router-link>
                    <flexbox class="images-preview" :gutter="0" wrap="wrap">
                        <flexbox-item :span="1/3" v-for="(img, idx) in item.pictures" :key="img.pictureId">
                            <!-- 缩略图显示 -->
                            <div>
                                <img style="position:relative;" :class="item.previewerClassName" :title="img.msrc" :src="img.msrc" @click="preview(index,idx)">
                                <div v-if="item.activeCreatePeople == user.userid">
                                    <img style="width:.2rem;position:absolute;top:0;right:0;" src="@/assets/images/x-1.png" @click="deletePic(img.id)">
                                </div>
                           </div>
                        </flexbox-item>
                        <flexbox-item :span="1/3" v-if="roleid!==4 && item.pictures.length<9"  v-show="item.startTime < new Date().getTime()">
                            <a class="btn-plus" @click="chooseImage(item)"></a>
                        </flexbox-item>
                    </flexbox>

                    <div v-transfer-dom>
                        <popup v-model="showPop1" position="right" width="100%" height="20px">
                            <div class="middle1">{{message}}</div>
                        </popup>
                    </div>
                    <div v-transfer-dom>
                        <!-- 大图显示 -->
                        <previewer :list="item.pictures" :options="item.previewerOptions" ref="previewer"></previewer>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div v-transfer-dom>
            <popup v-model="showPop" position="left" width="100%" border="0">
            <div class="middle">
                <div class="middle-top">是否取消活动？</div>
                <input type="button" class="btn" value="否" style="border-right:1px solid #E4E4E4;" @click="cancle">
                <input type="button" class="btn" value="是" @click="confirm">
            </div>
            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="showPopPic" position="left" width="100%" border="0">
            <div class="middle">
                <div class="middle-top">是否删除？</div>
                <input type="button" class="btn" value="否" style="border-right:1px solid #E4E4E4;" @click="showPopPic=false">
                <input type="button" class="btn" value="是" @click="confirmPic">
            </div>
            </popup>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { XHeader, Flexbox, FlexboxItem, TransferDom, Popup, Alert,AlertPlugin, Confirm,ConfirmPlugin,Previewer } from 'vux';
import wx from 'weixin-js-sdk';
import weixin from '@/services/weixin';
import axios from "axios";

export default {
    components: {
        XHeader,
        Popup,
        Flexbox,
        Alert,
        FlexboxItem,
        Previewer,
        Confirm,
        ConfirmPlugin
    },
    directives: {
        clipping: {
            inserted: (el, binding) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > img.height) {
                        el.style.height = '100%';
                    } else {
                        el.style.width = '100%';
                    }
                    el.src = binding.value;
                };
                img.src = binding.value;
            }
        },
        TransferDom
    },
    data() {
        return {
            list: [],
            imgs: [],
            activeId : 0,
            pictureId : 0,
            showPop:false,
            showPop1:false,
            showPopPic:false,
            message:'',
            roleid: this.$store.getters.user.roleid
        };
    },
    mounted() {
        weixin.init(['chooseImage', 'uploadImage']);
        this.getList();
    },
    methods: {
        datePick(s) {
            Date.prototype.toLocaleString = function() {
                return this.getMonth() + 1 + '月' + this.getDate() + '日 ';
            };
            return new Date(s).toLocaleString();
        },
        preview(index, idx) {
            this.$refs.previewer[index].show(idx);
        },
        deletePic(imgId){
            this.showPopPic = true;
            this.pictureId = imgId;
        },
        getList() {
            this.$http
                .get('active/getParticipateActive', {
                    params: {
                        pageNum: 1,
                        pageSize: 200,
                        departmentid: this.user.departmentid,
                        userId: this.user.userid
                    }
                })
                .then(res => {
                    this.list = res.data.list;
                    console.log(this.list.pictures);
                    this.list.forEach((item, index) => {
                        item.previewerClassName = `previewer-${index}-img`;
                        item.previewerOptions = {
                            getThumbBoundsFn(idx) {
                                // find thumbnail element
                                let thumbnail = document.querySelectorAll(`.${item.previewerClassName}`)[idx];
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
                        };
                        item.pictures = item.pictures || [];
                        item.pictures.forEach(item => {
                            item.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + item.pictureId;
                            item.msrc = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + item.pictureId;
                        });
                    });
                });
        },
        chooseImage(item) {
            // 最多只能传9张
            const limit = 9 - item.pictures.length;
            if (limit) {
                wx.chooseImage({
                    count: limit, // 默认9
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
                        }).then(serverIds => this.uploadImage(item, serverIds));
                    }
                });
            }
        },
        uploadImage(item, serverIds) {
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
            Promise.all(promiseList).then(results =>
                results.map(result => {
                    item.pictures.push({
                        src: 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId=' + result.data,
                        msrc: 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + result.data
                    });
                    axios({
                        url: "active/savePicture",
                        method: 'post',
                        headers: {'contentType': 'application/x-www-form-urlencoded'},
                        params: {
                            activeId: item.id,
                            pictureId: result.data
                        }
                    }).then(res => {
                        this.$vux.toast.show({
                            text: res.msg,
                            type: 'text'
                        });
                    }).catch(err => {
                        this.$vux.toast.show({
                            text: '提交失败',
                            type: 'text'
                        });
                    });
                })
            );
        },
        deleteActive(itemId){
            this.showPop = true;
            this.activeId = itemId;
        },
        confirm(){
            this.$http.delete('active/deleteById?activeid='+this.activeId
            ).then(res =>{
                let data = res.success;
                if(res.success == false){
                    this.showPop1 = true;   
                    this.message = res.msg;
                    this.getList();
                    setTimeout(() => {
                        this.showPop1 = false;
                    }, 3000)
                }
                this.getList();
            });  
            this.showPop = false;
        },
        confirmPic(imgId){
            this.$http.delete('active/deleteActivePicById?id='+this.pictureId
            ).then(res =>{
                let data = res.success;
                if(res.success){
                    this.message = res.msg
                    this.pictureId = 0;
                    this.getList();
                }
            });  
            this.showPopPic = false;
        },
        cancle(){
            this.showPop = false;
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
};
</script>

<style lang="less" scoped>
.page-body {
    display: flex;
    flex-direction: column;
    background-color: #efefef;
}
.widthSet {
    width: 100%;
}
.box {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.vux-flexbox.list-item {
    background-color: #fff;
    &:not(:last-child) {
        margin-bottom: 0.1rem;
        padding-top: 0.1rem;
    }
}
.vux-flexbox-item.list-avatar {
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex: 0 0 auto;
    width: 0.8rem;
    min-height: 0.8rem;
    img {
        width: 0.36rem;
        height: 0.36rem;
        margin-top: 0.1rem;
        border-radius: 50%;
        box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.15);
        background-color: rgba(0, 0, 0, 0.03);
    }
}
.vux-flexbox-item.list-body {
    padding: 0.1rem 0.1rem 0.1rem 0.005rem;
    .cancle{
        float: right;
        width: 0.75rem;
        height: 0.3rem;
        font-size: 0.14rem;
        line-height: 0.24rem;
        border-radius: 4px;
        border: 0px;
        color: #ffffff;
        background-color: #b93647;
        // color: black;
    }
}
.vux-flexbox-item.list-head {
    b {
        display: block;
        color: #444;
    }
    span {
        font-size: 0.12rem;
        color: #999;
    }
}
.vux-flexbox-item.list-close {
    flex: 0 0 auto;
    width: 0.36rem;
    line-height: 1;
    padding-top: 0.05rem;
}
.list-content {
    margin-top: 0.1rem;
    padding-right: 0.15rem;
    font-size: 0.14rem;
    color: #494949;
}
.images-preview {
    margin-top: 0.1rem;
    & > .vux-flexbox-item {
        position: relative;
        &:after {
            content: '';
            display: block;
            padding-bottom: 100%;
        }
        & > div,
        & > a {
            position: absolute;
            width: 90%;
            height: 90%;
            border-radius: 5%;
            box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.15);
            background-color: rgba(0, 0, 0, 0.03);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // img {
            //     max-width: 100%;
            //     max-height: 100%;
            // }
            &.btn-plus {
                background-image: url(../../assets/images/add_bg.png);
                background-position: center center;
                background-repeat: no-repeat;
                cursor: pointer;
            }
        }
    }
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
    width: 0.6rem;
    height: 0.6rem;
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
    width: 0.6rem;
    height: 0.6rem;
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
    background-color: #fff;
    border: 1px solid #b53141;
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
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    display: block;
    background: url(../../assets/images/add_icon_bg.png) no-repeat;
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
.vux-popup-dialog{
    background-color: transparent!important;
}
.middle{width:2.8rem;height:1.48rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF !important;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:21%;overflow:hidden;}
.middle1{
    width: 90%;
    height: 38px;
    line-height: 38px;
    margin: .8rem auto;
    text-align: center;
    border-radius: 10px;
    background-color: #FFFFFF !important;
    position: absolute;
    z-index: 300;
    left: 5%;
    top: 27%;
    overflow: hidden;
}
.mint-popup-left{left:15%;}
.middle .middle-top{
    width:100%;
    height:1rem;
    line-height:1rem;
    text-align:center;
    // background-color: #FFFFFF !important;
    background: linear-gradient(90deg,#fff,#fff);
    font-size:.16rem;
    color:#333333;
    border-radius:10px 10px 0 0;
    border-bottom: 1px solid #E4E4E4;
    }
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0);}
.btn{
    float: left;
    width: 50%;
    height: 48px;
    line-height: 48px;
    font-size: .16rem;
    border: 0;
    background-color: #ffffff;
    color: #666;
}
</style>
