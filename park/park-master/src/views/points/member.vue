<template>
	<div class="page-body">
   		<view-box ref="viewBox">
            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" class="bgColors">
            {{contents.title}}<a slot="right" @click="showPops">评分说明</a></x-header>
                <div class="points-table">
                    <flexbox :gutter="0">
                        <flexbox-item>序号</flexbox-item>
                        <flexbox-item>姓名</flexbox-item>
                        <flexbox-item>评分状态</flexbox-item>
                    </flexbox>
                    <flexbox  style="text-align: center" v-if="list.length === 0">
                        <div style="margin-left:30%;">
                            <img style="width:.9rem;height:1.2rem;" src="@/assets/images/icon-noRecord.png" alt="">
                            <p style="color: #CCC;">暂无信息</p>
                        </div>
                    </flexbox>
                    <flexbox style="text-align: center" v-if="list.length===0">暂无支部人员提交信息</flexbox>
                    <flexbox :gutter="0"  v-for="(con,index) in list" :key="index">
                        <flexbox-item>{{index+1}}</flexbox-item>
                        <flexbox-item>{{con.name}}</flexbox-item>
                        <flexbox-item>
                            <input type="button" class="btnSub" :value="con.tempint|Upper" :class="con.tempint|Upper1" @click="changeItem(con)" />
                        </flexbox-item>
                    </flexbox>
                </div>



			<div v-transfer-dom>
				<popup v-model="showPop" position="left" width="100%">
				<div class="middle">
					<div class="middle-top">评分说明</div>
					<div class="middle-content">
						<p><span class="dark">1.获得荣誉:</span>年度获得综合党委以上荣誉的加5分</p>
						<p><span class="dark">2.先锋表彰：</span>工作突出，年内受到公司、行业表彰奖励的，加5分；</p>
						<p><span class="dark">3.先锋模范：</span>在其他发挥先锋模范作用方面需要加分的，由党支部研究后视情况予以加分。</p>
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
import Vue from 'vue';
import {ViewBox,TransferDom,Popup,Flexbox,FlexboxItem,XHeader} from 'vux'
Vue.component(Popup.name, Popup);
	export default {
		data(){

			return {
				contents:{rights:'评分说明',title:'先锋评定'},
				list:"",
				isYellow:false,
				showPop:false
			}
		}, filters: {
            Upper: function (value) {
                try {
                    if(value===null) throw "去处理";
                    if(value=== 1)  throw "已审核";
                    if(value=== 0)  throw "待审核";
                }
                catch(err) {
                    return value=err;
                }

            },
            Upper1: function (value) {
                try {
                    if(value===null) throw "";
                    if(value=== 1)  throw "yellowB";
                    if(value=== 0)  throw "yellowC";
                }
                catch(err) {
                    return value=err;
                }

            }
        },
		components:{
			ViewBox,
            Popup,
            Flexbox,
            FlexboxItem,
            XHeader
		},
		directives:{
			TransferDom
		},
		methods:{
            getlist(){
                axios({
                    method: 'get',
                    url: 'ppartymember/getPartymemberByDepartmentid',
                    params: {
                       departmentid:this.$store.getters.user.departmentid
                    }
                }).then((res)=> {
                    console.log(res);
                    this.list=res.data;
                    console.log(list)
                }).catch(function (error) {
                    console.log(error);
                });
            },
			changeItem(item){

                if(!item.tempint && item.tempint!==0 ){
                this.$router.push({
                    path: '/points/pointEvaluate',
                    name: 'pointEvaluate',
                    params: {
                        partmentId:item.id,
                        name:encodeURI(item.name),
                        departmentId:item.departmentid,
                        userId:item.userid

                    }
                })
                }else if(item.tempint===1){
                    this.$router.push({
                        path: '/points/audit1',
                        name: 'Audit1',
                        params: {
                            partmentId:item.id,
                            name:encodeURI(item.name),
                            departmentId:item.departmentid,
                            userId:item.userid
                        }
                    })
                }else {
                    this.$router.push({
                        path: '/points/audit1',
                        name: 'Audit1',
                        params: {
                            partmentId:item.id,
                            name:encodeURI(item.name),
                            departmentId:item.departmentid,
                            userId:item.userid
                        }
                    })
                }
			},
			know(){
				this.showPop = false
            },
            showPops(){
                this.showPop = !this.showPop;
            }
		},
		mounted(){
            this.getlist()

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
#table-style{
	width:86.7%;
	height:auto;
	margin:0 auto;
	padding-top:.4rem;
}
#table-style tbody tr td{height:.28rem;padding-top:.2rem;font-size:.2rem;width:33.33%;text-align:left;}
#table-style tbody tr td:nth-child(3){text-align:right;}
.btnSub{width:.6rem;height:.24rem;font-size:.14rem;line-height:.24rem;border-radius: 4px;font-family:PingFangSC-Medium;border:0px;color:#FFFFFF;background-color:rgba(185, 54, 71, 1);}
.yellowA{background-color:#BABABA;}
.yellowB{background-color:#F84D2B;}
.yellowC{background-color:rgba(244,151,74,1);}
.middle{width:2.8rem;height:3rem;margin:.8rem auto;border-radius:10px;background-color: #FFFFFF;position:absolute;z-index:300;left:calc(50% - 1.4rem);top:15%;}
.mint-popup-left{left:15%;}
.middle .middle-top{width:100%;height:.4rem; background:linear-gradient(90deg,rgba(185,54,71,1),rgba(155,10,26,1));box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);font-size:.16rem;color:#FFFFFF;text-align:center;line-height:.4rem;border-radius:10px 10px 0 0;}
.middle-content{width:2.4rem;height:1.7rem;margin:.21rem .19rem .21rem .21rem;}
.middle-content p{font-size:.14rem;color:#828282;line-height:.24rem;}
.dark{color:#333333;}
.knowBtn{width:1.2rem;height:.3rem;margin:0 auto;color:#FFFFFF;background:rgba(185,54,71,1);
border-radius: 4px;line-height:.3rem;text-align:center;font-size:.16rem;}
.vux-popup-dialog{background-color: rgba(0,0,0,0.2);}

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
    margin-top:.55rem;
}
.vux-flexbox{
	border-bottom:1px solid #E8E8E8;
	padding-bottom:.2rem;
}
.vux-flexbox .vux-flexbox-item:nth-child(1){
    flex:0 0 auto;
    width: 22%;

}


</style>
