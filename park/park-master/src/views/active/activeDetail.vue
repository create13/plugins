<template>
    <div class="page-body">
        <x-header :left-options="{showBack: false}" style="position:fixed;width:100%;">
            党员生活
        </x-header>
        <div class="box">
        <flexbox orient="vertical">
            <flexbox-item>
                <section class="mainbox-top">
                    <div class="barbg" >
                        年度共参与党员活动：
                        <span style="display: inline">{{number1}}</span>
                         次
                    </div>
                    <div class="barbg">
                        年度共参与金领驿站活动：<span style="display: inline">{{number2}}</span> 次
                    </div>
                </section>
                <div class="grayLine"></div>
            </flexbox-item>
        </flexbox>
        <flexbox orient="vertical">
            <section class="mainbox1">
                <div class=" clearfix p15 display">
                    <span class="fl weui-cell__bd1">党员生活通知</span>
                    <span class="total" style="margin-left:-0.3rem">（{{count}}）</span>
                    <a  class="fRight"> <router-link slot="right" :to="{name:'activeMore'}">查看全部 ></router-link></a>
                </div>
                <flexbox  style="text-align: center" v-if="count == 0">
                    <div style="margin:auto;">
                        <img style="width:.9rem;height:1.2rem;" src="@/assets/images/icon-noRecord.png" alt="">
                        <p style="color: #CCC;">暂无信息</p>
                    </div>
                </flexbox>
                <div class="content" v-else>
                    <table width="100%" class="table">
                        <tr>
                            <td width="80">标题：</td>
                            <td class="f_b">{{activeTitle}}</td>
                            <div v-if="activeType">
                                <img src="@/assets/images/activeDetail.png" alt="">
                            </div>
                        </tr>
                        <tr>
                            <td width="80">活动时间：</td>
                            <td class="f_b">{{startTime1|formatDuring}}~{{endTime1|formatDuring}}</td>
                        </tr>
                        <tr>
                            <td>地点：</td>
                            <td class="f_b">{{activePace}}</td>
                        </tr>
                        <tr>
                            <td>发起人：</td>
                            <td class="f_b">{{activeCreatePeopleName}}</td>
                        </tr>
                        <tr>
                            <td valign="top">活动内容：</td>
                            <td class="f_b">{{active_Context}}</td>
                        </tr>
                    </table>
                </div>
                <div class="book" v-if="signupstatus == 2">
                    <a  style="background-color:#B93647" @click="submit()">报名</a>
                </div>
                <div class="book"  v-if="signupstatus == 1">
                    <a  style="background-color: #8b8b8b">已报名</a>
                </div>
                <div class="grayLine margin-top"></div>
            </section>
        </flexbox>
        <flexbox orient="vertical">
            <flexbox-item>
                <section class="mainbox ">
                    <div class="p15" style="padding-top:0.1rem;">
                        <div class=" clearfix  display">
                            <span class="fl weui-cell__bd1">已参与党员生活</span>
                            <span class="total">({{number1}})</span>
                            <a href="#" class=" fAll"><router-link slot="right" :to="{name:'Active'}">查看全部 ></router-link></a>
                        </div>
                        
                        <flexbox  style="text-align: center" v-if="number1 == 0">
                            <div style="margin:.1rem auto auto;">
                                <img style="width:.9rem;height:1.2rem;" src="@/assets/images/icon-noRecord.png" alt="">
                                <p style="color: #CCC;">暂无信息</p>
                            </div>
                        </flexbox>
                        <ul class="news" v-else>
                            <li v-for="(item,index) in activeComplete" :key="index">
                                <a class=" display clearfix " >
                                    <div class=" fl">{{item.activeName}}</div>
                                    <div class=" fr">{{item.startTime|formatDuring}}<span class="rightBtn"></span></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </flexbox-item>
        </flexbox>
        </div>
        <div v-transfer-dom>
            <alert v-model="show" :title="msg" @on-show="onShow" @on-hide="onHide"></alert>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import axios from 'axios';
    import { XHeader, Flexbox, FlexboxItem,Alert ,cookie,Cell,Group,XButton,XTable,TransferDomDirective as TransferDom, } from 'vux';
export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,Cell,Group,XButton,XTable,Alert
    },
    data() {
        return {
            number1:0,
            number2:0,
            userId:cookie.get('userId'),
            startTime1:'',
            activeId : 0,
            activeTitle:'',
            activePace:'',
            activeCreatePeopleName:'',
            activeId:'',
            activeType:false,
            active_Context:'',
            show:false,
            activeComplete:'',
            isActive:true,
            signupstatus:'',
            msg:'',
            endTime1:'',
            count:'0'
        };
    },
    filters: {
        formatDuring: function (value) {
            if(value == "" || value == null || value == undefined){
                var value=""
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
            }
        },
        formatDurings: function (value) {

        Date.prototype.toLocaleString = function(){
            let minutes = this.getMinutes();
            if(minutes < 10){
                minutes = '0' + minutes;
            }
            return this.getFullYear() +'.'+ (this.getMonth()+1)+'.'+this.getDate();
        }
            return new Date(value).toLocaleString();
                return new Date(value).toLocaleString();

                }
    },
    methods:{
        getActivity(){
            axios({
                method: 'get',
                url: 'active/getParticipateActive',
                params: {
                    pageNum:1,
                    pageSize:1,
                    departmentid:this.user.departmentid,
                    userId:this.userId
                }
            }) .then((res)=> {
                this.activeId = res.data.list[0].id;
                this.activeTitle=res.data.list[0].activeName;
                this.startTime1=res.data.list[0].startTime;
                this.endTime1=res.data.list[0].endTime;
                this.activePace=res.data.list[0].activePace;
                this.activeCreatePeopleName=res.data.list[0].activeCreatePeopleName;
                this.active_Context=res.data.list[0].active_Context;
                this.activeId=res.data.list[0].id;
                this.signupstatus=res.data.list[0].signupstatus;
                this.activeType = res.data.list[0].activeType === 5 ? true : false;
            }).catch(function (error) {
                    console.log(error);
                });


        },
        gettimes1(){
            axios({
                method: 'post',
                url: 'active/getParticipateCount',
                params: {
                    userId:this.userId,
                    // activeType:3,
                    year: new Date().getFullYear()
                }
            }) .then((res)=> {

                this.number1=res.data
            }) .catch(function (error) {
                    console.log(error);
                });
        } ,
        gettimes2(){
            axios({
                method: 'post',
                url: 'active/getParticipateCount',
                params: {
                    userId:this.userId,
                    activeType:5,
                    year: new Date().getFullYear()
                }
            }) .then((res)=> {
                this.number2=res.data
            })
                .catch(function (error) {
                    console.log(error);
                });
        },submit(){
            axios({
                method: 'post',
                url: 'active/participate',
                params: {
                    userId:this.userId,
                    activeId:this.activeId
                }
            }) .then((res)=> {
                this.msg=res.msg;
                this.show=true
            })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getAlreadyActive(){
            axios({
                method: 'get',
                url: 'active/getEnjoyActiveByUserId',
                params: {
                    userId:this.userId,
                    pageNum:1,
                    pageSize:4
                }
            }) .then((res)=>{
                 this.activeComplete=res.data;

            }).catch(function (error) {
                console.log(error);
            });
        },
        getActiveCount(){
             axios({
                method: 'get',
                url: 'active/getParticipateActiveCount',
                params: {
                    departmentid:this.$store.getters.user.departmentid,
                    userId:this.userId 
                }
            }) .then((res)=>{
                console.log(res);
                 this.count=res.data;
            }).catch(function (error) {
                console.log(error);
            });
        },  
        onHide () {
            window.location.reload()
        },
        onShow () {
            console.log('on show')
        },
        submit1(){
                this.$vux.alert.show({title:'请勿重复报名'});
        },
    },
    computed: {
        ...mapGetters(['user'])
    },
    beforeMount () {
        sessionStorage.userRoleId = 4;
    },
    mounted() {
        this.getActivity();
        this.gettimes1();
        this.gettimes2();
        this.getAlreadyActive();
        this.getActiveCount()
    }
};
</script>
<style lang="less" scoped>
.vux-header-title-area, .vux-header .vux-header-title{height: .46rem;}
.grayLine{width:100%;height:.1rem;background:rgba(244,244,244,1);}
.margin-top{margin-top: .24rem;}
    table {
        border-collapse:collapse;
    }
    .table td {
        padding-top:8px;
    }
    .custom-primary-red {
        border-radius: 99px!important;
        border-color: #CE3C39!important;
        color: #CE3C39!important;
    &:active {
         border-color: rgba(206, 60, 57, 0.6)!important;
         color: rgba(206, 60, 57, 0.6)!important;
         background-color: transparent;
     }
    }
.page-body {
    background-color: #efefef;
}
.fAll{
	float:right;
    margin-top: 0.1rem;
    font-size: .12rem;
    line-height:0.27rem;
}
.fRight{
	float:right;
    line-height: 0.45rem;
    font-size:.12rem;
}
.content{width:89%;
        margin:0 auto;
        }
.rightBtn{display:block;width:.15rem;height:.15rem;background-image:url(../../assets/images/icon-rights.png);background-size:100% 100%;float: right;
    margin-top: .15rem;}
 span{ display: block;font-size: 0.8em;}
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
    *{
        margin:0; padding:0;
    }
    ul, li {
        list-style-type:none;
        margin:0;
    }
    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: normal;
    }
    a {
        color: #666;
        text-decoration:none;
    }
    img {
        border:0;
        vertical-align:middle;
    }
    textarea {
        font-family:'Microsoft Yahei';
    }
    body {
        color:#666;
        background:#f4f4f4;
        font-size:.14rem;
        overflow-x:hidden;
    }
    table {
        border-collapse:collapse;
    }
    table tr td{ font-size:.14rem;}
    input {
        border:0;
    }
    .clearfix:after {
        content: " ";
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
        float:left;
        width:44.6%;
        overflow:hidden;
        height:.45rem;
        line-height:.45rem;
        white-space:nowrap;
        font-weight:700;
        text-overflow: ellipsis;
    }
    .fr{
        float:right;
        overflow:hidden;
        height:.45rem;
        line-height:.45rem;
        width:27%;
        margin-right:-0.15rem;
    }
    .p15 {
        padding:0 .2rem;
    }
    .display {
        display:block;
    }
    .header {
        background:#b42f40;
        color:#fff;
        text-align:center;
        padding:3vw 0;
        position:relative;
    }
    .mainbox-top {
        background:#fff;
        width:100%;
        padding:.6rem 0 .06rem 0;
    }
    .mainbox1 {
        background:#fff;
        width:100%;
        padding-top:.1rem;
    }
    .mainbox{
        background:#fff;
        width:100%;
    }
    .weui-cell1 {
        padding-bottom:0;
    }
    .weui-cell__bd1 {
        font-size:.2rem;
    }
    .weui-cells {
        font-size:4.5vw;
    }
    .weui-form-preview__bd {
        text-align:left;

    }
    .barbg {
        background:#f5f5f5;
        border-radius:4px;
        width:85%;
        height:.38rem;
        line-height:.38rem;
        margin:0 auto;
        margin-bottom:.14rem;
        padding-left:.2rem;
        margin-left:0.2rem;
    }
    .barbg span {
        color:#fa7e07;
        font-size:7vw;
    }
    .book {
        text-align:center;
     	padding-top:.2rem;
    }
    .book a {
        display:inline-block;
        border-radius:1vw;

        color:#fff;
        padding:2vw 0;
        width:35vw;

    }
    .active1 {
           background:#9d0e1e;
       }
    .active2 {
           background:#d8d8d8;
     }
    // .table td {
    //     padding:3px;
    // }
    .news {
        margin-top:0;
    }
    .news li {
        border-bottom:1px solid #f3f3f3;
        line-height:12vw;
        font-size:.14rem;
    }
    .header a {
        position:absolute;
        left:3vw;
        display:inline-block;
        color:#fff;
    }
    .red {
        color:red;
    }
    .dbsy li {
        border-bottom:1px solid #f3f3f3;
        padding:4vw 0 1vw;
    }
    .title_p {
        padding:2vw 0 3vw;
    }
.p15 span{background-color:#FFFFFF!important;}
.total {color:#fa7e07;
        font-size:0.15rem;
        font-weight:bold;
        display:inline-block;
        margin-top:11px;
}















</style>
