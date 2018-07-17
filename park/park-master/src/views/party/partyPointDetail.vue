<template>
    <div class="page-body">
        <x-header :left-options="{showBack: true}">
            党员积分信息
        </x-header>
        <section class="mainbox">
            <div style="padding:0 .2rem;">
                <table width="100%" class="table">
                    <tr>
                        <td width="100" class="grayColors">党员姓名：</td>
                        <td class="f_b blackColors">{{name1}}</td>
                    </tr>
                    <tr>
                        <td class="grayColors">现有党支部：</td>
                        <td class="f_b blackColors">{{departmentname}}</td>
                    </tr>
                    <tr>
                        <td class="grayColors">党支部书记：</td>
                        <td class="f_b blackColors">{{partyBranch ||''}}</td>
                    </tr>
                    <tr>
                        <td class="grayColors">现有积分：</td>
                        <td class="f_b"><span class="red">{{totalscore||0}}</span></td>
                    </tr>
                </table>
            </div>


        </section>

        <section class="mainboss2" >
            <div class=" clearfix p15 display">
                <span class="fl weui-cell__bd1" style="padding-left:.2rem">积分获取明细</span>
            </div>
            <div style="padding:0 .2rem;">
                <div class="my-table"  v-for="(item,index) in pointdetail" :key="index" id="myTableBox">
                    <table width="100%" class="table" >
                        <tr>
                            <td width="100" class="grayColors">获取时间：</td>
                            <td class="f_b">{{item.scoreTime|formatDuring}}</td>
                        </tr>
                        <tr>
                            <td class="grayColors">积分类型：</td>
                            <td class="f_b">{{item.detailTitle}}</td>
                        </tr>
                        <tr v-if="item.approvedName">
                            <td class="grayColors">审核人：</td>
                            <td class="f_b">{{item.approvedName}}</td>
                        </tr>
                        <tr v-if="item.recordId == 1">
                            <td class="grayColors">活动内容：</td>
                            <td class="f_b">{{item.recordDesc}}</td>
                        </tr>
                        <tr v-show="!item.approvedName">
                            <td class="grayColors">审核人：</td>
                            <td class="f_b">{{item.adderName||'系统自动'}}</td>
                        </tr>
                        <tr>
                            <td valign="top" class="grayColors">积分变动：</td>
                            <td class="f_b"><span :class="[item.score>0?'darkColors':'lightColors']">{{item.score|Upper}}</span></td>
                        </tr>
                    </table>
                </div>
            </div>

        </section>


    </div>
</template>

<script>
    import axios from 'axios'
import { XHeader, GroupTitle, Flexbox, FlexboxItem, XButton } from 'vux';
export default {
    components: { XHeader, GroupTitle, Flexbox, FlexboxItem, XButton },
    data() {
        return {

            partyBranch:'',
            name1:'',
            departmentname:'',
            totalscore:'',
            pointdetail:'',


        }
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
                return new Date(value).toLocaleString();}
        },
        Upper: function (value) {
             return value> 0 ? '+' + value : value;
        }
    },

    methods: {
        getUser1() {
            axios.get('ppartymember/queryByUserId', {
                params: {
                    userid:this.$route.params.userid

                }
            }).then(res => {
                this.totalscore=res.data.totalscore;
                this.name1=res.data.name;
                this.departmentname=res.data.departmentname;
                this.departmentid=res.data.departmentid;


                    axios.get('pdepartment/queryById', {
                        params: {
                            departmentid:this.departmentid

                        }
                    }).then(res1 => {
                        this.partyBranch = res1.data.partyBranch
                        console.log(res1);
                    })

            });
        },

      /*  getParams() {


            axios({
                method: 'get',
                url: 'pdepartment/queryById',
                params: {
                    departmentid:this.departmentid

                }
            }) .then((res)=> {
               this.partyBranch=res.data.partyBranch;


                console.log(res.data)
            }).catch(function (error) {
                console.log(error);
            })
        },*/
        getPoint() {

            axios({
                method: 'get',
                url: 'pscoreparty/queryByUserId',
                params: {
                    userid:this.$route.params.userid,
                    year:new Date().getFullYear()
                }
            }) .then((res)=> {
                this.pointdetail=res.data



            }).catch(function (error) {
                console.log(error);
            })




        }
    },mounted() {
     /*
        this.getPoint();*/
        this.getUser1();
        this.getPoint()
        /*this.getParams();*/
    },


};
</script>

<style lang="less" scoped>
#myTableBox:last-child{
    border-bottom:0
}
.my-table{
    padding-top:.1rem;
    padding-bottom:.1rem;
    border-bottom: 1px solid #e4e4e4
}
.mainboss2{
    background: #fff;
    padding-top:2vw;
}
.mainboss{
    background: #fff;
    padding:2vw 0;
}
.darkColors{
    color:#b93647;
}
.lightColor{
    color:#18c119;
}
.grayColors{
    color:#999;
}
.blackColors{
    color:#333;
    font-weight: 600;
    font-family:PingFangSC-Medium;

}
.page-body {
    background-color: #efefef;
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
    padding-top:2vw;
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
.Sheader {
    background:#fff;
    color: #000000;
    text-align:center;
    padding:3vw 0;
    position:relative;
    margin-bottom: 2vw;
}
.mainbox {
    background:#fff;
    padding:2vw 0;
    margin-bottom:2vw;
}
.weui-cell1 {
    padding-bottom:0;
}
.weui-cell__bd1 {
    font-size:.2rem;
    font-weight: 600;

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
    padding:2vw 0 5vw 0;
}
.book a {
    display:inline-block;
    border-radius:1vw;
    background:#9d0e1e;
    color:#fff;
    padding:2vw 0;
    width:35vw;

}
.book.on a {
    background:#d8d8d8;
}
.table{
    // margin-bottom:.2rem;
    padding: 0 .2rem;
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
    color:#b93647;
    font-weight: 600;
}
.dbsy li {
    border-bottom:1px solid #f3f3f3;
    padding:4vw 0 1vw;
}
.title_p {
    padding:2vw 0 3vw;
}
















</style>
