<template>
    <div id="loginPage">
        <img src="@/assets/images/iconw-bigpic.png" class="icon-pic">
        <div id="myForm">
            <div class="input-all clearfix">
                <div class="left-content">
                    <i class="img-phone"></i>
                    <label class="font-label">账号</label>
                </div>
                <input type="text" v-model="account" placeholder="输入登录账号" />
            </div>
            <div class="input-all clearfix">
                <div class="left-content">
                    <i class="img-locks"></i>
                    <label class="label-lock">密码</label>
                </div>
                <input type="password" v-model="pass" placeholder="输入登录密码" />
            </div>
            <button type="button" class="btn-dl" @click="login">登录</button>
        </div>
    </div>
</template>
<script>
import { XImg, Icon } from 'vux';
export default {
    data() {
        return {
            account: '',
            pass: ''
        };
    },
    components: {
        XImg,
        Icon
    },
    methods: {
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
            this.$store
                .dispatch('login', {
                    name: this.account,
                    password: this.pass,
                    openId: this.$route.query.openId || undefined
                })
                .then(result => {
                    sessionStorage.userRoleId = 4;
                    if (result.status) {
                        this.$router.push({
                            path: this.$route.query.toPath || '/'
                        });
                    } else {
                        this.$vux.toast.show({
                            text: result.message,
                            width: '18em',
                            type: 'text',
                            position: 'top'
                        });
                    }
                });
        }
    }
};
</script>
<style scoped>
#loginPage {
    background: url(../assets/images/iconw-bg.png) no-repeat;
    background-size: 100% 100%;
    background-color: #b98042;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.icon-pic {
    width: 1.4rem;
    height: 1.2rem;
    display: block;
    margin: 0.8rem auto 0;
}
#myForm {
    width: 86%;
    margin: 0.5rem auto 0;
}
#myForm .input-all {
    height: 0.42rem;
    line-height: 0.42rem;
    padding-left: 0.61rem;
    padding-right: 0.3rem;
    border-bottom: 2px solid #d1826c;
    position: relative;
    width: calc(100% - 0.91rem);
}
.input-all input {
    outline: 0px;
    width: 75%;
    background-color: transparent;
    display: block;
    height: 0.32rem;
    box-sizing: border-box;
    border: 0px;
    color: #fff;
    position: absolute;
    top: 0.08rem;
    font-size: 0.14rem;
    margin-left: 0.1rem;
}
.input-all .check {
    width: 0.21rem;
    height: 0.21rem;
    float: right;
    margin-right: -27px;
    margin-top: 13px;
}
.input-all .left-content {
    width: 0.61rem;
    height: 0.32rem;
    float: left;
    margin: 0.05rem 0rem 0.05rem -0.52rem;
}
.font-label {
    color: rgba(255, 255, 255, 0.6);
    display: block;
    margin-left: 0.11rem;
    float: left;
    width: 0.32rem;
    line-height: 0.37rem;
}
.img-phone {
    width: 0.09rem;
    height: 0.14rem;
    background: url(../assets/images/iconw-phone.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    float: left;
    margin-top: 0.12rem;
}
.img-locks {
    width: 0.11rem;
    height: 0.13rem;
    background: url(../assets/images/iconw-key.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    float: left;
    margin-top: 0.12rem;
}
.label-lock {
    color: rgba(255, 255, 255, 0.6);
    display: block;
    margin-left: 0.09rem;
    float: left;
    width: 0.32rem;
    line-height: 0.37rem;
}
.passAbout {
    margin-top: 0.14rem;
    font-size: 0.14rem;
}
.forget {
    width: 0.61rem;
    height: 0.17rem;
    color: #ddd;
    float: right;
}
.changePass {
    width: 0.61rem;
    height: 0.17rem;
    color: #ddd;
    float: left;
}
.clearfix:after {
    display: block;
    clear: both;
    content: '';
    visibility: hidden;
    height: 0;
}
.clearfix {
    zoom: 1;
}
.btn-dl {
    margin: 1rem auto 0;
    display: block;
    width: 77.4%;
    height: 0.42rem;
    line-height: 0.42rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    text-align: center;
    font-size: 0.16rem;
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.2);
}
</style>
