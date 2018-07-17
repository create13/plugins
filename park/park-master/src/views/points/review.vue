<template>
    <div class="fixed-tabbar">
        <x-header :left-options="{showBack: false}">
            积分审核
        </x-header>
        <view-box ref="viewBox" body-padding-top="1.0rem" body-padding-bottom=".52rem">
            <div class="header-list cl">
                <div class="list-left">
                    <span class="left-now">当前支部：</span>
                    <span class="left-active">{{partyBranch1}}</span>
                </div>
                <div class="right-btn" @click="showDet">切换<span></span></div>
            </div>
            <tab>
                <tab-item selected @on-item-click="slide">待审核（{{length1  || 0}}）</tab-item>
                <tab-item @on-item-click="slide1">已审核（{{length2 || 0}}）</tab-item>
            </tab>
            <!--<div class="trans-black" v-show="showTrans"></div>-->
            <div class="animate-down" v-show="topShow">
                <div  v-for="(park,index) in department" :key="index" class="bg-flag" :class="[park.departmentid === activesId?'activeColor':'']" @click="change(park)">
                    {{park.departmentname}}
                </div>
            </div>
            <div class="points-table">
                <div  v-show="table1">
                    <flexbox :gutter="0">
                        <flexbox-item>姓名</flexbox-item>
                        <flexbox-item>支部书记</flexbox-item>
                        <flexbox-item>积分</flexbox-item>
                        <flexbox-item>操作</flexbox-item>
                    </flexbox>
                    <flexbox :gutter="0" v-for="(item,index) in list1" :key="index">
                        <flexbox-item>{{item.name}}</flexbox-item>
                        <flexbox-item>{{item.branchName}}</flexbox-item>
                        <flexbox-item>{{item.totalscore||0.0}}</flexbox-item>
                        <flexbox-item>
                            <!--<router-link :to="{name:'Audit'}">
                            <button class="go-btn">去处理</button>
                            </router-link>-->
                            <button class="go-btn" @click="gohandle(item)">去处理</button>
                        </flexbox-item>
                    </flexbox>
                </div>

                <div v-show="!table1">
                    <flexbox :gutter="0">
                        <flexbox-item>姓名</flexbox-item>
                        <flexbox-item>支部书记</flexbox-item>
                        <flexbox-item>积分</flexbox-item>
                        <flexbox-item>操作</flexbox-item>
                    </flexbox>
                    <flexbox :gutter="0" v-for="(item,index) in list2" :key="index">
                        <flexbox-item>{{item.name}}</flexbox-item>
                        <flexbox-item>{{item.branchName}}</flexbox-item>
                        <flexbox-item>{{item.totalscore||0.0}}</flexbox-item>
                        <flexbox-item>
                            <!--<router-link :to="{name:'Audit'}">
                            <button class="go-btn">去处理</button>
                            </router-link>-->
                            <button class="go-btns" @click="gohandle(item)">已审核</button>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>

        </view-box>
    </div>
</template>
<script>
    import axios from 'axios'
    import {XHeader,ViewBox,  Sticky, Panel, TransferDom, Flexbox, FlexboxItem,Tab, TabItem} from 'vux';
    export default{
        data(){
            return {
                itegal:{rights:'',title:'积分审核'},
                topShow:false,
                //showTrans:false,
                slides:-1,
                parks:'',
                partyBranch1:'',
                department:'',
                list1:'',
                list2:'',
                list3:'',
                table1:true,
                departmentid:'',
                length1:'',
                length2:'',
                partyBranch:'',
                activesId:1
            }
        },
        components:{
            XHeader,
            ViewBox,
            Panel,
            Sticky,
            Flexbox,
            FlexboxItem,
            Tab,
            TabItem
        },
        directives: {
            TransferDom
        },
        handlePicker1(){
            this.PickerVisible5=true;
            axios({
                method: 'get',
                url: 'pdepartment/getList'
            }) .then((res)=> {
                this.list1= res.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        methods:{
            getlist(){
                axios({
                    method: 'get',
                    url: 'pdepartment/getList',
                }) .then((res)=> {
                    this.department=res.data;
                    this.partyBranch1 = this.department[0].departmentname;
                    this.departmentid= this.department[0].departmentid;
                    this.slide();
                    axios({
                        method: 'get',
                        url: 'ppartymember/getPartymemberByDepartmentid',
                        params: {
                            departmentid:this.departmentid,
                            status:1//tempint 1 是待审核  tempint null 去处理  tempint 2 是审核通过 tempint 3 已拒绝
                        }
                    }).then((res)=> {
                        this.length2=res.data.length;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (error) {
                    console.log(error);
                })
            },
            showDet(){
                this.topShow = !this.topShow;
                //this.showTrans = !this.showTrans;
            },
            slide(){
                this.table1 = true;
                axios({
                    method: 'get',
                    url: 'ppartymember/getPartymemberByDepartmentid',
                    params: {
                        departmentid:this.departmentid,
                        status:0//status 0 是待审核  status 1 已审核  tempint 2 是审核通过 tempint 3 已拒绝
                    }
                }) .then((res)=> {
                    this.list1=res.data;
                    this.length1=res.data.length;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            slide1(){
                this.table1 = false;
                axios({
                    method: 'get',
                    url: 'ppartymember/getPartymemberByDepartmentid',
                    params: {
                        departmentid:this.departmentid,
                        status:1//tempint 1 是待审核  tempint null 去处理  tempint 2 是审核通过 tempint 3 已拒绝
                    }
                }).then((res)=> {
                    this.list2=res.data;
                    this.length2=res.data.length;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            change(park){
                let temp = this.table1;
                this.activesId = park.departmentid;
                this.partyBranch1 = park.departmentname;
                this.departmentid = park.departmentid;
                this.partyBranch = park.partyBranch;

                this.topShow = !this.topShow;
                this.showTrans = !this.showTrans;
                this.slide1();
                this.slide();
                this.table1 = temp;
            },
            gohandle(item){
                this.$router.push({
                    path: '/points/audit',
                    name: 'Audit',
                    params: {
                        partmentId:item.id,
                        name:encodeURI(item.name),
                        departmentId:item.departmentid,
                        userId:item.userid
                    }
                });
            }
        },
        mounted(){
            this.getlist()
        }
    }
</script>
<style>
.vux-tab .vux-tab-item{
    font-size: .16rem!important;
}
    .vux-tab-ink-bar{
        position: absolute;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color:#B93647!important;
        text-align: center;
        width: .8rem;
        border:0;
        border-radius:100px;
        margin-left: calc(25% - .45rem);
    }
</style>
<style scoped  lang="less">
    .activeColor{color:#CB2F00;}
    .header-list{width:calc(100% - 2px);height:.46rem;border-bottom:1px solid #E4E4E4;
    }

    .vux-header{
        height: .46rem;
        position: fixed;
        left:0;right:0;
        z-index: 30;
    }
    .header-list{
        position: fixed;
        left: 0;
        right: 0;
        z-index: 30;
        top: .46rem;
        background: #fff;
        height: .5rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e4e4e4;
    }
    .vux-tab-warp{
        position: fixed !important;
        left: 0;
        right: 0;
        z-index: 30;
        top: .96rem;
    }
    .list-left{

        width: 54%;
    margin: .1rem 0 0 5.3%;
    height: .3rem;
    line-height: .3rem;
    font-size: .14rem;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
    .left-now{color:#666666;}
    .left-active{color:#333;
        font-size: 14px;
        font-weight: 600;}
    .right-btn{width:.6rem;height:.24rem;line-height:.24rem;color:#fff; background:rgba(244,151,74,1);border-radius: 4px;text-align: center;float:right;margin:.1rem 5.5% 0 0;padding-left:.07rem;
        font-size: .14rem;
    }
    .right-btn span{width:.1rem;height:.1rem;display:block;float:right;margin:0.07rem ;background-image:url(../../assets/images/icon-downs.png);background-size: 100% 100%;}
    .pop-content{width:100%;height:1.8rem;background-color:rosybrown;}
    .vux-popup-dialog{background-color: transparent;}
    .vux-popup-dialog.vux-popup-top{top:.96rem;}
    .bg-flag{height:.2rem;margin-top:.2rem;}
    .animate-down{
        padding: 0 .2rem .2rem .21rem;
        position: absolute;
        z-index: 521;
        width: calc(100% - 0.41rem);
        background-color: #FFFFFF;
        top: 0.95rem;
        border: 1px solid #E4E4E4;
    }
    .trans-black{position:absolute;z-index:520;background-color:rgba(0,0,0,0.3);top:.96rem;bottom:0px;left:0px;right:0px;}
    ul,li{list-style: none}
    .cl {
        *zoom: 1
    }

    .cl:after {
        clear: both;
        content: '\20';
        display: block;
        height: 0;
    }
        .tabClick{ background: #FFFFFF; overflow: hidden;font-family: simsun;border-bottom:1px solid #e4e4e4;
        clear:both}
    .tabClick li{
        height: 0.48rem;
        font-size: .2rem;
        line-height: .48rem;
        width: 50%;
        float: left;
        text-align: center;
        cursor: pointer;
    }
    .tabClick li.active{ transition: 0.1s; font-weight: bold;}
    .tabClick li a{color:#666;}
    .tabClick li.active a{
        color: #B93647;
        transition: 0.1s;
        font-weight: bold;
        padding: 0 .2rem .12rem;
        border-bottom: 2px solid #B93647;
    }

    /*@import url("animate.css");*/
    .go-btn{
        padding: .05rem .08rem;
        border: 0;
        font-size:.15rem;
        color:#fff;
        line-height:.2rem;
        background:rgba(185,54,71,1);
        border-radius: 4px
    }
    .go-btns{
        padding: .05rem .08rem;
        border: 0;
        font-size:.15rem;
        color:#fff;
        line-height:.2rem;
        background:#F4974A;
        border-radius: 4px
    }
    .points-table {
        box-sizing: border-box;
        border-radius: 5px;
        margin:5px 10px 30px 0px;
        padding: 10px;
        color: #000;
        background: #fff;
        text-align: center;
        .vux-flexbox {
            margin-bottom: 10px;
            text-align: center;
            &:first-child {
                color: #FA7A00;

            }
        }
    }
    .vux-tab .vux-tab-item.vux-tab-selected{
        color: #B93647;
    }
</style>
