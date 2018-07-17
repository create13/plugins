<template>
    <div class="page-body"> 
        <x-header>更改初始密码</x-header>
        <div id="changPwd">
            <div id="myForm">
                <div class="input-all clearfix">
                    <div class="left-content">
                        <i class="img-phone"></i>
                        <label class="label-name">请输入账户名</label>
                    </div>
                    <input type="text" v-model="account" placeholder="" />
                </div>
                <div class="input-all clearfix">
                    <div class="left-content">
                        <i class="img-locks"></i>
                        <label class="label-lock">请输入原密码</label>
                    </div>
                    <input type="password" v-model="pass" placeholder="" />
                </div>
                <div class="input-all clearfix">
                    <div class="left-content">
                        <i class="img-locks"></i>
                        <label class="label-lock">请输入新密码</label>
                    </div>
                    <input type="password" v-model="newPass" placeholder="" />
                </div>
                <div class="input-all clearfix">
                    <div class="left-content">
                        <i class="img-locks"></i>
                        <label class="label-lock">请确认新密码</label>
                    </div>
                    <input type="password" v-model="confrimNewPass" placeholder="" />
                </div>
                
                <div class="input-all clearfix">
                    <div class="attention">
                        <span>注意：</span>
                        <p>密码必须是8-20个英文字母、数字或符号（除空格）。</p>
                    </div>
                </div>
                <button type="button" :class="!this.account?'changPwdBefore':'changPwdAfter'" @click="change">更改密码</button>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { XImg, Icon,XHeader } from 'vux';
export default {
    data() {
        return {
            account: '',
            pass: '',
            newPass: '',
            confrimNewPass:''
        };
    },
    components: {
        XImg,
        Icon,
        XHeader
    },
    // filters:{
    //     colorChange: function (value) {
    //         try {
    //             /* if(value===null) throw "";*/
    //             if(!this.account)  throw "changPwdBefore";
    //             if(this.account)  throw "changPwdAfter";
    //         }
    //         catch(err) {
    //             return value=err;
    //         }

    //     }
    // },
    methods: {
        change() {
            if (!this.account)
                return this.$vux.toast.show({
                    text: '请输入帐号',
                    type: 'text',
                    position: 'top'
                });
            if (!this.pass)
                return this.$vux.toast.show({
                    text: '请输入原密码',
                    type: 'text',
                    position: 'top'
                });
            if (!this.newPass)
                return this.$vux.toast.show({
                    text: '请输入新密码',
                    type: 'text',
                    position: 'top'
                });
            if (!this.confrimNewPass)
                return this.$vux.toast.show({
                    text: '请再次输入新密码',
                    type: 'text',
                    position: 'top'
                });
            if(this.newPass != this.confrimNewPass)
            {
                return this.$vux.toast.show({
                    text: '两次输入的密码不一致',
                    type: 'text',
                    position: 'top'
                });
            }    
            Vue.http.post('puser/updatePwd', {
                    name: this.account,
                    password: this.pass,
                    rePassWord: this.newPass
                })
                .then(result => {
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
<style lang="less" scoped>
#changPwd{
    padding:.2rem;
    .label-name{
        font-size: .14rem;
        color: #666;
    }
    .label-lock{
        font-size: .14rem;
        color: #666;
    }
    input{
        display: block;
        width: 100%;
        height: .36rem;
        outline: 0;
        background-color: transparent;
        box-sizing: border-box;
        box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.1);
        color: #999;
        border:0;
        border-radius: .04rem;
        font-size: .14rem;
        margin-top: .1rem;
        margin-bottom: .1rem;
        padding:.1rem;
    }
    .changPwdBefore{
        position: fixed;
        bottom: .2rem;
        width: 90%;
        height: .4rem;
        font-size: .16rem;
        font-family:PingFangSC-Medium;
        background:#D8D8D8;
        color: #fff;
        border-radius: 4px;
        border: 0;
    }
    .changPwdAfter{
        position: fixed;
        bottom: .2rem;
        width: 90%;
        height: .4rem;
        font-size: .16rem;
        font-family:PingFangSC-Medium;
        background:#B93647;
        color: #fff;
        border-radius: 4px;
        border: 0;
    }
    .attention{
        width:3.35rem;
        height:.5rem; 
        font-size:.14rem;
        font-family:PingFangSC-Medium;
        color:rgba(185,54,71,1);
    }
}
</style>
