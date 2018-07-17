<template>
    <div class="page-body">
        <x-header :left-options="{showBack: false}">
            党员活动
        </x-header>
        <flexbox orient="vertical">
            <flexbox-item>
                <section class="mainbox mainbox1">
                    <div class="barbg">
                        年度共参与组织活动：
                        <span style="display: inline">{{number1}}</span> 次
                    </div>
                    <div class="barbg">
                        年度共参与紧邻一战活动：
                        <span style="display: inline">{{number2}}</span> 次
                    </div>
                </section>
            </flexbox-item>

        </flexbox>
        <flexbox orient="vertical">

            <section class="mainbox">
                <div class=" clearfix p15 display">
                    <span class="fl weui-cell__bd1">党员生活通知</span>
                    <a class=" fr">
                        <router-link slot="right" to="/active/activeMore">查看全部 ></router-link>
                    </a>
                </div>
                <div style="padding:2vw 3.5vw 0;">
                    <table width="100%" class="table">
                        <tr>
                            <td width="100">活动时间：</td>
                            <td class="f_b">{{startTime1|formatDuring}}~{{endTime1|formatDuring}}</td>
                        </tr>
                        <tr>
                            <td>地点：</td>
                            <td class="f_b">{{activePace}}</td>
                        </tr>
                        <tr>
                            <td>发起人：</td>
                            <td class="f_b">{{activeCreatePeople}}</td>
                        </tr>
                        <tr>
                            <td valign="top">活动内容：</td>
                            <td class="f_b weui-media-box__desc">{{active_Context}}</td>
                        </tr>
                    </table>
                </div>

                <div class="book">
                    <a @click="submit()">报名</a>
                </div>
            </section>

        </flexbox>
        <flexbox orient="vertical">
            <flexbox-item>
                <section class="mainbox ">
                    <div class="p15">
                        <div class=" clearfix  display">
                            <span class="fl weui-cell__bd1">已参与组织生活</span>

                            <router-link class="fr" slot="right" to="/active/partyMoment">查看全部 ></router-link>
                        </div>
                        <ul class="news">
                            <li v-for="(item,index) in activeComplete" :key="index">
                                <a class=" display clearfix " href="javascript:;">
                                    <div class=" fl newsa">{{item.activeName}}</div>
                                    <div class=" fr">{{item.endTime|formatDuring}}</div>
                                </a>
                            </li>

                        </ul>
                    </div>
                </section>

            </flexbox-item>
        </flexbox>
        <div v-transfer-dom>
            <alert v-model="show" :title="msg" @on-show="onShow" @on-hide="onHide">谢谢</alert>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
    Flexbox,
    FlexboxItem,
    cookie,
    Cell,
    Group,
    XButton,
    Alert,
    XTable,
    TransferDomDirective as TransferDom
} from 'vux';

export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        Cell,
        Group,
        XButton,
        XTable,
        Alert
    },
    data() {
        return {
            departmentid: this.$store.getters.user.departmentid,
            number1: 1,
            number2: 1,
            userId: cookie.get('userId'),
            startTime1: '',
            activePace: '',
            activeCreatePeople: '',
            activeId: '',
            active_Context: '',
            activeComplete: [],
            show: false,
            msg: ''
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
                }
                return new Date(value).toLocaleString();


        }}
    },
    methods: {
        getActivity() {
            this.$http
                .get('active/getRunningActive', {
                    params: {
                        pageNum: 1,
                        pageSize: 1
                    }
                })
                .then(res => {
                    console.log(res.data);
                    this.startTime1 = res.data.list[0].startTime;
                    this.activePace = res.data.list[0].activePace;
                    this.activeCreatePeople = res.data.list[0].activeCreatePeople;
                    this.active_Context = res.data.list[0].active_Context;
                    this.activeId = res.data.list[0].id;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        gettimes1() {
            this.$http
                .post('active/getParticipateCount', {
                    userId: this.userId,
                    activeType: 3
                })
                .then(res => {
                    console.log(res);
                    this.number1 = res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        gettimes2() {
            this.$http
                .post('active/getParticipateCount', {
                    userId: this.userId,
                    activeType: 5
                })
                .then(res => {
                    console.log(res);
                    this.number2 = res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        submit() {
            this.$http
                .post('active/participate', {
                    userId: this.userId,
                    activeId: this.activeId,
                    departmentid: this.departmentid
                })
                .then(res => {
                    (this.msg = res.msg), (this.show = true);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getAlreadyActive() {
            this.$http
                .get('active/getAlreadyActive', {
                    params: {
                        pageNum: 1,
                        pageSize: 4
                    }
                })
                .then(res => {
                    this.activeComplete = res.data.list;
                    console.log(this.activeComplete);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        onHide() {
            console.log('on hide');
        },
        onShow() {
            console.log('on show');
        }
    },
    mounted() {
        this.getActivity();
        this.gettimes1();
        this.gettimes2();
        this.getAlreadyActive();
    }
};
</script>

<style lang="less" scoped>
table {
    border-collapse: collapse;
}
.table td {
    padding: 3px;
}

.custom-primary-red {
    border-radius: 99px !important;
    border-color: #ce3c39 !important;
    color: #ce3c39 !important;
    &:active {
        border-color: rgba(206, 60, 57, 0.6) !important;
        color: rgba(206, 60, 57, 0.6) !important;
        background-color: transparent;
    }
}
.page-body {
    background-color: #efefef;
}

span {
    display: block;
    font-size: 0.8em;
    background-color: #f5f5f5;
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
            img {
                min-width: 100%;
            }
            &.btn-plus {
                background-image: url(../../assets/images/add_bg.png);
                background-position: center center;
                background-repeat: no-repeat;
                cursor: pointer;
            }
        }
    }
}

* {
    margin: 0;
    padding: 0;
}
ul,
li {
    list-style-type: none;
    margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 100%;
    font-weight: normal;
}
a {
    color: #666;
    text-decoration: none;
}
img {
    border: 0;
    vertical-align: middle;
}
textarea {
    font-family: 'Microsoft Yahei';
}
body {
    color: #666;
    background: #f4f4f4;
    font-size: 4vw;
}

table {
    border-collapse: collapse;
}
input {
    border: 0;
}
.clearfix:after {
    content: ' ';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
}
.clearfix {
    zoom: 1;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.p15 {
    padding: 4vw;
}
.display {
    display: block;
}
.header {
    background: #b42f40;
    color: #fff;
    text-align: center;
    padding: 3vw 0;
    position: relative;
}
.mainbox {
    background: #fff;
    padding: 2vw 2vw 0;
    margin-bottom: 2vw;
}
.weui-cell1 {
    padding-bottom: 0;
}
.weui-cell__bd1 {
    font-size: 6vw;
}
.weui-cells {
    font-size: 4.5vw;
}
.weui-form-preview__bd {
    text-align: left;
}

.mainbox1 {
    padding: 4vw 4vw 1vw 4vw;
}
.barbg {
    background: #f5f5f5;
    border-radius: 1vw;
    padding: 0vw 4vw 2vw;
    margin-bottom: 3vw;
}
.barbg span {
    color: #fa7e07;
    font-size: 7vw;
}
.book {
    text-align: center;
    padding: 2vw 0 5vw 0;
}
.book a {
    display: inline-block;
    border-radius: 1vw;
    background: #9d0e1e;
    color: #fff;
    padding: 2vw 0;
    width: 35vw;
}
.book.on a {
    background: #d8d8d8;
}

.table td {
    padding: 3px;
}
.news {
    margin-top: 4vw;
}
.news li {
    border-bottom: 1px solid #f3f3f3;
    line-height: 12vw;
}
.header a {
    position: absolute;
    left: 3vw;
    display: inline-block;
    color: #fff;
}
.red {
    color: red;
}
.dbsy li {
    border-bottom: 1px solid #f3f3f3;
    padding: 4vw 0 1vw;
}
.title_p {
    padding: 2vw 0 3vw;
}

.weui-media-box__desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.newsa {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
}
</style>
