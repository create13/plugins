<template>
    <div class="page-body">
        <div class="logo-top"></div>
        <!-- <div class="logo-pic"></div> -->
        <div class="last-content">
            
            <!-- <div class="tiles">
                <span></span>
                <div>上海陆家嘴金融贸易区综合党委</div>
                <span></span>
            </div> -->
            <div class="inputs">
                <div class="input-all clearfix">
                    <span class="icon-phone1 "></span>
                    <!-- <popup-picker
                        :data="pickerList"
                        :columns="1"
                        :show-name="true"
                        :value-text-align="'left'"
                        v-model="pickerValue"
                        >
                    </popup-picker> -->
                    
                    <x-button @click.native="PickerVisible = true">
                        <input type="text" style="color:#ccc;margin-top:-15px;margin-left:-11px;" placeholder="请选择管理角色" @click:native="PickerVisible=true" v-model="roleName" readonly/>  
                        {{ }}
                    </x-button>
                    <popup-picker :show.sync="PickerVisible" :columns="1" :show-cell="false" :data="pickerList" v-model="pickerValue" confirm-text="确认" @on-change="roleChange"></popup-picker>
                    <!-- <input type="text" v-model="roleName" style="color:#ccc;" placeholder="请选择管理角色" @click="PickerVisible=true" readonly/> -->
                    <span class="icon-phone2" style="float:right" ></span>
                </div>
                <div class="input-all clearfix">
                    <span class="icon-phone"></span>
                    <input type="text" v-model="account" @keyup.13="keyUpReturn" placeholder="请输入登录用户" />
                </div>
                <div class="input-all clearfix">
                    <span class="icon-key"></span>
                    <input type="password" v-model="pass" @keyup.13="keyUpReturn" placeholder="请输入登录密码" />
                </div>
                <button class="btnSub" @click="login">登录</button>
            </div>
            <!-- <transition name="fade"> -->
                <!-- <div class="picker-box" v-show="PickerVisible" @click="PickerVisible=false"> -->
                    <!-- <popup-picker id="picker"
                        :data="pickerList"
                        :column-width="[]"
                        :fixed-columns="1"
                        :columns="1"
                        v-model="pickerValue"
                        @on-change="roleChange"
                        >
                    </popup-picker> -->
                     <!-- <picker id="picker"
                        :data="pickerList"
                        :column-width="[]"
                        :fixed-columns="1"
                        :columns="1"
                        v-model="pickerValue"
                        @on-change="roleChange"
                        >
                    </picker> -->
                <!-- </div> -->
            <!-- </transition> -->
        </div>
        
    </div>
</template>
<script>
    import {  Picker,PopupPicker, XButton  } from 'vux';
    export default {
        components: {
            Picker,
            PopupPicker,
            XButton
        },
        data(){
            return {
                account: '',
                pass: '12345678',
                pickerList:[{
                    name: '党支部书记',
                    value: "3"
                    }, {
                    name: '片区负责人',
                    value: "2"
                }],
                pickerValue: [""],
                pickerName : "",
                roleName : "请选择角色",
                PickerVisible:false
            }
        },
        methods:{
            login() {
                if (this.pickerValue[0] == "0")
                    return this.$vux.toast.show({
                        text: '请选择角色',
                        type: 'text',
                        position: 'top'
                    });
                if (!this.account)
                    return this.$vux.toast.show({
                        text: '请输入帐号',
                        type: 'text',
                        position: 'top'
                    });
                if (!this.pass)
                    return this.$vux.toast.show({
                        text: '请输入密码',
                        type: 'text',
                        position: 'top'
                    });
                this.$store.dispatch('login', {
                    name: this.account,
                    password: this.pass,
                    openId: this.$route.query.openId || undefined,
                    userType : this.pickerValue[0]
                }).then(result => {
                        if(result.status){
                            var roleId = result.entry.roleId;
                            sessionStorage.userRoleId = roleId;
                            if(roleId == 2)
                            {
                                this.$router.push({
                                    path: 'points/review'
                                })
                            }
                            else if(roleId == 3)
                            {
                                this.$router.push({
                                    path: 'points/evaluation'
                                })
                            }
                            else
                            {
                                this.$router.push({
                                    path: '/main' + roleId
                                })
                            }
                            
                        }else{
                            this.$vux.toast.show({
                                text: result.message,
                                width: '18em',
                                type: 'text',
                                position: 'top'
                            })
                        }
                    }
                )
            },
            keyUpReturn()
            {
                this.login();
            },
            pickerChange(closeType){
                if(closeType)
                {
                    console.log("",closeType)
                }
            },
            roleChange(value){
                this.pickerValue = value;
                if(value == "3")
                {
                    this.roleName = this.pickerList[0].name;
                }
                else if(value == "2")
                {
                    this.roleName = this.pickerList[1].name;
                }
            }
        },
        mounted(){
            document.body.classList.add('login-manage');
        },
        beforeDestroy () {
            document.body.classList.remove('login-manage');
        }
    }
</script>
<style>
    .login-manage .vux-popup-dialog {
        background-color: #eee !important;
    }
</style>

<style scoped>
    .page-body{
        position: absolute;
        top: 0px;
        left:0px;
        right:0px;
        bottom:0px;
        display:flex;
        flex-direction: column;
        }
    .logo-top{
        position: absolute;
        top:0;
        width:100%;
        height: 1.67rem;
        background: url(../assets/images/new-logo-new.png) no-repeat;
        background-size:100% 100%;
        /* z-index:1; */
    }
    .logo-pic{
        position: absolute;
        /* margin:1.35rem auto 0; */
        top:1.15rem;
        left:50%;
        /* z-index:1; */
        width:1.1rem;
        height:1.1rem;
        margin-left:-.55rem;
        box-shadow: 0px 2px 5px 0px rgba(144,144,144,0.5);
        border-radius:18px;
        background:#fff url(../assets/images/iconw-bigpic.png) no-repeat center;
        background-size:70% 70%;
    }
    .last-content{
        width:80%;
        height: auto;
        /* margin: .2rem auto; */
        margin: 2.46rem auto 0;
    }
    .tiles{
        width:100%;
        text-align:center;
        /* text-shadow:0 1px 1px #F2CE8F; */
        font-size:0;
        display: table-cell;
        vertical-align: middle;
    }
    .tiles div{
        display: inline-block;
        font-size:.16rem;
        line-height:.21rem;
        color:rgba(227,192,140,1);
        padding:0 .1rem;
        height:.21rem;
    }
    .tiles span{
        display: inline-block;
        height: .1rem;
        width: .11rem;
        /* margin-top:.05rem; */
        background:#fff url(../assets/images/icon-star.png) no-repeat 100% 100%;
        background-size:cover;
        color:rgba(227,192,140,1);
        /* vertical-align: middle; */
    }
    .inputs{
        width:100%;
        /* margin:0.72rem auto; */
        height:auto;
        margin: 0.3rem auto 0;
    }

    .input-all {
        height: 0.36rem;
        line-height: 0.36rem;
        padding-left: 0.36rem;
        padding-right: 0.11rem;
        position: relative;
        background:rgba(255,255,255,1);
        box-shadow: 0px 1px 5px 0px rgba(150,150,150,0.5);
        border-radius:18px;
        margin-bottom:.26rem;
    }
    .input-all input{
        width: 79%;
        outline: 0px;
        background-color: transparent;
        display: block;
        height: 0.36rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 0px;
        color:#999;
        position: absolute;
        font-size: 0.14rem;
        margin-left: 0.05rem;
    }
     ::-webkit-input-placeholder{
         color:#ccc;
     }
    .icon-phone{
        display:block;
        float: left;
        width:.1rem;
        height: .16rem;
        background:url(../assets/images/new-phone.png) no-repeat;
        background-size:100% 100%;
        margin:.1rem .11rem .1rem -.2rem;
    }
    .icon-phone1{
        display:block;
        float: left;
        width:.1rem;
        height: .16rem;
        background:url(../assets/images/new-phone1.png) no-repeat;
        background-size: 110% 85%;
        margin: .1rem .11rem .1rem -.2rem;
        vertical-align: middle;
        margin-top: 12px;
    }
    .icon-phone2{
        display:block;
        float: left;
        width:.1rem;
        height: .16rem;
        background:url(../assets/images/Triangle.png) no-repeat;
        background-size: 100% 40%;
        margin: .1rem .11rem .1rem -.2rem;
        vertical-align: middle;
        margin-top: 16px;
    }
    .icon-key{
        display:block;
        float: left;
        width:.14rem;
        height: .16rem;
        background:url(../assets/images/new-sock.png) no-repeat;
        background-size:100% 100%;
        margin:.1rem .11rem .1rem -.24rem;
    }
    .btnSub{
        width:100%;
        height:.36rem;
        line-height:.36rem;
        background:linear-gradient(180deg,rgba(194,81,72,1),rgba(180,56,44,1));
        box-shadow: 0px 1px 5px 0px rgba(150,150,150,0.5);
        border-radius:21px;
        border:0;
        font-size: .14rem;
        color:#fff;
    }
    .picker-box {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    .vux-picker{
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #333;
        background: #fff;
    }
    vux-popup-picker-container>.vux-1px-b{
        background-color: #fefefe!important;
    }
    .vux-popup-picker-container>.vux-popup-header{
        background-color: #fefefe!important;
    }
    .vux-cell-box:not(:first-child):before{
        border:0!important;
    }
    .weui-btn{
        position: absolute;
        background-color: transparent;
        width: 83%;
        height: 30px;
    }
    .weui-btn:after{
        width: 0!important;
        height: 0!important;
    }
    /* 淡入淡出 */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
<style scoped>
    .vux-popup-dialog {
        background-color: rgba(0,0,0,1) !important;
        background: #fefefe !important;
    }
    .vux-popup-picker-container
    {
        background: #fefefe !important;
    }
    .scroller-item {
        background-color: #fff !important;
    }

    .scroller-mask
    {
        -webkit-transform: translateZ(0px);
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,0.95)), to(rgba(255,255,255,0.6))), -webkit-gradient(linear, left bottom, left top, from(rgba(255,255,255,0.95)), to(rgba(255,255,255,0.6)));
        background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)), linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
    }
    </style>

