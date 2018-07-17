<template>
    <div class="page-body">
        <x-header :left-options="{showBack: false}">
            党员活动
            <router-link slot="right" :to="{name:'activeNews'}">发起活动</router-link>
        </x-header>
        <div class="box">
            <flexbox class="list-item" v-for="(item, index) in list" :key="index" :gutter="0" align="stretch">
                <flexbox-item class="list-avatar">
                    <img src="@/assets/images/icon-head.png">
                </flexbox-item>
                <flexbox-item class="list-body">
                    <router-link :to="{name:'activePost',params:{activeId:item.id}}">
                        <flexbox align="start">
                            <flexbox-item class="list-head">
                                <b>{{item.activeName}}</b>
                                <p>{{datePick(item.createTime)}}</p>
                            </flexbox-item>
                            <!-- <flexbox-item class="list-close">
                                <a><img src="@/assets/images/x.png"></a>
                            </flexbox-item> -->
                        </flexbox>
                        <div class="list-content" v-html="item.active_Context"></div>
                    </router-link>
                    <flexbox class="images-preview" :gutter="0" wrap="wrap">
                        <flexbox-item :span="1/3" v-for="(img, idx) in item.pictures" :key="idx">
                            <!-- 缩略图显示 -->
                            <div><img :class="item.previewerClassName" v-clipping="img.src" @click="preview(index,idx)"></div>
                        </flexbox-item>
                        <flexbox-item :span="1/3" v-show="item.pictures.length<9">
                            <a class="btn-plus" @click="chooseImage(item)"></a>
                        </flexbox-item>
                    </flexbox>
                    <div v-transfer-dom>
                        <!-- 大图显示 -->
                        <previewer :list="item.pictures" :options="item.previewerOptions" ref="previewer"></previewer>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
import { XHeader, Flexbox, FlexboxItem, Previewer, TransferDom } from 'vux';
import wx from 'weixin-js-sdk';
import weixin from '@/services/weixin';

export default {
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        Previewer
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
            list: []
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
        getList() {
            this.$http
                .get('active/getParticipateActive', {
                    params: {
                        pageNum: 1,
                        pageSize: 200,
                        departmentid: this.$store.getters.user.departmentid,
                        userId: this.$store.getters.user.userid
                    }
                })
                .then(res => {
                    this.list = res.data.list;
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
                            item.src = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + item.pictureId;
                        });
                    });
                });
        },
        preview(index, idx) {
            this.$refs.previewer[index].show(idx);
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
                            Promise.all(promiseList).then(results => {
                                results.map(result => {
                                    item.pictures.push({
                                        src: 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=' + result.data
                                    });
                                });
                            });
                        });
                    }
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
.page-body {
    display: flex;
    flex-direction: column;
    background-color: #efefef;
}
.box {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.vux-flexbox.list-item {
    background-color: #fff;
    &:not(:last-child) {
        margin-bottom: 0.15rem;
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
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.1rem;
        border-radius: 50%;
        box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.15);
        background-color: rgba(0, 0, 0, 0.03);
    }
}
.vux-flexbox-item.list-body {
    padding: 0.1rem 0;
}
.vux-flexbox-item.list-head {
    b {
        color: #444;
    }
    p {
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
</style>
