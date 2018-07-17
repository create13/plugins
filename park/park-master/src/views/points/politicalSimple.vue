<template>

	<div style="height:100%;">
   		<view-box ref="viewBox" body-padding-top=".46rem">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
                历史记录<a slot="right" @click="showMenu">评分说明</a></x-header>
			    <div class="points-table">
                    <flexbox :gutter="0">
                        <flexbox-item>序号</flexbox-item>
                        <flexbox-item>审核人</flexbox-item>
                        <flexbox-item>活动时间</flexbox-item>
                        <flexbox-item>评分状态</flexbox-item>
                    </flexbox>
                    <flexbox :gutter="0"  v-for="(con,index) in list" :key="index">
                        <flexbox-item>{{index+1}}</flexbox-item>
                        <flexbox-item>{{con.partyname}}</flexbox-item>
                        <flexbox-item>{{startTime1|formatDuring}}~{{endTime1|formatDuring}}</flexbox-item>
                        <flexbox-item>
                            <input type="button" class="btnSub" :value="con.status|Upper" :class="con.status|Upper1" @click="clickLink(con)" />
                        </flexbox-item>
                    </flexbox>
               </div>
			<div v-transfer-dom>
				<popup v-model="showPop" position="left" width="100%">
				<div class="middle">
					<div class="middle-top">评分说明</div>
					<div class="middle-content">
						<p>
							党员自学或参加其他党组织组织的学习教育活动，经所属党支部书记确认后，每参加一次加2.5分（共5分）。
						</p>
					</div>
					<div class="knowBtn" @click="know">我知道了</div>
				</div>
				</popup>
			</div>
   		</view-box>
 	</div>
</template>
<script>
import axios from 'axios'
/*import Xheader from '@/components/comother/rheader'*/
import Vue from 'vue';
import {ViewBox,TransferDom,Popup,Flexbox, FlexboxItem,XHeader} from 'vux'
Vue.component(Popup.name, Popup);
	export default {
		data(){

			return {
				contents:{rights:'评分说明',title:''},
				list:"",
				isYellow:false,
				showPop:false
			}
		},
		filters: {
            Upper: function (value) {
                try {
                    if(value=== 0)  throw "去处理";
                    if(value=== 1)  throw "已拒绝";
                    if(value=== 2)  throw "已通过";
                }
                catch(err) {
                    return value=err;
                }

            },
            Upper1: function (value) {
                try {
                   /* if(value===null) throw "";*/
                    if(value=== 1)  throw "yellowB";
                    if(value=== 0)  throw "yellowC";
                }
                catch(err) {
                    return value=err;
                }

            },

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

        },
		components:{
			XHeader,
			ViewBox,
			Popup,
			Flexbox,
			FlexboxItem,
		},
		directives:{
			TransferDom
		},
		methods:{
            clickLink(item) {
                this.$router.push({
                    path: '/active/detailPack/',
                    name: 'detailPack',
                    params:{studyid:item.studyid,createUserid:item.createUserid,moduleid:this.$route.params.moduleid}
                })

            },
            getModule(){
                this.$http.get('pscoredetail/queryById?id='+this.$route.params.moduleid
                ).then(res =>{
                    this.contents.title = res.data.projectName+'评分';
                }).catch(err =>{
                    console.log(err)
                })
            },
            getlist(){
                axios({
                    method: 'get',
                    url: 'pstudy/getPartymemberByDepartmentid',
                    params: {
                       departmentid:this.$store.getters.user.departmentid,
                       activeType:this.$route.params.moduleid
                    }
                }) .then((res)=> {
                    this.list=res.data;

                })
                .catch(function (error) {
                        console.log(error);
                    });
            },
			know(){
				this.showPop = false
			},
			datePick(s){
            Date.prototype.toLocaleString = function(){
                return this.getFullYear() +'.'+ (this.getMonth()+1)+'.'+this.getDate()
            };
            return new Date(s).toLocaleString();
        },
        showMenu(){
        	this.showPop = true;
        }
		},
		mounted(){
            this.getlist();
            this.getModule();
		}
	}
</script>

<style scoped lang="less">
html,body{
	width:100%;
	height:100%;
	overflow-x:hidden;
}
.vux-flexbox{
	width:88%;
	margin-left:6%;
	text-align: center;
	margin-top:.2rem;
}
.vux-flexbox-item{
font-size: .14rem;
}
.vux-flexbox:nth-child(1){
	color:rgba(250,122,0,1);
	border:0;
	padding-bottom:0px;
}
.vux-flexbox{
	border-bottom:1px solid #E8E8E8;
	padding-bottom:.2rem;
}
.vux-flexbox .vux-flexbox-item:nth-child(1){
	-webkit-box-flex: 0.5;
}
.btnSub{width:.6rem;height:.24rem;font-size:.14rem;line-height:.24rem;border-radius: 4px;font-family:PingFangSC-Medium;border:0px;color:#FFFFFF;background-color:rgba(185, 54, 71, 1);}
.yellowA{background-color:#BABABA;}
.yellowB{background-color:#F84D2B;}
.yellowC{background-color:rgba(244,151,74,1);}
.middle{width:2.8rem;height:2.02rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:21%;overflow:hidden;}
.mint-popup-left{left:15%;}
.middle .middle-top{width:100%;height:.4rem; background:linear-gradient(90deg,rgba(185,54,71,1),rgba(155,10,26,1));box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);font-size:.16rem;color:#FFFFFF;text-align:center;line-height:.4rem;border-radius:10px 10px 0 0;}
.middle-content{width:2.4rem;height:0.8rem;margin:.21rem .19rem .21rem .21rem;}
.middle-content p{font-size:.14rem;color:#828282;line-height:.24rem;}
.dark{color:#333333;}
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0.2);}
</style>
