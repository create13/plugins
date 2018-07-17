<template>
    <div class="page-body" style="background-color: #F4F4F4;">
        <view-box ref="viewBox">
            <div class="header">
                <div class="header-top">
                    <div class="top-head">
                        <div class="top-right" :style="{backgroundImage: 'url('+userAbout.avatar+')'}"></div>
                        <div class="top-left">{{dateTime}}，{{userAbout.name}}~</div>
                    </div>
                    <div class="top-bottom">
                        <div class="second-top" >
                            <span class="color-light">所属片区:</span>
                            <span class="color-dark" style="margin-left:.35rem;">{{partAbout.address }}</span>
                        </div>
                        <div class="second-content">
                            <span class="color-light">所属党支部:</span>
                            <!-- <span class="color-dark" style="position:absolute;" :class="partAbout.departmentname.length>16?margin">{{partAbout.departmentname}}</span> -->
                            <span class="color-dark">{{partAbout.departmentname}}</span>
                        </div>
                        <div class="left-bottom">
                            <span class="color-light">党支部书记:</span>
                            <span class="color-dark" style="margin-left:.2rem;">{{partAbout.partyBranch}}</span>
                        </div>
                         <div class="exit" @click="logout">
                             <span>退出登录</span>
                         </div>
                    </div>
                    <!-- <div class="top-second">
                        <div class="second-left">
                            <span class="color-light">片区:</span>
                            <span class="color-dark">{{partAbout.address }}</span>
                        </div>
                        <div class="second-right">
                            <span class="color-light">党支部书记:</span>
                            <span class="color-dark">{{partAbout.partyBranch}}</span>
                        </div>
                    </div>
                    <div class="top-second2">
                        <div class="left-second">
                            <span class="color-light" style="position:relative;">党支部:</span>
                            <span class="color-dark" style="position:absolute;">{{partAbout.departmentname}}</span>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="content">
                <div class="annual"><span style="display: inline-block;margin-top: .06rem;margin-left:-0.1rem;">党员年度参与</span></div>
                <flexbox>
                    <flexbox-item v-for="(user,index) in users" :key='index'>
                        <div class="flex-demo" @click="ItemClick(index)">
                            <div class="fonts-au">{{user.fonts}}</div>
                            <div class="integral">{{user.integral}}</div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="bottom">
                <div class="bottom-top">
                    <span>年度积分分配</span>
                </div>
                <div id="echartShow">

                </div>
            </div>

        </view-box>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Flexbox, FlexboxItem, Tabbar, TabbarItem, ViewBox, cookie } from 'vux';
import echarts from 'echarts';
import axios from 'axios';

export default {
    data() {
        return {
            users: [{ fonts: '年度积分',integral:0}, {fonts: '活动次数',integral:0}],
            userAbout: {},
            departmentid : 0,
            dateTime: '',
            charts: '',
            partAbout: {},
            years:new Date().getFullYear(),
            pictureSex:'',
            userId : cookie.get('userId')
        };
    },
    components: {
        Flexbox,
        FlexboxItem,
        Tabbar,
        TabbarItem,
        ViewBox
    },
    beforeMount () {
        sessionStorage.userRoleId = 4;
    },
    mounted() {
        let datime = new Date().getHours();
        if ((datime >= 5) && (datime < 8)) {
            this.dateTime = '早上好';
        } else if ((datime >= 8) && (datime < 11)) {
            this.dateTime = '上午好';
        } else if ((datime >= 11) && (datime < 13)) {
            this.dateTime = '中午好';
        } else if ((datime >= 13) && (datime < 19)) {
            this.dateTime = '下午好';
        } else {
            this.dateTime = '晚上好';
        }

        this.$nextTick(function() {
//            this.drawAxis('echartShow');
        });

        this.userName();
        this.getUserByScoreInfo();
        this.getUserByActiveInfo();
        this.getScoreByType();
    },
    methods: {
        drawAxis(id,arr1,arr2) {
            let myCharts = echarts.init(document.getElementById(id));
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                radar: [
                    {
                        name: {
                            color: 'rgba(45, 45, 45, 1)',
                            fontFamily: 'PingFang-SC-Regular',
                            fontSize: 12,
                            lineHeight: 17
                        },
                        axisLine: {
                            lineStyle: {
                                color: ['rgba(255, 206, 140, 1)'],
                                opacity: 0.5
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#ffe8c6']
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['#fff4e4', '#ffe8c6', '#fff6e9']
                            }
                        },
                        indicator: arr1,
                        center: ['50%', '50%'],
                        radius: 60
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: { color: '#F5A39C', width: 2 },
                                areaStyle: { color: '#F59D8E', type: 'default' }
                            }
                        },
                        data: [
                            {
                                value: arr2,
                                name: '分数'
                            }
                        ]
                    }
                ]
            };

            myCharts.setOption(option);
            window.onresize = function() {
                myCharts.resize();
            };
        },
        infoDetail() {
            axios.get('pdepartment/queryById', {
                params: {
                    departmentid: this.departmentid
                }
            })
            .then(res => {
                this.partAbout = res.data || {};
            })
            .catch(err => {
                console.log(err);
            });
        },
        userName() {
            console.log('userName', this.user);
            axios.get('ppartymember/queryByUserId', {
                params: {
                    userid: this.userId
                }
            })
            .then(res => {
                this.userAbout = res.data;
                this.pictureSex = res.data.avatar;
                this.departmentid = this.userAbout.departmentid;
        this.infoDetail();
            })
            .catch(err => {
                console.log(err);
            });
        },
        getScoreByType(){
            axios.get('pscoreparty/getProjectScoreByUserId', {
                params: {
                    userId: this.userId,
                    year:new Date().getFullYear()
                }
            }).then(res => {
                let scoreType = res.data;
                let b = scoreType.map(function(value,key,arr){
                    return { text: value.projectName, max: value.score };
                });
                let c = scoreType.map(function(value,key,arr){
                    return value.totalScore;
                });
                this.drawAxis('echartShow',b,c)
            })
            .catch(err => {
                console.log(err);
            });
        },
        getUserByActiveInfo(){
            axios({
                url:'active/getParticipateCount',
                method:'post',
                headers: {'contentType':'application/x-www-form-urlencode'},
                params:{
                  userId: this.userId,
                  year: new Date().getFullYear()
                }
            }).then(res => {
                this.users[1].integral = res.data;
            }).catch(err => {
                console.log(err);
            });
        },
        getUserByScoreInfo(){
            axios.get('pscoreparty/getSumScoreByUserId', {
                params: {
                    userId: this.userId,
                    year:new Date().getFullYear()
                }
            }).then(res => {
                this.users[0].integral = res.data || 0;
            }).catch(err => {
                console.log(err);
            });
        },
        ItemClick(index){
            if(index == 0){
                this.$router.push({name:'pointsName',params:{pictureSex:this.pictureSex}});
            }
            else{
                this.$router.push("active/activeDetail");
            }
        },
        ...mapActions(['logout'])
    },
    computed: {
        ...mapGetters(['user'])
    }
};
</script>

<style scoped>
/* .top-right{
    position:absolute;
    left:0.5rem;
} */

.header {
    width: 100%;
    background: linear-gradient(to right, rgba(185, 54, 71, 1), rgba(155, 10, 26, 1));
   
}
.header-top {
    width: 94%;
    height: 100%;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    /* box-shadow: 0 3px 8px 0 rgba(174, 174, 174, 0.5); */
    /*margin: 0 auto;*/
    position:relative;
    top:.24rem;
    left:3%;
}
.top-head {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0.54rem;
    border-bottom: 1px solid #ededed;
}
.top-left {
    /* float: left;
    margin: 0.02rem 0 0.15rem .17rem;
    height: 0.54rem;
    line-height: 0.54rem;
    font-size: 0.14rem;
    font-weight: 600;
    font-family: PingFangSC-Semibold;
    color:#3E3E3E; */
    height: 0.54rem;
    line-height: 0.54rem;
    font-size: 0.14rem;
}
.top-right {
    width: 0.31rem;
    height: 0.33rem;
    background-repeat:no-repeat;
    background-size: 100% 100%;
}
.top-bottom{
    width: 86%;
    margin: 0 auto;
    font-size: 0.14rem;
    overflow: hidden;
    padding-top:.1rem;
    padding-bottom:.1rem;
}
.second-top{
    margin-bottom: .1rem;
}
.second-content{
    margin-bottom: .1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.second-content .color-light {
    flex-basis: 6em;
}
.second-content .color-dark {
    flex: 1;
    line-height: 1.2;
}
.exit{
    display: block;
    float: right;
    margin-top: -.2rem;
}
.exit span{
    display: inline-block;
    width: .6rem;
    height: .2rem;
    font-size: .12rem;
    text-align: center;
    color: #BBBBBB;
    border: 1px solid #efefef;
    border-radius: 4px;
    background-color: #fcfcfc;
}
.top-second2 {
    width: 82%;
    margin: 0 auto;
    font-size: 0.14rem;
    line-height: 0.17rem;
    padding-top: 0.32rem;
}
.top-second{
    width: 82%;
    margin: 0 auto;
    font-size: 0.14rem;
    line-height: 0.17rem;
    padding-top: 0.21rem;
}
.second-left {
    width: 1.32rem;
    height: 0.17rem;
    float: left;
    overflow: hidden;
}

.second-right {
    float: right;
    margin-right: 0px;
}

.left-second {
    width: 100%;
    height: 0.17rem;
    float: left;
}
.color-light {
    font-family: PingFang-SC-Medium;
    color: rgba(153, 153, 153, 1);
}
.color-dark {
    margin-left:.1rem;
    margin-right:.1rem;
    font-family: PingFang-SC-Medium;
    color: rgba(102, 102, 102, 1);
}
.content {
    width: 92.5%;
    height: .9rem;
    background-color: #fff;
    margin: auto;
    border-radius: .08rem;
    margin-top:-0.15rem;
}
.annual {
    width: 93.3%;
    height: 0.32rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Semibold;
    color: #333333;
    line-height: 0.28rem;
    margin: 0.48rem 0rem 0.13rem 6.6%;
    font-weight: 600;
}
.fonts-au {
    width: 50%;
    height: 0.2rem;
    font-size: 0.14rem;
    font-family: PingFang-SC-Medium;
    color: #A6A6A6;
    line-height: 20px;
    margin: 0 auto;
    padding-top: 0.07rem;
    margin-left: .3rem;
    text-align: center;
}
.integral {
    float: right;
    width: 0.55rem;
    height: 0.37rem;
    font-size: 0.16rem;
    font-family: PingFang-SC-Medium;
    color: rgba(250, 122, 0, 1);
    line-height: 0.37rem;
    /* text-align: center; */
    margin-top: -.29rem;
    /* margin: 0.04rem auto 0.1rem auto; */
    position:relative;
    left:0.1rem!important;
}
.vux-flexbox {
    width: 93%;
    height: 0.33rem;
    border-radius: .5rem;
    margin: 0.13rem auto 0.32rem auto;
}
.flex-demo {
    width: 98%;
    height: 0.33rem;
    background: rgba(246, 246, 246, 1);
    border-radius: 2px;
    margin-left:0rem;
}
.bottom{
    width: 92.5%;
    height: 3.31rem;
    background-color: #fff;
    margin: auto;
    border-radius: .08rem;
    margin-top: .1rem;
}
.bottom-top{
    width: 100%;
    height: .4rem;
    border-bottom: 1px solid #F2F2F2;
}
.bottom-top span{
    display: inline-block;
    margin: .08rem 0 0 4%;
    font-size: .14rem;
    font-weight: 600;
    color: #333;
}
.vux-flexbox-item:nth-child(2) {
    margin-right: -1%;
}
#echartShow {
    width: 76%;
    height: 2.1rem;
    margin: .3rem auto 0;
}
.weui-tabbar {
    background-color: #ffffff;
    width: 100%;
    position: fixed;
}
.weui-tabbar__item {
    padding: 2px 0 0;
}
@media only screen and (min-width: 200px) and (max-width: 361px) {
    .top-left {
        margin: 0.49rem 0 0.24rem 0.15rem;
    }
    .top-right {
        margin: 0.24rem 0.2rem 0.15rem 0;
    }
}
</style>

