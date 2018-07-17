<template>
    <div class="page-body disabled-tabbar" id="nameSc">
        <x-header>
            全部活动
        </x-header>
          <!-- <tab v-model="tabIndex" :line-width="5" active-color="#666" bar-active-color="#a0333b" custom-bar-width="1rem">
                    <tab-item class="tabitem">
                        <b> <span @click="toggle">已报名</span></b>
                    </tab-item>
                    <tab-item class="tabitem">
                        <b><span @click="noSign">未报名</span></b>
                    </tab-item>
                </tab> -->
    <div>
        <tab>
            <tab-item selected @on-item-click="toggle">已报名 ({{activeCount}})</tab-item>
            <tab-item @on-item-click="noSign">未报名 ({{unactiveCount}})</tab-item>
        </tab>
    </div>
        <div class="group-item">
            <flexbox  style="text-align: center" v-if="activeCount === 0|unactiveCount === 0 &&infoM.length==0">
                <div style="margin:auto;margin-top:50%">
                    <img style="width:.9rem;height:1.2rem;" src="@/assets/images/icon-noRecord.png" alt="">
                    <p style="color: #CCC;">暂无信息</p>
                </div>
            </flexbox>
            <div class="allLine" v-for="(item,index) in infoM" :key="index">
                <div style="position:relative">
                    <span class="colorL">活动名称：</span>
                    <span class="colorW">{{item.activeName}}</span>
                    <div v-if="item.activeType === 5">
                        <img style="position:absolute;right:20px;top:3px;" src="@/assets/images/activeDetail.png" alt="">
                    </div>
                </div>
                <div>
                    <span class="colorL">活动时间：</span>
                    <span class="colorW">{{item.startTime|formatDuring}}~{{item.endTime|formatDuring}}</span>
                </div>
                <div>
                    <span class="colorL">地点：</span>
                    <span class="colorW">{{item.activePace}}</span>
                </div>
                <div>
                    <span class="colorL">发起人：</span>
                    <span class="colorW">{{item.activeCreatePeopleName}}</span>

                </div>
                <div>
                    <span class="colorL">活动内容：</span>
                    <span class="colorW">{{item.active_Context}}</span>

                </div>
                <div class="book" v-if="item.signupstatus == 2">
                    <a @click="submit(item.id)">报名</a>
                </div>
                <div class="book"  v-if="item.signupstatus == 1">
                    <!-- <a  style="background-color: #8b8b8b" @click="submit1(item.id)">已报名</a> -->
                    <a  style="background-color: #8b8b8b">已报名</a>
                </div>
                <div class="grayLine"></div>
            </div>
        </div>
        <div v-transfer-dom>
            <alert v-model="show" :title="msg" @on-show="onShow" @on-hide="onHide">谢谢</alert>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { XHeader, GroupTitle, cookie,Flexbox, FlexboxItem, Tab, TabItem,XButton ,Alert,TransferDomDirective as TransferDom} from 'vux';
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
        Alert,
        Tab,
        TabItem,
    },
    filters: {
        formatDuring: function (value) {
            if(value == "" || value == null || value == undefined){
                var value="无"
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
    data() {
        return {
            departmentid:this.$store.getters.user.departmentid,
            active : [],
            unactive : [],
            show:false,
            msg:'',
            userId:cookie.get('userId'),
            isActive:false,
            infoM:[],
            tabIndex:"1",
            activeCount : 0,
            unactiveCount : 0
        }
    },
    methods:{
        getActivityMore(){
            axios({
                method: 'get',
                url: 'active/getParticipateActive',
                params: {
                    pageNum:1,
                    pageSize:200,
                    departmentid:this.departmentid,
                    userId:this.$store.getters.user.userid
                }
            }).then((res)=> {
                res.data.list.forEach(element => {
                    if(element.signupstatus == 1)
                    {
                        this.active.push(element);
                    }
                    else
                    {
                        this.unactive.push(element);
                    }
                    this.infoM = this.active;
                    this.activeCount = this.active.length;
                    this.unactiveCount = this.unactive.length;
                });
                //this.active=res.data.list;
            }).catch(function (error) {
                    console.log(error);
                });
        },
    submit(id){
       axios({
            method: 'post',
            url: 'active/participate',
            params: {
                userId:this.userId,
                activeId:id,
                departmentid:this.departmentid
            }
        }) .then((res)=> {
            this.msg=res.msg,
            this.show=true
        })
            .catch(function (error) {
                console.log(error);
            });
    },
        submit1(id){
            this.$vux.alert.show({title:'请勿重复报名'});
        },
    onHide () {
        window.location.reload()
    },
    onShow () {
        console.log('on show')
    },
    datePick(s){
	Date.prototype.toLocaleString = function(){
		return this.getFullYear() +'.'+ (this.getMonth()+1)+'.'+this.getDate()
	}
	return new Date(s).toLocaleString();
    },
    toggle(){
        // alert("111");
        this.infoM = [];
        this.infoM = this.active;

    },
    noSign(){
        // alert("3333");
        this.infoM = [];
        this.infoM = this.unactive;
    },
    } ,
    mounted() {
        this.getActivityMore();
        console.log(this.unactive);

    }
}
</script>

<style lang="less" scoped>
// .span{
//     display:inline-block;
//     width:0.5rem;
// }
.tabitem{
    border: 0px!important;
    box-sizing: border-box!important;
    // background: linear-gradient(to right, rgb(185, 54, 71), rgb(155, 10, 26))!important;
     background-color:none!important;

    
    color:#fff!important;
}
// .vux-tab .vux-tab-item{
//     background: transparent!important;
// }

.page-body{
	flex: 1;
}
.grayLine{width:100%;height:.1rem;background:#F3F3F3;}
.allLine:last-child .grayLine{height:0;}
.group-item {
    -webkit-overflow-scrolling : touch;
    width:100%;
    input,
    textarea {
        display: block;
        width: 100%;
        padding: 0.06rem 0.08rem;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: rgba(0, 0, 0, 0.05);
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
    font-size:4vw;
}

table {
    border-collapse:collapse;
}
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
}
.fr {
    float:right;
}
.p15 {
    padding:4vw;
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
.mainbox {
    background:#fff;
    width:100%;
}
.weui-cell1 {
    padding-bottom:0;
}
.weui-cell__bd1 {
    font-size:6vw;
}
.weui-cells {
    font-size:4.5vw;
}
.weui-form-preview__bd {
    text-align:left;

}

.mainbox1 {
    padding:4vw 4vw 1vw 4vw;
}
.barbg {
    background:#f5f5f5;
    border-radius:1vw;
    padding:0vw 4vw 2vw;
    margin-bottom:3vw;
}
.barbg span {
    color:#fa7e07;
    font-size:7vw;
}
.book {
    text-align:center;
    padding:.2rem 0 .2rem 0;
}
.book a {
    display:inline-block;
    border-radius:1vw;
    background:#B93647;
    color:#fff;
    padding:2vw 0;
    width:35vw;

}
.book.on a {
    background:#d8d8d8;
}

.table td {
    padding:3px;
}
.news {
    margin-top:4vw;
}
.news li {
    border-bottom:1px solid #f3f3f3;
    line-height:12vw;
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

.weui-media-box__desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.newsa {
    width:70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
}
.group-item{
    margin-top: .5rem!important;
}
 .allLine {
        width: 100%;
        overflow: hidden!important;
        margin: 0.1rem auto .1rem!important;
    }
    span {
        display: table-cell;
        line-height: 1.44
    }

    .colorL {
        width: .78rem;
        height: .3rem;
        font-size: .14rem;
        font-family: PingFangSC-Regular;
        color:#999;
        padding-left:0.2rem;
        line-height: .3rem;
        margin-left: 5.3%;
    }

    .colorW {
        height: .3rem;
        font-size: .14rem;
        font-family: PingFangSC-Medium;
        color:#666;
        line-height: .3rem;
        margin-left: .1rem;
        padding-right:0.32rem;
    }

.vux-header .vux-header-title > span{
    display: inline-block;
    padding: 0 0.2rem;
    }
</style>
<style>
#nameSc .vux-tab{
    background-color:transparent!important;
}

</style>