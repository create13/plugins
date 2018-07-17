<template>
    <div class="page-body">
        <x-header :left-options="{showBack: false}">
            党员信息
        </x-header>
        <div class="header-top">上海中心片区支部信息一览</div>
        <div class="overFs">
            <section class="mainbox" v-for="(item,index) in partyDetail" :key="index" @click="handle(item.departmentid)">
            <div style="padding:2vw 3.5vw 2vw;" >
                <table width="100%" class="table" >
                    <tr valign="top">
                        <td width="70" class="grayColors">支部名称：</td>
                        <td class="f_b blackColors">{{item.departmentname}}</td>
                        <td rowspan="3" style="width:.24rem;position:relative;"><span class="pic-icon"></span></td>
                    </tr>
                    <tr>
                        <td class="grayColors">支部书记：</td>
                        <td class="f_b blackColors">{{item.partyBranch}}</td>
                    </tr>
                    <tr>
                        <td class="grayColors">支部人数：</td>
                        <td class="f_b blackColors"><span class="red">{{item.people}}</span> 人</td>
                    </tr>
                </table>
            </div>


        </section>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
import { XHeader, GroupTitle, Flexbox, FlexboxItem, XButton } from 'vux';
export default {
    components: { XHeader, GroupTitle, Flexbox, FlexboxItem, XButton },
    data() {
        return {
            partyDetail:''

        }
    },
    methods: {
        handle(id){
            this.$router.push({
                path: '/party/information/:departmentid',
                name: 'information',
                params: {
                    departmentid:id
                },
                query: {
                    departmentid:id
                }
            })
        },
        getDepartment(){
            axios({
                method: 'get',
                url: 'pdepartment/getList',

            }) .then((res)=> {
                this.partyDetail=res.data;
            console.log(res.data)
        }).catch(function (error) {
                console.log(error);
            })
        }

    },
    mounted() {
        this.getDepartment()
    }
};
</script>

<style lang="less" scoped>
.floaLft{
    float: left;
}
.pic-icon{
    position:absolute;
    display: block;
    width:.24rem;
    height: .24rem;
    margin-top:-.12rem;
    top:50%;
    background: url(../../assets/images/icon-ses1.png) no-repeat;background-size: 100% 100%;
}
.overFs{
    height:calc(100% - .46rem);
    overflow-y: scroll;
}
.header-top{
    width:100%;
    height: .57rem;
    line-height:.57rem;
    text-align: center;
    font-size:.16rem;
    font-family:PingFangSC-Semibold;
    color:rgba(51,51,51,1);
    background-color:#fff;
    position: relative;
    z-index: 500;
     font-weight: 700;
     box-shadow:0 2px 5px 1px rgba(0, 0, 0, 0.05);

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
.table{
    font-size:.14rem;
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
    padding:2vw 2vw;
    margin:.15rem 5.3%; 
    border-radius: 4px;
    box-shadow: 0px 3px 8px 6px rgba(0,0,0,0.01);
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
.grayColors{
    color:#999;
}
.book.on a {
    background:#d8d8d8;
}

.table td {
    padding:1px;
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
    color:#BB3D47;
}
.dbsy li {
    border-bottom:1px solid #f3f3f3;
    padding:4vw 0 1vw;
}
.title_p {
    padding:2vw 0 3vw;
}
















</style>
