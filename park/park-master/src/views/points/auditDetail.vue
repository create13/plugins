<template>
    <div class="page-body points-auditDetail">
        <x-header>
            审核详情
        </x-header>
        <div v-transfer-dom class="points-auditDetail-dialog">
            <x-dialog v-model="showRejectDialog" hide-on-blur :dialog-style="{width: '80%'}">
                <x-header :left-options="{showBack: false}">
                    驳回原因
                </x-header>

                <div style="padding: 2px 15px;background: #fff;">
                    <group>
                        <x-textarea v-model="rejectReason"></x-textarea>
                    </group>
                </div>


                <flexbox>
                    <flexbox-item>
                        <x-button @click.native="dialogConfirm" :mini="true" type="warn">
                            确定
                        </x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button @click.native="dialogCancel" :mini="true" type="warn">
                            取消
                        </x-button>
                    </flexbox-item>
                </flexbox>
            </x-dialog>
        </div>
        <flexbox orient="vertical" align="initial">
            <view-box class="view-box">
                <group label-width="80px" label-margin-right=".08rem">
                    <span class="bg-line"></span>
                    <cell class="no-border" :border-intent="false" disabled title="党员姓名 :" value-align="left">
                        <span class="nav">{{userName}}</span>
                    </cell>
                    <span class="bg-line"></span>
                    <cell :border-intent="false" disabled title="获得总分 :" value-align="left">
                        <span class="nav">{{totalscore}}</span>
                    </cell>
                </group>

                <div class="item-list" v-if="item.message!=''" v-for="(item,i) of list" :key="i">
                    <div class="item">

                       <span class="bg-line1"></span> <div class="header mb-reject1">{{item.title}}：（ 得分：<span v-show="item.status == 3">{{item.itemscore}}</span>
                        											<span v-show="item.status != 3" style="color:#b93647;">{{item.itemscore}}</span> 分 ）
                        </div>

                        <div class="states scuess" v-if="item.status==2">
                            已通过
                        </div>
                        <div class="states" v-if="item.status==3">
                            已驳回
                        </div>


                        <div class="text-red mb-reject" v-if="item.status == 3">
                            驳回原因：{{item.rejectReson}}
                        </div>


                        <div class="body" style="margin-bottom: .1rem;">
                            <span v-show="item.status == 3" style="color: #b2b2b2;">{{item.message}}</span>
                            <span v-show="item.status != 3" style="color: #333;" class="desc">{{item.message}}</span>
                            <div class="img-show">
                                <img class="previewer-demo-img" v-for="(it,idx) in item.memos" :src="it.msrc" width="100"  @click="atBig(idx,i)">
                                <div v-transfer-dom>
                                <previewer :list="item.memos" ref="previewer"  slot="names"  :options="options" @on-index-change="logIndexChange">
                                </previewer>
                                </div>
                            </div>
                        </div>
                        <flexbox class="footer" v-if="item.status == 0">
                            <flexbox-item>
                                <x-button @click.native="auditReject(item)" :mini="true" type="warn">
                                    驳回
                                </x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button @click.native="auditResolve(item)" :mini="true" type="warn">
                                    通过审核
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                        <!--<flexbox class="footer" justify= "center" v-if="item.status == 2">-->
                            <!--<x-button type="warn">审核通过</x-button>-->
                        <!--</flexbox>-->
                        <!--<flexbox class="footer" justify= "center" v-if="item.status == 3">
                            <x-button style="color:gray">已拒绝</x-button>
                        </flexbox>-->
                    </div>
                </div>
            </view-box>
        </flexbox>
    </div>
</template>
<script>
import axios from "axios";
import {
    XHeader,
    Flexbox,
    FlexboxItem,
    Previewer,
    ViewBox,
    Group,
    Cell,
    XButton,
    XDialog,
    XTextarea,
    TransferDomDirective as TransferDom
} from "vux";
export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        ViewBox,
        Group,
        Cell,
        XButton,
        XDialog,
        XTextarea,
        Previewer
    },
    props: ["userId", "Id", "name", "departmentId"],
    data() {
        return {
            currItem: null,
            rejectReason: "",
            showRejectDialog: false,
            list: [],
            totalscore:0.0,
            options: {
                getThumbBoundsFn (index) {
                // find thumbnail element
                let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                // get window scroll Y
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                // optionally get horizontal scroll
                // get position of element relative to viewport
                let rect = thumbnail.getBoundingClientRect()
                // w = width
                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                // Good guide on how to get element coordinates:
                // http://javascript.info/tutorial/coordinates
                }
            }
        };
    },

    computed: {
        userName() {
            return decodeURIComponent(this.name);
        }
    },
    mounted() {
        this.getInfo();
        this.getlist();
    },
    methods: {
        getInfo() {
            axios.get('ppartymember/queryByUserId', {
                params: {
                    userid: this.userId
                }
            })
            .then(res => {
                console.log(res);
                this.totalscore = res.data.totalscore || 0.0;
            })
            .catch(err => {
                console.log(err);
            });
        },
        atBig (index,i) {
            console.log(this.$refs);
            this.$refs.previewer[i].show(index);
        },
        getlist() {
            axios({
                method: "get",
                url: "pavantgrade/getList",
                params: {
                    userId: this.userId
                }
            })
                .then(res => {
                    console.log(res);
                    this.list = res.data;
                    this.list.forEach(item => {
                        item.memo = (item.memo && item.memo.split(",")) || [];

                        item.memos =[];

                        for(var i=0;i<item.memo.length;i++){
                            var obj = {};
                            obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId='+ item.memo[i];
                            obj.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId='+item.memo[i];
                            item.memos.push(obj);
                        }

                    });


                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        logIndexChange (arg) {
                    console.log(arg)
        },
        auditReject(item) {
            this.currItem = item;
            this.showRejectDialog = true;

        },
        auditResolve(item) {
            axios({
                method: "post",
                url: "pavantgrade/examineOK",
                params: {
                    id: item.id
                }
            })
                .then(res => {
                    if(res.success){
                        this.$vux.alert.show({title: res.msg});

                        window.location.reload();
                    }else{
                        this.$vux.alert.show({title: '提交失败'});
                    }

                })
                .catch(function(error) {
                    this.$vux.alert.show({title: '提交失败'});
                });
        },
        dialogConfirm() {
            axios({
                method: "post",
                url: "pavantgrade/examineNo",
                params: {
                    id: this.currItem.id,
                    rejectReson: this.rejectReason
                }
            }).then(res => {
                if(res.success){
                    this.$vux.alert.show({title: '拒绝成功'});
                    window.location.reload();
                }else{
                    this.$vux.alert.show({title: '提交失败'});
                }

                this.rejectReason = "";
            })
            .catch(function(error) {
                this.$vux.alert.show({title: '提交失败'});
                console.log(error);
            });
            this.showRejectDialog = false;
        },
        dialogCancel() {
            this.currItem = null;
            this.rejectReason = "";
            this.showRejectDialog = false;
        }
    }
};
</script>
<style lang="less">

    td {
        word-wrap: break-word;
        word-break: break-all;
        vertical-align:top;
    }
    .points-auditDetail-dialog {
        .weui-dialog {
            .vux-header {
            }
            .weui-cells {
                margin-top: 0;
                &:before,
                &:after {
                    border: 0;
                }
            }

            textarea {
                background: #f4f4f4;
                height: 1.26rem;
                font-family: microsoft yahei;
                font-size: 0.16rem;
            }
            .vux-flexbox {
                margin: 10px;
                text-align: center;
                .weui-btn {
                    width: 100px;
                }
            }
        }
    }
    .page-body.points-auditDetail {
        background: #fff;
        .view-box {
            padding: 10px 20px;
            .weui-cells,
            .weui-cell {
                margin-top: 0;
                background: transparent;
                &:before {
                    border-top: 0;
                }
            }

            .item-list {
                .item {
                    padding-bottom: 0.3rem;
                    border-bottom: 1px solid #d9d9d9;
                    position: relative;
                    .header,
                    .footer {
                        padding-top:.2rem;
                    }
                    .header {
                        color: #b2b2b2;
                    }
                    .body {
                        .img-list {
                            margin-top: 10px;
                            img {
                                width: 90%;
                                border-radius: 5px;
                            }
                        }
                    }
                    .footer {
                        text-align: center;
                    }
                }
            }

        }
    }

    .vux-x-textarea .weui-cell__bd:last-child{
        padding: 5px;
        background: #f4f4f4;
        border: 1px solid #e4e4e4;

    }
    .vux-label,.vux-cell-align-left{font-size:.16rem;}
    .vux-cell-align-left{color:#333 !important;}
    .weui-cell{padding: 10px 0px!important;}
    .page-body.points-auditDetail .view-box .item-list:last-child .item{border-bottom:0}
    .img-show{width:100%;height:auto;}
    .img-show img{width:31%;height:1rem;margin-top:.1rem;margin-right:10px}
    .img-show img:nth-child(3n+3){margin-right:0}
    .img-left{width:.37rem;height:.37rem;position:absolute;left:.1rem;top:3.15rem;;z-index:900;}
    .img-right{width:.37rem;height:.37rem;position:absolute;right:.1rem;top:3.15rem;z-index:900;}
    .text-red{color: #B93647;}
    .mb-reject{margin-bottom:.2rem}
    .mb-reject1{margin-bottom: .1rem}
    .mb-score{margin-left:.2rem;letter-spacing: 2px;}
    .states{
        text-align: center;
        border-radius: 4px;
        border: 1px solid #B93647;
        position: absolute;
        right:0rem;
        z-index: 999;
        top: .2rem;
        font-size: .16rem;
        font-weight: 600;
        color: #B93647;
        padding: 0.02rem .15rem;
    }
    .bg-line {
        width: 0.03rem;
        height: 0.14rem;
        background: url(../../assets/images/icon-rectangle1.png) no-repeat;
        background-size: 100% 100%;
        display: block;
        float: left;
        margin-top: 0.14rem;
        margin-right: 1.9%;
    }
    .bg-line1{
        width: 0.03rem;
        height: 0.14rem;
        background: url(../../assets/images/icon-rectangle1.png) no-repeat;
        background-size: 100% 100%;
        display: block;
        float: left;
        margin-top: 0.26rem;
        margin-right: 1.9%;
    }
    .states.scuess{
        color: #6BD46B;
        border: 1px solid #6BD46B;
    }
    .weui-btn_warn {
        background-color: #b93647!important;
        width: 120px!important;
        height: 30px!important;
        border: 0!important;
    }
</style>
