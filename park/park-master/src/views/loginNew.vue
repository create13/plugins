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
                <span class="icon-phone"></span>
                <input type="text" v-model="account" @keyup.13="keyUpReturn" placeholder="输入登录用户" />
            </div>
            <div class="input-all clearfix">
                <span class="icon-key"></span>
                <input type="password" v-model="pass" @keyup.13="keyUpReturn" placeholder="输入登录密码" />
            </div>
            <button class="btnSub" @click="login">登录</button>
            </div>
            
        </div>

        <div class="bottom">
            <div class="bottomLink">
                <a href="#" class="changPwd"><router-link slot="right" :to="{name:'changPwd'}">更改密码&nbsp;&nbsp;&nbsp;&nbsp;|</router-link></a>
                <a href="#" class="contact"><router-link slot="right" :to="{name:'contect'}">&nbsp;&nbsp;&nbsp;联系工作人员</router-link></a>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return {
                account: '',
                pass: '12345678'
            }
        },
        methods:{
            login() {
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
                    userType : 4
                })
                .then(
                    result =>{
                        if(result.status){
                            var roleId = result.entry.roleId;
                            this.$router.push({
                                path: '/main' + roleId
                            })
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
            }
        },
        mounted(){

        }
    }
</script>
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
        height: 1.77rem;
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
        margin: 2.26rem auto 0;
    }
    .tiles{
        width:100%;
        text-align:center;
        /* text-shadow:0 1px 1px #F2CE8F; */
        font-size:0;
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
        vertical-align: center;
    }
    .inputs{
        width:100%;
        /* margin:0.72rem auto; */
        height:auto;
        margin: 0.5rem auto 0;
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
    .bottom{
        width:80%;
        height: auto;
        margin: 1.0rem auto .1rem;
    }
    .bottomLink{
        margin-left: 26%;
    }
    .bottomLink a{
        color: #B93647;
        font-size: .12rem;
        margin-bottom: .1rem
    }
    
</style>

