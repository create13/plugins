<template>
    <div class="page-body">
        <view-box ref="viewBox" body-padding-top=".46rem">
            <r-header :rfs="contents"></r-header>
            <p class="titles">{{activeData.activeName}}</p>
            <p class="time">{{activeNames}}活动发起人：<span class="dark">{{activeData.activeCreatePeopleName}}</span></p>
            <p class="time">活动时间：<span class="dark">{{activeData.startTime|formatDuring}}~{{activeData.endTime|formatDuring}}</span></p>
            <p class="time">地点：<span class="dark">{{activeData.activePace}}</span></p>
            <div class="artical">
                {{activeData.activeContext}}
                
                <!-- <div class="img-show">
                    <img class="previewer-demo-img" v-for="(item,index) in content.picture" :key="index" :src="item.msrc" @click="show(index)">
                    <div v-transfer-dom>
                        <previewer :list="content.picture || []" ref="previewer" :options="options" @on-index-change="logIndexChange">
                        </previewer>
                    </div>
                </div> -->
                <div class="img-show-pic">
                    <img class="previewer-demo-img" v-for="(item,index) in picList" :src="item.msrc" :key="index"  @click="showPicInfo(index)">
                    <div v-transfer-dom>
                        <previewer :list="picList" ref="previewer2" :options="options" @on-index-change="logIndexChange">
                        </previewer>
                    </div>
                </div>
            </div>
            <p class="allPic">
                <span class="bg-line"></span>
                <span class="picture">活动图集</span>

                <span class="numberz"><span style="color:#ff0000">{{list&& list.length || num}}</span>张</span>
            </p>
            <div class="img-show">
                <img class="previewer-demo-img" v-for="(item,index) in list" :src="item.msrc" :key="index"  @click="show(index)">
                <div v-transfer-dom>
                    <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange">
                    </previewer>
                </div>
            </div>
            <div v-show="roleId != 4 ">
                <p class="allPic">
                    <span class="bg-line"></span>
                    <span class="picture">参与人员</span>
                    <span class="numberz"><span class="color-num">{{participants}}</span>/{{peopleNum}}</span>
                </p>    
                <div class="wz-fonts" :class="[noSpr?'auto':'']">
                    <div v-for="(peopleName,index) in activeData.participate">
                        <span class="noPartici-title">{{index}}：</span>
                        <span style="display:inline-block;" v-for="(peopleName1,index) in peopleName">{{peopleName1.name}}</span>
                    </div>
                </div>
<!--                 
                <div class="btnMore" @click="spread" v-show="btnAn">查看全部参与人员名单<span class="down"></span></div>
                <div class="btnMore" v-show="btnPack" @click="folding"><span style="margin-left:.2rem;">收起</span><span class="up"></span></div> -->


                <p class="allPic">
                    <span class="bg-line"></span>
                    <span class="no-picture">未参与人员</span>
                    <span class="numberz"><span class="color-num">{{Noparticipants}}</span>/{{peopleNum}}</span>
                </p>
                <div class="wz-fonts" :class="[noSpr?'auto':'']">
                    <div v-for="(peopleName,index) in activeData.notParticipate">
                        <span class="noPartici-title">{{index}}：</span>
                        <span style="display:inline-block;" v-for="(peopleName1,index) in peopleName">{{peopleName1.name}}</span>
                    </div>
                </div>
                <!-- <div class="btnMore" @click="noSpread" v-show="nobtnAn">查看全部参与人员名单<span class="down"></span></div> -->
                <!-- <div class="btnMore" v-show="nobtnPack" @click="noFolding"><span style="margin-left:.2rem;"> 收起</span><span class="up"></span></div> -->
                </div>
        </view-box>
    </div>
</template>

<script>
    import Xheader from '@/components/comother/rheader'
    import {Previewer, TransferDom,ViewBox} from 'vux'
    export default {
        directives: {
            TransferDom
        },
        data(){
            return {
                num:0,
                activeData:{},
                picInfo:[],
                list: [],
                picList : [],
                spr:false,
                noSpr:false,
                nobtnPack:false,
                nobtnAn:false,
                btnPack:false,
                btnAn:false,
                peopleNum:null,
                participants:null,
                Noparticipants:null,
                activeNames:'',
                contents:{rights:'',title:'bbb'},
                roleId:this.$store.getters.user.roleid,
                options: {
                    getThumbBoundsFn (index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        },
        components:{
            'r-header':Xheader,
            Previewer,
            ViewBox
        },
        methods:{
            show (index) {
                this.$refs.previewer.show(index)
            },
            showPicInfo (index) {
                this.$refs.previewer2.show(index)
            },
            spread(){
                this.spr = true;
                this.btnAn = !this.btnAn;
                this.btnPack = !this.btnPack;
            },
            folding(){
                this.spr = !this.spr;
                this.btnAn = !this.btnAn;
                this.btnPack = !this.btnPack;
            },
            noSpread(){
                this.noSpr = true;
                this.nobtnAn = !this.nobtnAn;
                this.nobtnPack = !this.nobtnPack;
            },
            noFolding(){
                this.noSpr = !this.noSpr;
                this.nobtnAn = !this.nobtnAn;
                this.nobtnPack = !this.nobtnPack;
            },
            logIndexChange (arg) {
                console.log(arg)
            },
            getData(){
                this.$http.post('active/queryById?activeId='+this.$route.params.activeId
                ).then(res =>{
                    this.activeData = res.data;
                    this.contents.title = res.data.activeTypeName+'详情';
                    this.activeNames = this.activeData.activeTypeName;
                    this.peopleNum = this.activeData.participateCount + this.activeData.notParticipateCount;
                    this.participants = this.activeData.participateCount;
                    this.Noparticipants = this.activeData.notParticipateCount;
                    if(this.participants >= 4){
                        this.btnAn = true
                    }
                    if(this.Noparticipants >= 4){
                        this.nobtnAn = true
                    }
                    if(this.activeData.picIds)
                    {
                        var picIdArr = this.activeData.picIds.split(",")
                        picIdArr.forEach(element => {
                            if(element)
                            {
                                var obj = {};
                                obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId='+element;
                                obj.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId='+element;
                                this.picList.push(obj);
                            }
                        });
                    }
                    

                }).catch(err =>{
                    console.log(err)
                })
            },
            getPic(){
                this.$http.post('active/getActivePictures?activeId='+this.$route.params.activeId

                ).then(res =>{
                    this.picInfo= res.data;
                    for(var d=0 ;d<this.picInfo.length;d++){
                        var obj = {};
                        obj.msrc = 'http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId='+this.picInfo[d].pictureId;



                        obj.src = 'http://dj.dlbdata.cn/dangjian/picture/show?pictureId='+this.picInfo[d].pictureId;



                        this.list.push(obj);
                    }
                }).catch(err =>{
                    console.log(err)
                })
            },
            dataPick(s){
                Date.prototype.toLocaleString = function(){
                    return this.getFullYear() +'年'+ (this.getMonth()+1)+'月'+this.getDate()+'日'
                }
                return new Date(s).toLocaleString();
            }
        },
        mounted(){
            this.getData();
            this.getPic();
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
                    return new Date(value).toLocaleString();
            }}
        }
    }
</script>
<style scoped>
    html,body{
        width:100%;
        height:100%;
        overflow-x:hidden;
    }
    .page-body{
        flex: 1;
    }
    .titles{width:80%;min-height:.25rem; font-size:.2rem;font-family:PingFangSC-Medium;color:rgba(51,51,51,1);line-height:.28rem;margin:.2rem 12% .1rem 8%;}
    .time{width:80%;font-size:.12rem;font-family:PingFangSC-Medium;color:rgba(153,153,153,1);line-height:.17rem;margin-left:8%;margin-top:.1rem;}
    .time .dark{color:#6b6b6b;}
    .artical{width:84%;height:auto; font-size:.14rem;font-family:PingFangSC-Regular;color:rgba(102,102,102,1);line-height:.24rem;margin:.18rem 8% .2rem 8%;text-indent:2em;}
    .artical p{margin-bottom:.1rem;}
    .allPic .bg-line{
        width:3px;
        height:.14rem;
        margin-left:.3rem;
        background: url(../../assets/images/icon-rectangle1.png) no-repeat;
        background-size:100% 100%;
        display:block;
        float: left;
        margin-top:.09rem;
        }
    .picture{width:0.9rem;font-size:.2rem;font-family:PingFangSC-Semibold;color:rgba(51,51,51,1);margin-left:.1rem;display:block;float: left;}
    
    .pictureTotal{
        margin-left: 8%;
    }
    .picture-1{
         margin-top:.1rem;
    }
    .picture-1-title{
        font-size: .14rem;
        font-family:PingFangSC-Semibold;
        color: #666;
    }
    .img-show-pic{height:auto;min-height: 44px;}
    .img-show-pic img{width:90%;margin-left:-5%;margin-top:.1rem;}
    .img-show-pic img:not(:first-child){margin-left:4%;}
    .numberz{ font-size:.14rem;font-family:PingFangSC-Medium;color:rgba(153,153,153,1);display:block;float: left;margin-top: .02rem;}
    .allPic{height:.3rem;line-height:.3rem;overflow:hidden;}
    .img-show{width:84%;height:auto;margin-left:8%;    min-height: 44px;}
    .img-show img{width:32%;height:0.9rem;margin-top:.1rem;}
    .img-show img:not(:first-child){margin-left:2%;}
    .img-left{width:.37rem;height:.37rem;position:absolute;left:.1rem;top:3.15rem;;z-index:900;}
    .img-right{width:.37rem;height:.37rem;position:absolute;right:.1rem;top:3.15rem;z-index:900;}
    .color-num{color:rgba(185, 54, 71, 1);}
    .line-pic{width:87.2%;margin:.1rem 4.8% .2rem 8%;height:.36rem;overflow:hidden;}
    .line-pic img{width:.36rem;height:.36rem;margin-left:.07rem;display:block;float:left;}
    .wz-fonts{
        font-family: PingFangSC-Medium;
        color:rgba(153,153,153,1);
        line-height: .24rem;
        width: 87.2%;
        margin: 10px auto;
        /* word-spacing: .1rem; */
        /* height: 52px; */
        overflow: hidden;
        padding: 0;
        text-overflow:ellipsis;
        white-space: pre-line;
    }
    .wz-fonts.auto{
        height:auto;
        overflow:auto;
    }
    .wz-fonts span{
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        line-height: 12px;
        vertical-align: top;
    }
    .wz-fonts1{
        font-family: PingFangSC-Medium;
        color:rgba(153,153,153,1);
        line-height: .24rem;
        width: 87.2%;
        margin: 10px auto;
        height: 52px;
        overflow: hidden;
        padding: 0;
        text-overflow:ellipsis;
        white-space: pre-line;
    }
    .wz-fonts1.auto{
        height:auto;
        overflow:auto;
    }
    .wz-fonts1 span{
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        line-height: 22px;
        vertical-align: top;
    }
    .noPartici-title{
        display: block !important;
        margin-bottom: .2rem;
        color: #666;
        font-size: .14rem;
        font-family: PingFangSC-Medium;
    }
    .titleClass {
        display: block !important;
        color: #666;
    }
    .contentClass{
        color: #999;
    }
    .no-picture{width:1.1rem;font-size:.2rem;font-family:PingFangSC-Semibold;color:rgba(51,51,51,1);display:block;float: left;margin-left:.1rem;}

    .btnMore{width:1.6rem;height:.3rem;border-radius:15px;margin:.2rem auto;font-size:.1rem;
        font-family:PingFangSC-Medium;
        color:rgba(204,204,204,1);border:1px solid #E4E4E4;line-height:.3rem;text-align:center;
    }
    .down{width:0.1rem;height:0.1rem;display:inline-block;background: url(../../assets/images/icon-down.png) no-repeat;background-size:100% 100%;margin-left:.05rem;}
    .up{width:0.1rem;height:0.1rem;display:block;background: url(../../assets/images/icon-up.png) no-repeat;background-size:100% 100%;float:right;margin-right:.2rem;margin-top:.1rem;}
</style>
