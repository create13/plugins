<template>
    <div class="page-body">
        <div class="all-bg">
            <div class="header-title">
                <p class="p-line">
                <span>
                组织生活名称：
                </span>
                    <span>
                    {{activeName}}
                    </span>
                </p>
                <p class="p-line">
                <span>
                签到时间：
                </span>
                    <span>
                    {{datePick(new Date())}}
                    </span>
                </p>
            </div>
            <div class="success">
                <div class="msgActive">
                {{activeMsg}}
                </div>
                <h2>
                {{sucStates}}
                </h2>
                <h1>
                {{userName}}
                </h1>
                <button class="btn-return"><router-link to="/main4" style="color:#fff">点击返回</router-link></button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { cookie } from 'vux';
    
export default {
    data(){
        return{
            userName:'',
            dateTime:'',
            activeId:'',
            activeName:'',
            activeMsg:'',
            sucStates:'',
            userId : cookie.get('userId')
            }
        },
    methods:{
     getId(){
        this.activeId =this.$route.params.activeId;
        this.$vux.alert.show({title:this.$route.params.activeId});
    },
    getSign(){
       this.$http.get('active/approved', {
           params: {
               userId: this.userId,
               activeId:this.$route.params.activeId
           }
       })
       .then(res => {
           this.activeMsg = res.msg;
           if(res.success == false){
               this.sucStates = '签到失败';
           }else{
               this.sucStates = '恭喜';
           }
       })
       .catch(err => {
           console.log(err);
       });
    },
    getActiveName(){
			axios({
                url:'active/queryById',
                method:'post',
                headers: {'contentType':'application/x-www-form-urlencode'},
                params:{
               		activeId:this.$route.params.activeId
                }
            }).then(res => {
               this.activeName = res.data.activeName;
            }).catch(err => {
                console.log(err);
            });
       
    },
    getUser() {
        this.$http.get('ppartymember/queryByUserId', {
            params: {
                userid: this.userId
            }
        })
        .then(res => {
            this.userName = res.data.name;
        })
        .catch(err => {
            console.log(err);
        });
    },
    datePick(s){
        Date.prototype.toLocaleString = function(){
            return this.getFullYear() +'年'+ (this.getMonth()+1)+'月'+this.getDate()+'日'+this.getHours()+'时'+this.getMinutes()+'分'
        }
        return new Date(s).toLocaleString();
    }
    },
    components:{
    },
    mounted(){
        this.getUser();
        this.getSign();
        this.getActiveName();
    },
  computed: {
        ...mapGetters(['user'])
    },
    beforeMount(){
        sessionStorage.userRoleId = 4;
    }
};
</script>

<style scoped>
.page-body{
display:flex;
 background: url(../../assets/images/img-bg.png) no-repeat;
 background-size:100% 100%;
 }
.all-bg{
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
bottom:0;
background-color:rgba(0,0,0,0.6)
}
.header-title{
    padding-top: .1rem;
    width: 89.3%;
    background: rgba(250,184,0,1);
    border-radius: 4px;
    padding-bottom: .1rem;
    margin: .3rem auto;
}
.msgActive{
    position:absolute;
    top:.3rem;
    width:100%;
    text-align:center;
    color:#fff;
    font-size:.16rem;
    font-weight:700;
}
.p-line{
width:91%;
font-size:.14rem;
color:rgba(0,0,0,1);
margin:.1rem .2rem 0 .1rem;
}
.p-line span{
display:inline-block;
}
.p-line span:nth-child(1){
font-family:PingFangSC-Regular;
width:1rem;
}
.p-line span:nth-child(2){
font-family:PingFangSC-Medium;
}
.success{
width:80%;
height:2.25rem;
margin:.4rem auto;
 background: url(../../assets/images/img-success.png) no-repeat;
 background-size:80% 88%;
  background-position:50% 56%;
  position:relative;
}
.success h2{
position:absolute;
font-size:.16rem;
top:.95rem;
text-align:center;
height:.24rem;
width:100%;
color:#FA7A00;
}
.success h1{
position:absolute;
font-size:.2rem;
top:1.27rem;
text-align:center;
height:.28rem;
line-height:.28rem;
width:100%;
color:#000000;
}
.btn-return{
position:absolute;
top:1.7rem;
left:26.65%;
width:46.7%;
height:.3rem;
background:rgba(185,54,71,1);
border-radius:4px;
border:0;
color:#fff;
font-size:.16rem;
font-family:PingFangSC-Medium;
 }
</style>
